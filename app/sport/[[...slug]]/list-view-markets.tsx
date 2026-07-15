'use client'

import { atom, useAtom, useAtomValue } from 'jotai'
import { entries, indexOf, keys } from 'lodash'
import { ChevronDown } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import type { ListViewMarkets$key } from '@/app/sport/[[...slug]]/__generated__/ListViewMarkets.graphql'
import type { PrematchMarket$key } from '@/app/sport/[[...slug]]/__generated__/PrematchMarket.graphql'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn, swap } from '@/lib/utils'

const marketVisibility = [
  '',
  'hidden @md/markets:flex',
  'hidden @2xl/markets:flex',
  'hidden @4xl/markets:flex',
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
  const findMarketByPrefix = (prefix: string) =>
    data.markets.find(m => m.kind.startsWith(prefix)) ?? null
  const sortedMarkets = selectedMarkets.map(findMarketByPrefix)

  return (
    <div className='@container/markets ml-auto flex grow items-center justify-end gap-4'>
      {sortedMarkets.map((market, i) =>
        market ? (
          <Market key={market.id} className={marketVisibility[i]} market={market} />
        ) : (
          <div
            key={selectedMarkets[i]}
            className={cn('flex h-15 max-w-60 min-w-50 flex-1 grow gap-1', marketVisibility[i])}
          />
        )
      )}
    </div>
  )
}

export function ListViewMarketDropdowns() {
  const [selectedMarkets, setSelectedMarkets] = useAtom(selectedMarketsState)

  return (
    <div className='text-foreground @container/markets ml-auto flex grow items-center justify-end gap-4'>
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
          <SelectTrigger className={cn('max-w-60 min-w-50 flex-1', marketVisibility[i])} size='sm'>
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
        // <div
        //   key={market}
        //   className={cn(
        //     'flex max-w-60 min-w-50 flex-1 items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all',
        //     marketVisibility[i]
        //   )}
        // >
        //   <span>{availableMarkets[market]}</span>
        //   <ChevronDown className='size-4' />
        // </div>
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
    <div className={cn('flex h-15 max-w-60 min-w-50 flex-1 grow gap-1', props.className)}>
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
