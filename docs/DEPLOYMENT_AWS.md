# 🚀 Hướng dẫn Deploy lên AWS EC2 với SSL/HTTPS - Production Ready

**Yêu cầu từ quychethi.md:**
- ✅ Docker + Docker Compose
- ✅ Domain + SSL (HTTPS)
- ✅ VPS Deployment

---

## 📋 **Bước 1: Kết nối SSH đến EC2**

```bash
# Đặt quyền file key
chmod 400 botff.pem

# Kết nối SSH
ssh -i "botff.pem" admin@ec2-13-229-197-91.ap-southeast-1.compute.amazonaws.com

# Cập nhật system
sudo apt update && sudo apt upgrade -y
```

---

## 🐳 **Bước 2: Cài đặt Docker + Docker Compose**

```bash
# Cài Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Cài Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Xác nhận
docker --version
docker compose version
```

---

## 🌐 **Bước 3: Cài Nginx + Certbot (SSL)**

```bash
# Cài Nginx + Certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# Khởi động Nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Mở firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

---

## 📂 **Bước 4: Clone Repository + Cấu hình**

```bash
# Tạo thư mục deploy
mkdir -p ~/apps
cd ~/apps

# Clone repo
git clone https://github.com/NguyenLuat2909/BepCuaLuat.git
cd BepCuaLuat

# Copy file env (thay đổi các giá trị cần thiết)
cp docs/env.example.txt .env

# CHỈNH SỬA .env với các biến thật
nano .env
```

**Các biến cần cấu hình trong `.env`:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENCODE_API_KEY=your_gemini_key
POSTGRES_PASSWORD=strong_password_here
```

---

## 🐳 **Bước 5: Chạy Docker Compose**

```bash
# Build + chạy containers
sudo docker compose up -d --build

# Kiểm tra logs
sudo docker compose logs -f app

# Xác nhận containers chạy
sudo docker compose ps
```

App sẽ chạy trên `http://localhost:3000` (nội bộ)

---

## 🔒 **Bước 6: Cấu hình Nginx Reverse Proxy + SSL**

Tạo file cấu hình Nginx:

```bash
sudo nano /etc/nginx/sites-available/bepcualuat
```

Paste nội dung dưới đây (thay `bepcualuat.example.com` bằng domain thực):

```nginx
server {
    listen 80;
    server_name bepcualuat.example.com;
    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Kích hoạt cấu hình:

```bash
# Link vào sites-enabled
sudo ln -s /etc/nginx/sites-available/bepcualuat /etc/nginx/sites-enabled/

# Xóa default
sudo rm -f /etc/nginx/sites-enabled/default

# Test cấu hình
sudo nginx -t

# Khởi động lại Nginx
sudo systemctl reload nginx
```

---

## 🔐 **Bước 7: Cấu hình SSL với Let's Encrypt**

```bash
# Tạo SSL certificate
sudo certbot certonly --nginx -d bepcualuat.example.com

# Chấp nhận terms
# Nhập email hợp lệ
# Chọn "Agree" cho sharing
```

**Nginx sẽ tự động cập nhật sau khi certbot hoàn tất**, hoặc bạn có thể cấu hình thủ công:

```bash
sudo nano /etc/nginx/sites-available/bepcualuat
```

**Cấu hình đầy đủ với SSL:**

```nginx
server {
    listen 80;
    server_name bepcualuat.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bepcualuat.example.com;
    client_max_body_size 10M;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/bepcualuat.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bepcualuat.example.com/privkey.pem;

    # Security headers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔄 **Bước 8: Auto-renew SSL Certificate**

```bash
# Kiểm tra certbot timer
sudo systemctl list-timers | grep cert

# Hoặc test manual renewal
sudo certbot renew --dry-run
```

---

## 📊 **Bước 9: Kiểm tra Deployment**

```bash
# Kiểm tra containers
sudo docker compose ps

# Xem logs real-time
sudo docker compose logs -f app

# Kiểm tra port 3000 (nội bộ)
curl http://localhost:3000

# Kiểm tra Nginx
sudo systemctl status nginx

# Kiểm tra firewall
sudo ufw status
```

**Truy cập URL production:**
```
https://bepcualuat.example.com
```

---

## 🛠️ **Các lệnh quản lý thường xuyên**

```bash
# Restart app
sudo docker compose restart

# Stop app
sudo docker compose stop

# Xem logs cuối 100 dòng
sudo docker compose logs -n 100 app

# Update app (pull + rebuild)
cd ~/apps/BepCuaLuat
git pull
sudo docker compose up -d --build

# Cleanup
sudo docker compose down
```

---

## 📌 **Checklist hoàn thành (để báo cáo)**

- ✅ Domain trỏ về EC2 IP
- ✅ SSH key bảo mật (chmod 400)
- ✅ Docker + Docker Compose cài thành công
- ✅ Containers chạy: `docker compose ps`
- ✅ Nginx hoạt động: `sudo systemctl status nginx`
- ✅ SSL certificate hoạt động: `sudo certbot certificates`
- ✅ Truy cập được `https://domain.com` (xanh 🟢)
- ✅ Database và API hoạt động

---

## ⚠️ **Lưu ý bảo mật Production**

```bash
# Chỉ expose port 80 + 443 (HTTP/HTTPS)
# Port 3000 (app) chỉ nội bộ
# Port 5432 (database) KHÔNG expose ra internet

# Kiểm tra Security Group AWS:
# Inbound:
#   - 80 (HTTP): 0.0.0.0/0
#   - 443 (HTTPS): 0.0.0.0/0
#   - 22 (SSH): YOUR_IP/32 (không public)

# Outbound: Cho phép tất cả
```

---

## 🐛 **Troubleshooting**

**Lỗi: `Connection refused` khi truy cập**
```bash
# Kiểm tra app chạy
sudo docker compose ps

# Xem logs
sudo docker compose logs app
```

**Lỗi: `SSL certificate error`**
```bash
# Tái tạo certificate
sudo certbot renew --force-renewal -d bepcualuat.example.com
```

**Lỗi: `502 Bad Gateway`**
```bash
# Restart containers
sudo docker compose restart

# Check app logs
sudo docker compose logs -f app --tail 50
```

---

**Tài liệu tham khảo:**
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Reverse Proxy](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [AWS EC2 Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
