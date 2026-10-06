'use client'

import { forwardRef, useMemo } from 'react'
import { graphql, type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { GroupedVirtuoso, type TopItemListProps } from 'react-virtuoso'
import type { LiveEventList$key } from '@/app/live/__generated__/LiveEventList.graphql'
import type { LiveEventListPaginationQuery } from '@/app/live/__generated__/LiveEventListPaginationQuery.graphql'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventsQueryNode from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEvent, { LiveEventSkeleton } from '@/app/live/live-event'
import { orderLiveEvents } from '@/app/live/live-state'
import type { LiveSort } from '@/app/live/live-toolbar'
import LiveTournament, { LiveMarketsHeader } from '@/app/live/live-tournament'

const PAGE_SIZE = 20

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
}) {
  const preloaded = usePreloadedQuery<LiveEventsQuery>(LiveEventsQueryNode, props.queryRef)

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    LiveEventListPaginationQuery,
    LiveEventList$key
  >(
    graphql`
      fragment LiveEventList on Query
      @refetchable(queryName: "LiveEventListPaginationQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        orderBy: { type: "LiveEventOrder", defaultValue: TOURNAMENT }
        sport: { type: "String" }
      ) {
        liveEvents(first: $first, after: $after, orderBy: $orderBy, sport: $sport)
          @connection(key: "LiveEventList_liveEvents") {
          edges {
            node {
              ...LiveOrder
              ...LiveEvent
              tournament {
                ...LiveTournament
              }
            }
          }
        }
      }
    `,
    preloaded as LiveEventList$key
  )

  // Server already filtered by sport and ordered; this only derives the
  // groups. Tournaments arrive contiguous, so groupBy keeps server order.
  const { events, groups } = useMemo(
    () =>
      orderLiveEvents(
        data.liveEvents.edges.map(e => e.node),
        props.sort,
        null
      ),
    [data.liveEvents.edges, props.sort]
  )

  const loadMore = () => {
    if (hasNext && !isLoadingNext) loadNext(PAGE_SIZE)
  }

  if (events.length === 0) return <EmptyLive />

  const item = (i: number) => <LiveEvent eventRef={events[i].event} />

  if (!groups)
    return (
      <GroupedVirtuoso
        key='chronological'
        useWindowScroll
        groupCounts={[events.length]}
        overscan={800}
        endReached={loadMore}
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
      endReached={loadMore}
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
