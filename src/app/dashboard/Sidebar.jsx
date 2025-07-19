'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-4">
      <div className="text-xl font-bold mb-8">Nemo Dashboard</div>
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className="hover:text-teal-400">Overview</Link>
        <Link href="/dashboard/chat" className="hover:text-teal-400">FishBot</Link>
        <Link href="/dashboard/akun" className="hover:text-teal-400">Profil</Link>
        <button
          onClick={() => {
            localStorage.removeItem('supabase.auth.token')
            window.location.href = '/masuk'
          }}
          className="mt-8 text-red-400 hover:text-red-600"
        >
          Logout
        </button>
      </nav>
    </aside>
  )
}
