'use client'

import { ChevronDown } from 'lucide-react'
import { Suspense } from 'react'
import { GiSoccerBall } from 'react-icons/gi'
import { PiCaretUpDown } from 'react-icons/pi'
import { graphql, useFragment } from 'react-relay'
import type { Tournament$key } from '@/app/sport/[[...slug]]/__generated__/Tournament.graphql'
import type { TournamentEventList$key } from '@/app/sport/[[...slug]]/__generated__/TournamentEventList.graphql'
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
          <span className='text-uppercase flex size-6 items-center justify-center rounded-full bg-white/3 text-[0.5rem] leading-none'>
            {data.category.countryCode ?? 'INT'}
          </span>
          <span className='truncate'>{data.name}</span>
        </h2>
        <div className='text-foreground @container/markets ml-auto flex grow items-center justify-end gap-4'>
          <div className='flex max-w-60 min-w-50 flex-1 items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all'>
            <span>Match Winner</span>
            <ChevronDown className='size-4' />
          </div>
          <div className='hidden max-w-60 min-w-50 flex-1 items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all @md/markets:flex'>
            <span>double chance</span>
            <ChevronDown className='size-4' />
          </div>
          <div className='hidden max-w-60 min-w-50 flex-1 items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all @2xl/markets:flex'>
            <span>next goal</span>
            <ChevronDown className='size-4' />
          </div>
          <div className='justify-betweenr hidden max-w-60 min-w-50 flex-1 items-center rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all @4xl/markets:flex'>
            <span>over/under</span>
            <ChevronDown className='size-4' />
          </div>
        </div>
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
        events(first: 4) {
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
    <div className='flex flex-col gap-3'>
      {data.events.edges.map(edge => (
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
