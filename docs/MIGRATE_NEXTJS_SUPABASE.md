# 🔄 Prompt Migration: Bếp của Luật → Next.js 14 + Supabase

> Copy toàn bộ prompt này và dán vào một AI assistant (Claude, ChatGPT, v.v.)
> để được hướng dẫn migrate dự án sang Next.js App Router + Supabase.

---

## PROMPT BẮT ĐẦU

---

Tôi có một dự án web app tên **"Bếp của Luật"** — sổ tay công thức nấu ăn cá nhân + lên thực đơn tuần + danh sách đi chợ + trợ lý AI. Dự án hiện đang chạy trên nền tảng **Anything** (React + Vite + PostgreSQL Neon + auth tích hợp + Gemini integration nội bộ). Tôi muốn **migrate toàn bộ sang Next.js 14 App Router + Supabase** để tự host và có nhiều quyền kiểm soát hơn.

Hãy giúp tôi migrate **từng bước**, giữ nguyên 100% tính năng và giao diện.

---

## 1. THÔNG TIN DỰ ÁN HIỆN TẠI

### Stack hiện tại (Anything platform)
- **Frontend**: React + Vite, Tailwind CSS, `@tanstack/react-query`, `sonner`, `lucide-react`
- **Backend**: Serverless API routes kiểu Next.js App Router (`route.js` với export `GET/POST/PUT/DELETE`)
- **Database**: PostgreSQL 17 qua `@neondatabase/serverless` + helper `sql` template tag
- **Auth**: Next-auth adapter tích hợp (`@auth/create`) — email/password, argon2 hashing
- **Upload**: Hook `useUpload` → Uploadcare CDN
- **AI**: Google Gemini 2.5 Flash qua platform proxy (`/integrations/google-gemini-2-5-flash/`)
- **Routing**: File-based routing (pages tại `/apps/web/src/app/*/page.jsx`)
- **Session client**: `useUser()` hook trả về `{ data: user, loading }`
- **Session server**: `import { auth } from '@/auth'` → `const session = await auth()`

### Giao diện (giữ nguyên 100%)
- Màu nền: `#FAF4F1` (cream), phụ: `#F3EAE4`
- Accent: `#9F6C3E`, text: `#664226`
- Font: Playfair Display (heading) + Inter (body)
- Card bo tròn `rounded-3xl`, không drop shadow, viền nhẹ `#E9DFDA`
- 100% tiếng Việt

---

## 2. DATABASE SCHEMA (PostgreSQL → Supabase)

### Bảng cần tạo trên Supabase

```sql
-- Enable extension
create extension if not exists "pgcrypto";

-- 1. Profiles (mở rộng auth.users của Supabase)
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  constraint profiles_user_id_key unique (user_id)
);

-- 2. Recipes
create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  cover_image_url text,
  meal_type text,           -- 'sang' | 'trua' | 'toi' | 'an_nhe'
  cook_time_minutes integer,
  servings integer,
  difficulty text,          -- 'de' | 'trung_binh' | 'kho'
  ingredients jsonb default '[]'::jsonb,
  steps jsonb default '[]'::jsonb,
  notes text,
  tags text[] default array[]::text[],
  is_public boolean not null default false,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Meal plan items
create table public.meal_plan_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recipe_id uuid references public.recipes(id) on delete cascade,
  plan_date date not null,
  day_of_week integer,
  meal_slot text not null,
  note text,
  created_at timestamptz not null default now()
);

-- 4. Grocery lists
create table public.grocery_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  week_start date,
  created_at timestamptz not null default now()
);

-- 5. Grocery items
create table public.grocery_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid references public.grocery_lists(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  quantity text,
  category text,
  is_checked boolean not null default false,
  created_at timestamptz not null default now()
);

-- 6. AI prompt logs
create table public.ai_prompt_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text,
  prompt text,
  response text,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_recipes_user_id on public.recipes(user_id);
create index idx_recipes_is_public on public.recipes(is_public);
create index idx_meal_plan_user_date on public.meal_plan_items(user_id, plan_date);
create index idx_grocery_items_list on public.grocery_items(list_id);
create index idx_grocery_items_user on public.grocery_items(user_id);
create index idx_ai_logs_user on public.ai_prompt_logs(user_id);
```

### Row Level Security (RLS) — thay thế auth check ở API routes

```sql
-- Bật RLS cho tất cả bảng
alter table public.profiles enable row level security;
alter table public.recipes enable row level security;
alter table public.meal_plan_items enable row level security;
alter table public.grocery_lists enable row level security;
alter table public.grocery_items enable row level security;
alter table public.ai_prompt_logs enable row level security;

-- Profiles: chỉ xem/sửa của mình
create policy "profiles_self" on public.profiles
  for all using (auth.uid() = user_id);

-- Recipes: owner full access + public readable by all
create policy "recipes_owner" on public.recipes
  for all using (auth.uid() = user_id);
create policy "recipes_public_read" on public.recipes
  for select using (is_public = true);

-- Meal plan: chỉ owner
create policy "meal_plan_owner" on public.meal_plan_items
  for all using (auth.uid() = user_id);

-- Grocery: chỉ owner
create policy "grocery_lists_owner" on public.grocery_lists
  for all using (auth.uid() = user_id);
create policy "grocery_items_owner" on public.grocery_items
  for all using (auth.uid() = user_id);

-- AI logs: chỉ owner
create policy "ai_logs_owner" on public.ai_prompt_logs
  for all using (auth.uid() = user_id);

-- Auto-create profile khi user đăng ký
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## 3. THAY ĐỔI STACK → Next.js + Supabase

### 3.1 Khởi tạo project

```bash
npx create-next-app@latest bep-cua-luat \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd bep-cua-luat

npm install @supabase/supabase-js @supabase/ssr \
  @tanstack/react-query @tanstack/react-query-devtools \
  sonner lucide-react \
  @google/generative-ai \
  date-fns
```

### 3.2 Biến môi trường (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Gemini AI
GEMINI_API_KEY=AIzaSy...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3.3 Supabase client utilities

**`src/utils/supabase/client.ts`** — dùng trong Client Components:
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**`src/utils/supabase/server.ts`** — dùng trong Server Components và API routes:
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

**`src/utils/supabase/middleware.ts`**:
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  await supabase.auth.getUser()
  return supabaseResponse
}
```

**`src/middleware.ts`**:
```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

## 4. BẢNG ĐỐI CHIẾU MIGRATION

### 4.1 Auth

| Cũ (Anything) | Mới (Supabase) |
|---|---|
| `import { auth } from '@/auth'` | `const supabase = await createClient()` |
| `const session = await auth()` | `const { data: { user } } = await supabase.auth.getUser()` |
| `session?.user?.id` (integer) | `user?.id` (uuid) |
| `import useUser from '@/utils/useUser'` | `const supabase = createClient(); supabase.auth.getUser()` |
| `useAuth().signInWithCredentials(...)` | `supabase.auth.signInWithPassword({ email, password })` |
| `useAuth().signUpWithCredentials(...)` | `supabase.auth.signUp({ email, password, options: { data: { full_name } } })` |
| `useAuth().signOut(...)` | `supabase.auth.signOut()` |
| `/account/signin` page | Next.js page + Supabase auth |
| `/account/signup` page | Next.js page + Supabase auth |

> ⚠️ **Quan trọng**: `user_id` đổi từ `integer` sang `uuid`. Tất cả query và type phải cập nhật.

### 4.2 Database queries

| Cũ (Neon sql tag) | Mới (Supabase client) |
|---|---|
| `await sql\`SELECT * FROM recipes WHERE user_id = ${id}\`` | `await supabase.from('recipes').select('*').eq('user_id', id)` |
| `await sql\`INSERT INTO recipes (...) VALUES (...) RETURNING *\`` | `await supabase.from('recipes').insert({...}).select().single()` |
| `await sql\`UPDATE recipes SET ... WHERE id = ${id}\`` | `await supabase.from('recipes').update({...}).eq('id', id).select().single()` |
| `await sql\`DELETE FROM recipes WHERE id = ${id}\`` | `await supabase.from('recipes').delete().eq('id', id)` |
| Manual `user_id` filter trong mọi query | RLS tự động lọc theo `auth.uid()` |

### 4.3 API Routes

| Cũ (Anything) | Mới (Next.js App Router) |
|---|---|
| `export async function GET(request) {}` | Giữ nguyên cấu trúc |
| `import { auth } from '@/auth'` + check session | `const supabase = await createClient()` + `supabase.auth.getUser()` |
| `return Response.json(data)` | `return NextResponse.json(data)` hoặc `return Response.json(data)` |
| Manual user_id check + filter trong SQL | RLS handle, chỉ cần verify user đăng nhập |
| `sql` tagged template | Supabase client hoặc `@supabase/supabase-js` |

### 4.4 Upload ảnh

| Cũ (useUpload → Uploadcare) | Mới (Supabase Storage) |
|---|---|
| `const [upload, { loading }] = useUpload()` | Supabase Storage bucket `recipe-covers` |
| `await upload({ file })` → CDN URL | `supabase.storage.from('recipe-covers').upload(path, file)` |
| URL trả về trực tiếp | `supabase.storage.from('recipe-covers').getPublicUrl(path)` |

```typescript
// Hàm upload thay thế
async function uploadImage(file: File, userId: string) {
  const supabase = createClient()
  const ext = file.name.split('.').pop()
  const path = `${userId}/${Date.now()}.${ext}`
  
  const { error } = await supabase.storage
    .from('recipe-covers')
    .upload(path, file, { upsert: true })
  
  if (error) throw error
  
  const { data } = supabase.storage
    .from('recipe-covers')
    .getPublicUrl(path)
  
  return data.publicUrl
}
```

Tạo bucket trên Supabase:
- Bucket name: `recipe-covers`
- Public: ✅
- Allowed MIME types: `image/*`
- Max file size: 5MB

### 4.5 AI (Gemini)

| Cũ (Platform integration) | Mới (Google Generative AI SDK) |
|---|---|
| `fetch('/integrations/google-gemini-2-5-flash/')` | `@google/generative-ai` SDK |
| `data?.choices?.[0]?.message?.content` | `result.response.text()` |

```typescript
// src/utils/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

export async function askGemini({
  system,
  prompt,
}: {
  system?: string
  prompt: string
}) {
  const fullPrompt = system
    ? `${system}\n\n${prompt}`
    : prompt
  
  const result = await model.generateContent(fullPrompt)
  return result.response.text()
}
```

---

## 5. DANH SÁCH FILE CẦN TẠO / CẬP NHẬT

### Cấu trúc thư mục Next.js mới

```
src/
├── app/
│   ├── layout.tsx                    # Root layout + QueryClient + Toaster
│   ├── page.tsx                      # Landing + Dashboard
│   ├── account/
│   │   ├── signin/page.tsx           # Supabase signInWithPassword
│   │   ├── signup/page.tsx           # Supabase signUp
│   │   └── logout/page.tsx           # Supabase signOut
│   ├── cong-thuc/
│   │   ├── page.tsx                  # List recipes
│   │   ├── them/page.tsx             # Create recipe
│   │   └── [id]/
│   │       ├── page.tsx              # Recipe detail
│   │       └── sua/page.tsx          # Edit recipe
│   ├── kham-pha/page.tsx             # Public explore
│   ├── thuc-don-tuan/page.tsx        # Meal planner
│   ├── di-cho/page.tsx               # Grocery list
│   ├── ai/page.tsx                   # AI assistant
│   └── api/
│       ├── recipes/route.ts
│       ├── recipes/[id]/route.ts
│       ├── recipes/[id]/duplicate/route.ts
│       ├── recipes/public/route.ts
│       ├── meal-plan/route.ts
│       ├── grocery/route.ts
│       ├── grocery/generate/route.ts
│       ├── grocery/items/[id]/route.ts
│       ├── dashboard/stats/route.ts
│       ├── dashboard/today/route.ts
│       ├── ai/suggest-from-ingredients/route.ts
│       ├── ai/generate-meal-plan/route.ts
│       ├── ai/substitute-ingredient/route.ts
│       ├── ai/summarize-recipe/route.ts
│       └── ai/simplify-recipe/route.ts
├── components/
│   ├── Layout.tsx
│   ├── Nav.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeForm.tsx
│   ├── FilterBar.tsx
│   ├── ImageUpload.tsx               # Dùng Supabase Storage
│   ├── AiSuggestionBox.tsx
│   ├── StatsCard.tsx
│   ├── EmptyState.tsx
│   ├── LoadingSkeleton.tsx
│   ├── SoftButton.tsx
│   ├── Pill.tsx
│   ├── TagPill.tsx
│   └── CozyPageHeader.tsx
├── utils/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── gemini.ts
│   └── ingredient-categories.ts
├── data/
│   └── constants.ts
├── types/
│   └── index.ts                      # Recipe, MealPlanItem, GroceryItem, etc.
└── middleware.ts
```

---

## 6. TYPES (TypeScript)

```typescript
// src/types/index.ts

export interface Recipe {
  id: string
  user_id: string
  title: string
  description?: string
  cover_image_url?: string
  meal_type?: 'sang' | 'trua' | 'toi' | 'an_nhe'
  cook_time_minutes?: number
  servings?: number
  difficulty?: 'de' | 'trung_binh' | 'kho'
  ingredients: Ingredient[]
  steps: string[]
  notes?: string
  tags: string[]
  is_public: boolean
  is_favorite: boolean
  created_at: string
  updated_at: string
  author_name?: string // join từ profiles
}

export interface Ingredient {
  name: string
  quantity?: string
  category?: string
}

export interface MealPlanItem {
  id: string
  user_id: string
  recipe_id: string
  plan_date: string
  day_of_week?: number
  meal_slot: 'sang' | 'trua' | 'toi' | 'an_nhe'
  note?: string
  // joined
  title?: string
  cover_image_url?: string
  cook_time_minutes?: number
}

export interface GroceryItem {
  id: string
  list_id: string
  user_id: string
  name: string
  quantity?: string
  category?: string
  is_checked: boolean
  created_at: string
}

export interface GroceryList {
  id: string
  user_id: string
  title?: string
  week_start?: string
  created_at: string
}
```

---

## 7. THAY ĐỔI QUAN TRỌNG TRONG TỪNG API ROUTE

### Template API route mới (thay cho Anything route cũ)

```typescript
// src/app/api/recipes/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const mealType = searchParams.get('meal_type')
    // ... các filter khác

    let query = supabase
      .from('recipes')
      .select('id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, tags, is_public, is_favorite, created_at')
      .eq('user_id', user.id)  // RLS cũng tự filter nhưng explicit cho rõ
      .order('created_at', { ascending: false })
      .limit(60)

    if (search) query = query.ilike('title', `%${search}%`)
    if (mealType) query = query.eq('meal_type', mealType)
    // ... thêm filter

    const { data: recipes, error } = await query
    if (error) throw error

    return NextResponse.json({ recipes })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, ...rest } = body

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Tên món là bắt buộc' }, { status: 400 })
    }

    const { data: recipe, error } = await supabase
      .from('recipes')
      .insert({ user_id: user.id, title: title.trim(), ...rest })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ recipe })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
```

---

## 8. PAGES AUTH MỚI

### Signin (`src/app/account/signin/page.tsx`)

```typescript
'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setError(
        error.message === 'Invalid login credentials'
          ? 'Email hoặc mật khẩu không đúng.'
          : error.message
      )
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  // ... JSX giữ nguyên style cũ (cream background, rounded-3xl, etc.)
}
```

### Signup (`src/app/account/signup/page.tsx`)

```typescript
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { full_name: name }
  }
})
```

### Logout (`src/app/account/logout/page.tsx`)

```typescript
await supabase.auth.signOut()
router.push('/')
```

---

## 9. USEUSER HOOK MỚI

Thay `useUser()` hook cũ bằng:

```typescript
// src/hooks/useUser.ts
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )

    return () => subscription.unsubscribe()
  }, [])

  return { data: user, loading }
}
```

---

## 10. GENERATE_GROCERY — logic thay thế

Thay vì dùng `@neondatabase/serverless`, logic tổng hợp nguyên liệu từ thực đơn tuần:

```typescript
// Lấy ingredients từ các recipes trong tuần
const { data: planItems } = await supabase
  .from('meal_plan_items')
  .select('recipe_id, recipes(ingredients)')
  .eq('user_id', user.id)
  .gte('plan_date', weekStart)
  .lte('plan_date', weekEnd)

// Aggregate (logic giống hệt cũ)
const agg = new Map()
for (const item of planItems ?? []) {
  const ingredients = (item.recipes as any)?.ingredients ?? []
  for (const ing of ingredients) {
    const key = ing.name.toLowerCase()
    if (agg.has(key)) {
      agg.get(key).quantities.push(ing.quantity)
    } else {
      agg.set(key, { name: ing.name, category: categorizeIngredient(ing.name), quantities: [ing.quantity] })
    }
  }
}
```

---

## 11. CHECKLIST MIGRATION

### Setup
- [ ] Tạo project Next.js 14 + TypeScript
- [ ] Tạo project Supabase
- [ ] Chạy SQL schema trên Supabase (bảng + RLS + trigger)
- [ ] Tạo Storage bucket `recipe-covers` (public)
- [ ] Điền `.env.local`

### Code
- [ ] `src/utils/supabase/{client,server,middleware}.ts`
- [ ] `src/middleware.ts`
- [ ] `src/utils/gemini.ts` (dùng `@google/generative-ai` SDK)
- [ ] `src/types/index.ts`
- [ ] `src/hooks/useUser.ts`
- [ ] `src/data/constants.ts` (copy từ cũ, đổi sang `.ts`)
- [ ] `src/utils/ingredient-categories.ts` (copy từ cũ)
- [ ] Tất cả components (copy + sửa import `useUser` nếu cần)
- [ ] `src/app/layout.tsx` (QueryClient + Toaster + Supabase provider nếu cần)
- [ ] Tất cả API routes (thay `sql` tag → Supabase client, thay `auth()` → `supabase.auth.getUser()`)
- [ ] Tất cả pages

### Auth
- [ ] `/account/signin` — `signInWithPassword`
- [ ] `/account/signup` — `signUp`
- [ ] `/account/logout` — `signOut` + `router.push('/')`
- [ ] Middleware bảo vệ các route cần đăng nhập

### Test
- [ ] Đăng ký / đăng nhập / đăng xuất
- [ ] Tạo / sửa / xoá công thức
- [ ] Upload ảnh bìa
- [ ] Lên thực đơn tuần (kéo thả)
- [ ] Tạo danh sách đi chợ từ thực đơn
- [ ] Tất cả 5 tính năng AI
- [ ] Xem công thức công khai (không cần đăng nhập)
- [ ] Lưu công thức của người khác về sổ tay

### Deploy
- [ ] Vercel: connect Git repo, điền env vars
- [ ] Supabase: đảm bảo RLS đã bật, Storage bucket public
- [ ] Custom domain (nếu có)
- [ ] Test production

---

## 12. LỆNH CÀI ĐẶT ĐẦY ĐỦ

```bash
npm install \
  @supabase/supabase-js \
  @supabase/ssr \
  @tanstack/react-query \
  @tanstack/react-query-devtools \
  sonner \
  lucide-react \
  @google/generative-ai \
  date-fns \
  react-markdown

npm install -D @types/node @types/react
```

---

## 13. GHI CHÚ QUAN TRỌNG KHI MIGRATION

1. **`user_id` đổi từ `integer` → `uuid`**: Mọi chỗ check `user_id === userId` cần dùng string comparison.
2. **RLS thay thế manual auth check**: Không cần `WHERE user_id = $1` trong mọi query nữa — RLS tự lọc. Nhưng vẫn nên `getUser()` để trả 401 nếu chưa đăng nhập.
3. **Supabase join**: Để lấy `author_name` khi list public recipes, dùng Supabase PostgREST foreign key joins hoặc tạo view/function.
4. **`next/navigation` thay `window.location.href`**: Dùng `useRouter().push()` trong Client Components.
5. **Server Components**: API routes và pages được render server-side trong Next.js — dùng `createClient()` từ `server.ts`.
6. **Realtime (tùy chọn)**: Supabase có Realtime để sync thực đơn tuần nhiều người — có thể thêm sau.
7. **Google Gemini 2.0 Flash Free Tier**: `15 RPM`, `1M tokens/ngày` — đủ dùng cá nhân. Nếu lỗi 429, chờ 1 phút hoặc upgrade lên Pay-as-you-go.

---

*Prompt này tổng hợp toàn bộ thông tin cần thiết để AI assistant hướng dẫn migrate dự án "Bếp của Luật" sang Next.js + Supabase. Paste vào Claude hoặc ChatGPT và yêu cầu viết từng file theo thứ tự trong checklist.*
