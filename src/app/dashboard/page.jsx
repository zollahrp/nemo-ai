'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const waitForSession = async () => {
      let attempt = 0
      let sessionData = null

      while (attempt < 5) {
        const { data } = await supabase.auth.getSession()
        if (data?.session) {
          sessionData = data.session
          break
        }
        attempt++
        await new Promise((res) => setTimeout(res, 500))
      }

      if (!sessionData) {
        console.warn('Session tetap kosong setelah 5x cek')
        router.push('/login')
      } else {
        setSession(sessionData)
      }

      setLoading(false)
    }

    waitForSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login')
      }
      if (session) {
        setSession(session)
      }
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Selamat datang, {session?.user?.email}
      </h1>
      <p>Isi dashboard kamu di sini</p>
    </div>
  )
}