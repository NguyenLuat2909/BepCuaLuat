#!/bin/bash

# 🚀 Deploy Script cho BepCuaLuat lên AWS EC2
# Chạy: bash deploy.sh

set -e  # Thoát nếu có lỗi

echo "=========================================="
echo "🚀 DEPLOY BEPCUALUAT LÊN AWS EC2"
echo "=========================================="

# Kiểm tra quyền
if [[ $EUID -ne 0 ]]; then
   echo "❌ Script này phải chạy với sudo"
   exit 1
fi

# ========== VARIABLES ==========
DOMAIN="bepcualuat.example.com"  # ⬅️ THAY BẰNG DOMAIN THỰC
APP_DIR="$HOME/apps/BepCuaLuat"
REPO_URL="https://github.com/NguyenLuat2909/BepCuaLuat.git"

# ========== FUNCTIONS ==========

log_info() {
    echo "ℹ️  $1"
}

log_success() {
    echo "✅ $1"
}

log_error() {
    echo "❌ $1"
    exit 1
}

# ========== 1. UPDATE SYSTEM ==========
log_info "Cập nhật system..."
apt update && apt upgrade -y
log_success "System cập nhật thành công"

# ========== 2. INSTALL DOCKER ==========
if ! command -v docker &> /dev/null; then
    log_info "Cài đặt Docker..."
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker $USER
    log_success "Docker cài đặt thành công"
else
    log_info "Docker đã cài sẵn"
fi

# ========== 3. INSTALL DOCKER COMPOSE ==========
if ! docker compose version &> /dev/null; then
    log_info "Cài đặt Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    log_success "Docker Compose cài đặt thành công"
else
    log_info "Docker Compose đã cài sẵn"
fi

# ========== 4. INSTALL NGINX ==========
if ! command -v nginx &> /dev/null; then
    log_info "Cài đặt Nginx..."
    apt install -y nginx
    systemctl enable nginx
    systemctl start nginx
    log_success "Nginx cài đặt thành công"
else
    log_info "Nginx đã cài sẵn"
fi

# ========== 5. INSTALL CERTBOT ==========
if ! command -v certbot &> /dev/null; then
    log_info "Cài đặt Certbot..."
    apt install -y certbot python3-certbot-nginx
    log_success "Certbot cài đặt thành công"
else
    log_info "Certbot đã cài sẵn"
fi

# ========== 6. SETUP FIREWALL ==========
log_info "Cấu hình Firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
log_success "Firewall cấu hình xong"

# ========== 7. CLONE REPO ==========
if [ ! -d "$APP_DIR" ]; then
    log_info "Clone repository..."
    mkdir -p $APP_DIR
    git clone $REPO_URL $APP_DIR
    log_success "Repository clone thành công"
else
    log_info "Repository đã tồn tại, cập nhật..."
    cd $APP_DIR
    git pull
fi

# ========== 8. SETUP ENV ==========
log_info "Kiểm tra file .env..."
if [ ! -f "$APP_DIR/.env" ]; then
    log_error "File .env không tồn tại. Tạo từ env.example.txt"
    exit 1
fi
log_success "File .env tồn tại"

# ========== 9. DOCKER COMPOSE ==========
cd $APP_DIR
log_info "Khởi chạy Docker Compose..."
docker compose -f docker-compose.production.yml down 2>/dev/null || true
docker compose -f docker-compose.production.yml up -d --build
log_success "Docker Compose khởi chạy thành công"

# Chờ app start
log_info "Chờ app khởi động (30 giây)..."
sleep 30

# ========== 10. NGINX REVERSE PROXY ==========
log_info "Cấu hình Nginx reverse proxy..."
cp docs/nginx-config.conf /etc/nginx/sites-available/$DOMAIN

# Thay domain
sed -i "s/bepcualuat.example.com/$DOMAIN/g" /etc/nginx/sites-available/$DOMAIN

# Enable site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test nginx config
if nginx -t; then
    systemctl reload nginx
    log_success "Nginx cấu hình thành công"
else
    log_error "Nginx cấu hình lỗi"
fi

# ========== 11. SSL CERTIFICATE ==========
log_info "Tạo SSL certificate với Let's Encrypt..."
if certbot certonly --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@example.com; then
    log_success "SSL certificate tạo thành công"
else
    log_error "SSL certificate tạo lỗi"
fi

# ========== 12. VERIFY DEPLOYMENT ==========
log_info "Kiểm tra deployment..."

echo ""
echo "========== 📊 STATUS =========="
echo ""

log_info "Docker containers:"
docker compose -f $APP_DIR/docker-compose.production.yml ps

echo ""
log_info "Nginx status:"
systemctl status nginx --no-pager | head -3

echo ""
log_info "SSL certificates:"
certbot certificates

echo ""
log_info "Testing app..."
if curl -s http://127.0.0.1:3000 > /dev/null; then
    log_success "App hoạt động (http://127.0.0.1:3000)"
else
    log_error "App không phản hồi"
fi

if curl -s https://$DOMAIN > /dev/null 2>&1; then
    log_success "Domain https://$DOMAIN hoạt động"
else
    log_info "Domain chưa hoạt động (có thể do DNS)"
fi

echo ""
echo "=========================================="
echo "✅ DEPLOY HOÀN THÀNH!"
echo "=========================================="
echo ""
echo "📍 URL Production: https://$DOMAIN"
echo "📍 Chứng chỉ SSL: /etc/letsencrypt/live/$DOMAIN"
echo "📍 App logs: docker compose -f $APP_DIR/docker-compose.production.yml logs -f app"
echo ""
echo "⚠️  Lưu ý:"
echo "  - Kiểm tra DNS A record trỏ về EC2 IP"
echo "  - Auto-renew SSL: sudo systemctl list-timers | grep cert"
echo "  - Update app: cd $APP_DIR && git pull && docker compose up -d --build"
echo ""
