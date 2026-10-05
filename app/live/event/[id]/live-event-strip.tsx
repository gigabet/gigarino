'use client'

import { sortBy } from 'lodash'
import Link from 'next/link'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import type { LiveEventStrip$key } from '@/app/live/event/[id]/__generated__/LiveEventStrip.graphql'
import type { LiveStripMarket$key } from '@/app/live/event/[id]/__generated__/LiveStripMarket.graphql'
import type { LiveStripOdd$key } from '@/app/live/event/[id]/__generated__/LiveStripOdd.graphql'
import type { LiveStripOdds$key } from '@/app/live/event/[id]/__generated__/LiveStripOdds.graphql'
import { LiveScore, LiveTeams, LiveTime } from '@/app/live/live-event'
import { useLiveRowRegistration } from '@/app/live/live-subscriptions'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn } from '@/lib/utils'
import { useT } from '@/context/providers'

export default function LiveEventStrip(props: { event: LiveEventStrip$key; active: boolean }) {
  const data = useFragment(
    graphql`
      fragment LiveEventStrip on LiveEvent {
        id
        tradingStatus
        ...LiveTime
        ...LiveTeams
        ...LiveScore
        ...LiveStripOdds
      }
    `,
    props.event
  )

  useLiveRowRegistration(data.id)
  const t = useT()

  return (
    <div
      className={cn(
        'relative flex flex-col gap-2 rounded-xl border p-3 transition-colors',
        props.active
          ? 'border-primary bg-primary/10 shadow-primary/30 shadow-[0_0_12px]'
          : 'border-white/5 bg-black/20 hover:border-white/20',
        data.tradingStatus === 'SUSPENDED' && 'opacity-60'
      )}
    >
      {props.active && (
        <span className='bg-primary text-primary-foreground absolute -top-2 left-3 rounded-full px-2 py-0.5 text-[0.6rem] font-bold tracking-wide uppercase'>
          {t('Viewing')}
        </span>
      )}
      <Link
        href={`/live/event/${data.id}`}
        replace
        aria-current={props.active || undefined}
        className={cn('flex flex-col gap-2 text-xs', props.active && 'pointer-events-none')}
      >
        <div className='text-secondary text-[0.65rem]'>
          <LiveTime event={data} />
        </div>
        <div className='flex min-w-0 justify-between gap-2'>
          <LiveTeams event={data} />
          <LiveScore event={data} />
        </div>
      </Link>

      <LiveStripOdds event={data} />
    </div>
  )
}

function LiveStripOdds(props: { event: LiveStripOdds$key }) {
  const data = useFragment(
    graphql`
      fragment LiveStripOdds on LiveEvent {
        tradingStatus
        markets(groups: [MAIN]) {
          id
          kind
          ...LiveStripMarket
        }
      }
    `,
    props.event
  )

  const market = data.markets.find(m => m.kind === 'match_winner') ?? data.markets[0] ?? null
  if (!market) return null

  return <LiveStripMarket market={market} suspended={data.tradingStatus === 'SUSPENDED'} />
}

function LiveStripMarket(props: { market: LiveStripMarket$key; suspended: boolean }) {
  const market = useFragment(
    graphql`
      fragment LiveStripMarket on Market {
        outcomes {
          id
          index
          ...LiveStripOdd
        }
      }
    `,
    props.market
  )

  return (
    <div className='flex gap-1.5'>
      {sortBy(market.outcomes, o => o.index).map(outcome => (
        <LiveStripOdd key={outcome.id} outcome={outcome} suspended={props.suspended} />
      ))}
    </div>
  )
}

function LiveStripOdd(props: { outcome: LiveStripOdd$key; suspended: boolean }) {
  const outcome = useFragment(
    graphql`
      fragment LiveStripOdd on Outcome {
        id
        name
        price
        status
      }
    `,
    props.outcome
  )

  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(Number(outcome.price))

  return (
    <Toggle.Root
      disabled={props.suspended || outcome.status !== 'OPEN'}
      suppressHydrationWarning
      className={cn(
        'group/odd hover:bg-primary/5 hover:border-primary/20 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-white/5 bg-black/20 py-1.5 transition disabled:pointer-events-none disabled:opacity-40',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(outcome.id)}
      onPressedChange={() => toggleOdd(outcome.id)}
    >
      <span className='text-secondary group-data-[state=on]/odd:text-foreground text-[0.6rem]'>
        {outcome.name}
      </span>
      <span
        className='text-foreground group-data-[state=on]/odd:text-primary text-xs font-semibold'
        suppressHydrationWarning
      >
        {Number(outcome.price).toFixed(2)}
      </span>
    </Toggle.Root>
  )
}
