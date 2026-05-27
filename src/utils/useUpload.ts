import { useState, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useUpload() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const upload = useCallback(async (input: any) => {
    try {
      setLoading(true)
      let file: File | null = null

      if ("file" in input && input.file) {
        file = input.file
      } else {
        throw new Error("Only direct file uploads are supported via Supabase Storage in this hook.")
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Unauthorized: Please sign in first.")

      const ext = file.name.split('.').pop()
      const path = `${user.id}/${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('recipe-covers')
        .upload(path, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('recipe-covers')
        .getPublicUrl(path)

      return { url: data.publicUrl, mimeType: file.type }
    } catch (uploadError: any) {
      return { error: uploadError.message || "Upload failed" }
    } finally {
      setLoading(false)
    }
  }, [supabase])

  return [upload, { loading }] as const
}

export default useUpload
