'use client'

import { Suspense } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { graphql, useFragment } from 'react-relay'
import type { Tournament$key } from '@/app/sport/[[...slug]]/__generated__/Tournament.graphql'
import type { TournamentEventList$key } from '@/app/sport/[[...slug]]/__generated__/TournamentEventList.graphql'
import { ListViewMarketDropdowns } from '@/app/sport/[[...slug]]/list-view-markets'
import PrematchEvent, { PrematchEventSkeleton } from '@/app/sport/[[...slug]]/prematch-event'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'

export default function Tournament(props: { queryRef: Tournament$key }) {
  const data = useFragment(
    graphql`
      fragment Tournament on Tournament {
        sport {
          key
        }
        category {
          countryCode
        }
        name
        ...TournamentEventList @defer
      }
    `,
    props.queryRef
  )

  return (
    <section>
      <div className='text-secondary mb-4 flex items-end gap-4 border-b py-2 text-sm'>
        <h2 className='flex w-90 items-center gap-2'>
          <SportIcon sport={data.sport.key} className='size-4.5' />
          <ReactCountryFlag
            svg
            countryCode={data.category.countryCode ?? 'UN'}
            className='w-5 rounded-xs shadow-xs'
            style={{ width: undefined, height: undefined }}
          />
          <span className='truncate'>{data.name}</span>
        </h2>
        <ListViewMarketDropdowns />
        <div className='w-29' />
      </div>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList tournament={data} />
      </Suspense>
    </section>
  )
}

function EventList(props: { tournament: TournamentEventList$key }) {
  const data = useFragment(
    graphql`
      fragment TournamentEventList on Tournament {
        events(first: $eventCount) {
          edges {
            node {
              id
              ...PrematchEvent
            }
          }
        }
      }
    `,
    props.tournament
  )

  return (
    <div className='flex flex-col gap-3' suppressHydrationWarning>
      {data?.events?.edges.map(edge => (
        <PrematchEvent key={edge.node.id} node={edge.node} />
      ))}
    </div>
  )
}

export function TournamentSkeleton() {
  return (
    <section>
      <div className='text-secondary mb-4 flex items-end gap-4 border-b py-2 text-sm'>
        <Skeleton className='my-1 flex h-4 w-90' />
        <div className='h-8.5 w-29' />
      </div>
      <EventListSkeleton />
    </section>
  )
}

function EventListSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
    </div>
  )
}
