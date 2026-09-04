'use client'

import { cx } from 'class-variance-authority'
import { sortBy } from 'lodash'
import Link from 'next/link'
import { Toggle } from 'radix-ui'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'
import type { EventSidebarMarket$key } from '@/app/sport/event/[id]/__generated__/EventSidebarMarket.graphql'
import type { EventSidebarOdd$key } from '@/app/sport/event/[id]/__generated__/EventSidebarOdd.graphql'
import type { EventSidebarQuery } from '@/app/sport/event/[id]/__generated__/EventSidebarQuery.graphql'
import type { EventSidebarTournament$key } from '@/app/sport/event/[id]/__generated__/EventSidebarTournament.graphql'
import type { EventStripCard$key } from '@/app/sport/event/[id]/__generated__/EventStripCard.graphql'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { SportIconBadge } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn, getRelativeDayLabel } from '@/lib/utils'

export default function EventSidebar(props: { eventId: string }) {
  return (
    <ErrorBoundary FallbackComponent={SectionErrorFallback}>
      <Suspense fallback={<EventSidebarSkeleton />}>
        <EventSidebarContent eventId={props.eventId} />
      </Suspense>
    </ErrorBoundary>
  )
}

function EventSidebarContent(props: { eventId: string }) {
  const data = useLazyLoadQuery<EventSidebarQuery>(
    graphql`
      query EventSidebarQuery($id: ID!, $first: Int!) {
        event(id: $id) {
          id
          tournament {
            ...EventSidebarTournament
          }
        }
      }
    `,
    { id: props.eventId, first: 20 },
    { fetchPolicy: 'store-and-network' }
  )

  const tournament = data.event?.tournament

  if (!tournament) {
    return (
      <div className='bg-dark-200 hidden rounded-2xl border border-white/5 p-4 text-center text-xs text-white/40 xl:block'>
        No other events in this tournament right now.
      </div>
    )
  }

  return <EventSidebarTournament tournament={tournament} activeEventId={props.eventId} />
}

function EventSidebarTournament(props: {
  tournament: EventSidebarTournament$key
  activeEventId: string
}) {
  const tournament = useFragment(
    graphql`
      fragment EventSidebarTournament on Tournament {
        id
        name
        sport {
          key
        }
        events(first: $first) {
          edges {
            node {
              id
              ...EventStripCard
            }
          }
        }
      }
    `,
    props.tournament
  )

  if (tournament.events.edges.length === 0) {
    return (
      <div className='bg-dark-200 hidden rounded-2xl border border-white/5 p-4 text-center text-xs text-white/40 xl:block'>
        No other events in this tournament right now.
      </div>
    )
  }

  const events = tournament.events.edges.map(e => e.node)

  return (
    <aside className='scrollbar-hide! scrollbar-thumb-dark-300 sticky top-26.25 hidden max-h-[calc(100dvh-7rem)] w-full scrollbar-thin scrollbar-track-transparent flex-col gap-3 place-self-start overflow-y-auto xl:flex'>
      <div className='flex items-center gap-2 px-1'>
        <SportIconBadge sport={tournament.sport.key} size='sm' />
        <div className='min-w-0'>
          <p className='text-secondary text-[0.65rem] tracking-wider uppercase'>Tournament</p>
          <p className='truncate text-sm font-semibold text-white'>{tournament.name}</p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {events.map(event => (
          <EventStripCard key={event.id} event={event} active={event.id === props.activeEventId} />
        ))}
      </div>
    </aside>
  )
}

function EventStripCard(props: { event: EventStripCard$key; active: boolean }) {
  const event = useFragment(
    graphql`
      fragment EventStripCard on PrematchEvent {
        id
        homeCompetitor
        awayCompetitor
        startTime
        status
        markets(groups: [MAIN]) {
          id
          kind
          ...EventSidebarMarket
        }
      }
    `,
    props.event
  )

  const matchWinner = event.markets.find(m => m.kind === 'match_winner') ?? event.markets[0] ?? null

  return (
    <div
      className={cx(
        'group relative flex flex-col gap-2 rounded-xl border p-3 transition-colors',
        props.active
          ? 'border-primary bg-primary/10 shadow-primary/30 shadow-[0_0_12px]'
          : 'border-white/5 bg-black/20 hover:border-white/20'
      )}
    >
      {props.active && (
        <span className='bg-primary text-primary-foreground absolute -top-2 left-3 rounded-full px-2 py-0.5 text-[0.6rem] font-bold tracking-wide uppercase'>
          Viewing
        </span>
      )}

      <Link
        href={`/sport/event/${event.id}`}
        replace
        aria-current={props.active || undefined}
        className={cn('flex flex-col gap-1 text-xs', props.active && 'pointer-events-none')}
      >
        <div className='flex items-center justify-between gap-2'>
          <span className='text-secondary text-[0.65rem]'>
            {event.status === 'LIVE' ? 'Live' : getRelativeDayLabel(event.startTime)}
          </span>
          {event.status === 'LIVE' && (
            <span className='relative inline-flex size-1.5'>
              <span className='bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75' />
              <span className='bg-destructive relative inline-flex size-1.5 rounded-full' />
            </span>
          )}
        </div>
        <p className={cn('truncate font-semibold', props.active ? 'text-primary' : 'text-white')}>
          {event.homeCompetitor}
        </p>
        <p className='text-secondary text-[0.65rem] uppercase'>vs</p>
        <p className={cn('truncate font-semibold', props.active ? 'text-primary' : 'text-white')}>
          {event.awayCompetitor}
        </p>
      </Link>

      {matchWinner && <EventSidebarMarket market={matchWinner} />}
    </div>
  )
}

function EventSidebarMarket(props: { market: EventSidebarMarket$key }) {
  const market = useFragment(
    graphql`
      fragment EventSidebarMarket on Market {
        id
        kind
        outcomes {
          id
          index
          ...EventSidebarOdd
        }
      }
    `,
    props.market
  )

  return (
    <div className='flex gap-1.5'>
      {sortBy(market.outcomes, o => o.index).map(outcome => (
        <EventSidebarOdd key={outcome.id} outcome={outcome} />
      ))}
    </div>
  )
}

function EventSidebarOdd(props: { outcome: EventSidebarOdd$key }) {
  const outcome = useFragment(
    graphql`
      fragment EventSidebarOdd on Outcome {
        id
        name
        price
        status
      }
    `,
    props.outcome
  )

  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(Number(outcome.price))
  const suspended = outcome.status !== 'OPEN'

  return (
    <Toggle.Root
      disabled={suspended}
      suppressHydrationWarning
      className={cn(
        'group/odd hover:bg-primary/5 hover:border-primary/20 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/5 bg-black/20 py-1.5 transition disabled:pointer-events-none disabled:opacity-40',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(outcome.id)}
      onPressedChange={() => toggleOdd(outcome.id)}
    >
      <span className='group-data-[state=on]/odd:text-foreground text-secondary text-[0.6rem]'>
        {outcome.name}
      </span>
      <span
        className='group-data-[state=on]/odd:text-primary text-foreground text-xs font-semibold'
        suppressHydrationWarning
      >
        {Number(outcome.price).toFixed(2)}
      </span>
    </Toggle.Root>
  )
}

export function EventSidebarSkeleton() {
  return (
    <div className='sticky top-26.25 hidden w-full flex-col gap-3 xl:flex'>
      <div className='flex items-center gap-2 px-1'>
        <Skeleton className='size-7 rounded-full' />
        <Skeleton className='h-4 w-32' />
      </div>
      <div className='flex flex-col gap-2'>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: identical
            <Skeleton key={i} className='h-25 w-full rounded-xl' />
          ))}
      </div>
    </div>
  )
}
