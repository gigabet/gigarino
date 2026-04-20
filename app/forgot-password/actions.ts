'use server'

import { isArray } from 'lodash'
import type { ErrorResponse } from '@/types'

export async function forgotPassword(
  _state: {
    email: string
    error: string | null
    step: 'email' | 'success'
  },
  formData: FormData
) {
  const data = {
    email: formData.get('email') as string,
  }

  console.log('Forgotten password:', {
    ...data,
    supervisorId: process.env.SUPERVISOR_ID,
  })

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      supervisorId: process.env.SUPERVISOR_ID,
    }),
  })

  if (!res.ok) {
    const errorData = (await res.json()) as ErrorResponse
    console.log(errorData)
    return {
      ...data,
      error: isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || 'Password reset failed.',
      step: 'email' as const,
    }
  } else {
    return {
      ...data,
      error: null,
      step: 'success' as const,
    }
  }
}
