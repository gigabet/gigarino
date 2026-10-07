'use client'

import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import type { LiveHeader$key } from '@/app/live/__generated__/LiveHeader.graphql'
import type { LiveLayoutQuery } from '@/app/live/__generated__/LiveLayoutQuery.graphql'
import LiveLayoutQueryNode from '@/app/live/__generated__/LiveLayoutQuery.graphql'
import LiveSportTabs from '@/app/live/live-sport-tabs'
import { liveSortState, liveSportFilterState } from '@/app/live/live-state'
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
        firstLive: liveEvents(first: 1, orderBy: $orderBy, sport: $sport) {
          edges {
            node {
              id
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

  const handleView = (view: LiveView) => {
    if (view === 'list') return router.push('/live')
    const first = data.firstLive.edges[0]?.node.id
    if (first) router.push(`/live/event/${first}`)
  }

  return (
    <div className='flex flex-col gap-4'>
      <LiveSportTabs query={data} active={sportFilter} onChangeAction={setSportFilter} />
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
