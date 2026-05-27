'use client'
import { useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useAuth() {
  const supabase = createClient()

  const signInWithCredentials = useCallback(async (options: any) => {
    const { email, password } = options
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }, [supabase])

  const signUpWithCredentials = useCallback(async (options: any) => {
    const { email, password, name } = options
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })
    if (error) throw error
    return data
  }, [supabase])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }, [supabase])

  return {
    signInWithCredentials,
    signUpWithCredentials,
    signOut,
  }
}

export default useAuth
