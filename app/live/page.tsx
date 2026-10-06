'use client'

import { useAtomValue } from 'jotai'
import { Suspense, useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventList, { LiveListSkeleton } from '@/app/live/live-event-list'
import { liveSortState, liveSportFilterState } from '@/app/live/live-state'

const ORDER = { tournament: 'TOURNAMENT', chronological: 'START_TIME' } as const

export default function LivePage() {
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveEventsQuery>(graphql`
    query LiveEventsQuery($orderBy: LiveEventOrder!, $sport: String) {
      ...LiveEventList @arguments(orderBy: $orderBy, sport: $sport)
    }
  `)

  const sort = useAtomValue(liveSortState)
  const sportFilter = useAtomValue(liveSportFilterState)

  useEffect(() => {
    loadQuery({ orderBy: ORDER[sort], sport: sportFilter }, { fetchPolicy: 'store-or-network' })
  }, [loadQuery, sort, sportFilter])

  useEffect(() => () => disposeQuery(), [disposeQuery])

  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <Suspense fallback={<LiveListSkeleton />}>
        {queryRef ? <LiveEventList queryRef={queryRef} sort={sort} /> : <LiveListSkeleton />}
      </Suspense>
    </main>
  )
}
