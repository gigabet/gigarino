'use client'

import { entries, groupBy } from 'lodash'
import { graphql, useFragment } from 'react-relay'
import type { MarketGroups$key } from '@/app/sport/event/[id]/__generated__/MarketGroups.graphql'
import MarketCard from '@/app/sport/event/[id]/market-card'
import { Skeleton } from '@/components/ui/skeleton'
import * as Tabs from '@/components/ui/tabs'
import type { MarketGroup } from '@/types'

/** Fixed render order — matches the tab order elsewhere in the app. */
const GROUP_ORDER: MarketGroup[] = [
  'MAIN',
  'GOALS',
  'CORNERS',
  'CARDS',
  'PENALTIES',
  'PLAYERS',
  'SPECIAL',
]

const GROUP_LABEL: Record<MarketGroup, string> = {
  MAIN: 'Main',
  GOALS: 'Goals',
  CORNERS: 'Corners',
  CARDS: 'Cards',
  PENALTIES: 'Penalties',
  PLAYERS: 'Players',
  SPECIAL: 'Special',
}

export default function MarketGroups(props: { event: MarketGroups$key }) {
  const data = useFragment(
    graphql`
      fragment MarketGroups on Event {
        markets {
          id
          group
          kind
          ...MarketCard
        }
      }
    `,
    props.event
  )

  const byGroup = groupBy(data.markets, m => m.group)
  const populatedGroups = GROUP_ORDER.filter(g => byGroup[g]?.length)

  if (populatedGroups.length === 0) {
    return (
      <p className='text-secondary rounded-2xl p-8 text-center text-sm'>
        No markets available for this event right now.
      </p>
    )
  }

  return (
    <Tabs.Root defaultValue={populatedGroups[0]} className='w-full gap-4'>
      <Tabs.List className='h-auto w-fit scrollbar-none justify-start gap-2 overflow-x-auto bg-transparent p-0'>
        {populatedGroups.map(group => (
          <Tabs.Trigger
            key={group}
            value={group}
            className='bg-dark-200 data-[state=active]:bg-primary group shrink-0 rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap text-gray-300 shadow-none data-[state=active]:text-black'
          >
            {GROUP_LABEL[group]}
            <span className='text-secondary ml-1.5 group-data-[state=active]:text-black'>
              {byGroup[group].length}
            </span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {populatedGroups.map(group => (
        <Tabs.Content key={group} value={group} className='flex flex-col gap-3'>
          {entries(groupBy(byGroup[group], m => m.kind)).map(([kind, markets]) => (
            <div
              className='flex flex-col gap-2 rounded-xl border border-white/5 bg-black/20 p-4'
              key={kind}
            >
              <p className='mb-4 text-sm font-medium tracking-wide uppercase'>
                {kind.replaceAll('_', ' ')}
              </p>
              {markets.map(market => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          ))}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

export function MarketGroupsSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
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
