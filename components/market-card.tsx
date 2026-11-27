'use client'

import { sortBy } from 'lodash'
import { LockKeyhole } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import { OddDelta } from '@/components/odd-delta'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { useT } from '@/context/providers'
import {
  fitOutcomeLabels,
  shortOutcomeName,
  translateMarketName,
  translateOutcomeName,
  translateSuspensionReason,
} from '@/lib/api-names'
import { cn } from '@/lib/utils'
import type { MarketCard$key } from '@/relay/__generated__/MarketCard.graphql'

function getOutcomesLayout(count: number) {
  if (count === 2) return 'grid-cols-2'
  if (count === 4) return 'grid-cols-4'
  return 'grid-cols-3'
}

// Roughly how many characters of text-xs fit across a mobile-width card, shared by its columns.
const ROW_CHARS = 28

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
        suspensionReason
        outcomes {
          id
          index
          name
          price
          status
          suspensionReason
        }
      }
    `,
    props.market
  )

  const t = useT()
  const suspended = market.status !== 'OPEN'
  // the whole market is paused, or only some of its selections are
  const reason =
    market.suspensionReason ?? market.outcomes.find(o => o.suspensionReason)?.suspensionReason

  const line = market.line == null ? '' : String(Math.abs(Number(market.line)))
  const withLine = (label: string) => (line && !label.includes(line) ? `${label} ${line}` : label)

  const outcomes = sortBy(market.outcomes, e => e.index)
  const labels = fitOutcomeLabels(
    outcomes.map(odd => {
      const tag = shortOutcomeName(odd.name)
      return {
        label: withLine(translateOutcomeName(t, odd.name)),
        short: tag && withLine(tag),
      }
    }),
    Math.floor(ROW_CHARS / outcomes.length)
  )

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-secondary text-xs'>{translateMarketName(t, market.name)}</p>
      {reason && (
        <p className='text-warning -mt-1 flex items-center gap-1 text-[0.65rem]'>
          <LockKeyhole className='size-3' />
          {translateSuspensionReason(t, reason)}
        </p>
      )}

      <div className={cn('grid gap-2', getOutcomesLayout(market.outcomes.length))}>
        {outcomes.map((odd, i) => (
          <OutcomeToggle
            key={odd.id}
            odd={{ ...odd, label: labels[i].text, title: labels[i].title }}
            suspended={suspended}
          />
        ))}
      </div>
    </div>
  )
}

function OutcomeToggle(props: {
  odd: {
    id: string
    label: string
    title?: string
    price: unknown
    status: string
  }
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
        'group hover:bg-brand/10 hover:border-brand/60 shadow-primary/60 data-[state=on]:border-brand data-[state=on]:bg-brand/10 border-control-border bg-control flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-lg border transition-all disabled:pointer-events-none disabled:opacity-40',
        'data-[state=on]:shadow-[0_0_12px]',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(props.odd.id)}
      onPressedChange={() => toggleOdd(props.odd.id)}
    >
      <span
        title={props.odd.title}
        className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary max-w-full text-xs group-data-[state=on]:text-shadow-[0_0_8px]'
      >
        {props.odd.label}
      </span>
      <span className='group-data-[state=on]:text-brand text-shadow-primary/70 text-foreground relative flex flex-col items-center justify-center gap-1 text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'>
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
