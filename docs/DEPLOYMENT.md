# 🚀 Hướng dẫn Deploy — Bếp của Luật

Tài liệu này hướng dẫn deploy "Bếp của Luật" lên VPS Ubuntu với Docker + Nginx + Let's Encrypt SSL + tên miền riêng.

> **Lưu ý**: Trên nền tảng **Anything**, app được tự động deploy khi bấm **"Publish"** trong App Builder. Tài liệu này dành cho trường hợp self-host trên VPS.

---

## 📋 Yêu cầu

- VPS Ubuntu 22.04 (≥ 1 vCPU, 1GB RAM, 25GB SSD).
- 1 tên miền (VD `bepcualuat.example.com`) đã trỏ A record về IP VPS.
- Kết nối SSH root.
- Google AI Studio API key cho Gemini.

---

## 1. Chuẩn bị VPS

```bash
ssh root@<IP_VPS>
apt update && apt upgrade -y

# Tạo swap nếu RAM nhỏ
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# Tạo user không-root
adduser deploy
usermod -aG sudo deploy
```

## 2. Cài Docker + Compose

```bash
curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy
docker --version
docker compose version
```

## 3. Cài Nginx + Certbot

```bash
apt install -y nginx certbot python3-certbot-nginx ufw
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

## 4. Clone & cấu hình

```bash
su - deploy
git clone <REPO_URL> bep-cua-luat
cd bep-cua-luat
cp .env.example .env
nano .env
```

Điền:

```env
DATABASE_URL=postgresql://bepuser:STRONG_PASSWORD@postgres:5432/bepcualuat
AUTH_SECRET=<openssl rand -hex 32>
AUTH_URL=https://bepcualuat.example.com
NEXT_PUBLIC_CREATE_APP_URL=https://bepcualuat.example.com
GEMINI_API_KEY=<key_tu_google_ai_studio>
POSTGRES_PASSWORD=STRONG_PASSWORD
```

Tạo AUTH_SECRET:

```bash
openssl rand -hex 32
```

## 5. Khởi chạy Docker Compose

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f app
```

App chạy nội bộ tại `127.0.0.1:3000`.

## 6. Nginx reverse proxy

Tạo `/etc/nginx/sites-available/bepcualuat`:

```nginx
server {
    listen 80;
    server_name bepcualuat.example.com;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/bepcualuat /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 7. SSL với Let's Encrypt

```bash
sudo certbot --nginx -d bepcualuat.example.com
sudo certbot renew --dry-run
```

Cron auto-renew đã được cài sẵn.

## 8. Backup database hàng ngày

```bash
cat > /home/deploy/backup-db.sh <<'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d-%H%M%S)
docker compose exec -T postgres pg_dump -U bepuser bepcualuat | gzip > ~/backups/bep-$DATE.sql.gz
find ~/backups -name "bep-*.sql.gz" -mtime +14 -delete
EOF

chmod +x /home/deploy/backup-db.sh
mkdir -p /home/deploy/backups
crontab -e
# Thêm: 0 3 * * * /home/deploy/backup-db.sh
```

## 9. Update app

```bash
cd /home/deploy/bep-cua-luat
git pull
docker compose up -d --build
```

## 10. Troubleshooting

| Vấn đề | Cách xử lý |
|---|---|
| `502 Bad Gateway` | `docker compose logs app` |
| Không kết nối DB | Kiểm tra `DATABASE_URL` và service `postgres` |
| Upload ảnh lỗi 413 | Body > 4.5MB — dùng `useUpload` hook (frontend direct) |
| AI lỗi 504 | Prompt quá dài, giảm context |
| Certbot fail | DNS chưa trỏ về VPS, đợi 5-10 phút |

---

## ✅ Checklist hoàn thành

- [ ] VPS Ubuntu cập nhật, có swap
- [ ] Docker + Compose cài đặt
- [ ] DNS A record trỏ về IP VPS
- [ ] `.env` đã điền đầy đủ
- [ ] `docker compose up -d` chạy thành công
- [ ] Nginx reverse proxy hoạt động (HTTP 200)
- [ ] SSL Let's Encrypt đã cài (HTTPS)
- [ ] Cron backup database daily
- [ ] Tạo tài khoản đầu tiên qua `/account/signup`
- [ ] Lưu công thức demo, test thực đơn tuần, test AI

---

Chúc bạn deploy thành công! 🍳✿
