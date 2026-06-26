import { isArray } from 'lodash'
import { getToken } from '@/lib/auth'
import type {
  ApiResponse,
  DepositMatchPromotion,
  ErrorResponse,
  FreespinGrantPromotion,
  LossCashbackPromotion,
  PlayerClaimResponseDto,
  PromotionFeedListDto,
  ReplaceKey,
  Transaction,
} from '@/types'

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

export const feedQuery = async () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/promotions/feed`)

  const token = await getToken()
  if (!token) throw new Error('You must be logged in')

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const errorData = (await res.json()) as ErrorResponse
    throw new Error(
      isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || 'Failed to fetch promotion feed',
      { cause: errorData.error }
    )
  }

  const { data } = (await res.json()) as ApiResponse<PromotionFeedListDto>

  return (data?.data ?? []) as {
    promotion: DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion
    claim: ReplaceKey<
      PlayerClaimResponseDto,
      'promotion',
      DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion
    > | null
  }[]
}

export const claimBonusMutation = async (id: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/promotions/${id}/claim`)

  const token = await getToken()
  if (!token) throw new Error('You must be logged in')

  const res = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
    }),
  })

  if (!res.ok) {
    const errorData = (await res.json()) as ErrorResponse
    throw new Error(
      isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || 'Failed to claim promotion',
      { cause: errorData.error }
    )
  }

  const { data } = (await res.json()) as ApiResponse<PlayerClaimResponseDto>
  return data
}
