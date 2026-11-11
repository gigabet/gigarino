'use client'

import { useAtomValue } from 'jotai'
import { Suspense, useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import LiveEventList, { LiveListSkeleton } from '@/app/live/live-event-list'
import {
  liveCountryFilterState,
  liveSearchState,
  liveSortState,
  liveSportFilterState,
  ORDER,
} from '@/app/live/live-state'
import type { LiveEventsQuery } from '@/relay/__generated__/LiveEventsQuery.graphql'

export default function LivePage() {
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveEventsQuery>(graphql`
    query LiveEventsQuery(
      $orderBy: LiveEventOrder!
      $sport: String
      $search: String
      $category: String
    ) {
      ...LiveEventList
        @arguments(orderBy: $orderBy, sport: $sport, search: $search, category: $category)
    }
  `)

  const sort = useAtomValue(liveSortState)
  const sportFilter = useAtomValue(liveSportFilterState)
  const search = useAtomValue(liveSearchState)
  const country = useAtomValue(liveCountryFilterState)

  useEffect(() => {
    loadQuery(
      { orderBy: ORDER[sort], sport: sportFilter, search: search || null, category: country },
      { fetchPolicy: 'store-or-network' }
    )
  }, [loadQuery, sort, sportFilter, search, country])

  useEffect(() => () => disposeQuery(), [disposeQuery])

  useEffect(() => {
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = 'auto'
    }
  }, [])

  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <Suspense fallback={<LiveListSkeleton />}>
        {queryRef ? <LiveEventList queryRef={queryRef} sort={sort} /> : <LiveListSkeleton />}
      </Suspense>
    </main>
  )
}
