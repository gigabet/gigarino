'use client'

import { entries, groupBy, sortBy } from 'lodash'
import { Accordion } from 'radix-ui'
import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { graphql, useFragment } from 'react-relay'
import MarketCard from '@/components/market-card'
import { Skeleton } from '@/components/ui/skeleton'
import * as Tabs from '@/components/ui/tabs'
import { useT } from '@/context/providers'
import { tKeysObj } from '@/i18n/tKey'
import { translateMarketKind } from '@/lib/api-names'
import type {
  MarketGroup,
  MarketGroups$data,
  MarketGroups$key,
} from '@/relay/__generated__/MarketGroups.graphql'
import type { KnownEnum } from '@/types'

type TabGroup = KnownEnum<MarketGroup> | 'ALL'

const GROUP_ORDER: TabGroup[] = [
  'MAIN',
  'ALL',
  'GOALS',
  'GAMES',
  'POINTS',
  'CORNERS',
  'CARDS',
  'PENALTIES',
  'PLAYERS',
  'SPECIAL',
]

const GROUP_LABEL: Record<TabGroup, string> = tKeysObj({
  MAIN: 'Main',
  ALL: 'All',
  GOALS: 'Goals',
  GAMES: 'Games',
  POINTS: 'Points',
  CORNERS: 'Corners',
  CARDS: 'Cards',
  PENALTIES: 'Penalties',
  PLAYERS: 'Players',
  SPECIAL: 'Special',
})

const DEFAULT_OPEN_COUNT = 10

export default function MarketGroups(props: { event: MarketGroups$key }) {
  const data = useFragment(
    graphql`
      fragment MarketGroups on Event {
        markets {
          id
          groups @required(action: NONE)
          kind
          index
          ...MarketCard
        }
      }
    `,
    props.event
  )

  // remembered per tab so switching tabs doesn't undo what the user collapsed
  const [openByGroup, setOpenByGroup] = useState<Partial<Record<TabGroup, string[]>>>({})

  const sortedMarkets = sortBy(data.markets, e => e?.index)

  const byGroup = sortedMarkets.reduce(
    (acc, curr) => {
      curr?.groups.forEach(group => {
        acc[group] = [...(acc[group] || []), curr]
      })
      return acc
    },
    {} as Record<MarketGroup | 'ALL', MarketGroups$data['markets']>
  )
  // "All" holds every market exactly once, even if it belongs to several groups
  byGroup.ALL = sortedMarkets.filter(m => !!m)

  const populatedGroups = GROUP_ORDER.filter(g => byGroup[g]?.length)

  const t = useT()

  if (populatedGroups.length === 0) {
    return (
      <p className='text-secondary rounded-2xl p-8 text-center text-sm'>
        {t('No markets available for this event right now.')}
      </p>
    )
  }

  return (
    <Tabs.Root defaultValue={populatedGroups[0]} className='w-full gap-2'>
      <Tabs.List className='h-auto w-fit max-w-full scrollbar-none justify-start gap-2 overflow-x-auto bg-transparent p-0'>
        {populatedGroups.map(group => (
          <Tabs.Trigger
            key={group}
            value={group}
            className='data-[state=active]:bg-primary group border-control-border bg-foreground/10 text-foreground data-[state=active]:text-primary-foreground shrink-0 rounded-full border px-4 py-2 text-xs font-medium whitespace-nowrap shadow-none'
          >
            {t(GROUP_LABEL[group])}
            <span className='ml-1.5 opacity-60'>{byGroup[group].length}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {populatedGroups.map(group => {
        const kinds = entries(groupBy(byGroup[group], m => m?.kind))
        const open = openByGroup[group] ?? kinds.slice(0, DEFAULT_OPEN_COUNT).map(([kind]) => kind)

        return (
          <Tabs.Content key={group} value={group}>
            <Accordion.Root
              type='multiple'
              value={open}
              onValueChange={value => setOpenByGroup(prev => ({ ...prev, [group]: value }))}
            >
              {kinds.map(([kind, markets]) => (
                <Accordion.Item key={kind} value={kind}>
                  <Accordion.Header>
                    <Accordion.Trigger className='group text-foreground flex w-full items-center gap-2 py-4 text-left text-sm font-semibold tracking-wide uppercase'>
                      <span className='min-w-0 truncate'>{translateMarketKind(t, kind)}</span>
                      <FaCaretDown className='size-4 shrink-0 -rotate-90 transition-transform duration-200 group-data-[state=open]:rotate-0' />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  {/* -m/p pair: the clip box grows 12px each way so the selected glow isn't cut off; layout is unchanged */}
                  <Accordion.Content className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down -mx-3 -mt-3 overflow-hidden px-3 pt-3'>
                    <div className='flex flex-col gap-4 pb-5'>
                      {markets
                        .filter(m => !!m)
                        .map(market => (
                          <MarketCard key={market.id} market={market} header={kind} />
                        ))}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Tabs.Content>
        )
      })}
    </Tabs.Root>
  )
}

export function MarketGroupsSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-fit max-w-full scrollbar-none gap-2 overflow-x-auto'>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: identical
            <Skeleton key={i} className='h-8 w-24 shrink-0 rounded-full' />
          ))}
      </div>
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-24 w-full' />
        <Skeleton className='h-24 w-full' />
        <Skeleton className='h-24 w-full' />
      </div>
    </div>
  )
}
