'use client'

import { sortBy } from 'lodash'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import type { MarketCard$key } from '@/app/sport/event/[id]/__generated__/MarketCard.graphql'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn } from '@/lib/utils'

function getOutcomesLayout(count: number): { container: string; item: string } {
  if (count === 2) return { container: 'grid grid-cols-2 gap-1.5', item: '' }
  if (count === 4) return { container: 'grid grid-cols-4 gap-1.5', item: '' }
  return { container: 'grid grid-cols-3 gap-1.5', item: '' }
}

export default function MarketCard(props: { market: MarketCard$key }) {
  const market = useFragment(
    graphql`
      fragment MarketCard on Market {
        name
        line
        status
        outcomes {
          id
          index
          name
          price
          status
        }
      }
    `,
    props.market
  )

  const suspended = market.status !== 'OPEN'
  const { container, item } = getOutcomesLayout(market.outcomes.length)

  return (
    <div className={cn('flex flex-col gap-2', suspended && 'opacity-50')}>
      <div className='text-secondary truncate text-xs font-medium'>
        <span>{market.name}</span> {!!market.line && <span>{market.line}</span>}
      </div>

      <div className={container}>
        {sortBy(market.outcomes, e => e.index).map(odd => (
          <OutcomeToggle key={odd.id} odd={odd} suspended={suspended} className={item} />
        ))}
      </div>
    </div>
  )
}

function OutcomeToggle(props: {
  odd: { id: string; name: string; price: unknown; status: string }
  suspended: boolean
  className?: string
}) {
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(Number(props.odd.price))

  return (
    <Toggle.Root
      disabled={props.suspended || props.odd.status !== 'OPEN'}
      suppressHydrationWarning
      className={cn(
        'group hover:bg-primary/5 hover:border-primary/20 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-col items-center justify-center gap-0.5 rounded-lg border border-white/5 bg-black/20 py-2 transition disabled:pointer-events-none',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down',
        props.className
      )}
      pressed={hasOdd(props.odd.id)}
      onPressedChange={() => toggleOdd(props.odd.id)}
    >
      <span className='group-data-[state=on]:text-foreground text-secondary text-[0.7rem]'>
        {props.odd.name}
      </span>
      <span
        className='group-data-[state=on]:text-primary text-foreground text-sm font-semibold'
        suppressHydrationWarning
      >
        {Number(props.odd.price).toFixed(2)}
      </span>
    </Toggle.Root>
  )
}
