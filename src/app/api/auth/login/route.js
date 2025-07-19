import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { serialize } from 'cookie'

export async function POST(request) {
  const { email, password } = await request.json()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.session) {
    return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })
  }

  const { access_token, refresh_token } = data.session

  const response = NextResponse.json({ message: 'Login berhasil' })

  response.headers.set('Set-Cookie', [
    serialize('sb-access-token', access_token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    }),
    serialize('sb-refresh-token', refresh_token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    }),
  ])

  return response
}
