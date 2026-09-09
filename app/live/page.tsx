// app/live/page.tsx
'use client'

import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import LiveControls from '@/app/live/controls'
import LiveEventList from '@/app/live/event-list'
import { generateMockLiveEvents, nudgeOdds } from '@/app/live/mock-data'
import LiveSingleView from '@/app/live/single-view'
import SportTabs from '@/app/live/sport-tabs'
import { liveSportState, liveViewState } from '@/app/live/store'
import type { LiveEvent } from '@/app/live/types'
import { ViewportBatcherProvider } from '@/app/live/viewport-batcher'
import { Skeleton } from '@/components/ui/skeleton'

export default function LivePage() {
  const [events, setEvents] = useState<LiveEvent[] | null>(null)

  useEffect(() => {
    setEvents(generateMockLiveEvents())
  }, [])

  const sport = useAtomValue(liveSportState)
  const view = useAtomValue(liveViewState)

  // stand-in for a real backend flush: nudges odds only for the ids the
  // batcher collected from currently-mounted rows. A real integration
  // swaps this for a batched `eventsByIds`-style refetch or a
  // viewport-scoped subscription — the registration/windowing above it
  // doesn't change.
  const handleFlush = useCallback((ids: string[]) => {
    setEvents(prev => {
      if (!prev) return prev
      const idSet = new Set(ids)
      return prev.map(e => (idSet.has(e.id) ? nudgeOdds(e) : e))
    })
  }, [])

  // stabilize reference across renders that don't actually change the
  // underlying data (e.g. toggling view mode), so downstream sort/group
  // useMemos in LiveEventList don't recompute needlessly
  const filtered = useMemo(
    () => (events ? (sport ? events.filter(e => e.sportKey === sport) : events) : []),
    [events, sport]
  )

  if (!events) return <LivePageSkeleton />

  return (
    <ViewportBatcherProvider onFlush={handleFlush}>
      <main className='flex min-w-0 flex-col gap-4'>
        <SportTabs events={events} />
        <LiveControls />
        {view === 'single' ? (
          <LiveSingleView events={filtered} />
        ) : (
          <LiveEventList events={filtered} />
        )}
      </main>
    </ViewportBatcherProvider>
  )
}

function LivePageSkeleton() {
  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <div className='flex gap-2'>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: identical
            <Skeleton key={i} className='h-9 w-28 shrink-0 rounded-full' />
          ))}
      </div>
      <Skeleton className='h-8 w-64' />
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-24 w-full lg:h-27' />
        <Skeleton className='h-24 w-full lg:h-27' />
        <Skeleton className='h-24 w-full lg:h-27' />
        <Skeleton className='h-24 w-full lg:h-27' />
      </div>
    </main>
  )
}
