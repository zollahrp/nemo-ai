'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    penyakit: 0,
    users: 0,
    ikan: 0, // ✅ Tambahan: jumlah ikan
  })
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
        fetchStats()
      }

      setLoading(false)
    }

    const fetchStats = async () => {
      const { count: penyakitCount } = await supabase
        .from('penyakit')
        .select('*', { count: 'exact', head: true })

      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      const { count: ikanCount } = await supabase
        .from('ikan')
        .select('*', { count: 'exact', head: true })

      setStats({
        penyakit: penyakitCount || 0,
        users: userCount || 0,
        ikan: ikanCount || 0, // ✅ simpan count ikan
      })
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
      <h1 className="text-2xl font-bold mb-1">
        Selamat datang, {session?.user?.email}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Penyakit</h2>
          <p className="text-3xl font-bold text-blue-700">{stats.penyakit}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Jumlah Pengguna</h2>
          <p className="text-3xl font-bold text-green-700">{stats.users}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Ikan</h2>
          <p className="text-3xl font-bold text-yellow-700">{stats.ikan}</p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-gray-600">Silakan pilih menu di samping untuk mengelola data penyakit, pengguna, atau ensiklopedia ikan.</p>
      </div>
    </div>
  )
}
