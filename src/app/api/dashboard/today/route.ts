import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date().toISOString().slice(0, 10)

    const { data, error } = await supabase
      .from('meal_plan_items')
      .select('id, meal_slot, recipe_id, recipes(title, cook_time_minutes, cover_image_url)')
      .eq('user_id', user.id)
      .eq('plan_date', today)

    if (error) throw error

    // Map recipes back onto the plan item for frontend compatibility
    const rawItems = (data || []).map((item: any) => ({
      id: item.id,
      meal_slot: item.meal_slot,
      recipe_id: item.recipe_id,
      title: item.recipes?.title || null,
      cook_time_minutes: item.recipes?.cook_time_minutes || null,
      cover_image_url: item.recipes?.cover_image_url || null,
    }))

    // Sort items: Breakfast (1) -> Lunch (2) -> Dinner (3) -> Snack (4)
    const slotPriority: Record<string, number> = {
      sang: 1,
      trua: 2,
      toi: 3,
      an_nhe: 4,
    }

    const items = rawItems.sort((a, b) => {
      const pa = slotPriority[a.meal_slot] || 5
      const pb = slotPriority[b.meal_slot] || 5
      return pa - pb
    })

    return NextResponse.json({ items })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
