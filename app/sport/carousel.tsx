'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { sortBy } from 'lodash'
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsUp,
  PlusIcon,
  SearchXIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Toggle } from 'radix-ui'
import { Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { GiFlame } from 'react-icons/gi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'
import type { BetBoostCard$key } from '@/app/sport/__generated__/BetBoostCard.graphql'
import type {
  CarouselQuery,
  CarouselQuery$data,
} from '@/app/sport/__generated__/CarouselQuery.graphql'
import type { ComboOfWeekCard$key } from '@/app/sport/__generated__/ComboOfWeekCard.graphql'
import type { FeaturedGameCard$key } from '@/app/sport/__generated__/FeaturedGameCard.graphql'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn, formatBalance, getRelativeDayLabel } from '@/lib/utils'

const CARD_SIZE = 'h-72 w-72 sm:w-80'

type FeaturedBetRow = CarouselQuery$data['featuredBets'][number]

const KIND_ORDER = ['COMBO_OF_WEEK', 'BET_BOOST', 'FEATURED_GAME'] as const

export default function Carousel() {
  return (
    <ErrorBoundary FallbackComponent={SectionErrorFallback}>
      <Suspense fallback={<CarouselSkeleton />}>
        <CarouselContent />
      </Suspense>
    </ErrorBoundary>
  )
}

function CarouselContent() {
  const data = useLazyLoadQuery<CarouselQuery>(
    graphql`
      query CarouselQuery {
        featuredBets {
          id
          kind
          ...BetBoostCard
          ...ComboOfWeekCard
          ...FeaturedGameCard
        }
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' }
  )

  const bets = [...data.featuredBets].sort(
    (a, b) =>
      KIND_ORDER.indexOf(a.kind as (typeof KIND_ORDER)[number]) -
      KIND_ORDER.indexOf(b.kind as (typeof KIND_ORDER)[number])
  )

  const scrollRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    })

  if (bets.length === 0) return null

  return (
    <section className='relative'>
      <div className='mb-1 flex items-center justify-between'>
        <h2 className='font-display flex items-center gap-2 text-lg font-bold text-white sm:text-xl'>
          <HiOutlineSparkles className='text-primary size-5' />
          Featured Bets
        </h2>
        <div className='hidden items-center gap-2 sm:flex'>
          <button
            type='button'
            onClick={() => scroll('left')}
            aria-label='Scroll left'
            className='bg-dark-200 hover:bg-dark-300 flex size-8 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white'
          >
            <ChevronLeft className='size-4' />
          </button>
          <button
            type='button'
            onClick={() => scroll('right')}
            aria-label='Scroll right'
            className='bg-dark-200 hover:bg-dark-300 flex size-8 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white'
          >
            <ChevronRight className='size-4' />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className='flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-1 py-5'
      >
        {bets.map(bet => (
          <FeaturedBetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </section>
  )
}

function FeaturedBetCard({ bet }: { bet: FeaturedBetRow }) {
  switch (bet.kind) {
    case 'BET_BOOST':
      return <BetBoostCard bet={bet} />
    case 'FEATURED_GAME':
      return <FeaturedGameCard bet={bet} />
    default:
      return <ComboOfWeekCard bet={bet} />
  }
}

function useEndsIn(validTo: string | null | undefined) {
  return validTo && Date.parse(validTo) > Date.now()
    ? formatDistanceToNowStrict(new Date(validTo))
    : null
}

function PromoWordmark(props: {
  top: string
  bottom: string
  accentClassName: string
  icon: React.ReactNode
}) {
  return (
    <div className='relative flex items-start justify-between gap-2'>
      <div className='leading-[0.82]'>
        <p className='font-display text-xl font-black text-white uppercase italic'>{props.top}</p>
        <p
          className={cn('font-display text-3xl font-black uppercase italic', props.accentClassName)}
        >
          {props.bottom}
        </p>
      </div>
      <div className='shrink-0 pt-1'>{props.icon}</div>
    </div>
  )
}

function BetBoostCard(props: { bet: BetBoostCard$key }) {
  const data = useFragment(
    graphql`
      fragment BetBoostCard on FeaturedBet {
        boostedPrice
        combinedPrice
        maxStake
        validTo
        selections {
          outcomeId
          outcomeName
          marketName
          eventName
          available
        }
      }
    `,
    props.bet
  )

  const endsIn = useEndsIn(data.validTo)
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()

  const availableSelections = data.selections.filter(s => s.available)
  const allAdded =
    availableSelections.length > 0 && availableSelections.every(s => hasOdd(s.outcomeId))
  const leg = data.selections[0]

  const boosted = data.boostedPrice ? Number(data.boostedPrice) : null
  const was = data.combinedPrice ? Number(data.combinedPrice) : null

  const handleSelect = () => {
    availableSelections.forEach(s => {
      if (!hasOdd(s.outcomeId)) toggleOdd(s.outcomeId)
    })
  }

  const [home, away] = (leg?.eventName ?? '').split(' vs ')

  return (
    <div
      className={cn(
        CARD_SIZE,
        'group bg-dark-200 border-primary/40 hover:border-primary/70 relative flex shrink-0 snap-start flex-col gap-2 overflow-hidden rounded-2xl border p-3.5 transition-colors duration-300'
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(209,243,102,0.14),transparent_55%)]' />

      <PromoWordmark
        top='Bet'
        bottom='Boost'
        accentClassName='text-primary text-shadow-[0_0_16px_rgba(209,243,102,0.55)]'
        icon={
          <ChevronsUp
            className='text-primary size-8 drop-shadow-[0_0_10px_rgba(209,243,102,0.7)]'
            strokeWidth={3}
          />
        }
      />

      {endsIn && (
        <p className='text-secondary relative -mt-1 text-right text-[0.6rem] tracking-wide uppercase'>
          Ends in {endsIn}
        </p>
      )}

      <div className='relative min-w-0'>
        <p className='truncate text-sm font-bold text-white'>
          {home || leg?.eventName || '—'}
          {away && (
            <>
              <span className='text-secondary mx-1 text-xs font-normal normal-case'>vs</span>
              {away}
            </>
          )}
        </p>
        <p className='text-secondary mt-0.5 truncate text-[0.65rem] tracking-wide uppercase'>
          {leg?.marketName}
          {leg?.outcomeName ? ` · ${leg.outcomeName}` : ''}
        </p>
      </div>

      <div className='relative flex flex-1 flex-col justify-center gap-0.5'>
        <span className='text-secondary text-sm font-semibold line-through'>
          {was ? was.toFixed(2) : '—'}
        </span>
        <span className='text-primary text-4xl leading-none font-black'>
          {boosted ? boosted.toFixed(2) : '—'}
        </span>
      </div>

      <div className='relative flex items-center gap-2'>
        {data.maxStake && (
          <span className='text-secondary shrink-0 text-[0.6rem]'>
            Max {formatBalance(Number(data.maxStake))}
          </span>
        )}
        <button
          type='button'
          onClick={handleSelect}
          disabled={allAdded || availableSelections.length === 0}
          className={cn(
            'group/cta ml-auto flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all',
            allAdded
              ? 'bg-primary/15 text-primary cursor-default'
              : 'bg-primary hover:shadow-glow text-black'
          )}
        >
          {allAdded ? (
            <>
              <CheckIcon className='size-3.5' />
              Added
            </>
          ) : (
            <>
              Select
              <ArrowRightIcon className='size-3.5 transition-transform group-hover/cta:translate-x-0.5' />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function ComboOfWeekCard(props: { bet: ComboOfWeekCard$key }) {
  const data = useFragment(
    graphql`
      fragment ComboOfWeekCard on FeaturedBet {
        title
        # subtitle
        combinedPrice
        validTo
        selections {
          outcomeId
          outcomeName
          marketName
          eventName
          price
          available
        }
      }
    `,
    props.bet
  )

  const endsIn = useEndsIn(data.validTo)
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()

  const availableSelections = data.selections.filter(s => s.available)
  const allAdded =
    availableSelections.length > 0 && availableSelections.every(s => hasOdd(s.outcomeId))

  const handleAdd = () => {
    availableSelections.forEach(s => {
      if (!hasOdd(s.outcomeId)) toggleOdd(s.outcomeId)
    })
  }

  return (
    <div
      className={cn(
        CARD_SIZE,
        'group bg-dark-200 border-purple-accent/40 hover:border-purple-accent/70 relative flex shrink-0 snap-start flex-col gap-1.5 overflow-hidden rounded-2xl border p-3 transition-colors duration-300'
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(127,92,255,0.16),transparent_55%)]' />

      <PromoWordmark
        top='Combo'
        bottom='Week'
        accentClassName='text-purple-accent text-shadow-[0_0_16px_rgba(127,92,255,0.55)]'
        icon={
          <GiFlame className='text-purple-accent size-8 drop-shadow-[0_0_10px_rgba(127,92,255,0.7)]' />
        }
      />

      <div className='text-secondary relative flex items-center gap-2 text-[0.6rem] tracking-wide uppercase'>
        {data.title && (
          <span className='min-w-0 truncate text-white/80 normal-case'>{data.title}</span>
        )}
        {endsIn && <span className='ml-auto shrink-0'>Ends in {endsIn}</span>}
      </div>

      <div className='relative flex flex-1 flex-col justify-center gap-1'>
        {data.selections.slice(0, 3).map(s => (
          <div
            key={s.outcomeId}
            className={cn(
              'flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-white/3 px-2.5 py-1 text-[0.7rem]',
              !s.available && 'line-through opacity-40'
            )}
          >
            <span className='truncate text-white/90'>
              {s.outcomeName ?? '—'}
              {s.eventName && <span className='text-secondary'> · {s.eventName}</span>}
            </span>
            {s.price && (
              <span className='shrink-0 font-semibold text-white'>
                {Number(s.price).toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className='relative flex items-center justify-between gap-3'>
        <div className='flex flex-col'>
          <span className='text-purple-accent text-[0.55rem] font-bold tracking-wide uppercase'>
            Combined odds
          </span>
          <span className='text-purple-accent text-2xl leading-none font-black'>
            {data.combinedPrice ? Number(data.combinedPrice).toFixed(2) : '—'}
          </span>
        </div>
        <button
          type='button'
          onClick={handleAdd}
          disabled={allAdded || availableSelections.length === 0}
          className={cn(
            'group/cta flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold uppercase transition-all',
            allAdded
              ? 'bg-purple-accent/15 text-purple-accent cursor-default'
              : 'bg-purple-accent hover:shadow-glow-purple text-white'
          )}
        >
          {allAdded ? (
            <>
              <CheckIcon className='size-3.5' />
              Added
            </>
          ) : (
            <>
              <PlusIcon className='size-3.5' />
              Add
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function FeaturedGameCard(props: { bet: FeaturedGameCard$key }) {
  const data = useFragment(
    graphql`
      fragment FeaturedGameCard on FeaturedBet {
        validTo
        selections {
          event {
            id
            homeCompetitor
            awayCompetitor
            startTime
            status
            sport {
              key
            }
            tournament {
              name
            }
            markets(groups: [MAIN]) {
              id
              kind
              outcomes {
                id
                index
                name
                key
                price
                status
              }
            }
          }
        }
      }
    `,
    props.bet
  )

  const event = data.selections.find(s => s.event)?.event ?? null
  const matchWinner =
    event?.markets.find(m => m.kind === 'match_winner') ?? event?.markets[0] ?? null

  return (
    <div
      className={cn(
        CARD_SIZE,
        'group bg-dark-200 relative flex shrink-0 snap-start flex-col gap-2 overflow-hidden rounded-2xl border border-sky-400/40 p-3.5 transition-colors duration-300 hover:border-sky-400/70'
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(56,189,248,0.16),transparent_55%)]' />

      <PromoWordmark
        top='Top'
        bottom='Pick'
        accentClassName='text-sky-400 text-shadow-[0_0_16px_rgba(56,189,248,0.55)]'
        icon={
          <HiOutlineSparkles className='size-8 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]' />
        }
      />

      {event ? (
        <>
          <div className='text-secondary relative flex items-center gap-1.5 text-[0.6rem] tracking-wide uppercase'>
            <SportIcon sport={event.sport.key} className='size-3 shrink-0' />
            <span className='min-w-0 truncate'>{event.tournament.name}</span>
            {event.status === 'LIVE' ? (
              <span className='text-destructive ml-auto flex shrink-0 items-center gap-1 font-bold'>
                <span className='relative inline-flex size-1.5'>
                  <span className='bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75' />
                  <span className='bg-destructive relative inline-flex size-1.5 rounded-full' />
                </span>
                Live
              </span>
            ) : (
              <span className='ml-auto shrink-0'>{getRelativeDayLabel(event.startTime)}</span>
            )}
          </div>

          <div className='relative flex-1'>
            <p className='truncate text-base leading-tight font-bold text-white'>
              {event.homeCompetitor}
            </p>
            <p className='text-secondary text-[0.65rem] uppercase'>vs</p>
            <p className='truncate text-base leading-tight font-bold text-white'>
              {event.awayCompetitor}
            </p>
          </div>

          {matchWinner && (
            <div className='relative flex gap-1.5'>
              {sortBy(matchWinner.outcomes, o => o.index).map(outcome => (
                <FeaturedOutcomeToggle key={outcome.id} outcome={outcome} />
              ))}
            </div>
          )}

          <Link
            href={`/sport/event/${event.id}`}
            className='text-secondary relative flex items-center justify-end gap-1 text-[0.65rem] font-semibold uppercase transition-colors hover:text-sky-400'
          >
            Full match odds
            <ChevronRight className='size-3' />
          </Link>
        </>
      ) : (
        <div className='relative flex flex-1 flex-col items-center justify-center gap-2 text-center'>
          <div className='bg-dark-300 text-muted-foreground flex size-10 items-center justify-center rounded-full'>
            <SearchXIcon className='size-5' />
          </div>
          <p className='text-secondary text-xs'>This event is no longer available.</p>
        </div>
      )}
    </div>
  )
}

function FeaturedOutcomeToggle(props: {
  outcome: { id: string; name: string; price: unknown; status: string }
}) {
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(Number(props.outcome.price))
  const suspended = props.outcome.status !== 'OPEN'

  return (
    <Toggle.Root
      disabled={suspended}
      suppressHydrationWarning
      className={cn(
        'group/odd flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/5 bg-black/20 py-1.5 transition hover:border-sky-400/20 hover:bg-sky-400/5 disabled:pointer-events-none disabled:opacity-40 data-[state=on]:border-sky-400 data-[state=on]:bg-sky-400/10',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(props.outcome.id)}
      onPressedChange={() => toggleOdd(props.outcome.id)}
    >
      <span className='group-data-[state=on]/odd:text-foreground text-secondary text-[0.65rem]'>
        {props.outcome.name}
      </span>
      <span
        className='text-foreground text-sm font-semibold group-data-[state=on]/odd:text-sky-400'
        suppressHydrationWarning
      >
        {Number(props.outcome.price).toFixed(2)}
      </span>
    </Toggle.Root>
  )
}

export function CarouselSkeleton() {
  return (
    <section>
      <div className='mb-3 flex items-center justify-between'>
        <Skeleton className='h-6 w-40' />
      </div>
      <div className='flex gap-4 overflow-hidden py-5'>
        <Skeleton className={cn(CARD_SIZE, 'shrink-0 rounded-2xl')} />
        <Skeleton className={cn(CARD_SIZE, 'shrink-0 rounded-2xl')} />
        <Skeleton className={cn(CARD_SIZE, 'shrink-0 rounded-2xl')} />
      </div>
    </section>
  )
}
