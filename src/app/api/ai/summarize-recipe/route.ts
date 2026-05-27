import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { askGemini } from '@/utils/gemini'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { recipe_text } = body || {}
    if (!recipe_text) {
      return NextResponse.json({ error: 'Thiếu nội dung' }, { status: 400 })
    }

    const prompt = `Hãy tóm tắt công thức nấu ăn sau thành 5-7 bước ngắn gọn, dễ nhớ.
Mỗi bước chỉ 1-2 câu, dùng động từ rõ ràng ở đầu câu.
Trả lời bằng tiếng Việt, dạng danh sách đánh số.

Công thức:
${recipe_text}`

    const content = await askGemini({
      system: 'Bạn là biên tập viên ẩm thực, tóm tắt công thức sao cho dễ làm theo.',
      prompt,
      userId: user.id,
      feature: 'summarize_recipe',
    })

    return NextResponse.json({ content })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
