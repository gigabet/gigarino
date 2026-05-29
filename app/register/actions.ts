'use server'

import { isArray } from 'lodash'
import { redirect } from 'next/navigation'
import type { ErrorResponse, RegisterDto } from '@/types'

export async function register(
  _prevState: {
    error: string | null
    username: string
    email: string
    password: string
  },
  formData: FormData
) {
  const data = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  if (getPasswordStrength(data.password) < 3) {
    return {
      ...data,
      error: 'Password is too weak.',
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      preferredCurrency: process.env.NEXT_PUBLIC_CURRENCY ?? 'EUR',
      supervisorId: process.env.SUPERVISOR_ID,
      branchId: process.env.BRANCH_ID,
      displayName: data.username,
      country: process.env.NEXT_PUBLIC_COUNTRY_CODE ?? 'IR',
    } as RegisterDto),
  })

  if (!res.ok) {
    const errorData = (await res.json()) as ErrorResponse
    return {
      ...data,
      error: isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || 'Registration failed.',
    }
  } else {
    redirect('/login?registered=true')
  }
}
