import { createClient } from '@/utils/supabase/server'

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
  const apiKey = process.env.OPENCODE_API_KEY || ''
  const modelName = process.env.OPENCODE_MODEL || 'deepseek-v4-flash'

  if (!apiKey) {
    throw new Error('OPENCODE_API_KEY is not defined in environment variables')
  }

  const endpoints = [
    'https://api.opencode.ai/zen/v1/chat/completions',
    'https://opencode.ai/zen/v1/chat/completions'
  ]

  let content = ''
  let lastError: any = null

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            ...(system ? [{ role: 'system', content: system }] : []),
            { role: 'user', content: prompt }
          ]
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      content = data?.choices?.[0]?.message?.content || ''
      if (content) break // Success!
    } catch (err: any) {
      console.warn(`Failed to fetch from OpenCode endpoint ${url}:`, err.message)
      lastError = err
    }
  }

  if (!content) {
    throw new Error(`OpenCode Zen API call failed: ${lastError?.message || 'Unknown error'}`)
  }

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
