'use client'

import { forwardRef, useCallback, useMemo, useRef } from 'react'
import { graphql, type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import {
  GroupedVirtuoso,
  type GroupedVirtuosoHandle,
  type StateSnapshot,
  type TopItemListProps,
  Virtuoso,
  type VirtuosoHandle,
} from 'react-virtuoso'
import LiveEvent, { LiveEventSkeleton } from '@/app/live/live-event'
import { useOrderedLiveEvents } from '@/app/live/live-state'
import type { LiveSort } from '@/app/live/live-toolbar'
import LiveTournament, { LiveMarketsHeader } from '@/app/live/live-tournament'
import { MIXED_SCOPE } from '@/lib/sport-markets'
import type { LiveEventList$key } from '@/relay/__generated__/LiveEventList.graphql'
import type { LiveEventListPaginationQuery } from '@/relay/__generated__/LiveEventListPaginationQuery.graphql'
import type { LiveEventsQuery } from '@/relay/__generated__/LiveEventsQuery.graphql'
import LiveEventsQueryNode from '@/relay/__generated__/LiveEventsQuery.graphql'

const PAGE_SIZE = 20
const snapshots = new Map<string, StateSnapshot>()

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

  const nodes = useMemo(() => data.liveEvents.edges.map(e => e.node), [data.liveEvents.edges])
  const { events, groups } = useOrderedLiveEvents(nodes, props.sort, null)

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
        <LiveEvent eventRef={events[i].event} scope={MIXED_SCOPE} />
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

  const snapshotKey = `${props.sort}:${props.queryRef.variables.sport ?? 'all'}`

  const groupedRef = useRef<VirtuosoHandle>(null)
  const chronoRef = useRef<GroupedVirtuosoHandle>(null)

  // Save whenever scrolling settles. On unmount the ref is already detached,
  // so snapshotting in a cleanup effect doesn't work reliably.
  const saveState = useCallback(
    (scrolling: boolean) => {
      if (scrolling) return
      const handle = props.sort === 'chronological' ? chronoRef.current : groupedRef.current
      handle?.getState(s => snapshots.set(snapshotKey, s))
    },
    [props.sort, snapshotKey]
  )

  const restoreStateFrom = snapshots.get(snapshotKey)

  if (events.length === 0) return <EmptyLive />

  if (!groups)
    return (
      <div>
        <div className='h-px' />
        <GroupedVirtuoso
          ref={chronoRef}
          key='chronological'
          useWindowScroll
          restoreStateFrom={restoreStateFrom}
          isScrolling={saveState}
          groupCounts={[events.length]}
          increaseViewportBy={{ top: 800, bottom: 800 }}
          endReached={loadMore}
          components={{ TopItemList: BelowNavbar }}
          groupContent={() => <LiveMarketsHeader />}
          itemContent={chronoItem}
          defaultItemHeight={128}
        />
      </div>
    )

  return (
    <Virtuoso
      ref={groupedRef}
      key='grouped'
      useWindowScroll
      restoreStateFrom={restoreStateFrom}
      isScrolling={saveState}
      totalCount={rows.length}
      computeItemKey={i => rows[i].key}
      increaseViewportBy={{ top: 800, bottom: 800 }}
      endReached={loadMore}
      itemContent={groupedItem}
      defaultItemHeight={128}
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
