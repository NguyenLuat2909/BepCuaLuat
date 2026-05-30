# 🚀 QUICK START - DEPLOY BEPCUALUAT LÊN AWS

## ⚠️ **SECURITY WARNING**

**Bạn đã share private key công khai!** Bạn phải:
1. **Regenerate SSH key pair trên AWS** ngay lập tức
2. Revoke key cũ
3. **Không bao giờ push `.pem` files lên GitHub**

Thêm vào `.gitignore`:
```bash
*.pem
*.key
.env
.env.local
```

---

## 🎯 **Yêu cầu từ môn học (quychethi.md)**

✅ **Bắt buộc phải có:**
- Frontend: Next.JS App Router + TypeScript + Tailwind CSS
- Backend: Supabase (Auth + Database + RLS)
- Containerization: Dockerfile + Docker Compose
- **Deployment: Domain + SSL (HTTPS)** ← Bạn đang làm phần này
- Git repository + commit history
- AI tool (GitHub Copilot / Gemini)

---

## 📋 **QUY TRÌNH DEPLOY (5 BƯỚC)**

### **Bước 1️⃣: Kết nối SSH đến EC2**

```bash
# Trên máy local:
chmod 400 botff.pem

ssh -i "botff.pem" admin@ec2-13-229-197-91.ap-southeast-1.compute.amazonaws.com
```

### **Bước 2️⃣: Chạy deploy script (trên EC2)**

```bash
# Trên EC2 (sau SSH):

# Clone repo + download files (nếu chưa có)
git clone https://github.com/NguyenLuat2909/BepCuaLuat.git ~/apps/BepCuaLuat
cd ~/apps/BepCuaLuat

# Cấu hình .env
cp docs/env.example.txt .env
nano .env  # Điền các biến: SUPABASE_URL, POSTGRES_PASSWORD, v.v.

# Chạy deploy script
sudo bash docs/deploy.sh
```

**Script này sẽ:**
- ✅ Cài Docker + Docker Compose
- ✅ Cài Nginx + Certbot
- ✅ Khởi chạy containers
- ✅ Cấu hình SSL
- ✅ Setup reverse proxy

**Thời gian:** ~5-10 phút

### **Bước 3️⃣: Trỏ DNS domain về EC2 IP**

Trên DNS provider của bạn (GoDaddy, Namecheap, v.v.):
- Type: **A Record**
- Name: `bepcualuat` (hoặc domain)
- Value: `13.229.197.91` (EC2 IP)
- TTL: 3600 (hoặc auto)

**Chờ 5-15 phút để DNS cập nhật**

### **Bước 4️⃣: Kiểm tra SSL certificate**

```bash
# Trên EC2:
sudo certbot certificates

# Kết quả:
# Domain: bepcualuat.example.com
# Expiry Date: 2026-08-27
# Auto-renew: Enabled ✅
```

### **Bước 5️⃣: Truy cập URL production**

```
https://bepcualuat.example.com
```

✅ Nếu xanh (🟢) → Deploy thành công!  
🔴 Nếu đỏ → Kiểm tra troubleshooting bên dưới

---

## ✅ **VERIFY DEPLOYMENT**

### **Kiểm tra containers chạy:**
```bash
sudo docker compose ps

# Expected output:
# CONTAINER ID   IMAGE                STATUS
# abc123...      bep-cua-luat        Up 2 days
# def456...      postgres:17-alpine  Up 2 days
```

### **Kiểm tra Nginx:**
```bash
sudo systemctl status nginx
sudo nginx -t
```

### **Kiểm tra logs:**
```bash
sudo docker compose logs -f app

# Hoặc chỉ xem 50 dòng cuối
sudo docker compose logs -n 50 app
```

### **Kiểm tra URL:**
```bash
# Trên EC2:
curl https://bepcualuat.example.com

# Hoặc từ trình duyệt:
# https://bepcualuat.example.com → Nên thấy homepage
```

### **Kiểm tra SSL certificate:**
```bash
curl -I https://bepcualuat.example.com

# Expected:
# HTTP/2 200
# x-powered-by: Next.js
```

### **Monitor deployment:**
```bash
bash docs/monitor.sh
```

---

## 🛠️ **LỆNH QUẢN LÝ HÀNG NGÀY**

```bash
# ========== RESTART APP ==========
sudo docker compose restart

# ========== STOP APP ==========
sudo docker compose stop

# ========== START APP ==========
sudo docker compose start

# ========== VIEW LOGS ==========
sudo docker compose logs -f app          # Real-time
sudo docker compose logs -n 100 app      # Cuối 100 dòng
sudo docker compose logs --tail 50 app   # Cuối 50 dòng

# ========== UPDATE CODE ==========
cd ~/apps/BepCuaLuat
git pull
sudo docker compose up -d --build

# ========== DATABASE BACKUP ==========
sudo docker exec bep-postgres pg_dump -U bepuser bepcualuat > backup.sql

# ========== CLEANUP (xóa cũ) ==========
sudo docker compose down
sudo docker system prune -a
```

---

## 🔐 **SECURITY CHECKLIST**

- [x] Port 80 (HTTP) → 443 (HTTPS) redirect
- [x] Port 443 (HTTPS) SSL/TLS active
- [x] Port 3000 (app) nội bộ chỉ (127.0.0.1)
- [x] Port 5432 (database) nội bộ chỉ (127.0.0.1)
- [x] SSH key chmod 400 (chỉ owner đọc)
- [x] .env không commit lên Git
- [x] SSL auto-renew enabled
- [x] Firewall enabled (ufw)

**AWS Security Group** (inbound):
```
Protocol: TCP, Port: 80,   Src: 0.0.0.0/0    ✅
Protocol: TCP, Port: 443,  Src: 0.0.0.0/0    ✅
Protocol: TCP, Port: 22,   Src: YOUR_IP/32   ✅
Protocol: TCP, Port: 3000, Src: 0.0.0.0/0    ❌ (block)
Protocol: TCP, Port: 5432, Src: 0.0.0.0/0    ❌ (block)
```

---

## 🐛 **TROUBLESHOOTING**

### **❌ "Connection refused" (không kết nối được)**

```bash
# Kiểm tra containers
sudo docker compose ps

# Nếu down, chạy lại
sudo docker compose up -d --build

# Xem logs lỗi
sudo docker compose logs app
```

### **❌ "502 Bad Gateway" (Nginx error)**

```bash
# Kiểm tra app chạy
curl http://127.0.0.1:3000

# Nếu không, restart
sudo docker compose restart app

# Xem logs
sudo docker compose logs -n 50 app
```

### **❌ "SSL certificate error"**

```bash
# Tái tạo certificate
sudo certbot renew --force-renewal -d bepcualuat.example.com

# Hoặc delete + recreate
sudo certbot delete -d bepcualuat.example.com
sudo certbot certonly --nginx -d bepcualuat.example.com
```

### **❌ "Domain không resolve"**

```bash
# Kiểm tra DNS
nslookup bepcualuat.example.com

# Nếu không trỏ, cập nhật DNS provider (5-15 phút)

# Kiểm tra A record
dig bepcualuat.example.com

# Kết quả phải có IP EC2
```

### **❌ "Port 3000 bị block"**

```bash
# Nếu ai đó ngoài truy cập http://IP:3000
# Kiểm tra Security Group AWS:
# - Port 3000 phải KHÔNG mở (0.0.0.0/0)
# - Chỉ Nginx (localhost) truy cập được

# Hoặc disable port 3000 trên reverse proxy
# (Đã config trong nginx-config.conf)
```

---

## 📊 **MONITORING & LOGS**

```bash
# Real-time CPU/Memory
sudo docker stats

# Memory + Disk
free -h
df -h

# Process list
ps aux | grep -E "node|nginx|postgres"

# Uptime
uptime

# System info
uname -a
lsb_release -a
```

---

## 📝 **FILES ĐÃ TẠOW**

Sau khi deploy, bạn có thể tham khảo:

| File | Mục đích |
|------|---------|
| [DEPLOYMENT_AWS.md](./DEPLOYMENT_AWS.md) | Hướng dẫn chi tiết từng bước |
| [docker-compose.production.yml](../docker-compose.production.yml) | Docker Compose cho production (bảo mật hơn) |
| [nginx-config.conf](./nginx-config.conf) | Nginx reverse proxy + SSL config |
| [deploy.sh](./deploy.sh) | Automated deployment script |
| [monitor.sh](./monitor.sh) | Monitoring script |
| [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) | Checklist hoàn thành (cho báo cáo) |

---

## 🎓 **CHO CÁC SINH VIÊN - ĐỀ CƯƠNG MÔN HỌC**

**Yêu cầu báo cáo (quychethi.md):**

1. ✅ **Frontend:** Next.JS App Router + TypeScript
   - [x] Middleware + Server Components?
   - [x] Data Fetching (Server Actions)?
   - [x] Tailwind CSS style?

2. ✅ **Backend:** Supabase
   - [x] Authentication (Supabase Auth)?
   - [x] Database (Supabase DB)?
   - [x] RLS (Row Level Security)?
   - [x] File Upload (Storage)?

3. ✅ **Docker:**
   - [x] Dockerfile multi-stage build?
   - [x] Docker Compose (app + postgres)?
   - [x] `docker compose up -d` chạy được?

4. ✅ **Deployment (BAO GỒM):**
   - [x] VPS / AWS EC2?
   - [x] Domain + DNS A record?
   - [x] SSL/HTTPS (Let's Encrypt)?
   - [x] Nginx reverse proxy?
   - [x] URL production hoạt động?

5. ✅ **Git:**
   - [x] GitHub repo có commit history?
   - [x] Conventional commits?

6. ✅ **AI Tool:**
   - [x] GitHub Copilot / Gemini?
   - [x] > 5 prompts?

---

## 🏁 **SỰ KIỆN & DEADLINE**

| Mốc | Thời hạn | Nội dung |
|-----|---------|---------|
| 1 | 20/05/2026 | Đăng ký đề tài ✅ |
| 2 | 29/05/2026 | Nộp báo cáo + demo link + GitHub ✅ |
| 3 | 30/05/2026 | Báo cáo vấn đáp (5 phút + 5 phút) ⏳ |

**Hôm nay: 29/05/2026** → Deadline nộp báo cáo!

---

## 📞 **SUPPORT & RESOURCES**

- 📖 [Docker Documentation](https://docs.docker.com/)
- 📖 [Next.js Deployment](https://nextjs.org/docs/deployment)
- 📖 [Nginx Proxy](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- 📖 [Let's Encrypt](https://letsencrypt.org/getting-started/)
- 📖 [AWS EC2 Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)

---

**Chúc deploy thành công! 🚀**

Nếu có lỗi, kiểm tra logs: `sudo docker compose logs -f app`
