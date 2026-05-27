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
    const { ingredients } = body || {}
    if (!ingredients || typeof ingredients !== 'string' || !ingredients.trim()) {
      return NextResponse.json(
        { error: 'Vui lòng nhập nguyên liệu' },
        { status: 400 }
      )
    }

    const prompt = `Tôi đang có những nguyên liệu sau: ${ingredients.trim()}.
Hãy gợi ý 3-5 món ăn Việt Nam có thể nấu được với các nguyên liệu trên.
Với mỗi món, ghi:
- Tên món
- Mô tả ngắn 1 câu
- Thời gian nấu ước lượng
- Mức độ khó (dễ / trung bình / khó)
Trả lời bằng tiếng Việt, dùng định dạng markdown rõ ràng có tiêu đề và gạch đầu dòng.`

    const content = await askGemini({
      system: 'Bạn là đầu bếp Việt Nam thân thiện, gợi ý món ăn ngon và thực tế dựa trên nguyên liệu.',
      prompt,
      userId: user.id,
      feature: 'suggest_from_ingredients',
    })

    return NextResponse.json({ content })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
