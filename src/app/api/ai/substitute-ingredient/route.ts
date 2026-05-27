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
    const { ingredient, context } = body || {}
    if (!ingredient) {
      return NextResponse.json({ error: 'Thiếu nguyên liệu' }, { status: 400 })
    }

    const prompt = `Gợi ý 3-5 nguyên liệu có thể thay thế cho "${ingredient}"${
      context ? ` trong món "${context}"` : ''
    }.
Với mỗi gợi ý, ghi:
- Tên nguyên liệu thay thế
- Lý do phù hợp (1 câu)
- Lưu ý khi sử dụng (nếu có)
Trả lời bằng tiếng Việt, định dạng gạch đầu dòng.`

    const content = await askGemini({
      system: 'Bạn là đầu bếp dày dạn kinh nghiệm. Đưa ra gợi ý thay thế nguyên liệu thực tế và dễ tìm.',
      prompt,
      userId: user.id,
      feature: 'substitute_ingredient',
    })

    return NextResponse.json({ content })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
