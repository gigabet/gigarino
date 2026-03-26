'use server'

import { isArray } from 'lodash'
import { redirect } from 'next/navigation'

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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      ipAddress: formData.get('ipAddress') as string,
      userAgent: formData.get('userAgent') as string,
      device: formData.get('device') as string,
      supervisorId: process.env.SUPERVISOR_ID,
    }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    console.log(errorData)
    return {
      ...data,
      error: isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || 'Login failed.',
    }
  } else {
    redirect('/?logged=true')
  }
}
