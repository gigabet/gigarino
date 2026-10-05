'use client'

import { forwardRef, useMemo } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { GroupedVirtuoso, type ListProps, type TopItemListProps } from 'react-virtuoso'
import type { LiveEventList$key } from '@/app/live/__generated__/LiveEventList.graphql'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventsQueryNode from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEvent, { LiveEventSkeleton } from '@/app/live/live-event'
import { orderLiveEvents } from '@/app/live/live-state'
import type { LiveSort } from '@/app/live/live-toolbar'
import LiveTournament, { LiveMarketsHeader } from '@/app/live/live-tournament'

// Virtuoso's sticky wrapper defaults to top: 0, which is under the h-20 navbar
const BelowNavbar = forwardRef<HTMLDivElement, TopItemListProps>(function BelowNavbar(
  { style, children },
  ref
) {
  return (
    <div ref={ref} style={{ ...style, top: '5rem' }}>
      {children}
    </div>
  )
})

export default function LiveEventList(props: {
  queryRef: PreloadedQuery<LiveEventsQuery>
  sort: LiveSort
  sportFilter: string | null
}) {
  const preloaded = usePreloadedQuery<LiveEventsQuery>(LiveEventsQueryNode, props.queryRef)

  const data = useFragment(
    graphql`
      fragment LiveEventList on Query {
        liveEvents {
          ...LiveOrder
          ...LiveEvent
          tournament {
            ...LiveTournament
          }
        }
      }
    `,
    preloaded as LiveEventList$key
  )

  const { events, groups } = useMemo(
    () => orderLiveEvents(data.liveEvents, props.sort, props.sportFilter),
    [data.liveEvents, props.sort, props.sportFilter]
  )

  if (events.length === 0) return <EmptyLive />

  // index-based callbacks: GroupedVirtuoso's itemContent is (index, groupIndex, data)
  const item = (i: number) => <LiveEvent eventRef={events[i].event} />

  if (!groups)
    return (
      // one group whose sticky header is the market dropdown row
      <GroupedVirtuoso
        key='chronological'
        useWindowScroll
        groupCounts={[events.length]}
        overscan={800}
        components={{ TopItemList: BelowNavbar }}
        groupContent={() => <LiveMarketsHeader />}
        itemContent={item}
      />
    )

  return (
    <GroupedVirtuoso
      key='grouped'
      useWindowScroll
      groupCounts={groups.map(g => g.length)}
      overscan={800}
      groupContent={i => <LiveTournament tournamentRef={groups[i][0].event.tournament} />}
      itemContent={item}
    />
  )
}

function EmptyLive() {
  return (
    <div className='text-secondary flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-6 py-16 text-center text-sm'>
      No events are live right now.
    </div>
  )
}

export function LiveListSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      {Array.from({ length: 8 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: identical
        <LiveEventSkeleton key={i} />
      ))}
    </div>
  )
}
