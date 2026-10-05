'use client'

import { atom, useAtom, useAtomValue } from 'jotai'
import { entries, keys, sortBy } from 'lodash'
import { ChevronsUpIcon, PlusIcon, TrendingUpIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { Toggle } from 'radix-ui'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { graphql, useFragment } from 'react-relay'
import type { ListViewMarket$key } from '@/components/__generated__/ListViewMarket.graphql'
import type { ListViewMarkets$key } from '@/components/__generated__/ListViewMarkets.graphql'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useDelta, useUpDown } from '@/context/hooks'
import { useT } from '@/context/providers'
import { tKey } from '@/i18n/tKey'
import { cn, swap } from '@/lib/utils'

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

export function ListViewMarkets(props: { event: ListViewMarkets$key }) {
  const data = useFragment(
    graphql`
      fragment ListViewMarkets on Event {
        markets {
          id
          kind
          ...ListViewMarket
        }
      }
    `,
    props.event
  )

  const selectedMarkets = useAtomValue(selectedMarketsState)

  if (!data?.markets) return <div className='ml-auto grow' />

  const marketByKind = (kind: string) => data.markets.find(m => m.kind === kind) ?? null
  const sortedMarkets = selectedMarkets.map(marketByKind)

  return (
    <div className='@container/markets flex min-w-0 flex-1 items-center justify-end gap-4 lg:order-4'>
      {sortedMarkets.map((market, i) =>
        market ? (
          <Market key={market.id} className={marketVisibility[i] ?? 'hidden'} market={market} />
        ) : (
          <div
            key={selectedMarkets[i]}
            className={cn(
              'flex h-15 max-w-50 min-w-42 flex-1 grow gap-1 xl:max-w-60',
              marketVisibility[i] ?? 'hidden'
            )}
          />
        )
      )}
    </div>
  )
}

export function ListViewMarketsSkeleton() {
  return (
    <div className='@container/markets flex min-w-0 flex-1 items-center justify-end gap-4 lg:order-4'>
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
    <div className='text-foreground @container/markets flex min-w-0 flex-1 items-center justify-end gap-4'>
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
          <SelectTrigger
            className={cn('max-w-50 min-w-42 flex-1 xl:max-w-60', marketVisibility[i] ?? 'hidden')}
            size='sm'
          >
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
        outcomes {
          id
          index
          name
          key
          price
        }
      }
    `,
    props.market
  )

  return (
    <div
      className={cn('flex h-15 max-w-50 min-w-42 flex-1 grow gap-1 xl:max-w-60', props.className)}
    >
      {sortBy(data.outcomes, e => e.index).map(odd => (
        <OddToggle key={odd.id} odd={odd} />
      ))}
    </div>
  )
}

function OddToggle(props: { odd: { id: string; name: string; key: string; price: unknown } }) {
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(Number(props.odd.price))
  const delta = useDelta(Number(props.odd.price))

  return (
    <Toggle.Root
      suppressHydrationWarning
      className={cn(
        'group hover:bg-primary/5 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition-all',
        'data-[state=on]:shadow-[0_0_12px]',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(props.odd.id)}
      onPressedChange={() => toggleOdd(props.odd.id)}
    >
      <span className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary text-xs group-data-[state=on]:text-shadow-[0_0_8px]'>
        {props.odd.name.length > 12 ? (
          <span className='capitalize'>{props.odd.key}</span>
        ) : (
          props.odd.name
        )}
      </span>
      <span className='group-data-[state=on]:text-primary text-shadow-primary/70 text-foreground relative flex flex-col items-center justify-center gap-1 text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'>
        <span suppressHydrationWarning>{Number(props.odd.price).toFixed(2)}</span>
        {delta !== 0 && (
          <motion.span
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 18 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.4 }}
            className={cn(
              'absolute text-[0.6rem]',
              delta > 0 ? 'text-primary' : 'text-destructive'
            )}
          >
            {delta > 0 && '+'}
            {delta.toFixed(2)}
          </motion.span>
        )}
      </span>
    </Toggle.Root>
  )
}

function MarketSkeleton(props: { className?: string }) {
  return (
    <div
      className={cn('flex h-15 max-w-50 min-w-42 flex-1 grow gap-1 xl:max-w-60', props.className)}
    >
      <Skeleton className='h-full w-full flex-1' />
      <Skeleton className='h-full w-full flex-1' />
      <Skeleton className='h-full w-full flex-1' />
    </div>
  )
}
