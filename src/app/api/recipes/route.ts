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
    const search = searchParams.get('search')?.trim()
    const mealType = searchParams.get('meal_type')
    const difficulty = searchParams.get('difficulty')
    const tag = searchParams.get('tag')
    const favorite = searchParams.get('favorite')
    const visibility = searchParams.get('visibility')
    const maxTime = searchParams.get('max_time')
    const limit = Math.min(
      parseInt(searchParams.get('limit') || '60', 10),
      200
    )

    let query = supabase
      .from('recipes')
      .select('id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, tags, is_public, is_favorite, created_at')
      .eq('user_id', user.id)

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }
    if (mealType) {
      query = query.eq('meal_type', mealType)
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty)
    }
    if (tag) {
      query = query.contains('tags', [tag])
    }
    if (favorite === '1' || favorite === 'true') {
      query = query.eq('is_favorite', true)
    }
    if (visibility === 'public') {
      query = query.eq('is_public', true)
    } else if (visibility === 'private') {
      query = query.eq('is_public', false)
    }
    if (maxTime) {
      const n = parseInt(maxTime, 10)
      if (!Number.isNaN(n)) {
        query = query.lte('cook_time_minutes', n)
      }
    }

    const { data: recipes, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit)

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
    const { title, ingredients, steps, tags, ...rest } = body || {}

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Tên món là bắt buộc' }, { status: 400 })
    }

    const { data: recipe, error } = await supabase
      .from('recipes')
      .insert({
        user_id: user.id,
        title: title.trim(),
        ingredients: ingredients || [],
        steps: steps || [],
        tags: tags || [],
        ...rest,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ recipe })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
