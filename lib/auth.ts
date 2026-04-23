'use server'

import { cookies } from 'next/headers'
import type { ApiResponse, User, Wallet } from '@/types'

export async function getToken() {
  const cookieStore = await cookies()
  return cookieStore.get('token')?.value
}

export async function getUser() {
  const token = await getToken()
  if (!token) return null

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    // TODO: explicitly handle player status (e.g. banned, pending KYC, etc.)
    if (!res.ok) return null

    const { data } = (await res.json()) as ApiResponse<User>
    return data
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function getUserWallet() {
  const token = await getToken()
  if (!token) return null

  const currency = process.env.NEXT_APP_CURRENCY ?? 'EUR'

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallets/${currency}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) return null

    const { data } = (await res.json()) as ApiResponse<Wallet>
    return data
  } catch (error) {
    console.error('Error fetching user wallet:', error)
    return null
  }
}

export async function deleteToken() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}

export async function logout() {
  const token = await getToken()
  if (!token) return null

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error('Logout request failed with status:', res.status)
    }
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    await deleteToken()
  }
}
