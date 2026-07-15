'use client'
import { format } from 'date-fns'
import { ChartNoAxesColumnIcon, ImageIcon } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import type { ListViewMarkets$key } from '@/app/sport/[[...slug]]/__generated__/ListViewMarkets.graphql'
import type { PrematchEvent$key } from '@/app/sport/[[...slug]]/__generated__/PrematchEvent.graphql'
import type { PrematchMarket$key } from '@/app/sport/[[...slug]]/__generated__/PrematchMarket.graphql'
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
        ...ListViewMarkets
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

      <Markets event={data} />

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

const marketVisibility = [
  '',
  'hidden @md/markets:flex',
  'hidden @2xl/markets:flex',
  'hidden @4xl/markets:flex',
]
function Markets(props: { event: ListViewMarkets$key }) {
  const data = useFragment(
    graphql`
      fragment ListViewMarkets on PrematchEvent {
        markets {
          id
          ...PrematchMarket
        }
      }
    `,
    props.event
  )

  return (
    <div className='@container/markets ml-auto flex grow items-center justify-end gap-4'>
      {data.markets.map((market, i) => (
        <Market key={market.id} className={marketVisibility[i]} market={market} />
      ))}
    </div>
  )
}

function Market(props: { className?: string; market: PrematchMarket$key }) {
  const data = useFragment(
    graphql`
      fragment PrematchMarket on Market {
        outcomes {
          id
          name
          price
        }
      }
    `,
    props.market
  )

  return (
    <div className={cn('flex h-15 max-w-60 min-w-50 grow gap-1', props.className)}>
      {data.outcomes.map(odd => (
        <Toggle.Root
          key={odd.id}
          className='group hover:bg-primary/5 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition transition-all data-[state=on]:shadow-[0_0_12px]'
        >
          <span className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary text-xs group-data-[state=on]:text-shadow-[0_0_8px]'>
            {odd.name}
          </span>
          <span
            className='group-data-[state=on]:text-primary text-shadow-primary/70 text-foreground text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'
            suppressHydrationWarning
          >
            {odd.price}
          </span>
        </Toggle.Root>
      ))}
    </div>
  )
}
