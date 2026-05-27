import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch the latest grocery list
    const { data: lists, error: listsError } = await supabase
      .from('grocery_lists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)

    if (listsError) throw listsError

    let list = lists?.[0]
    if (!list) {
      const { data: created, error: createError } = await supabase
        .from('grocery_lists')
        .insert({
          user_id: user.id,
          title: 'Danh sách đi chợ của tôi',
        })
        .select()
        .single()
      if (createError) throw createError
      list = created
    }

    const { data: items, error: itemsError } = await supabase
      .from('grocery_items')
      .select('*')
      .eq('list_id', list.id)
      .eq('user_id', user.id)
      .order('is_checked', { ascending: true })
      .order('category', { ascending: true })
      .order('created_at', { ascending: true })

    if (itemsError) throw itemsError

    return NextResponse.json({ list, items })
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
    const { name, quantity, category, list_id } = body || {}
    if (!name) {
      return NextResponse.json({ error: 'Thiếu tên nguyên liệu' }, { status: 400 })
    }

    let listId = list_id
    if (!listId) {
      const { data: lists, error: listsError } = await supabase
        .from('grocery_lists')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (listsError) throw listsError

      if (lists && lists[0]) {
        listId = lists[0].id
      } else {
        const { data: created, error: createError } = await supabase
          .from('grocery_lists')
          .insert({
            user_id: user.id,
            title: 'Danh sách đi chợ của tôi',
          })
          .select('id')
          .single()
        if (createError) throw createError
        listId = created.id
      }
    }

    const { data: item, error: insertError } = await supabase
      .from('grocery_items')
      .insert({
        list_id: listId,
        user_id: user.id,
        name,
        quantity: quantity || null,
        category: category || 'khac',
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
