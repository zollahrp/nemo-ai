// middleware.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request) {
  const token = request.cookies.get('sb-access-token')?.value

  const isLoggedIn = !!token
  const isDashboard = request.nextUrl.pathname.startsWith('/zaga')

  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/zaga/:path*'], // Proteksi semua route /zaga/*
}
