import { getToken } from '@/lib/auth'
import type { ApiResponse, Transaction } from '@/types'

export const transactionsQuery = async ({ pageParam }: { pageParam: string | null }) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallets/transactions?cursor=${pageParam ?? ''}`
    )

    const token = await getToken()
    if (!token) throw new Error('You must be logged in')

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data } = (await res.json()) as ApiResponse<{
      data: Transaction[]
      nextCursor: string | null
    }>
    return data
  } catch (error) {
    console.error(error)

    return {
      data: [],
      nextCursor: null,
    }
  }
}
