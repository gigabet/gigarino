'use client'

import type { LiveHeaderQuery } from '@/app/live/__generated__/LiveHeaderQuery.graphql'
import LiveHeaderQueryNode from '@/app/live/__generated__/LiveHeaderQuery.graphql'
import LiveSportTabs from '@/app/live/live-sport-tabs'
import { liveSortState, liveSportFilterState, orderLiveEvents } from '@/app/live/live-state'
import LiveToolbar, { type LiveView } from '@/app/live/live-toolbar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { usePreloadedQuery, type PreloadedQuery } from 'react-relay'

export default function LiveHeaderContent(props: {
  queryRef: PreloadedQuery<LiveHeaderQuery>
  eventId: string | null
}) {
  const data = usePreloadedQuery<LiveHeaderQuery>(LiveHeaderQueryNode, props.queryRef)

  const router = useRouter()
  const [sort, setSort] = useAtom(liveSortState)
  const [sportFilter, setSportFilter] = useAtom(liveSportFilterState)

  const handleView = (view: LiveView) => {
    if (view === 'list') return router.push('/live')
    const first = orderLiveEvents(data.liveEvents, sort, sportFilter).events[0]
    if (first) router.push(`/live/event/${first.id}`)
  }

  const handleSport = (sport: string | null) => {
    setSportFilter(sport)
    if (!props.eventId) return
    const next = orderLiveEvents(data.liveEvents, sort, sport).events
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
