import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Count recipes
    const { count: recipesCount, error: recipesErr } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    if (recipesErr) throw recipesErr

    // 2. Count favorites
    const { count: favsCount, error: favsErr } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_favorite', true)

    if (favsErr) throw favsErr

    // 3. Count meals this week (Mon..Sun)
    const today = new Date()
    const dow = today.getDay()
    const diffToMon = dow === 0 ? -6 : 1 - dow
    const monday = new Date(today)
    monday.setDate(today.getDate() + diffToMon)
    monday.setHours(0, 0, 0, 0)
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    const monStr = monday.toISOString().slice(0, 10)
    const sunStr = sunday.toISOString().slice(0, 10)

    const { count: mealsCount, error: mealsErr } = await supabase
      .from('meal_plan_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('plan_date', monStr)
      .lte('plan_date', sunStr)

    if (mealsErr) throw mealsErr

    // 4. Count pending groceries
    const { count: pendingCount, error: pendingErr } = await supabase
      .from('grocery_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_checked', false)

    if (pendingErr) throw pendingErr

    return NextResponse.json({
      recipes: recipesCount || 0,
      favorites: favsCount || 0,
      meals_this_week: mealsCount || 0,
      grocery_pending: pendingCount || 0,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
