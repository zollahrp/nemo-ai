'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2'
import {
  FiHome,
  FiBookOpen,
  FiCpu,
  FiActivity,
  FiMessageCircle,
  FiLogOut,
} from 'react-icons/fi'

export default function Sidebar() {
  const pathname = usePathname()

  const overviewLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <FiHome size={18} />,
    },
  ]

  const featureLinks = [
    {
      name: 'Ensiklopedia',
      href: '/dashboard/ensiklopedia',
      icon: <FiBookOpen size={18} />,
    },
    {
      name: 'Machine Learning',
      href: '/dashboard/ml',
      icon: <FiCpu size={18} />,
    },
    {
      name: 'Penyakit',
      href: '/dashboard/penyakit',
      icon: <FiActivity size={18} />,
    },
    {
      name: 'Fishbot',
      href: '/dashboard/chat',
      icon: <FiMessageCircle size={18} />,
    },
  ]

  const handleLogout = async () => {
    // Clear Supabase token
    localStorage.removeItem('supabase.auth.token')

    // Show success alert
    await Swal.fire({
      icon: 'success',
      title: 'Logout berhasil!',
      text: 'Sampai jumpa lagi!',
      timer: 1500,
      showConfirmButton: false,
    })

    // Redirect to login page
    window.location.href = '/login'
  }

  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 bg-white px-4 py-6 flex flex-col">
      <div>
        {/* Logo */}
        <div className="flex justify-center mb-8 px-2">
          <Image
            src="/img/logo.png"
            alt="Logo Nemo"
            width={168}
            height={168}
            className="rounded"
          />
        </div>

        {/* Overview */}
        <div className="mb-6">
          <h4 className="text-gray-400 uppercase font-semibold text-xs mb-2">
            Overview
          </h4>
          <ul className="space-y-1">
            {overviewLinks.map((link, idx) => {
              const isActive = pathname === link.href
              return (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition text-sm ${
                      isActive
                        ? 'bg-[#f0f0f0] font-medium text-[#45B1F9]'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Fitur */}
        <div>
          <h4 className="text-gray-400 uppercase font-semibold text-xs mb-2">
            Fitur
          </h4>
          <ul className="space-y-1">
            {featureLinks.map((link, idx) => {
              const isActive = pathname === link.href
              return (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition text-sm ${
                      isActive
                        ? 'bg-[#f0f0f0] font-medium text-[#45B1F9]'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              )
            })}

            {/* Logout Button just below last feature */}
            <li className="pt-4 border-t mt-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 transition w-full text-left"
              >
                <FiLogOut size={18} />
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
