import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

function getWeekRange(weekStart: string) {
  const start = new Date(weekStart)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const weekStart = searchParams.get('week_start')
    if (!weekStart) {
      return NextResponse.json({ error: 'Thiếu week_start' }, { status: 400 })
    }
    const { start, end } = getWeekRange(weekStart)

    const { data, error } = await supabase
      .from('meal_plan_items')
      .select('*, recipes(title, cover_image_url, cook_time_minutes, meal_type)')
      .eq('user_id', user.id)
      .gte('plan_date', start)
      .lte('plan_date', end)
      .order('plan_date', { ascending: true })

    if (error) throw error

    // Map recipes back onto the plan item for frontend compatibility
    const items = (data || []).map((item: any) => ({
      ...item,
      title: item.recipes?.title || null,
      cover_image_url: item.recipes?.cover_image_url || null,
      cook_time_minutes: item.recipes?.cook_time_minutes || null,
      meal_type: item.recipes?.meal_type || null,
    }))

    return NextResponse.json({ items })
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
    const { recipe_id, plan_date, day_of_week, meal_slot, note } = body || {}

    if (!recipe_id || !plan_date || !meal_slot) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }

    // Verify ownership or public visibility of recipe
    const { data: recipe, error: recipeError } = await supabase
      .from('recipes')
      .select('user_id, is_public')
      .eq('id', recipe_id)
      .maybeSingle()

    if (recipeError) throw recipeError
    if (!recipe) {
      return NextResponse.json({ error: 'Công thức không tồn tại' }, { status: 404 })
    }
    if (recipe.user_id !== user.id && !recipe.is_public) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: item, error: insertError } = await supabase
      .from('meal_plan_items')
      .insert({
        user_id: user.id,
        recipe_id,
        plan_date,
        day_of_week: day_of_week || null,
        meal_slot,
        note: note || null,
      })
      .select()
      .single()

    if (insertError) throw insertError
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Thiếu id' }, { status: 400 })
    }

    const { data: deleted, error } = await supabase
      .from('meal_plan_items')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id')
      .maybeSingle()

    if (error) throw error
    if (!deleted) {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
