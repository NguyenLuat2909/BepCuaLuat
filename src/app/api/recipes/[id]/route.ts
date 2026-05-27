import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || null

    const { data: recipe, error } = await supabase
      .from('recipes')
      .select('*, profiles (full_name)')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error

    if (!recipe) {
      return NextResponse.json(
        { error: 'Không tìm thấy công thức' },
        { status: 404 }
      )
    }

    // Authorization: owner or public
    if (recipe.user_id !== userId && !recipe.is_public) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // For compatibility with old FE: map profile.full_name to author_name
    const author_name = (recipe as any).profiles?.full_name || null
    const recipeWithAuthor = {
      ...recipe,
      author_name,
    }

    const isOwner = userId !== null && recipe.user_id === userId
    return NextResponse.json({ recipe: recipeWithAuthor, isOwner })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
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
    const body = await request.json()

    // Verify ownership
    const { data: existing, error: existError } = await supabase
      .from('recipes')
      .select('user_id')
      .eq('id', id)
      .maybeSingle()

    if (existError) throw existError
    if (!existing) {
      return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
    }
    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: recipe, error } = await supabase
      .from('recipes')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ recipe })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
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
    const { data: deleted, error } = await supabase
      .from('recipes')
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
