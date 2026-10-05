'use client'

import { useMemo } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'
import type { LiveEventList$key } from '@/app/live/__generated__/LiveEventList.graphql'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventsQueryNode from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEvent, { LiveEventSkeleton } from '@/app/live/live-event'
import { orderLiveEvents } from '@/app/live/live-state'
import type { LiveSort } from '@/app/live/live-toolbar'
import LiveTournament, { LiveMarketsHeader } from '@/app/live/live-tournament'

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

  // Tournament mode: headers are plain rows in a flat list, so nothing sticks
  const rows = useMemo(
    () =>
      groups?.flatMap(g => [
        { kind: 'header' as const, key: `h:${g[0].id}`, event: g[0].event },
        ...g.map(e => ({ kind: 'event' as const, key: e.id, event: e.event })),
      ]) ?? null,
    [groups]
  )

  if (events.length === 0) return <EmptyLive />

  // Start-time mode: one sticky market header above a flat list. The wrapper is
  // the sticky element's containing block, so it stays stuck for the whole list.
  if (!rows)
    return (
      <div>
        <LiveMarketsHeader />
        <Virtuoso
          key='chronological'
          useWindowScroll
          totalCount={events.length}
          overscan={800}
          computeItemKey={i => events[i].id}
          itemContent={i => <LiveEvent eventRef={events[i].event} />}
        />
      </div>
    )

  return (
    <Virtuoso
      key='grouped'
      useWindowScroll
      totalCount={rows.length}
      overscan={800}
      computeItemKey={i => rows[i].key}
      itemContent={i =>
        rows[i].kind === 'header' ? (
          <LiveTournament tournamentRef={rows[i].event.tournament} />
        ) : (
          <LiveEvent eventRef={rows[i].event} />
        )
      }
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
