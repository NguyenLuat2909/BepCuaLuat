import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@/utils/supabase/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function askGemini({
  system,
  prompt,
  userId,
  feature,
}: {
  system?: string
  prompt: string
  userId?: string
  feature?: string
}) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    ...(system ? { systemInstruction: system } : {}),
  })

  const result = await model.generateContent(prompt)
  const content = result.response.text()

  // Log in database
  if (userId) {
    try {
      const supabase = await createClient()
      await supabase.from('ai_prompt_logs').insert({
        user_id: userId,
        feature: feature || null,
        prompt: prompt,
        response: content,
      })
    } catch (e) {
      console.warn("ai_prompt_logs insert failed", e)
    }
  }

  return content
}

export function extractJSON(text: string) {
  if (!text) return null
  const start = (candidate: string) => {
    const a = candidate.indexOf("{")
    const b = candidate.indexOf("[")
    if (a === -1) return b
    if (b === -1) return a
    return Math.min(a, b)
  }
  const end = (candidate: string) =>
    Math.max(candidate.lastIndexOf("}"), candidate.lastIndexOf("]"))
  const s = start(text)
  if (s === -1) return null
  const e = end(text)
  if (e === -1) return null
  const slice = text.slice(s, e + 1)
  try {
    return JSON.parse(slice)
  } catch {
    return null
  }
}
