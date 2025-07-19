'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MasukPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(error.message)
    else setMessage('📩 Cek email kamu untuk link masuk.')
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Masuk ke NemoAI</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email kamu"
        className="w-full border px-4 py-2 mb-4 rounded"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-[#2AD882] text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {loading ? 'Mengirim...' : 'Kirim Link Masuk'}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  )
}
