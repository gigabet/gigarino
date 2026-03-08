import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Provider from '@/app/casino/providers/[slug]/provider'
import { getGameQuery, providersQuery } from '@/app/context'

export default async function GamesByProvider(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['games-infinite', `?provider=${slug}`],
    queryFn: getGameQuery(`?provider=${slug}`),
    initialPageParam: 1,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Provider slug={slug} />
    </HydrationBoundary>
  )
}
