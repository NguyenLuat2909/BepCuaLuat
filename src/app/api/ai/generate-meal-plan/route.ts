import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { askGemini, extractJSON } from '@/utils/gemini'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { goal } = body || {}
    const goalText = goal || 'ăn uống cân bằng'

    const prompt = `Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "${goalText}".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON (không có chú thích, không markdown), theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Tên món", "trua": "Tên món", "toi": "Tên món" } },
    ...
  ]
}
day_of_week từ 1 (Thứ 2) đến 7 (Chủ nhật).`

    const content = await askGemini({
      system: 'Bạn là chuyên gia dinh dưỡng và đầu bếp Việt Nam. Tạo thực đơn phù hợp người Việt.',
      prompt,
      userId: user.id,
      feature: 'generate_meal_plan',
    })

    const json = extractJSON(content)
    if (!json) {
      return NextResponse.json({ content, plan: null })
    }
    return NextResponse.json({ content, plan: json.plan || json })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
