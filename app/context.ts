import type { GamesResponse, ProvidersResponse } from '@/types'

export const categories = {
  Providers: { icon: true, slug: 'providers', query: '' },
  'Top Games': { icon: true, slug: 'top', query: '?category=top' },
  'New Releases': { icon: true, slug: 'new', query: '?category=new' },
  'Mobile Games': { icon: true, slug: 'mobile', query: '?isMobile=true' },
  'Free Spins (ingame)': { icon: true, slug: 'free-spins-ingame', query: '?tag=free-spins-ingame' },
  Autoplay: { icon: true, slug: 'autoplay', query: '?tag=autoplay' },
  'Bonus Buy': { icon: true, slug: 'bonus-buy', query: '?tag=bonus-buy' },
  Classic: { icon: true, slug: 'classic', query: '?tag=classic' },
  'Live Casino': { icon: true, slug: 'live-casino', query: '?type=roulette' },
  'All Games': { icon: true, slug: 'all', query: '?limit=24' },
} as const

export const getGameQuery = (query: string) => {
  return async ({ pageParam }: { pageParam?: unknown }) => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/games${query}`)

      if (pageParam) {
        url.searchParams.set('page', String(pageParam))
      }

      const res = await fetch(url.toString())

      const data = (await res.json()) as GamesResponse
      return data
    } catch (error) {
      console.error(error)

      return {
        items: [],
        total: 0,
        page: 1,
        limit: 24,
        totalPages: 1,
      }
    }
  }
}

export const providersQuery = async (): Promise<ProvidersResponse | []> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/games/providers`)

    const data = (await res.json()) as ProvidersResponse
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
