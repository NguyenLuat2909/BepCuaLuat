-- =====================================================
-- Bếp của Luật — Database Schema (PostgreSQL 17+)
-- Đổi tên thành "schema.sql" khi nộp báo cáo.
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----- Auth tables -----
-- Tự động tạo bởi Anything (next-auth adapter):
--   auth_users, auth_accounts, auth_sessions, auth_verification_token
-- Trên Next.js thuần: dùng next-auth + adapter Postgres.

-- ----- Bảng dữ liệu chính -----

-- 1) Profile mở rộng
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2) Công thức
CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL,
  title text NOT NULL,
  description text,
  cover_image_url text,
  meal_type text,
  cook_time_minutes integer,
  servings integer,
  difficulty text,
  ingredients jsonb DEFAULT '[]'::jsonb,
  steps jsonb DEFAULT '[]'::jsonb,
  notes text,
  tags text[] DEFAULT ARRAY[]::text[],
  is_public boolean NOT NULL DEFAULT false,
  is_favorite boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recipes_user_id   ON recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_is_public ON recipes(is_public);
CREATE INDEX IF NOT EXISTS idx_recipes_meal_type ON recipes(meal_type);

-- 3) Thực đơn tuần
CREATE TABLE IF NOT EXISTS meal_plan_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL,
  recipe_id uuid REFERENCES recipes(id) ON DELETE CASCADE,
  plan_date date NOT NULL,
  day_of_week integer,
  meal_slot text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_meal_plan_user_date
  ON meal_plan_items(user_id, plan_date);

-- 4) Danh sách đi chợ
CREATE TABLE IF NOT EXISTS grocery_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL,
  title text,
  week_start date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grocery_lists_user ON grocery_lists(user_id);

-- 5) Item trong danh sách đi chợ
CREATE TABLE IF NOT EXISTS grocery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id uuid REFERENCES grocery_lists(id) ON DELETE CASCADE,
  user_id integer NOT NULL,
  name text NOT NULL,
  quantity text,
  category text,
  is_checked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grocery_items_list ON grocery_items(list_id);
CREATE INDEX IF NOT EXISTS idx_grocery_items_user ON grocery_items(user_id);

-- 6) Log AI prompts
CREATE TABLE IF NOT EXISTS ai_prompt_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL,
  feature text,
  prompt text,
  response text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_logs_user ON ai_prompt_logs(user_id);

-- =====================================================
-- Ghi chú bảo mật:
-- Mọi API route đều check `session.user.id` và lọc `user_id`.
-- Công thức public (is_public = true) đọc được không cần auth.
-- Khi chuyển sang Supabase: bật RLS.
-- =====================================================
