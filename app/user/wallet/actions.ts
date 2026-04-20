'use server'

import { isArray } from 'lodash'
import { getToken, getUserWallet } from '@/lib/auth'
import type { ErrorResponse } from '@/types'

export async function deposit(
  _state: {
    success: boolean
    error: string | null
    amount: string
    reference: string
  },
  formData: FormData
) {
  const data = {
    amount: Number(formData.get('amount')).toFixed(2),
    reference: `Test: ${formData.get('reference')}`,
  }

  let res: Response
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallets/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        ...data,
        currency: process.env.NEXT_PUBLIC_CURRENCY ?? 'EUR',
      }),
    })
  } catch (error) {
    console.error('Deposit error:', error)
    return {
      ...data,
      success: false,
      error: 'Error connecting to server.',
    }
  }

  if (!res.ok) {
    const errorData = (await res.json()) as ErrorResponse

    return {
      ...data,
      success: false,
      error: isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || 'Deposit failed.',
    }
  } else {
    await getUserWallet(process.env.NEXT_PUBLIC_CURRENCY ?? 'EUR') // Invalidate wallet cache

    return {
      ...data,
      success: true,
      error: null,
    }
  }
}

export async function withdraw(
  _state: {
    success: boolean
    error: string | null
    amount: string
    reference: string
  },
  formData: FormData
) {
  const data = {
    amount: Number(formData.get('amount')).toFixed(2),
    reference: `Test: ${formData.get('reference')}`,
  }

  let res: Response
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallets/withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        ...data,
        currency: process.env.NEXT_PUBLIC_CURRENCY ?? 'EUR',
      }),
    })
  } catch (error) {
    console.error('Withdraw error:', error)
    return {
      ...data,
      success: false,
      error: 'Error connecting to server.',
    }
  }

  if (!res.ok) {
    const errorData = (await res.json()) as ErrorResponse

    return {
      ...data,
      success: false,
      error: isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || 'Withdraw failed.',
    }
  } else {
    await getUserWallet(process.env.NEXT_PUBLIC_CURRENCY ?? 'EUR') // Invalidate wallet cache

    return {
      ...data,
      success: true,
      error: null,
    }
  }
}
