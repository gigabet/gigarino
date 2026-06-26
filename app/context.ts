import { isArray } from 'lodash'
import type { ApiResponse, ErrorResponse, GamesResponse, ProvidersResponse } from '@/types'

export const categories = {
  Providers: { icon: 'StoreIcon', slug: 'providers', query: '' },
  'Top Games': { icon: 'Flame', slug: 'top', query: '?category=top' },
  'New Releases': { icon: 'Sparkles', slug: 'new', query: '?category=new' },
  'Mobile Games': {
    icon: 'Smartphone',
    slug: 'mobile',
    query: '?isMobile=true',
  },
  'Free Spins (ingame)': {
    icon: 'HandCoins',
    slug: 'free-spins-ingame',
    query: '?tag=free-spins-ingame',
  },
  Autoplay: { icon: 'RefreshCcwDot', slug: 'autoplay', query: '?tag=autoplay' },
  'Bonus Buy': {
    icon: 'CirclePlus',
    slug: 'bonus-buy',
    query: '?tag=bonus-buy',
  },
  Classic: { icon: 'Landmark', slug: 'classic', query: '?tag=classic' },
  'Live Casino': {
    icon: 'RadioIcon',
    slug: 'live-casino',
    query: '?type=roulette',
  },
  'All Games': {
    icon: 'GalleryHorizontalEnd',
    slug: 'all',
    query: '?limit=24',
  },
}

export const getGameQuery = (query: string) => {
  return async ({ pageParam }: { pageParam?: unknown }) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/games${query}`)

    if (pageParam) {
      url.searchParams.set('page', String(pageParam))
    }

    const res = await fetch(url.toString())

    if (!res || !res.ok) {
      const errorData = (await res.json()) as ErrorResponse
      throw new Error(
        isArray(errorData.message)
          ? errorData.message[0]
          : errorData.message || 'Failed to fetch games',
        { cause: errorData.error }
      )
    }

    const { data } = (await res.json()) as ApiResponse<GamesResponse>
    return data
  }
}

export const providersQuery = async (): Promise<ProvidersResponse | []> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/games/providers`)

  const { data } = (await res.json()) as ApiResponse<ProvidersResponse>
  return data
}

export const getGameDemo = async (gameUuid: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/games/init-demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameUuid,
        returnUrl: window.location.href,
        language: 'en',
        device: 'mobile',
      }),
    })
    const { data } = (await res.json()) as ApiResponse<{
      url: string
      sessionId: string
    }>
    return data.url
  } catch (error) {
    console.error(error)
    return '#!'
  }
}
