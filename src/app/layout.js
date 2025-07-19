'use client'

import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Nemo.Ai",
  description:
    "Nemo.Ai adalah aplikasi asisten berbasis AI yang membantu kamu mengelola tugas, menjawab pertanyaan, dan mendukung produktivitas harian dengan cepat dan cerdas.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const token = params.get('token')
    const type = params.get('type') // e.g. 'invite' | 'magiclink'

    if (token && type) {
      supabase.auth.verifyOtp({ token, type }).then(({ data, error }) => {
        if (!error) {
          // Kamu bisa redirect ke halaman mana pun di sini
          router.push('/masuk') // atau /dashboard kalau udah login
        } else {
          console.error("Error verifying token:", error.message)
        }
      })
    }
  }, [params, router])

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
