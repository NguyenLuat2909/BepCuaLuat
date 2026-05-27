import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const { data: source, error: sourceError } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (sourceError) throw sourceError
    if (!source) {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }

    if (!source.is_public && source.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: copy, error: copyError } = await supabase
      .from('recipes')
      .insert({
        user_id: user.id,
        title: source.title + ' (đã lưu)',
        description: source.description,
        cover_image_url: source.cover_image_url,
        meal_type: source.meal_type,
        cook_time_minutes: source.cook_time_minutes,
        servings: source.servings,
        difficulty: source.difficulty,
        ingredients: source.ingredients,
        steps: source.steps,
        notes: source.notes,
        tags: source.tags,
        is_public: false,
        is_favorite: false,
      })
      .select('id')
      .single()

    if (copyError) throw copyError
    return NextResponse.json({ id: copy.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
