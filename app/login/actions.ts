'use server'

import { isArray } from 'lodash'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ErrorResponse } from '@/types'

export async function login(
  _state: {
    identifier: string
    password: string
    error: string | null
    rememberMe: boolean
  },
  formData: FormData
) {
  const data = {
    identifier: formData.get('identifier') as string,
    password: formData.get('password') as string,
    rememberMe: formData.get('rememberMe') === 'on',
  }
  const cookieStore = await cookies()

  console.log('Login attempt:', {
    ...data,
    ipAddress: await getClientIp(),
    userAgent: formData.get('userAgent') as string,
    device: formData.get('device') as string,
    supervisorId: process.env.SUPERVISOR_ID,
  })

  let res: Response
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        ipAddress: await getClientIp(),
        userAgent: formData.get('userAgent') as string,
        device: formData.get('device') as string,
        supervisorId: process.env.SUPERVISOR_ID,
      }),
    })
  } catch (error) {
    console.error('Login error:', error)
    return {
      ...data,
      error: 'Error connecting to server.',
    }
  }

  if (!res.ok) {
    const errorData = (await res.json()) as ErrorResponse
    console.log(errorData)
    return {
      ...data,
      error: isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || 'Login failed.',
    }
  } else {
    cookieStore.set({
      name: 'token',
      value: (await res.json()).data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: data.rememberMe ? 60 * 60 * 24 * 30 : undefined, // 30 days if rememberMe, otherwise session cookie
    })
    redirect((formData.get('from') as string) || '/')
  }
}

async function getClientIp() {
  const h = await headers()

  // Standard proxy headers (production)
  const forwardedFor = h.get('x-forwarded-for')
  const realIp = h.get('x-real-ip')

  let ip = forwardedFor?.split(',')[0]?.trim() || realIp || ''

  // If local dev, fall back to external lookup
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    try {
      const res = await fetch('https://api4.ipify.org?format=json', {
        cache: 'no-store',
      })
      const data = await res.json()
      ip = data.ip
    } catch {
      ip = ''
    }
  }

  return ip
}
