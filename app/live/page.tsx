'use client'

import { useAtomValue } from 'jotai'
import { Suspense, useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventList, { LiveListSkeleton } from '@/app/live/live-event-list'
import { liveSortState, liveSportFilterState } from '@/app/live/live-state'

export default function LivePage() {
  const [queryRef, loadQuery] = useQueryLoader<LiveEventsQuery>(graphql`
    query LiveEventsQuery {
      ...LiveEventList
    }
  `)

  const sort = useAtomValue(liveSortState)
  const sportFilter = useAtomValue(liveSportFilterState)

  useEffect(() => {
    loadQuery({}, { fetchPolicy: 'store-or-network' })
  }, [loadQuery])

  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <Suspense fallback={<LiveListSkeleton />}>
        {queryRef ? (
          <LiveEventList queryRef={queryRef} sort={sort} sportFilter={sportFilter} />
        ) : (
          <LiveListSkeleton />
        )}
      </Suspense>
    </main>
  )
}
