'use client'

import { sortBy } from 'lodash'
import { LockKeyhole } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import { OddDelta } from '@/components/odd-delta'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn } from '@/lib/utils'
import type { MarketCard$key } from '@/relay/__generated__/MarketCard.graphql'

function getOutcomesLayout(count: number) {
  if (count === 2) return 'grid-cols-2'
  if (count === 4) return 'grid-cols-4'
  return 'grid-cols-3'
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

export default function MarketCard(props: {
  market: MarketCard$key
  /** The group header text. A name that only repeats it is dropped. */
  header?: string
}) {
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

  const line = market.line == null ? '' : String(Number(market.line))
  const outcomeLabel = (name: string) => (line && !name.includes(line) ? `${name} ${line}` : name)

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-secondary text-xs'>{market.name}</p>

      <div className={cn('grid gap-2', getOutcomesLayout(market.outcomes.length))}>
        {sortBy(market.outcomes, e => e.index).map(odd => (
          <OutcomeToggle
            key={odd.id}
            odd={{ ...odd, name: outcomeLabel(odd.name) }}
            suspended={suspended}
          />
        ))}
      </div>
    </div>
  )
}

function OutcomeToggle(props: {
  odd: { id: string; name: string; price: unknown; status: string }
  suspended: boolean
}) {
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(Number(props.odd.price))
  const locked = props.suspended || props.odd.status !== 'OPEN'

  return (
    <Toggle.Root
      disabled={locked}
      suppressHydrationWarning
      className={cn(
        'group hover:bg-primary/5 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border border-white/15 bg-transparent px-2 py-2 transition-all disabled:pointer-events-none disabled:opacity-40',
        'data-[state=on]:shadow-[0_0_12px]',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(props.odd.id)}
      onPressedChange={() => toggleOdd(props.odd.id)}
    >
      <span className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary text-xs group-data-[state=on]:text-shadow-[0_0_8px]'>
        {props.odd.name}
      </span>
      <span className='group-data-[state=on]:text-primary text-shadow-primary/70 text-foreground relative flex flex-col items-center justify-center gap-1 text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'>
        {locked ? (
          <LockKeyhole className='size-3.5' />
        ) : (
          <>
            <span suppressHydrationWarning>{Number(props.odd.price).toFixed(2)}</span>
            <OddDelta price={Number(props.odd.price)} />
          </>
        )}
      </span>
    </Toggle.Root>
  )
}
