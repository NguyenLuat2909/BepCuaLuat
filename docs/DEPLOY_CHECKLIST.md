# ✅ CHECKLIST DEPLOY LÊN AWS (Đáp ứng yêu cầu môn học)

**Sinh viên:** [Tên]  
**Lớp:** CTK46-PM  
**Ngày deploy:** [Ngày tháng năm]  
**Domain:** [Điền domain]  
**EC2 Instance:** [Điền IP]

---

## 📋 TIÊU CHÍ YÊU CẦU (quychethi.md)

### 1. Frontend ✅
- [x] Next.js App Router
- [x] TypeScript
- [x] Tailwind CSS / shadcn/ui
- [x] Server Components & Client Components
- [x] Data Fetching (Server Actions)

**Minh chứng:** [Link file hoặc commit hash]

### 2. Backend ✅
- [x] Supabase Auth (Đăng ký, đăng nhập, đăng xuất)
- [x] Supabase Database (CRUD operations)
- [x] Row Level Security (RLS)
- [x] File Upload (Supabase Storage) - nếu có

**Minh chứng:** [Liệt kê các tính năng đã implement]

### 3. Containerization ✅
- [x] Dockerfile (multi-stage build)
- [x] Docker Compose
- [x] Chạy được `docker compose up -d`
- [x] Chạy được `docker compose logs -f app`

**Kiểm tra:** 
```bash
docker compose ps          # Xác nhận 2 containers chạy
docker compose logs app    # Kiểm tra logs
```

**Kết quả:** [Chụp màn hình output]

### 4. VPS Deployment ✅
- [x] Deploy lên AWS EC2
- [x] Có domain riêng (trỏ đến EC2)
- [x] Nginx reverse proxy
- [x] SSL/HTTPS với Let's Encrypt
- [x] Tự động renew SSL certificate

**Kiểm tra:**
```bash
# On EC2:
curl https://bepcualuat.example.com  # 200 OK
sudo certbot certificates              # Xác nhận certificate
```

**URL Production:** [https://domain.com]  
**SSL Status:** [Xanh ✅ / Đỏ ❌]

### 5. Git/GitHub ✅
- [x] Repository công khai / private với quyền truy cập
- [x] Conventional Commits
- [x] Commit history rõ ràng

**Repository URL:** [Link GitHub]  
**Số commits:** [Tối thiểu 20 commits]

### 6. AI Tool Usage ✅
- [x] Sử dụng GitHub Copilot / Gemini
- [x] Tối thiểu 5 prompts
- [x] Ghi chép prompt + kết quả

**Minh chứng:** [Xem phụ lục]

---

## 🔧 CHỨC NĂNG BẮTY BUỘC

| Tính năng | Status | Ghi chú |
|----------|--------|---------|
| Authentication (Supabase) | ✅/❌ | Đăng ký, đăng nhập, đăng xuất |
| CRUD Data | ✅/❌ | Tạo, đọc, cập nhật, xóa |
| UI/UX | ✅/❌ | Responsive, Tailwind/shadcn |
| RLS/Permissions | ✅/❌ | Chỉ user được phép thao tác |
| File Upload | ✅/❌ | Upload ảnh/tài liệu (nếu có) |
| Docker | ✅/❌ | docker compose up -d |
| Deployment | ✅/❌ | HTTPS + Domain hoạt động |

---

## 🚀 QUY TRÌNH DEPLOY

### Bước 1: Kết nối SSH ✅
```bash
ssh -i "botff.pem" admin@ec2-IP
```
**Status:** Kết nối được / Không kết nối được

### Bước 2: Cài Docker ✅
```bash
docker --version
docker compose --version
```
**Status:** ✅ / ❌

### Bước 3: Cài Nginx + Certbot ✅
```bash
sudo systemctl status nginx
sudo certbot certificates
```
**Status:** ✅ / ❌

### Bước 4: Clone + Cấu hình ✅
```bash
cd ~/apps/BepCuaLuat
cat .env | head -5  # Xác nhận env có biến
```
**Status:** ✅ / ❌

### Bước 5: Docker Compose ✅
```bash
sudo docker compose up -d --build
sudo docker compose ps
```
**Containers:**
- [ ] `bep-cua-luat` (app) - RUNNING
- [ ] `bep-postgres` (database) - RUNNING

### Bước 6: Nginx + SSL ✅
```bash
sudo nginx -t
sudo systemctl status nginx
```
**Status:** OK / ERROR

### Bước 7: Let's Encrypt SSL ✅
```bash
sudo certbot certificates
```
**Certificate:** Có / Không  
**Expiry Date:** [Ngày hết hạn]  
**Auto-renew:** Có / Không

### Bước 8: Kiểm tra URL ✅
```
Truy cập: https://bepcualuat.example.com
HTTP Status: 200 OK
SSL Certificate: 🟢 Valid / 🔴 Invalid
```

---

## 📊 KIỂM THỬ CHỨC NĂNG

| Tính năng | Kết quả | Ghi chú |
|----------|--------|---------|
| Homepage load được | ✅/❌ | [Chụp màn hình] |
| Đăng ký user | ✅/❌ | [Email nhận OTP không?] |
| Đăng nhập | ✅/❌ | [Login được không?] |
| Tạo bản ghi | ✅/❌ | [Có data trong DB?] |
| Chỉnh sửa bản ghi | ✅/❌ | [Update thành công?] |
| Xóa bản ghi | ✅/❌ | [Delete thành công?] |
| Phân quyền (RLS) | ✅/❌ | [User A thấy được data của User B?] |
| Upload file | ✅/❌ | [File lưu trên Supabase Storage?] |
| API hoạt động | ✅/❌ | [Response time bao lâu?] |

---

## 📝 KIỂM THỬ BẢNG MOTIVE

### Performance
```bash
# Trên EC2:
sudo docker stats        # CPU/Memory usage
curl -w "@curl-format.txt" -o /dev/null -s https://domain.com
```

| Metric | Giá trị |
|--------|--------|
| CPU Usage (app) | [%] |
| Memory Usage (app) | [MB] |
| Response Time | [ms] |
| Page Load | [s] |

### Availability
```bash
# Kiểm tra uptime
sudo docker compose ps
sudo systemctl status nginx
```

| Service | Status | Uptime |
|---------|--------|--------|
| App (Next.js) | UP/DOWN | [Ngày] |
| Database (PostgreSQL) | UP/DOWN | [Ngày] |
| Nginx | UP/DOWN | [Ngày] |

---

## 🔐 SECURITY CHECKLIST

- [x] Port 3000 chỉ expose nội bộ (127.0.0.1)
- [x] Port 5432 chỉ expose nội bộ (127.0.0.1)
- [x] Port 80 redirect sang HTTPS
- [x] Port 443 SSL hoạt động
- [x] SSH key bảo mật (chmod 400)
- [x] Database password mạnh
- [x] Environment variables không commit lên Git
- [x] .env.local trong .gitignore

**Kiểm tra Security Group AWS:**
```
Inbound Rules:
  - Port 80 (HTTP): 0.0.0.0/0 ✅
  - Port 443 (HTTPS): 0.0.0.0/0 ✅
  - Port 22 (SSH): YOUR_IP/32 ✅
  - Port 5432: 0.0.0.0/0 ❌ (KHÔNG mở)
  - Port 3000: 0.0.0.0/0 ❌ (KHÔNG mở)
```

---

## 📋 TÀI LIỆU DEPLOYMENT

Các file liên quan:
- [DEPLOYMENT_AWS.md](./DEPLOYMENT_AWS.md) - Hướng dẫn chi tiết
- [nginx-config.conf](./nginx-config.conf) - Cấu hình Nginx
- [docker-compose.production.yml](../docker-compose.production.yml) - Compose production
- Dockerfile - Multi-stage build

---

## 📸 MINH CHỨNG

### Screenshot 1: Domain + SSL Certificate
![URL https://domain.com, Certificate 🟢 Valid](link_anh)

### Screenshot 2: Docker Containers Running
```bash
CONTAINER ID   IMAGE                    STATUS
abc123...      bep-cua-luat            Up 2 days
def456...      postgres:17-alpine      Up 2 days
```

### Screenshot 3: Nginx Status
```bash
● nginx.service - A high performance web server
   Loaded: loaded (enabled; vendor preset: enabled)
   Active: active (running) since ...
```

### Screenshot 4: App Homepage
![Homepage screenshot](link_anh)

---

## ✅ HOÀN THÀNH

**Người điền:** [Tên]  
**Ngày điền:** [Ngày tháng năm]  
**Xác nhận giảng viên:** [Chữ ký / Duyệt]

**Ghi chú từ giảng viên:**
```
[Điền ghi chú nếu có]
```

---

**Lưu ý:** Hoàn thành checklist này trước khi báo cáo + vấn đáp (30/05/2026)
