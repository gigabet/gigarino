'use client'
import { format } from 'date-fns'
import { ChartNoAxesColumnIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { fetchQuery, graphql, useFragment, useRelayEnvironment } from 'react-relay'
import type { PrematchEvent$key } from '@/app/sport/[[...slug]]/__generated__/PrematchEvent.graphql'
import PrematchSingleViewQueryNode from '@/app/sport/event/[id]/__generated__/PrematchSingleViewQuery.graphql'
import { ListViewMarkets, ListViewMarketsSkeleton } from '@/components/list-view-markets'
import { TeamBadge } from '@/components/team-badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { getRelativeDayLabel } from '@/lib/utils'

export default function PrematchEvent(props: { node: PrematchEvent$key }) {
  const data = useFragment(
    graphql`
      fragment PrematchEvent on PrematchEvent {
        id
        homeCompetitor
        homeImageUrl
        awayCompetitor
        awayImageUrl
        startTime
        oddCount
        ...ListViewMarkets @defer
      }
    `,
    props.node
  )

  const env = useRelayEnvironment()
  const prefetch = () => {
    fetchQuery(
      env,
      PrematchSingleViewQueryNode,
      { id: data.id },
      { fetchPolicy: 'store-or-network' }
    ).subscribe({})
  }

  return (
    <div className='sport-texture group relative flex flex-col gap-2 overflow-hidden border-b py-3 last:border-b-0 sm:gap-3 sm:rounded-2xl sm:border-b-0 sm:border-white/5 sm:bg-black/20 sm:px-4 lg:h-27 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-4 lg:px-5'>
      {/* hover shimmer sweep */}
      <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

      {/* mobile row 1: teams + odds */}
      <div className='relative flex items-center gap-4 lg:contents'>
        <Link
          className='flex w-34 min-w-0 shrink-0 flex-col gap-1 text-xs sm:w-40 sm:gap-2 sm:text-sm lg:order-3 lg:ml-1 lg:w-60 lg:flex-none'
          href={`/sport/event/${data.id}`}
          onMouseEnter={prefetch}
          onMouseDown={prefetch}
          onFocus={prefetch}
        >
          <div className='flex items-center gap-2'>
            <TeamBadge name={data.homeCompetitor} imageUrl={data.homeImageUrl} />
            <span className='truncate'>{data.homeCompetitor}</span>
          </div>
          <div className='flex items-center gap-2'>
            <TeamBadge name={data.awayCompetitor} imageUrl={data.awayImageUrl} />
            <span className='truncate'>{data.awayCompetitor}</span>
          </div>
        </Link>

        <Suspense fallback={<ListViewMarketsSkeleton />}>
          <ListViewMarkets event={data} />
        </Suspense>
      </div>

      {/* mobile row 2: time + odds-count shortcut + chart */}
      <div className='relative flex items-center justify-between gap-4 lg:contents'>
        <time
          suppressHydrationWarning
          dateTime={data.startTime}
          className='text-secondary shrink-0 text-xs leading-relaxed lg:order-1 lg:w-16 lg:text-center'
        >
          {getRelativeDayLabel(data.startTime)} <span className='lg:hidden'>·</span>
          <br className='hidden lg:block' /> {format(data.startTime, 'HH:mm')}
        </time>

        <div className='flex items-center lg:order-5 lg:w-24 lg:justify-end'>
          {data.oddCount > 0 && (
            <Link
              href={`/sport/event/${data.id}`}
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              onMouseEnter={prefetch}
              onMouseDown={prefetch}
              onFocus={prefetch}
            >
              +{data.oddCount}
            </Link>
          )}
          <Button variant='ghost' size='icon-sm' className='rounded-full'>
            <ChartNoAxesColumnIcon />
          </Button>
        </div>
      </div>

      <Separator orientation='vertical' className='hidden lg:order-2 lg:block' />
    </div>
  )
}

export function PrematchEventSkeleton() {
  return <Skeleton className='bg-muted h-24 w-full lg:h-27' />
}
