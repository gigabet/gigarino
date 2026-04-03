import type { Transaction } from '@/types'

export const transactionsQuery = async ({ pageParam }: { pageParam: string | null }) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallets/transactions?cursor=${pageParam ?? ''}`
    )

    const res = await fetch(url.toString())

    const data = (await res.json()) as {
      data: Transaction[]
      nextCursor: string | null
    }
    return data
  } catch (error) {
    console.error(error)

    return {
      data: [],
      nextCursor: null,
    }
  }
}
