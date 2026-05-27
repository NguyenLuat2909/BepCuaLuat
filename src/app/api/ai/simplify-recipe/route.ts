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

    const prompt = `Hãy viết lại công thức sau thành "phiên bản dễ nấu hơn":
- Giảm số lượng nguyên liệu khó tìm.
- Đơn giản hóa các bước.
- Ưu tiên dụng cụ phổ thông trong bếp Việt.
- Giữ nguyên hương vị chính.

Trả lời bằng tiếng Việt, có hai phần: "Nguyên liệu rút gọn" và "Cách làm đơn giản" (mỗi bước 1-2 câu).

Công thức gốc:
${recipe_text}`

    const content = await askGemini({
      system: 'Bạn là đầu bếp tại gia, biết cách rút gọn công thức cho người mới nấu.',
      prompt,
      userId: user.id,
      feature: 'simplify_recipe',
    })

    return NextResponse.json({ content })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
