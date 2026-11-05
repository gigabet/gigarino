'use client'

import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import LiveSportTabs from '@/app/live/live-sport-tabs'
import { liveSearchState, liveSortState, liveSportFilterState } from '@/app/live/live-state'
import LiveToolbar, { type LiveView } from '@/app/live/live-toolbar'
import { Skeleton } from '@/components/ui/skeleton'
import type { LiveHeader$key } from '@/relay/__generated__/LiveHeader.graphql'
import type { LiveLayoutQuery } from '@/relay/__generated__/LiveLayoutQuery.graphql'
import LiveLayoutQueryNode from '@/relay/__generated__/LiveLayoutQuery.graphql'

export default function LiveHeaderContent(props: {
  queryRef: PreloadedQuery<LiveLayoutQuery>
  eventId: string | null
}) {
  const preloaded = usePreloadedQuery<LiveLayoutQuery>(LiveLayoutQueryNode, props.queryRef)
  const data = useFragment<LiveHeader$key>(
    graphql`
      fragment LiveHeader on Query {
        firstLive: liveEvents(first: 1, orderBy: $orderBy, sport: $sport, search: $search) {
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
  const [search, setSearch] = useAtom(liveSearchState)

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
        search={search}
        onSearchChangeAction={setSearch}
      />
    </div>
  )
}

export function LiveHeaderSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {/* sport tabs: vertical squircles below lg, horizontal pills from lg */}
      <div className='flex items-stretch gap-2 overflow-hidden py-1 lg:items-center lg:py-0'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            // biome-ignore lint/suspicious/noArrayIndexKey: identical
            key={i}
            className='h-17 w-18 shrink-0 rounded-[1.375rem] [corner-shape:squircle] lg:h-8.5 lg:w-28 lg:rounded-2xl'
          />
        ))}
      </div>
      {/* toolbar: sort dropdown left, search between (own row below lg), view toggle right */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <Skeleton className='h-8.5 w-36 rounded-full' />
        <Skeleton className='order-last h-8.5 w-full rounded-full lg:order-0 lg:mx-auto lg:w-auto lg:max-w-md lg:flex-1' />
        <Skeleton className='h-9.5 w-40 rounded-full' />
      </div>
    </div>
  )
}
