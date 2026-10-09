'use client'

import { forwardRef, useCallback, useMemo } from 'react'
import { graphql, type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { GroupedVirtuoso, type TopItemListProps, Virtuoso } from 'react-virtuoso'
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
    <div ref={ref} style={{ ...style, top: '5rem', zIndex: 10 }}>
      {children}
    </div>
  )
})

/** Padding, not margin or gap: Virtuoso only measures an item's own box. */
function Row(props: { children: React.ReactNode }) {
  return <div className='sm:pb-3'>{props.children}</div>
}

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

  const { events, groups } = useMemo(
    () =>
      orderLiveEvents(
        data.liveEvents.edges.map(e => e.node),
        props.sort,
        null
      ),
    [data.liveEvents.edges, props.sort]
  )

  // tournament headers are plain rows, flattened in front of their events
  const rows = useMemo(
    () =>
      groups?.flatMap(g => [
        { kind: 'header' as const, key: `h:${g[0].group}`, group: g },
        ...g.map(e => ({ kind: 'event' as const, key: e.id, e })),
      ]) ?? [],
    [groups]
  )

  // const { stuck, sentinelRef } = useStuckSentinel()

  const loadMore = useCallback(() => {
    if (hasNext && !isLoadingNext) loadNext(PAGE_SIZE)
  }, [hasNext, isLoadingNext, loadNext])

  const chronoItem = useCallback(
    (i: number) => (
      <Row>
        <LiveEvent eventRef={events[i].event} />
      </Row>
    ),
    [events]
  )

  const groupedItem = useCallback(
    (i: number) => {
      const row = rows[i]
      return row.kind === 'header' ? (
        <LiveTournament tournamentRef={row.group[0].event.tournament} />
      ) : (
        <Row>
          <LiveEvent eventRef={row.e.event} />
        </Row>
      )
    },
    [rows]
  )

  if (events.length === 0) return <EmptyLive />

  if (!groups)
    return (
      <div>
        <div
          // ref={sentinelRef}
          className='h-px'
        />
        <GroupedVirtuoso
          key='chronological'
          useWindowScroll
          groupCounts={[events.length]}
          increaseViewportBy={{ top: 800, bottom: 800 }}
          endReached={loadMore}
          components={{ TopItemList: BelowNavbar }}
          groupContent={() => <LiveMarketsHeader />} //stuck={stuck} />}
          itemContent={chronoItem}
        />
      </div>
    )

  return (
    <Virtuoso
      key='grouped'
      useWindowScroll
      totalCount={rows.length}
      computeItemKey={i => rows[i].key}
      increaseViewportBy={{ top: 800, bottom: 800 }}
      endReached={loadMore}
      itemContent={groupedItem}
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
