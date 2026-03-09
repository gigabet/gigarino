import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { entries } from 'lodash'
import { categories, getGameQuery } from '@/app/context'
import GameList from '@/app/game-list'

export default async function GamesByCategory(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const [label, category] = entries(categories).find(([, v]) => v.slug === slug) ?? []

  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['games-infinite', category?.slug ?? ''],
    queryFn: getGameQuery(category?.slug ?? ''),
    initialPageParam: 1,
  })

  if (!label || !category) return null

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='mx-auto max-w-(--breakpoint-2xl)'>
        <GameList title={label} query={category.query} />
      </div>
    </HydrationBoundary>
  )
}
