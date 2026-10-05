'use client'

import { Suspense, useEffect, useState } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventList, { LiveListSkeleton } from '@/app/live/live-event-list'
import LiveSportTabs from '@/app/live/live-sport-tabs'
import LiveToolbar, { type LiveSort, type LiveView } from '@/app/live/live-toolbar'
import { RefetchBatcherProvider } from '@/app/live/refetch-context'

export default function LivePage() {
  const [queryRef, loadQuery] = useQueryLoader<LiveEventsQuery>(graphql`
    query LiveEventsQuery {
      ...LiveEventList
      ...LiveSportTabs
    }
  `)

  const [sort, setSort] = useState<LiveSort>('tournament')
  const [view, setView] = useState<LiveView>('list')
  // sport is a client-side filter over one unfiltered fetch, not a GraphQL
  // variable — keeps tab counts correct for every tab regardless of which
  // one is active (see earlier note on why liveEvents isn't refetched per tab)
  const [activeSport, setActiveSport] = useState<string | null>(null)

  useEffect(() => {
    loadQuery({}, { fetchPolicy: 'store-or-network' })
  }, [loadQuery])

  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <RefetchBatcherProvider>
        <Suspense fallback={<LiveListSkeleton />}>
          {queryRef ? (
            <>
              <LiveSportTabs
                queryRef={queryRef}
                active={activeSport}
                onChangeAction={setActiveSport}
              />
              <LiveToolbar
                sort={sort}
                onSortChangeAction={setSort}
                view={view}
                onViewChangeAction={setView}
              />

              {view === 'list' ? (
                <LiveEventList queryRef={queryRef} sort={sort} sportFilter={activeSport} />
              ) : (
                <div className='text-secondary rounded-2xl border border-white/5 bg-black/20 p-8 text-center text-sm'>
                  IN PROGRESS
                </div>
              )}
            </>
          ) : (
            <LiveListSkeleton />
          )}
        </Suspense>
      </RefetchBatcherProvider>
    </main>
  )
}
