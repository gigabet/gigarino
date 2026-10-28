'use client'

import { atom, useAtom, useAtomValue } from 'jotai'
import { entries, keys, minBy, sortBy } from 'lodash'
import { LockKeyhole } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import { OddDelta } from '@/components/odd-delta'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { useT } from '@/context/providers'
import { tKey } from '@/i18n/tKey'
import { cn, swap } from '@/lib/utils'
import type {
  ListViewMarket$key,
  OutcomeStatus,
} from '@/relay/__generated__/ListViewMarket.graphql'
import type { ListViewMarkets$key } from '@/relay/__generated__/ListViewMarkets.graphql'

// Odds area: grows first (huge grow factor) up to a cap of 4 cells + gaps,
// so everything beyond the cap flows to the name block.
export const MARKETS_COL =
  '@container/markets flex min-w-0 flex-[1_1_10.5rem] max-w-212 items-center justify-end gap-4 lg:flex-[1000_1_0%] xl:max-w-252'

// One odds column. No max-w: it fills the container.
export const MARKET_CELL = 'min-w-42 flex-1'

// Teams + score block in a row
export const ROW_LEAD = 'min-w-0 shrink-0 grow basis-34 sm:basis-40 lg:basis-60'

// Tournament title block in a header row
export const HEADER_LEAD = 'min-w-0 shrink-0 grow basis-34 overflow-hidden sm:basis-44 lg:basis-90'

const marketVisibility = [
  '', // (10.5 + 1 + 10.5) + 11.5 + 11.5...
  'hidden @min-[22rem]/markets:flex', // 352px
  'hidden @min-[33.5rem]/markets:flex', // 536px
  'hidden @min-[45rem]/markets:flex', // 720px
]

const availableMarkets = {
  match_winner: tKey('Match Winner'),
  over_under: tKey('Over/Under'),
  draw_no_bet: tKey('Draw No Bet'),
  double_chance: tKey('Double Chance'),
  handicap: tKey('Handicap'),
  even_odd: tKey('Even/Odd'),
  both_teams_to_score: tKey('Both to Score'),
}
export const selectedMarketsState = atom(
  keys(availableMarkets) as (keyof typeof availableMarkets)[]
)

type PickableMarket = {
  kind: string
  period: string
  line: unknown
  outcomes: ReadonlyArray<{ price: unknown }>
}

/** One market per column: full-time only, and the main line when there are several. */
function pickMarket<T extends PickableMarket>(markets: ReadonlyArray<T>, kind: string): T | null {
  const all = markets.filter(m => m.kind === kind)
  const fullTime = all.filter(m => m.period === 'FULL_TIME' || m.period === 'INCLUDING_OVERTIME')
  const pool = fullTime.length > 0 ? fullTime : all
  if (pool.length < 2 || pool.some(m => m.line == null)) return pool[0] ?? null

  const spread = (m: T) => {
    const prices = m.outcomes.map(o => Number(o.price))
    return Math.max(...prices) - Math.min(...prices)
  }
  return minBy(pool, spread) ?? null
}

export function ListViewMarkets(props: { event: ListViewMarkets$key }) {
  const data = useFragment(
    graphql`
      fragment ListViewMarkets on Event {
        markets {
          id
          kind
          period
          line
          outcomes {
            price
          }
          ...ListViewMarket
        }
      }
    `,
    props.event
  )

  const selectedMarkets = useAtomValue(selectedMarketsState)

  if (!data?.markets) return <div className='ml-auto grow' />

  const marketByKind = (kind: string) => pickMarket(data.markets, kind)
  const sortedMarkets = selectedMarkets.map(marketByKind)

  return (
    <div className={cn(MARKETS_COL, 'lg:order-4')}>
      {sortedMarkets.map((market, i) =>
        market ? (
          <Market key={market.id} className={marketVisibility[i] ?? 'hidden'} market={market} />
        ) : (
          <div
            key={selectedMarkets[i]}
            className={cn(MARKET_CELL, 'flex h-15 gap-1', marketVisibility[i] ?? 'hidden')}
          />
        )
      )}
    </div>
  )
}

export function ListViewMarketsSkeleton() {
  return (
    <div className={cn(MARKETS_COL, 'lg:order-4')}>
      {[0, 1, 2, 3].map(i => (
        <MarketSkeleton key={i} className={marketVisibility[i] ?? 'hidden'} />
      ))}
    </div>
  )
}

export function ListViewMarketDropdowns() {
  const [selectedMarkets, setSelectedMarkets] = useAtom(selectedMarketsState)
  const t = useT()

  return (
    <div className={cn(MARKETS_COL, 'text-foreground')}>
      {selectedMarkets.map((market, i) => (
        <Select
          key={market}
          value={market}
          onValueChange={(value: keyof typeof availableMarkets) =>
            setSelectedMarkets(markets => {
              const targetIndex = markets.indexOf(value)
              return targetIndex === -1
                ? markets.map((m, mi) => (mi === i ? value : m))
                : swap(markets, i, targetIndex)
            })
          }
        >
          <SelectTrigger className={cn(MARKET_CELL, marketVisibility[i] ?? 'hidden')} size='sm'>
            <SelectValue>{t(availableMarkets[market])}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {entries(availableMarkets).map(([kind, name]) => (
              <SelectItem key={kind} value={kind}>
                {t(name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}

function Market(props: { className?: string; market: ListViewMarket$key }) {
  const data = useFragment(
    graphql`
      fragment ListViewMarket on Market {
        kind
        line
        outcomes {
          id
          index
          key
          price
          status
        }
      }
    `,
    props.market
  )

  return (
    <div className={cn(MARKET_CELL, 'flex h-15 gap-1', props.className)}>
      {sortBy(data.outcomes, e => e.index).map(odd => (
        <OddToggle
          key={odd.id}
          odd={odd}
          line={data.kind === 'over_under' && data.line != null ? String(Number(data.line)) : null}
        />
      ))}
    </div>
  )
}

function OddToggle(props: {
  odd: { id: string; key: string; price: unknown; status: OutcomeStatus }
  line?: string | null
}) {
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(Number(props.odd.price))

  return (
    <Toggle.Root
      suppressHydrationWarning
      className={cn(
        'group hover:bg-primary/5 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/10 bg-black/20 transition-all disabled:pointer-events-none disabled:opacity-40',
        'data-[state=on]:shadow-[0_0_12px]',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(props.odd.id)}
      onPressedChange={() => toggleOdd(props.odd.id)}
      disabled={props.odd.status !== 'OPEN'}
    >
      <span className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary text-xs group-data-[state=on]:text-shadow-[0_0_8px]'>
        <span className='capitalize'>{props.odd.key}</span>
        {props.line && <span> {props.line}</span>}
      </span>
      <span className='group-data-[state=on]:text-primary text-shadow-primary/70 text-foreground relative flex flex-col items-center justify-center gap-1 text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'>
        {props.odd.status === 'OPEN' ? (
          <>
            <span suppressHydrationWarning>{Number(props.odd.price).toFixed(2)}</span>
            <OddDelta price={Number(props.odd.price)} />
          </>
        ) : (
          <LockKeyhole className='size-3' />
        )}
      </span>
    </Toggle.Root>
  )
}

function MarketSkeleton(props: { className?: string }) {
  return (
    <div className={cn(MARKET_CELL, 'flex h-15 gap-1', props.className)}>
      <Skeleton className='h-full w-full flex-1' />
      <Skeleton className='h-full w-full flex-1' />
      <Skeleton className='h-full w-full flex-1' />
    </div>
  )
}
