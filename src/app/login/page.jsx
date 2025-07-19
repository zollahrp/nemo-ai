'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Image from 'next/image'
import { FiUser, FiLock } from 'react-icons/fi'

const MySwal = withReactContent(Swal)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error.message || 'Terjadi kesalahan saat login',
      })
    } else {
      MySwal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Selamat datang kembali 👋',
        timer: 1500,
        showConfirmButton: false,
      })
      setTimeout(() => {
        router.push('/dashboard')
      }, 1600)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <form
        onSubmit={handleLogin}
        className="bg-white border border-gray-200 p-10 rounded-xl shadow-sm w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={164}
            height={164}
            className="mb-2"
          />
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Halaman Login
        </h2>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <FiUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Password */}
        <div className="relative mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Show Password */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-sm text-gray-600">
            Tampilkan kata sandi
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </button>

        <p className="text-xs text-center text-gray-400 mt-6">
          Hak Cipta © {new Date().getFullYear()} Nemo AI
        </p>
      </form>
    </div>
  )
}
