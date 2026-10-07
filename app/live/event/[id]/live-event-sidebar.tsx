'use client'

import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso'
import type { LiveLayoutQuery } from '@/app/live/__generated__/LiveLayoutQuery.graphql'
import LiveLayoutQueryNode from '@/app/live/__generated__/LiveLayoutQuery.graphql'
import type { LiveEventSidebar$key } from '@/app/live/event/[id]/__generated__/LiveEventSidebar.graphql'
import LiveEventStrip from '@/app/live/event/[id]/live-event-strip'
import LiveStripTournament from '@/app/live/event/[id]/live-strip-tournament'
import { liveSortState, liveSportFilterState, orderLiveEvents } from '@/app/live/live-state'
import { Skeleton } from '@/components/ui/skeleton'

const ASIDE = 'sticky top-26.25 hidden h-[calc(100dvh-7rem)] w-full place-self-start xl:block'

export default function LiveEventSidebar(props: {
  queryRef: PreloadedQuery<LiveLayoutQuery>
  eventId: string
}) {
  const preloaded = usePreloadedQuery<LiveLayoutQuery>(LiveLayoutQueryNode, props.queryRef)
  const data = useFragment<LiveEventSidebar$key>(
    graphql`
      fragment LiveEventSidebar on Query {
        liveEvents {
          edges {
            node {
              ...LiveOrder
              ...LiveEventStrip
              tournament {
                ...LiveStripTournament
              }
            }
          }
        }
      }
    `,
    preloaded
  )

  const sort = useAtomValue(liveSortState)
  const sportFilter = useAtomValue(liveSportFilterState)

  const { events, groups } = useMemo(
    () =>
      orderLiveEvents(
        data.liveEvents.edges.map(e => e.node),
        sort,
        sportFilter
      ),
    [data.liveEvents, sort, sportFilter]
  )
  const initialIndex = Math.max(
    events.findIndex(e => e.id === props.eventId),
    0
  )

  // top padding leaves room for the VIEWING badge, which overhangs the card
  const item = (i: number) => (
    <div className='py-1 pt-3'>
      <LiveEventStrip event={events[i].event} active={events[i].id === props.eventId} />
    </div>
  )

  return (
    <aside className={ASIDE}>
      {groups ? (
        <GroupedVirtuoso
          key='grouped'
          className='scrollbar-hide'
          style={{ height: '100%' }}
          groupCounts={groups.map(g => g.length)}
          overscan={400}
          initialTopMostItemIndex={initialIndex}
          groupContent={i => (
            <LiveStripTournament tournament={groups[i][0].event.tournament} pad={i > 0} />
          )}
          itemContent={item}
        />
      ) : (
        <Virtuoso
          key='chronological'
          className='scrollbar-hide'
          style={{ height: '100%' }}
          totalCount={events.length}
          overscan={400}
          initialTopMostItemIndex={initialIndex}
          computeItemKey={i => events[i].id}
          itemContent={item}
        />
      )}
    </aside>
  )
}

export function LiveEventSidebarSkeleton() {
  return (
    <div className={ASIDE}>
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: identical
          <Skeleton key={i} className='h-25 w-full rounded-xl' />
        ))}
      </div>
    </div>
  )
}
