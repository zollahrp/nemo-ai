'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function TokenVerifier() {
  useEffect(() => {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('sb-access-token='))
      ?.split('=')[1]

    const refreshToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('sb-refresh-token='))
      ?.split('=')[1]

    console.log('TokenVerifier: ACCESS =', accessToken)
    console.log('TokenVerifier: REFRESH =', refreshToken)

    if (accessToken && refreshToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
        .then(({ data, error }) => {
          if (error) console.error('Gagal setSession:', error)
          else console.log('Session berhasil diset:', data)
        })
    } else {
      console.warn('Token kosong, belum login atau cookie gak nyampe')
    }
  }, [])

  return null
}
