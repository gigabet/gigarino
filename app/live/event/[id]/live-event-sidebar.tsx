'use client'

import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { graphql, type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso'
import LiveEventStrip from '@/app/live/event/[id]/live-event-strip'
import LiveStripTournament from '@/app/live/event/[id]/live-strip-tournament'
import { FavouriteLiveStrips } from '@/app/live/favourite-live-events'
import { liveSortState, liveSportFilterState, useOrderedLiveEvents } from '@/app/live/live-state'
import { Skeleton } from '@/components/ui/skeleton'
import type { LiveEventSidebar$key } from '@/relay/__generated__/LiveEventSidebar.graphql'
import type { LiveEventSidebarPaginationQuery } from '@/relay/__generated__/LiveEventSidebarPaginationQuery.graphql'
import type { LiveLayoutQuery } from '@/relay/__generated__/LiveLayoutQuery.graphql'
import LiveLayoutQueryNode from '@/relay/__generated__/LiveLayoutQuery.graphql'

const ASIDE = 'sticky top-26.25 hidden h-[calc(100dvh-7rem)] w-full place-self-start xl:block'
const PAGE_SIZE = 50

export default function LiveEventSidebar(props: {
  queryRef: PreloadedQuery<LiveLayoutQuery>
  eventId: string
}) {
  const preloaded = usePreloadedQuery<LiveLayoutQuery>(LiveLayoutQueryNode, props.queryRef)
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    LiveEventSidebarPaginationQuery,
    LiveEventSidebar$key
  >(
    graphql`
      fragment LiveEventSidebar on Query
      @refetchable(queryName: "LiveEventSidebarPaginationQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 50 }
        after: { type: "String" }
        orderBy: { type: "LiveEventOrder", defaultValue: TOURNAMENT }
        sport: { type: "String" }
      ) {
        liveEvents(first: $first, after: $after, orderBy: $orderBy, sport: $sport)
          @connection(key: "LiveEventSidebar_liveEvents") {
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
    preloaded as LiveEventSidebar$key
  )

  const router = useRouter()
  const sort = useAtomValue(liveSortState)
  const sportFilter = useAtomValue(liveSportFilterState)

  // the server already filtered by sport and ordered; this only derives groups
  const nodes = useMemo(() => data.liveEvents.edges.map(e => e.node), [data.liveEvents.edges])
  const { events, groups } = useOrderedLiveEvents(nodes, sort, null)

  const loadMore = () => {
    if (hasNext && !isLoadingNext) loadNext(PAGE_SIZE)
  }

  // Sport filter changed while viewing an event: if that event isn't in the
  // new sport, page until it's found, then fall back to the first event
  // (or the list when the sport has none).
  const dataSport = props.queryRef.variables.sport ?? null
  const hasCurrent = events.some(e => e.id === props.eventId)
  useEffect(() => {
    if (sportFilter === null || dataSport !== sportFilter || hasCurrent) return
    if (hasNext) {
      if (!isLoadingNext) loadNext(PAGE_SIZE)
      return
    }
    router.replace(events[0] ? `/live/event/${events[0].id}` : '/live')
  }, [sportFilter, dataSport, hasCurrent, hasNext, isLoadingNext, loadNext, events, router])

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

  const headerContext = useMemo(
    () => ({ queryRef: props.queryRef, activeId: props.eventId }),
    [props.queryRef, props.eventId]
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
          endReached={loadMore}
          initialTopMostItemIndex={initialIndex}
          groupContent={i => (
            <LiveStripTournament tournament={groups[i][0].event.tournament} pad={i > 0} />
          )}
          itemContent={item}
          components={{ Header: FavouritesHeader }}
          context={headerContext}
        />
      ) : (
        <Virtuoso
          key='chronological'
          className='scrollbar-hide'
          style={{ height: '100%' }}
          totalCount={events.length}
          overscan={400}
          endReached={loadMore}
          initialTopMostItemIndex={initialIndex}
          computeItemKey={i => events[i].id}
          itemContent={item}
          components={{ Header: FavouritesHeader }}
          context={headerContext}
        />
      )}
    </aside>
  )
}

type HeaderContext = {
  queryRef: PreloadedQuery<LiveLayoutQuery>
  activeId: string
}

function FavouritesHeader({ context }: { context: HeaderContext }) {
  return <FavouriteLiveStrips queryRef={context.queryRef} activeId={context.activeId} />
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
