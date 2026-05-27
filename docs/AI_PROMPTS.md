# 🤖 Tài liệu Prompt AI — Bếp của Luật

Tất cả tính năng AI sử dụng **Google Gemini 2.5 Flash** qua integration nội bộ của Anything (endpoint `/integrations/google-gemini-2-5-flash/`).

Mỗi prompt được lưu vào bảng `ai_prompt_logs` để có thể kiểm tra & cải tiến.

---

## 1. Gợi ý món từ nguyên liệu

**Endpoint**: `POST /api/ai/suggest-from-ingredients`
**Feature key**: `suggest_from_ingredients`

**System prompt**:
> Bạn là đầu bếp Việt Nam thân thiện, gợi ý món ăn ngon và thực tế dựa trên nguyên liệu.

**User prompt template**:
```
Tôi đang có những nguyên liệu sau: {ingredients}.
Hãy gợi ý 3-5 món ăn Việt Nam có thể nấu được với các nguyên liệu trên.
Với mỗi món, ghi:
- Tên món
- Mô tả ngắn 1 câu
- Thời gian nấu ước lượng
- Mức độ khó (dễ / trung bình / khó)
Trả lời bằng tiếng Việt, dùng định dạng markdown có tiêu đề và gạch đầu dòng.
```

---

## 2. Gợi ý thay thế nguyên liệu

**Endpoint**: `POST /api/ai/substitute-ingredient`
**Feature key**: `substitute_ingredient`

**System prompt**:
> Bạn là đầu bếp dày dạn kinh nghiệm. Đưa ra gợi ý thay thế nguyên liệu thực tế và dễ tìm.

**User prompt template**:
```
Gợi ý 3-5 nguyên liệu có thể thay thế cho "{ingredient}"{ trong món "{context}"}.
Với mỗi gợi ý, ghi:
- Tên nguyên liệu thay thế
- Lý do phù hợp (1 câu)
- Lưu ý khi sử dụng (nếu có)
Trả lời bằng tiếng Việt, định dạng gạch đầu dòng.
```

---

## 3. Tóm tắt công thức

**Endpoint**: `POST /api/ai/summarize-recipe`
**Feature key**: `summarize_recipe`

**System prompt**:
> Bạn là biên tập viên ẩm thực, tóm tắt công thức sao cho dễ làm theo.

**User prompt template**:
```
Hãy tóm tắt công thức nấu ăn sau thành 5-7 bước ngắn gọn, dễ nhớ.
Mỗi bước chỉ 1-2 câu, dùng động từ rõ ràng ở đầu câu.
Trả lời bằng tiếng Việt, dạng danh sách đánh số.

Công thức:
{recipe_text}
```

---

## 4. Phiên bản dễ nấu hơn

**Endpoint**: `POST /api/ai/simplify-recipe`
**Feature key**: `simplify_recipe`

**System prompt**:
> Bạn là đầu bếp tại gia, biết cách rút gọn công thức cho người mới nấu.

**User prompt template**:
```
Hãy viết lại công thức sau thành "phiên bản dễ nấu hơn":
- Giảm số lượng nguyên liệu khó tìm.
- Đơn giản hóa các bước.
- Ưu tiên dụng cụ phổ thông trong bếp Việt.
- Giữ nguyên hương vị chính.

Trả lời bằng tiếng Việt, có hai phần: "Nguyên liệu rút gọn" và "Cách làm đơn giản".

Công thức gốc:
{recipe_text}
```

---

## 5. Tạo thực đơn 7 ngày

**Endpoint**: `POST /api/ai/generate-meal-plan`
**Feature key**: `generate_meal_plan`

**System prompt**:
> Bạn là chuyên gia dinh dưỡng và đầu bếp Việt Nam. Tạo thực đơn phù hợp người Việt.

**User prompt template**:
```
Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "{goal}".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "...", "trua": "...", "toi": "..." } },
    ...
  ]
}
```

Server side trích JSON thông qua hàm `extractJSON()` trong `/apps/web/src/app/api/utils/gemini.js`.

---

## ⚙️ Cấu trúc gọi Gemini

Mọi route AI đều dùng helper `askGemini()` từ `/apps/web/src/app/api/utils/gemini.js`:

```javascript
export async function askGemini({ system, prompt, userId, feature }) {
  const messages = [];
  if (system) messages.push({ role: "system", content: system });
  messages.push({ role: "user", content: prompt });

  const res = await fetch("/integrations/google-gemini-2-5-flash/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content || "";

  // Lưu log
  await sql`INSERT INTO ai_prompt_logs (user_id, feature, prompt, response)
            VALUES (${userId}, ${feature}, ${prompt}, ${content})`;

  return content;
}
```

---

## ⚠️ Disclaimer

Tất cả gợi ý AI có cảnh báo nhỏ trên giao diện `/ai`:

> **"Gợi ý AI chỉ mang tính tham khảo — không thay thế tư vấn y tế hay dinh dưỡng chuyên nghiệp."**
