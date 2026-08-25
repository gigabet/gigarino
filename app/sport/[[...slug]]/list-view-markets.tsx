'use client'

import { atom, useAtom, useAtomValue } from 'jotai'
import { entries, keys, sortBy } from 'lodash'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import type { ListViewMarkets$key } from '@/app/sport/[[...slug]]/__generated__/ListViewMarkets.graphql'
import type { PrematchMarket$key } from '@/app/sport/[[...slug]]/__generated__/PrematchMarket.graphql'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { cn, swap } from '@/lib/utils'

const marketVisibility = [
  '', //                                 w-42 = 168, gap-4 = 16
  'hidden @min-[352px]/markets:flex', // 168 + 16 + 168 = 352
  'hidden @min-[536px]/markets:flex', // 168 + 16 + 168 + 16 + 168 = 536
  'hidden @min-[720px]/markets:flex', // 168 + 16 + 168 + 16 + 168 + 16 + 168 = 720
]

const availableMarkets = {
  match_winner: 'Match Winner',
  over_under: 'Over/Under',
  double_chance: 'Double Chance',
  both_teams_to_score: 'Both to Score',
}
const selectedMarketsState = atom(keys(availableMarkets) as (keyof typeof availableMarkets)[])

export function ListViewMarkets(props: { event: ListViewMarkets$key }) {
  const data = useFragment(
    graphql`
      fragment ListViewMarkets on PrematchEvent {
        markets {
          id
          kind
          ...PrematchMarket
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
          <Market key={market.id} className={marketVisibility[i]} market={market} />
        ) : (
          <div
            key={selectedMarkets[i]}
            className={cn(
              'flex h-15 max-w-50 min-w-42 flex-1 grow gap-1 xl:max-w-60',
              marketVisibility[i]
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
        <MarketSkeleton key={i} className={marketVisibility[i]} />
      ))}
    </div>
  )
}

export function ListViewMarketDropdowns() {
  const [selectedMarkets, setSelectedMarkets] = useAtom(selectedMarketsState)

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
                ? markets.map((m, idx) => (idx === i ? value : m))
                : swap(markets, i, targetIndex)
            })
          }
        >
          <SelectTrigger
            className={cn('max-w-50 min-w-42 flex-1 xl:max-w-60', marketVisibility[i])}
            size='sm'
          >
            <SelectValue>{availableMarkets[market]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {entries(availableMarkets).map(([kind, name]) => (
              <SelectItem key={kind} value={kind}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          index
          name
          price
        }
      }
    `,
    props.market
  )

  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()

  return (
    <div
      className={cn('flex h-15 max-w-50 min-w-42 flex-1 grow gap-1 xl:max-w-60', props.className)}
    >
      {sortBy(data.outcomes, e => e.index).map(odd => (
        <Toggle.Root
          suppressHydrationWarning
          key={odd.id}
          className='group hover:bg-primary/5 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition transition-all data-[state=on]:shadow-[0_0_12px]'
          pressed={hasOdd(odd.id)}
          onPressedChange={() => toggleOdd(odd.id)}
        >
          <span className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary text-xs group-data-[state=on]:text-shadow-[0_0_8px]'>
            {odd.name}
          </span>
          <span
            className='group-data-[state=on]:text-primary text-shadow-primary/70 text-foreground text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'
            suppressHydrationWarning
          >
            {Number(odd.price).toFixed(2)}
          </span>
        </Toggle.Root>
      ))}
    </div>
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
