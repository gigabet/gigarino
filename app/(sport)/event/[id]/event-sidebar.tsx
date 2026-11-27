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
import { translateOutcomeName } from '@/lib/api-names'
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
  const t = useT()

  return (
    <div className='bg-surface border-line text-foreground/40 hidden rounded-2xl border p-4 text-center text-xs xl:block'>
      {t('No other events in this tournament right now.')}
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
      // eslint-disable-next-line local-i18n/no-untranslated-api-string -- proper noun
      name={tournament.name}
      sportKey={tournament.sport.key}
      events={events}
      activeEventId={props.activeEventId}
      onNavigate={onNavigate}
    />
  )

  return (
    <>
      <aside className='scrollbar-hide! scrollbar-thumb-dark-300 fade-bottom sticky top-26.25 hidden max-h-[calc(100dvh-7rem)] w-full scrollbar-thin scrollbar-track-transparent flex-col gap-3 place-self-start overflow-y-auto pb-10 xl:flex'>
        {list()}
      </aside>

      {/* below xl: opener bar + drawer. -mb-4 halves the grid gap to the content. */}
      <div className='-mb-4 xl:hidden'>
        <button
          type='button'
          onClick={() => setOpen(true)}
          className='bg-surface hover:bg-surface-2 border-line flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors'
        >
          <SportIconBadge sport={tournament.sport.key} size='sm' />
          <div className='min-w-0 flex-1'>
            <p className='text-secondary text-[0.65rem]'>{t('Other matches in this tournament')}</p>
            {/* eslint-disable-next-line local-i18n/no-untranslated-api-string -- proper noun */}
            <p className='text-foreground truncate text-sm font-semibold'>{tournament.name}</p>
          </div>
          <span className='bg-surface-2 rounded-full px-2 py-0.5 font-mono text-[0.65rem]'>
            {events.length}
          </span>
          <ChevronRightIcon className='text-secondary size-4 shrink-0' />
        </button>

        <Drawer.Root open={open} onOpenChange={setOpen} direction='left'>
          <Drawer.Portal>
            <Drawer.Overlay className='fixed inset-0 z-50 bg-black/50' />
            <Drawer.Content
              className='bg-surface fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-sm flex-col outline-none'
              aria-describedby={undefined}
            >
              <VisuallyHidden.Root>
                {/* eslint-disable-next-line local-i18n/no-untranslated-api-string -- proper noun */}
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
  const t = useT()

  return (
    <>
      <div className='flex items-center gap-2 px-1'>
        <SportIconBadge sport={props.sportKey} size='sm' />
        <div className='min-w-0'>
          <p className='text-secondary text-[0.65rem] tracking-wider uppercase'>
            {t('Tournament')}
          </p>
          <p className='text-foreground truncate text-sm font-semibold'>{props.name}</p>
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

  const t = useT()

  const matchWinner = event.markets.find(m => m.kind === 'match_winner') ?? event.markets[0] ?? null

  return (
    <div
      className={cn(
        'group relative flex flex-col gap-2 rounded-xl border p-3 transition-colors',
        props.active
          ? 'border-brand bg-brand/10 shadow-primary/30 shadow-[0_0_12px]'
          : 'border-line bg-glass hover:border-line-3'
      )}
    >
      {props.active && (
        <span className='bg-primary text-primary-foreground absolute -top-2 left-3 rounded-full px-2 py-0.5 text-[0.6rem] font-bold tracking-wide uppercase'>
          {t('Viewing')}
        </span>
      )}

      <Link
        href={`/event/${event.id}`}
        replace
        onClick={props.onNavigate}
        aria-current={props.active || undefined}
        className={cn('flex flex-col gap-1 text-xs', props.active && 'pointer-events-none')}
      >
        <div className='flex items-center justify-between gap-2'>
          <span className='text-secondary text-[0.65rem]'>
            {event.status === 'LIVE' ? t('Live') : getRelativeDayLabel(event.startTime)}
          </span>
          {event.status === 'LIVE' && (
            <span className='relative inline-flex size-1.5'>
              <span className='bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75' />
              <span className='bg-destructive relative inline-flex size-1.5 rounded-full' />
            </span>
          )}
        </div>
        <p
          className={cn('truncate font-semibold', props.active ? 'text-brand' : 'text-foreground')}
        >
          {event.homeCompetitor}
        </p>
        <p className='text-secondary text-[0.65rem] uppercase'>{t('vs')}</p>
        <p
          className={cn('truncate font-semibold', props.active ? 'text-brand' : 'text-foreground')}
        >
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
  const t = useT()

  return (
    <Toggle.Root
      disabled={suspended}
      suppressHydrationWarning
      className={cn(
        'group/odd hover:bg-brand/5 hover:border-brand/20 data-[state=on]:border-brand data-[state=on]:bg-brand/10 border-line-2 bg-glass flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border py-1.5 transition disabled:pointer-events-none disabled:opacity-40',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(outcome.id)}
      onPressedChange={() => toggleOdd(outcome.id)}
    >
      <span className='group-data-[state=on]/odd:text-foreground text-secondary text-[0.6rem]'>
        {translateOutcomeName(t, outcome.name)}
      </span>
      <span
        className='group-data-[state=on]/odd:text-brand text-foreground text-xs font-semibold'
        suppressHydrationWarning
      >
        {Number(outcome.price).toFixed(2)}
      </span>
    </Toggle.Root>
  )
}

// mirrors <EventSidebarTournament>: the xl aside, and the opener bar shown below xl
export function EventSidebarSkeleton() {
  return (
    <>
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

      <div className='-mb-4 xl:hidden'>
        <div className='bg-surface border-line flex w-full items-center gap-3 rounded-2xl border px-4 py-3'>
          <Skeleton className='size-7 shrink-0 rounded-full' />
          <div className='flex min-w-0 flex-1 flex-col'>
            <Skeleton className='h-4 w-44 max-w-full' />
            <Skeleton className='mt-0.5 h-4.5 w-32 max-w-full' />
          </div>
          <Skeleton className='h-5 w-7 shrink-0 rounded-full' />
          <Skeleton className='size-4 shrink-0' />
        </div>
      </div>
    </>
  )
}
