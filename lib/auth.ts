'use server'

import { cookies } from 'next/headers'
import type { User } from '@/types'

export async function getToken() {
  const cookieStore = await cookies()
  return cookieStore.get('token')?.value
}

export async function getUser() {
  const token = await getToken()
  if (!token) return null

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  // TODO: explicitly handle player status (e.g. banned, pending KYC, etc.)
  if (!res.ok) return null

  return (await res.json()) as User
}

export async function getUserWallet(currency: string) {
  const token = await getToken()
  if (!token) return null

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallets/${currency}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) return null

  return await res.json()
}

export async function deleteToken() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}

export async function logout() {
  const token = await getToken()
  if (!token) return null

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  // TODO: handle logout errors
  if (!res.ok) return

  await deleteToken()
}
