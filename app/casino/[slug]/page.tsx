import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { entries } from 'lodash'
import GameList from '@/app/casino/[slug]/game-list'
import { categories, getGameQuery } from '@/app/context'
import { getT } from '@/i18n/t'

export default async function GamesByCategory(props: { params: Promise<{ slug: string }> }) {
  const t = await getT()
  const { slug } = await props.params
  const [label, category] = entries(categories).find(([, v]) => v.slug === slug) ?? []

  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['games-infinite', category?.slug ?? ''],
    queryFn: getGameQuery(category?.slug ?? ''),
    initialPageParam: 1,
  })

  if (!label || !category)
    return (
      <div className='mx-auto max-w-360'>
        <div className='px-8 py-6 text-xl font-bold text-neutral-700'>{t('No games')}</div>
      </div>
    )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameList key={label} title={t(label)} query={category.query} />
    </HydrationBoundary>
  )
}
