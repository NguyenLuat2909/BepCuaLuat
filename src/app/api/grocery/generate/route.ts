import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { categorizeIngredient } from '@/utils/ingredient-categories'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const weekStart = body?.week_start

    let start: string, end: string
    if (weekStart) {
      const s = new Date(weekStart)
      const e = new Date(s)
      e.setDate(s.getDate() + 6)
      start = s.toISOString().slice(0, 10)
      end = e.toISOString().slice(0, 10)
    } else {
      const today = new Date()
      const dow = today.getDay()
      const diffToMon = dow === 0 ? -6 : 1 - dow
      const mon = new Date(today)
      mon.setDate(today.getDate() + diffToMon)
      const sun = new Date(mon)
      sun.setDate(mon.getDate() + 6)
      start = mon.toISOString().slice(0, 10)
      end = sun.toISOString().slice(0, 10)
    }

    // Collect ingredients from planned recipes
    const { data: planned, error: planError } = await supabase
      .from('meal_plan_items')
      .select('recipes(ingredients)')
      .eq('user_id', user.id)
      .gte('plan_date', start)
      .lte('plan_date', end)

    if (planError) throw planError

    const agg = new Map<string, { name: string; category: string; quantities: string[] }>()
    for (const p of (planned || [])) {
      const ings = (p.recipes as any)?.ingredients || []
      if (!Array.isArray(ings)) continue
      for (const ing of ings) {
        const name = (ing?.name || '').trim()
        if (!name) continue
        const key = name.toLowerCase()
        const qty = ing?.quantity || ''
        const cat =
          ing?.category && ing.category !== 'khac'
            ? ing.category
            : categorizeIngredient(name)

        if (agg.has(key)) {
          const cur = agg.get(key)!
          cur.quantities.push(qty)
        } else {
          agg.set(key, { name, category: cat, quantities: qty ? [qty] : [] })
        }
      }
    }

    // Find/create active grocery list
    const { data: lists, error: listsError } = await supabase
      .from('grocery_lists')
      .select('*')
      .eq('user_id', user.id)
      .eq('week_start', start)
      .limit(1)

    if (listsError) throw listsError

    let list = lists?.[0]
    if (!list) {
      const { data: created, error: createError } = await supabase
        .from('grocery_lists')
        .insert({
          user_id: user.id,
          title: `Đi chợ tuần ${start}`,
          week_start: start,
        })
        .select()
        .single()
      if (createError) throw createError
      list = created
    } else {
      // Clear existing items in this list to regenerate
      const { error: deleteError } = await supabase
        .from('grocery_items')
        .delete()
        .eq('list_id', list.id)
        .eq('user_id', user.id)
      if (deleteError) throw deleteError
    }

    // Insert consolidated items
    const itemsToInsert = Array.from(agg.values()).map((v) => ({
      list_id: list.id,
      user_id: user.id,
      name: v.name,
      quantity: v.quantities.filter(Boolean).join(' + ') || null,
      category: v.category,
    }))

    if (itemsToInsert.length > 0) {
      const { error: insertItemsError } = await supabase
        .from('grocery_items')
        .insert(itemsToInsert)
      if (insertItemsError) throw insertItemsError
    }

    return NextResponse.json({ list, count: itemsToInsert.length })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
