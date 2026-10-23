'use client'

import { sortBy } from 'lodash'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Toggle, VisuallyHidden } from 'radix-ui'
import { useState } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { Drawer } from 'vaul'
import { SportIconBadge } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { useT } from '@/context/providers'
import { cn, getRelativeDayLabel } from '@/lib/utils'
import type { EventSidebar$key } from '@/relay/__generated__/EventSidebar.graphql'
import type { EventSidebarMarket$key } from '@/relay/__generated__/EventSidebarMarket.graphql'
import type { EventSidebarOdd$key } from '@/relay/__generated__/EventSidebarOdd.graphql'
import type { EventSidebarTournament$key } from '@/relay/__generated__/EventSidebarTournament.graphql'
import type { EventStripCard$key } from '@/relay/__generated__/EventStripCard.graphql'
import type { PrematchLayoutQuery } from '@/relay/__generated__/PrematchLayoutQuery.graphql'
import PrematchLayoutQueryNode from '@/relay/__generated__/PrematchLayoutQuery.graphql'

export default function EventSidebar(props: {
  queryRef: PreloadedQuery<PrematchLayoutQuery>
  eventId: string
}) {
  const preloaded = usePreloadedQuery<PrematchLayoutQuery>(PrematchLayoutQueryNode, props.queryRef)
  const data = useFragment<EventSidebar$key>(
    graphql`
      fragment EventSidebar on Query {
        event(id: $eventId) {
          id
          tournament {
            ...EventSidebarTournament
          }
        }
      }
    `,
    preloaded.eventSidebar ?? null
  )

  const tournament = data?.event?.tournament

  if (!tournament) return <NoOtherEvents />

  return <EventSidebarTournament tournament={tournament} activeEventId={props.eventId} />
}

function NoOtherEvents() {
  return (
    <div className='bg-dark-200 hidden rounded-2xl border border-white/5 p-4 text-center text-xs text-white/40 xl:block'>
      No other events in this tournament right now.
    </div>
  )
}

/**
 * xl and up: sticky aside in the left grid column.
 * Below xl the aside is gone, so the same list is reachable through a bar at
 * the top of the page that opens it in a drawer.
 */
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
        events(first: 20) {
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

  const [open, setOpen] = useState(false)
  const t = useT()

  if (tournament.events.edges.length === 0) return <NoOtherEvents />

  const events = tournament.events.edges.map(e => e.node)

  const list = (onNavigate?: () => void) => (
    <TournamentEvents
      name={tournament.name}
      sportKey={tournament.sport.key}
      events={events}
      activeEventId={props.activeEventId}
      onNavigate={onNavigate}
    />
  )

  return (
    <>
      <aside className='scrollbar-hide! scrollbar-thumb-dark-300 sticky top-26.25 hidden max-h-[calc(100dvh-7rem)] w-full scrollbar-thin scrollbar-track-transparent flex-col gap-3 place-self-start overflow-y-auto xl:flex'>
        {list()}
      </aside>

      {/* below xl: opener bar + drawer. -mb-4 halves the grid gap to the content. */}
      <div className='-mb-4 xl:hidden'>
        <button
          type='button'
          onClick={() => setOpen(true)}
          className='bg-dark-200 hover:bg-dark-300 flex w-full items-center gap-3 rounded-2xl border border-white/5 px-4 py-3 text-left transition-colors'
        >
          <SportIconBadge sport={tournament.sport.key} size='sm' />
          <div className='min-w-0 flex-1'>
            <p className='text-secondary text-[0.65rem]'>{t('Other matches in this tournament')}</p>
            <p className='truncate text-sm font-semibold text-white'>{tournament.name}</p>
          </div>
          <span className='bg-dark-300 rounded-full px-2 py-0.5 font-mono text-[0.65rem]'>
            {events.length}
          </span>
          <ChevronRightIcon className='text-secondary size-4 shrink-0' />
        </button>

        <Drawer.Root open={open} onOpenChange={setOpen} direction='left'>
          <Drawer.Portal>
            <Drawer.Overlay className='fixed inset-0 z-50 bg-black/50' />
            <Drawer.Content
              className='bg-dark-200 fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-sm flex-col outline-none'
              aria-describedby={undefined}
            >
              <VisuallyHidden.Root>
                <Drawer.Title>{tournament.name}</Drawer.Title>
              </VisuallyHidden.Root>
              <div className='flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4'>
                {list(() => setOpen(false))}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  )
}

function TournamentEvents(props: {
  name: string
  sportKey: string
  events: ReadonlyArray<{ id: string } & EventStripCard$key>
  activeEventId: string
  onNavigate?: () => void
}) {
  return (
    <>
      <div className='flex items-center gap-2 px-1'>
        <SportIconBadge sport={props.sportKey} size='sm' />
        <div className='min-w-0'>
          <p className='text-secondary text-[0.65rem] tracking-wider uppercase'>Tournament</p>
          <p className='truncate text-sm font-semibold text-white'>{props.name}</p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {props.events.map(event => (
          <EventStripCard
            key={event.id}
            event={event}
            active={event.id === props.activeEventId}
            onNavigate={props.onNavigate}
          />
        ))}
      </div>
    </>
  )
}

function EventStripCard(props: {
  event: EventStripCard$key
  active: boolean
  onNavigate?: () => void
}) {
  const event = useFragment(
    graphql`
      fragment EventStripCard on Event {
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
      className={cn(
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
        onClick={props.onNavigate}
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
