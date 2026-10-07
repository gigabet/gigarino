'use client'

import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import type { LiveHeader$key } from '@/app/live/__generated__/LiveHeader.graphql'
import type { LiveLayoutQuery } from '@/app/live/__generated__/LiveLayoutQuery.graphql'
import LiveLayoutQueryNode from '@/app/live/__generated__/LiveLayoutQuery.graphql'
import LiveSportTabs from '@/app/live/live-sport-tabs'
import { liveSortState, liveSportFilterState, orderLiveEvents } from '@/app/live/live-state'
import LiveToolbar, { type LiveView } from '@/app/live/live-toolbar'
import { Skeleton } from '@/components/ui/skeleton'

export default function LiveHeaderContent(props: {
  queryRef: PreloadedQuery<LiveLayoutQuery>
  eventId: string | null
}) {
  const preloaded = usePreloadedQuery<LiveLayoutQuery>(LiveLayoutQueryNode, props.queryRef)
  const data = useFragment<LiveHeader$key>(
    graphql`
      fragment LiveHeader on Query {
        liveEvents {
          edges {
            node {
              ...LiveOrder
            }
          }
        }
        ...LiveSportTabs
      }
    `,
    preloaded
  )

  const router = useRouter()
  const [sort, setSort] = useAtom(liveSortState)
  const [sportFilter, setSportFilter] = useAtom(liveSportFilterState)

  const liveEvents = data.liveEvents.edges.map(e => e.node)

  const handleView = (view: LiveView) => {
    if (view === 'list') return router.push('/live')
    const first = orderLiveEvents(liveEvents, sort, sportFilter).events[0]
    if (first) router.push(`/live/event/${first.id}`)
  }

  const handleSport = (sport: string | null) => {
    setSportFilter(sport)
    if (!props.eventId) return
    const next = orderLiveEvents(liveEvents, sort, sport === null ? null : sport).events
    if (!next.some(e => e.id === props.eventId))
      router.replace(next[0] ? `/live/event/${next[0].id}` : '/live')
  }

  return (
    <div className='flex flex-col gap-4'>
      <LiveSportTabs query={data} active={sportFilter} onChangeAction={handleSport} />
      <LiveToolbar
        sort={sort}
        onSortChangeAction={setSort}
        view={props.eventId ? 'single' : 'list'}
        onViewChangeAction={handleView}
      />
    </div>
  )
}

export function LiveHeaderSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-9 w-full max-w-md rounded-full' />
      <Skeleton className='h-9 w-full rounded-full' />
    </div>
  )
}
