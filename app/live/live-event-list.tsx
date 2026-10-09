'use client'

import { forwardRef, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { graphql, type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { GroupedVirtuoso, type TopItemListProps, Virtuoso } from 'react-virtuoso'
import type { LiveEventList$key } from '@/app/live/__generated__/LiveEventList.graphql'
import type { LiveEventListPaginationQuery } from '@/app/live/__generated__/LiveEventListPaginationQuery.graphql'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventsQueryNode from '@/app/live/__generated__/LiveEventsQuery.graphql'
import type { LiveTournament$key } from '@/app/live/__generated__/LiveTournament.graphql'
import LiveEvent, { LiveEventSkeleton } from '@/app/live/live-event'
import { orderLiveEvents } from '@/app/live/live-state'
import type { LiveSort } from '@/app/live/live-toolbar'
import LiveTournament, {
  HEADER_PX,
  HeaderRow,
  LiveMarketsHeader,
  PIN_TOP_PX,
  TournamentTitle,
} from '@/app/live/live-tournament'
import { cn } from '@/lib/utils'

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

/**
 * The pinned tournament header. Owns its own state, so a pin change re-renders
 * only this component, never the list. The dropdowns mount once; only the
 * title swaps.
 */
function PinnedTournament(props: {
  tournaments: ReadonlyArray<LiveTournament$key>
  syncRef: React.RefObject<() => void>
}) {
  const [current, setCurrent] = useState(-1)
  const innerRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef(-1)
  const shiftRef = useRef(0)

  const apply = useCallback(() => {
    if (innerRef.current)
      innerRef.current.style.transform = shiftRef.current ? `translateY(${shiftRef.current}px)` : ''
  }, [])

  const sync = useCallback(() => {
    let aboveIdx = -1
    let aboveTop = Number.NEGATIVE_INFINITY
    let belowIdx = -1
    let belowTop = Number.POSITIVE_INFINITY

    for (const h of document.querySelectorAll<HTMLElement>('[data-group-index]')) {
      const top = h.getBoundingClientRect().top
      const idx = Number(h.dataset.groupIndex)
      if (top <= PIN_TOP_PX + 0.5) {
        if (top > aboveTop) {
          aboveTop = top
          aboveIdx = idx
        }
      } else if (top < belowTop) {
        belowTop = top
        belowIdx = idx
      }
    }

    // every mounted header still below the line => pinned is the group before it
    const idx = aboveIdx >= 0 ? aboveIdx : belowIdx > 0 ? belowIdx - 1 : -1

    shiftRef.current = Number.isFinite(belowTop)
      ? Math.min(0, belowTop - (PIN_TOP_PX + HEADER_PX))
      : 0

    if (idx === currentRef.current) {
      apply() // same title: just move it
    } else {
      currentRef.current = idx
      setCurrent(idx) // new title: transform is applied in the layout effect below, same commit
    }
  }, [apply])

  useLayoutEffect(apply, [apply])

  useLayoutEffect(() => {
    props.syncRef.current = sync
    // flushSync: title and transform land in the same frame as the scroll
    const onScroll = () => flushSync(sync)
    sync()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sync, props.syncRef])

  const pinned = props.tournaments[current]

  return (
    // zero-height sticky anchor: takes no layout space, so nothing shifts
    <div className='sticky top-20 z-10 h-0'>
      <div className='absolute inset-x-0 top-0 h-12 overflow-hidden'>
        <div
          ref={innerRef}
          className={cn(
            'will-change-transform',
            pinned ? 'bg-dark/90 backdrop-blur-xl' : 'invisible'
          )}
        >
          <HeaderRow left={pinned && <TournamentTitle tournamentRef={pinned} />} />
        </div>
      </div>
    </div>
  )
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

  const rows = useMemo(
    () =>
      groups?.flatMap((g, gi) => [
        { kind: 'header' as const, key: `h:${g[0].group}`, gi, group: g },
        ...g.map(e => ({ kind: 'event' as const, key: e.id, e })),
      ]) ?? [],
    [groups]
  )

  const tournaments = useMemo(() => groups?.map(g => g[0].event.tournament) ?? [], [groups])

  const syncRef = useRef<() => void>(() => {})
  const onItemsRendered = useCallback(() => syncRef.current(), [])

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
        <LiveTournament tournamentRef={row.group[0].event.tournament} groupIndex={row.gi} />
      ) : (
        <Row>
          <LiveEvent eventRef={row.e.event} />
        </Row>
      )
    },
    [rows]
  )

  // const { stuck, sentinelRef } = useStuckSentinel()

  if (events.length === 0) return <EmptyLive />

  if (!groups)
    return (
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
    )

  return (
    <div>
      <PinnedTournament tournaments={tournaments} syncRef={syncRef} />
      <Virtuoso
        key='grouped'
        useWindowScroll
        totalCount={rows.length}
        computeItemKey={i => rows[i].key}
        increaseViewportBy={{ top: 800, bottom: 800 }}
        itemsRendered={onItemsRendered}
        endReached={loadMore}
        itemContent={groupedItem}
      />
    </div>
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
