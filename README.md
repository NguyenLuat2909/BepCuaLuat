# 🍳 Bếp của Luật

> Sổ tay công thức nấu ăn & Lên thực đơn tuần — một web app cá nhân mềm mại, ấm áp.

## ✨ Giới thiệu

**Bếp của Luật** là một web app cá nhân giúp bạn:

- 📓 Lưu công thức nấu ăn với ảnh bìa, nguyên liệu, các bước, ghi chú riêng tư.
- 📅 Lên thực đơn từ Thứ 2 đến Chủ nhật bằng kéo thả.
- 🛒 Tự tạo danh sách đi chợ từ thực đơn tuần.
- 🔍 Lọc món theo chế độ ăn, bữa ăn, tags, thời gian nấu, độ khó.
- 🌍 Khám phá công thức công khai của cộng đồng.
- ✨ Trợ lý AI (Google Gemini 2.5 Flash) gợi ý món, thay thế nguyên liệu, tóm tắt công thức, tạo thực đơn 7 ngày.

100% tiếng Việt, giao diện phong cách **"soft cozy recipe journal"** — nền kem, hồng nude, nâu caramel.

---

## 🧱 Công nghệ sử dụng

| Lớp | Công nghệ |
|---|---|
| Frontend | React + Vite, Tailwind CSS |
| Backend | Node.js serverless API routes (App-Router-style) |
| Database | PostgreSQL 17 (`@neondatabase/serverless`) |
| Auth | Hệ thống `auth_users` tích hợp + argon2 hashing |
| Upload ảnh | Tích hợp upload qua hook `useUpload` (CDN) |
| AI | Google Gemini 2.5 Flash |
| Data fetching | `@tanstack/react-query` |
| Form | `react-hook-form` patterns |
| Toast | `sonner` |
| Icons | `lucide-react` |
| Fonts | Google Fonts: Playfair Display (heading), Inter (body) |

> ⚠️ **Kiến trúc**: Dự án phát triển trên nền tảng **Anything** thay vì Next.js thuần. API routes có cấu trúc **giống** Next.js App Router (`/apps/web/src/app/api/[route]/route.js` với hàm export `GET/POST/PUT/DELETE`). Có thể chuyển sang Next.js gốc dễ dàng.

---

## 🎨 Bảng màu

| Tên | Mã |
|---|---|
| Nền chính | `#FAF4F1` |
| Nền phụ | `#F3EAE4` |
| Card hồng nude | `#D5B4A4` |
| Viền be | `#D9C9BF` |
| Viền sáng | `#E9DFDA` |
| Nâu caramel | `#B89777` |
| Chữ chính | `#664226` |
| Nhấn | `#9F6C3E` |

---

## 📂 Cấu trúc dự án

```
apps/web/src/
├── app/
│   ├── page.jsx                       # Landing + Dashboard
│   ├── layout.jsx                     # Root layout (React Query + Toaster)
│   ├── account/{signin,signup,logout}
│   ├── cong-thuc/                     # Recipes
│   │   ├── page.jsx                   #   List + filters
│   │   ├── them/page.jsx              #   Create
│   │   └── [id]/{page.jsx,sua/page.jsx}
│   ├── kham-pha/page.jsx              # Public explore
│   ├── thuc-don-tuan/page.jsx         # Drag-drop weekly meal planner
│   ├── di-cho/page.jsx                # Grocery list
│   ├── ai/page.jsx                    # AI assistant
│   └── api/
│       ├── recipes/                   # CRUD + public + duplicate
│       ├── meal-plan/                 # Weekly plan API
│       ├── grocery/{route.js, items/[id], generate}
│       ├── dashboard/{stats, today}
│       └── ai/                        # Gemini-powered endpoints
├── components/                        # Layout, Nav, RecipeCard, RecipeForm,
│                                      # FilterBar, ImageUpload, MealPlanner,
│                                      # SoftButton, Pill, TagPill, CozyPageHeader,
│                                      # AiSuggestionBox, StatsCard, EmptyState
└── data/
    ├── constants.js                   # Màu, meal_types, tags, days
    └── ingredient-categories.js       # Phân loại nguyên liệu
apps/web/docs/
├── AI_PROMPTS.md                      # Tất cả prompt AI
├── DEPLOYMENT.md                      # Hướng dẫn deploy VPS + SSL
└── SCHEMA.sql                         # Schema PostgreSQL
apps/web/Dockerfile                     # Mẫu multi-stage (cho self-host)
apps/web/docker-compose.yml             # Mẫu compose
apps/web/.env.example                   # Mẫu env vars
```

---

## 🚀 Chạy local (trên nền tảng Anything)

Dự án này được phát triển trên nền tảng **Anything**. Khi mở trong App Builder, bấm nút **"Preview"** để xem app chạy. Không cần `npm install` thủ công.

### Biến môi trường (đã được nền tảng tự cấu hình)

| Biến | Mô tả |
|---|---|
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL |
| `AUTH_SECRET` | Khoá ký phiên đăng nhập |
| `AUTH_URL` | URL gốc của app |
| `NEXT_PUBLIC_CREATE_APP_URL` | URL gốc (dùng backend gọi `/integrations`) |

Để chạy **bên ngoài** Anything (Next.js thuần / Docker), xem **`docs/DEPLOYMENT.md`**.

---

## 🗄️ Schema Database

6 bảng chính: `profiles`, `recipes`, `meal_plan_items`, `grocery_lists`, `grocery_items`, `ai_prompt_logs`. Xem `docs/SCHEMA.sql`.

**Bảo mật**: Mỗi API route đều kiểm tra `session.user.id` (`import { auth } from '@/auth'`) và lọc dữ liệu theo `user_id` — chỉ đọc/ghi dữ liệu của chính user. Công thức `is_public = true` đọc được không cần auth.

---

## 🤖 Tính năng AI

Tất cả AI dùng **Google Gemini 2.5 Flash** qua integration. Xem prompt chi tiết trong `docs/AI_PROMPTS.md`.

- **Gợi ý món từ nguyên liệu** — nhập nguyên liệu → 3-5 món Việt.
- **Thay thế nguyên liệu** — gợi ý nguyên liệu tương đương.
- **Tóm tắt công thức** — biến công thức dài thành 5-7 bước.
- **Phiên bản dễ nấu hơn** — đơn giản hóa công thức.
- **Tạo thực đơn 7 ngày** — tự sinh theo mục tiêu.

> ⚠️ "Gợi ý AI chỉ mang tính tham khảo."

---

## 🐳 Docker (mẫu cho báo cáo)

Xem `Dockerfile` và `docker-compose.yml`.

```bash
docker compose up --build
```

App chạy tại `http://localhost:3000`.

---

## 🌐 Deploy VPS + Domain + SSL

Xem chi tiết trong **`docs/DEPLOYMENT.md`** — Ubuntu + Docker + Nginx + Let's Encrypt.

---

## 👤 Tài khoản demo

Sau khi deploy, đăng ký tài khoản đầu tiên qua `/account/signup`. Không có dữ liệu seed mặc định.

---

Made with ✿ for cozy kitchens.
