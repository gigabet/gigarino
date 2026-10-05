'use client'

import { groupBy, sortBy } from 'lodash'
import { useMemo } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso'
import type { LiveEventList$key } from '@/app/live/__generated__/LiveEventList.graphql'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventsQueryNode from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEvent, { LiveEventSkeleton } from '@/app/live/live-event'
import type { LiveSort } from '@/app/live/live-toolbar'
import LiveTournament from '@/app/live/live-tournament'

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
          startTime
          sport {
            key
          }
          tournament {
            key
            ...LiveTournament
          }
          ...LiveEvent
        }
      }
    `,
    preloaded as LiveEventList$key
  )

  const events = props.sportFilter
    ? data.liveEvents.filter(e => e.sport.key === props.sportFilter)
    : data.liveEvents

  // groupBy/sortBy here operate on data this component already unmasked via
  // its own fragment above — this is view arrangement, not a second
  // component reaching into a parent's resolved fields, so it stays inline
  // rather than being split into its own function taking plain props
  const groups = useMemo(() => Object.values(groupBy(events, e => e.tournament.key)), [events])

  if (events.length === 0) return <EmptyLive />

  if (props.sort === 'chronological') {
    const sorted = sortBy(events, e => Date.parse(e.startTime))
    return (
      <Virtuoso
        useWindowScroll
        data={sorted}
        itemContent={(_i, event) => <LiveEvent eventRef={event} />}
        overscan={800}
      />
    )
  }

  const groupCounts = groups.map(g => g.length)
  const flatEvents = groups.flat()

  return (
    <GroupedVirtuoso
      useWindowScroll
      groupCounts={groupCounts}
      overscan={800}
      groupContent={index => <LiveTournament tournamentRef={groups[index][0].tournament} />}
      itemContent={index => <LiveEvent eventRef={flatEvents[index]} />}
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
