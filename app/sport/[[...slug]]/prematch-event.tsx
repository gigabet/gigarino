'use client'
import { format } from 'date-fns'
import { ChartNoAxesColumnIcon, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useRef } from 'react'
import { fetchQuery, graphql, useFragment, useRelayEnvironment } from 'react-relay'
import type { PrematchEvent$key } from '@/app/sport/[[...slug]]/__generated__/PrematchEvent.graphql'
import { ListViewMarkets, ListViewMarketsSkeleton } from '@/app/sport/[[...slug]]/list-view-markets'
import PrematchSingleViewQueryNode from '@/app/sport/event/[id]/__generated__/PrematchSingleViewQuery.graphql'
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
        awayCompetitor
        startTime
        oddCount
        ...ListViewMarkets @defer
      }
    `,
    props.node
  )

  const env = useRelayEnvironment()
  // const hasPrefetched = useRef(false)
  const prefetch = () => {
    // if (hasPrefetched.current) return
    // hasPrefetched.current = true
    fetchQuery(
      env,
      PrematchSingleViewQueryNode,
      { id: data.id },
      { fetchPolicy: 'store-or-network' }
    ).subscribe({
      // error: () => (hasPrefetched.current = false),
    })
  }

  return (
    <div className='flex flex-col gap-2 border-b py-3 last:border-b-0 sm:gap-3 sm:rounded-2xl sm:border-b-0 sm:border-white/5 sm:bg-black/20 sm:px-4 lg:h-27 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-4 lg:px-5'>
      {/* mobile row 1: teams + odds */}
      <div className='flex items-center gap-4 lg:contents'>
        <div className='flex w-28 min-w-0 shrink-0 flex-col gap-1 overflow-hidden text-xs sm:w-40 sm:gap-2 sm:text-sm lg:order-3 lg:ml-1 lg:w-60 lg:flex-none'>
          <div className='flex items-center gap-2'>
            <div className='bg-dark-300 text-muted-foreground flex size-6 min-w-6 items-center justify-center rounded-full'>
              <ImageIcon className='size-3' />
            </div>{' '}
            <span className='truncate'>{data.homeCompetitor}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-dark-300 text-muted-foreground flex size-6 min-w-6 items-center justify-center rounded-full'>
              <ImageIcon className='size-3' />
            </div>{' '}
            <span className='truncate'>{data.awayCompetitor}</span>
          </div>
        </div>

        <Suspense fallback={<ListViewMarketsSkeleton />}>
          <ListViewMarkets event={data} />
        </Suspense>
      </div>

      {/* mobile row 2: time + odds-count shortcut + chart */}
      <div className='flex items-center justify-between gap-4 lg:contents'>
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
