'use client'

import { sortBy } from 'lodash'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import type { MarketCard$key } from '@/app/sport/event/[id]/__generated__/MarketCard.graphql'
import { cn } from '@/lib/utils'

/**
 * Odds layout rule, driven purely by outcome count:
 * - 2-4 outcomes: single row, one column per outcome
 * - count % 3 === 0 (6, 9, 12, ...): grid split into rows of 3
 * - everything else (1, 5, 7, 8, >9 non-multiples of 3): full-width
 *   flex-wrap, each outcome grows to fill (`flex-1`)
 */
function getOutcomesLayout(count: number): { container: string; item: string } {
  if (count % 3 === 0) return { container: 'grid grid-cols-3 gap-1.5', item: '' }
  if (count === 2) return { container: 'grid grid-cols-2 gap-1.5', item: '' }
  if (count === 4) return { container: 'grid grid-cols-4 gap-1.5', item: '' }
  return { container: 'flex flex-wrap gap-1.5', item: 'flex-1 min-w-20' }
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
    <div
      className={cn(
        'flex flex-col gap-2 rounded-xl border border-white/5 bg-black/20 p-4',
        suspended && 'opacity-50'
      )}
    >
      <div className='text-secondary flex items-center justify-between text-xs font-medium'>
        <span className='truncate'>{market.name}</span>
        {market.line && <span className='text-foreground/70'>{market.line}</span>}
      </div>

      <div className={container}>
        {sortBy(market.outcomes, e => e.index).map(outcome => (
          <Toggle.Root
            key={outcome.id}
            disabled={suspended || outcome.status !== 'OPEN'}
            suppressHydrationWarning
            className={cn(
              'group hover:bg-primary/5 hover:border-primary/20 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-col items-center justify-center gap-0.5 rounded-lg border border-white/5 bg-black/20 py-2 transition disabled:pointer-events-none',
              item
            )}
          >
            <span className='group-data-[state=on]:text-foreground text-secondary text-[0.7rem]'>
              {outcome.name}
            </span>
            <span
              className='group-data-[state=on]:text-primary text-foreground text-sm font-semibold'
              suppressHydrationWarning
            >
              {outcome.price}
            </span>
          </Toggle.Root>
        ))}
      </div>
    </div>
  )
}
