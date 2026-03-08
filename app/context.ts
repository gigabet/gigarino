import type { GamesResponse, ProvidersResponse, TagsResponse } from '@/types'

export const categories = {
  Providers: { icon: true, url: '/casino/providers' },
  'Top Games': { icon: true, query: '?category=top' },
  'New Releases': { icon: true, query: '?category=new' },
  'Mobile Games': { icon: true, query: '?isMobile=true' },
  'Free Spins (ingame)': { icon: true, query: '?tag=free-spins-ingame' },
  Autoplay: { icon: true, query: '?tag=autoplay' },
  'Bonus Buy': { icon: true, query: '?tag=bonus-buy' },
  Classic: { icon: true, query: '?tag=classic' },
  'Live Casino': { icon: true, query: '?type=roulette' },
  'All Games': { icon: true, query: '' },
}

export const getGameQuery = (query: string) => {
  return async ({ pageParam }: { pageParam?: unknown }) => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/games${query}`)

      if (pageParam) {
        url.searchParams.set('page', String(pageParam))
      }

      const res = await fetch(url.toString())

      // If the API returns a non-200, force fallback
      if (!res.ok) {
        throw new Error('Bad response')
      }

      const data = (await res.json()) as GamesResponse

      // Validate shape
      if (!data || !Array.isArray(data.items)) {
        throw new Error('Invalid data shape')
      }

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

export const tagsQuery = async (): Promise<TagsResponse | []> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/games/tags`)

    const data = (await res.json()) as TagsResponse
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
