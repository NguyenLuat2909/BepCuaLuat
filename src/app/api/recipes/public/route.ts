import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.trim()
    const mealType = searchParams.get('meal_type')
    const limit = Math.min(
      parseInt(searchParams.get('limit') || '30', 10),
      100
    )

    let query = supabase
      .from('recipes')
      .select('*, profiles(full_name)')
      .eq('is_public', true)

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }
    if (mealType) {
      query = query.eq('meal_type', mealType)
    }

    const { data: recipes, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    // Map profiles.full_name to author_name for compatibility
    const recipesWithAuthor = (recipes || []).map((r: any) => ({
      ...r,
      author_name: r.profiles?.full_name || null,
    }))

    return NextResponse.json({ recipes: recipesWithAuthor })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
