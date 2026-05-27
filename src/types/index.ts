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
  author_name?: string // Joined from profiles
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
  // Joined fields
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
