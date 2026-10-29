'use client'

import { useParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  graphql,
  type PreloadedQuery,
  useFragment,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import StatisticsWidget, { StatisticsWidgetSkeleton } from '@/components/statistics-widget'
import { useT } from '@/context/providers'
import type { PageStatsQuery } from '@/relay/__generated__/PageStatsQuery.graphql'
import type { PageStatsView$key } from '@/relay/__generated__/PageStatsView.graphql'

const statsQuery = graphql`
  query PageStatsQuery($id: ID!) {
    event(id: $id) {
      ...PageStatsView @dangerously_unaliased_fixme
    }
  }
`

export default function StatsPage() {
  const { id } = useParams<{ id: string }>()
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PageStatsQuery>(statsQuery)

  useEffect(() => {
    loadQuery({ id: decodeURIComponent(id) }, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, id])

  return (
    <main className='relative z-1 mx-auto flex min-h-dvh w-full max-w-4xl flex-col gap-4 px-4 py-6'>
      <ErrorBoundary FallbackComponent={SectionErrorFallback}>
        <Suspense fallback={<StatisticsWidgetSkeleton />}>
          {queryRef ? <StatsView queryRef={queryRef} /> : <StatisticsWidgetSkeleton />}
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

function StatsView(props: { queryRef: PreloadedQuery<PageStatsQuery> }) {
  const preloaded = usePreloadedQuery<PageStatsQuery>(statsQuery, props.queryRef)
  const data = useFragment(
    graphql`
      fragment PageStatsView on Event {
        homeCompetitor
        awayCompetitor
        ...StatisticsWidget
      }
    `,
    preloaded.event as PageStatsView$key | null
  )
  const t = useT()

  // the tab/window title follows the match (React 19 hoists <title>)
  if (!data)
    return <p className='text-secondary py-16 text-center text-sm'>{t('Event not found')}</p>

  return (
    <>
      <title>{`${data.homeCompetitor} vs ${data.awayCompetitor}`}</title>
      <h1 className='truncate text-base font-semibold text-white'>
        {data.homeCompetitor} <span className='text-secondary font-normal'>{t('vs')}</span>{' '}
        {data.awayCompetitor}
      </h1>
      <StatisticsWidget event={data} bare />
    </>
  )
}
