'use client'
import { format } from 'date-fns'
import { ChartNoAxesColumnIcon, ImageIcon } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { Suspense } from 'react'
import { graphql, useFragment } from 'react-relay'
import type { ListViewMarkets$key } from '@/app/sport/[[...slug]]/__generated__/ListViewMarkets.graphql'
import type { PrematchEvent$key } from '@/app/sport/[[...slug]]/__generated__/PrematchEvent.graphql'
import type { PrematchMarket$key } from '@/app/sport/[[...slug]]/__generated__/PrematchMarket.graphql'
import { ListViewMarkets, ListViewMarketsSkeleton } from '@/app/sport/[[...slug]]/list-view-markets'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, getRelativeDayLabel } from '@/lib/utils'

export default function PrematchEvent(props: { node: PrematchEvent$key }) {
  const data = useFragment(
    graphql`
      fragment PrematchEvent on PrematchEvent {
        homeCompetitor
        awayCompetitor
        startTime
        ...ListViewMarkets @defer
      }
    `,
    props.node
  )

  return (
    <div className='flex h-27 flex-nowrap items-center gap-4 rounded-2xl border-white/5 bg-black/20 px-5 py-3'>
      <time
        suppressHydrationWarning
        dateTime={data.startTime}
        className='text-secondary w-16 truncate text-center text-xs leading-relaxed'
      >
        {getRelativeDayLabel(data.startTime)}
        <br />
        {format(data.startTime, 'HH:mm')}
      </time>
      <Separator orientation='vertical' />
      <div className='ml-1 flex w-60 flex-col gap-2 overflow-hidden text-sm'>
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

      <div className='flex w-24 justify-end'>
        <Button variant='ghost' size='sm'>
          +126
        </Button>
        <Button variant='ghost' size='icon-sm' className='rounded-full'>
          <ChartNoAxesColumnIcon />
        </Button>
      </div>
    </div>
  )
}

export function PrematchEventSkeleton() {
  return <Skeleton className='bg-muted h-27 w-full' />
}
