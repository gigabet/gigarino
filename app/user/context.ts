import { getToken } from '@/lib/auth'
import type {
  ApiResponse,
  AvailablePromotionListDto,
  DepositMatchPromotion,
  FreespinGrantPromotion,
  LossCashbackPromotion,
  PlayerClaimListDto,
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
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/promotions/feed`)

    const token = await getToken()
    if (!token) throw new Error('You must be logged in')

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data } = (await res.json()) as ApiResponse<PromotionFeedListDto>
    return data.data as {
      promotion: DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion
      claim: ReplaceKey<
        PlayerClaimResponseDto,
        'promotion',
        DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion
      > | null
    }[]
  } catch (error) {
    console.error(error)

    return []
  }
}

export const bonusesQuery = async () => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/promotions/available`)

    const token = await getToken()
    if (!token) throw new Error('You must be logged in')

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data } = (await res.json()) as ApiResponse<AvailablePromotionListDto>
    return data.data as (DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion)[]
  } catch (error) {
    console.error(error)

    return []
  }
}

export const claimedBonusesQuery = async () => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/promotions/my-claims`)

    const token = await getToken()
    if (!token) throw new Error('You must be logged in')

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data } = (await res.json()) as ApiResponse<PlayerClaimListDto>
    return data.data
  } catch (error) {
    console.error(error)

    return []
  }
}
export const claimBonusMutation = async (id: string) => {
  try {
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

    const { data } = (await res.json()) as ApiResponse<PlayerClaimResponseDto>
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
