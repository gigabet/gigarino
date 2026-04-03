'use server'

import { isArray } from 'lodash'

export async function resetPassword(
  _state: {
    newPassword: string
    error: string | null
  },
  formData: FormData
) {
  const data = {
    newPassword: formData.get('newPassword') as string,
  }

  if (formData.get('confirmPassword') !== data.newPassword) {
    return {
      ...data,
      error: 'Passwords do not match.',
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  if (getPasswordStrength(data.newPassword) < 3) {
    return {
      ...data,
      error: 'Password is too weak.',
    }
  }

  console.log('Reset password:', {
    ...data,
    token: formData.get('token') as string,
  })

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      token: formData.get('token') as string,
    }),
  })

  if (!res.ok) {
    const errorData = await res.json()
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
    }
  }
}
