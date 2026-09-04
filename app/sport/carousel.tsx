'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { sortBy } from 'lodash'
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  PlusIcon,
  SearchXIcon,
  ZapIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Toggle } from 'radix-ui'
import { Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { GiFlame } from 'react-icons/gi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'
import type { BetBoostCard_bet$key } from '@/app/sport/__generated__/BetBoostCard_bet.graphql'
import type {
  CarouselQuery,
  CarouselQuery$data,
} from '@/app/sport/__generated__/CarouselQuery.graphql'
import type { ComboOfWeekCard_bet$key } from '@/app/sport/__generated__/ComboOfWeekCard_bet.graphql'
import type { FeaturedGameCard_bet$key } from '@/app/sport/__generated__/FeaturedGameCard_bet.graphql'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn, formatBalance, getRelativeDayLabel, initials, stringToHue } from '@/lib/utils'

/**
 * NOTE: three colocated fragments (one per card) instead of one flat
 * `featuredBets` selection. `FeaturedBet` isn't a per-kind GraphQL
 * union/interface (it's one concrete type with a `kind` enum), so a card
 * still receives the ref for all three fragments — each `useFragment` call
 * below just reads the subset of fields that card actually needs. Run
 * `pnpm relay` to (re)generate the artifacts these imports point at.
 *
 * All three cards share one fixed footprint (CARD_SIZE below) on purpose —
 * that's what makes them read as a matched set in the strip. Everything
 * *inside* that footprint — shape, layout, accent — is deliberately
 * different per card, so "same size" never means "same card".
 */

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
          ...BetBoostCard_bet
          ...ComboOfWeekCard_bet
          ...FeaturedGameCard_bet
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

function CardHeader(props: {
  icon: React.ReactNode
  label: string
  labelClassName?: string
  endsIn: string | null
}) {
  return (
    <div className='relative flex items-center justify-between gap-2'>
      <span
        className={cn(
          'inline-flex shrink-0 items-center gap-1.5 text-[0.65rem] font-bold tracking-wide uppercase',
          props.labelClassName
        )}
      >
        {props.icon}
        {props.label}
      </span>
      {props.endsIn && (
        <span className='text-secondary shrink-0 truncate text-[0.65rem]'>
          ends in {props.endsIn}
        </span>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Bet Boost — a price tag, not a form. Two columns: the boosted number owns  */
/* the left with real hierarchy (was → now, +% when we have both prices),    */
/* context + CTA fill the right. Nothing stacked, nothing repeated.          */
/* -------------------------------------------------------------------------- */

function BetBoostCard(props: { bet: BetBoostCard_bet$key }) {
  const data = useFragment(
    graphql`
      fragment BetBoostCard_bet on FeaturedBet {
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
  const boostPct = boosted && was && was > 0 ? Math.round((boosted / was - 1) * 100) : null

  const handleSelect = () => {
    availableSelections.forEach(s => {
      if (!hasOdd(s.outcomeId)) toggleOdd(s.outcomeId)
    })
  }

  return (
    <div
      className={cn(
        CARD_SIZE,
        'group bg-primary/6 border-primary/25 hover:border-primary/45 relative flex shrink-0 snap-start flex-col overflow-hidden rounded-2xl border p-4 transition-colors duration-300'
      )}
    >
      <CardHeader
        icon={<ZapIcon className='size-3.5' fill='currentColor' />}
        label='Bet Boost'
        labelClassName='text-primary'
        endsIn={endsIn}
      />

      <div className='relative mt-3 flex min-h-0 flex-1 items-stretch gap-4'>
        {/* boost figure — always the loudest thing on the card */}
        <div className='flex shrink-0 flex-col items-center justify-center gap-1 border-r border-white/10 pr-4 text-center'>
          <span className='text-secondary text-[0.6rem] font-bold tracking-wide whitespace-nowrap uppercase'>
            Boosted odds
          </span>
          {was && (
            <span className='text-secondary flex items-center gap-1 text-xs whitespace-nowrap'>
              <span className='line-through'>{was.toFixed(2)}</span>
              <ArrowRightIcon className='size-3' />
            </span>
          )}
          <span className='text-primary text-4xl leading-none font-black whitespace-nowrap sm:text-5xl'>
            {boosted ? boosted.toFixed(2) : '—'}
          </span>
          {boostPct !== null && boostPct > 0 && (
            <span className='text-primary/70 text-[0.65rem] font-bold whitespace-nowrap'>
              +{boostPct}% boost
            </span>
          )}
        </div>

        {/* context + CTA */}
        <div className='flex min-w-0 flex-1 flex-col justify-between gap-3'>
          <div className='min-w-0'>
            <p className='truncate text-sm font-bold text-white'>{leg?.eventName ?? '—'}</p>
            <p className='text-secondary truncate text-xs'>
              {leg?.marketName}
              {leg?.outcomeName ? ` · ${leg.outcomeName}` : ''}
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            {data.maxStake && (
              <span className='text-secondary text-[0.65rem]'>
                Max stake {formatBalance(Number(data.maxStake))}
              </span>
            )}
            <button
              type='button'
              onClick={handleSelect}
              disabled={allAdded || availableSelections.length === 0}
              className={cn(
                'flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold uppercase transition-all',
                allAdded
                  ? 'bg-primary/15 text-primary cursor-default'
                  : 'bg-primary hover:shadow-glow text-primary-foreground'
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
                  Select
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Combo of the Week — the only card whose content is genuinely a list, so   */
/* it's the only one that keeps a row-per-item body.                         */
/* -------------------------------------------------------------------------- */

function ComboOfWeekCard(props: { bet: ComboOfWeekCard_bet$key }) {
  const data = useFragment(
    graphql`
      fragment ComboOfWeekCard_bet on FeaturedBet {
        title
        subtitle
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
        'group hover:border-purple-accent/40 relative flex shrink-0 snap-start flex-col gap-2.5 overflow-hidden rounded-2xl border border-white/5 bg-black/30 p-3.5 transition-colors duration-300'
      )}
    >
      <CardHeader
        icon={<GiFlame className='size-3.5' />}
        label='Combo of the Week'
        labelClassName='text-purple-accent'
        endsIn={endsIn}
      />

      <div className='relative min-w-0'>
        <h3 className='truncate text-sm font-bold text-white'>{data.title}</h3>
        {data.subtitle && <p className='text-secondary truncate text-xs'>{data.subtitle}</p>}
      </div>

      <div className='relative flex flex-1 flex-col justify-center gap-1.5'>
        {data.selections.slice(0, 3).map(s => (
          <div
            key={s.outcomeId}
            className={cn(
              'flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-white/3 px-2.5 py-1.5 text-xs',
              !s.available && 'line-through opacity-40'
            )}
          >
            <div className='min-w-0'>
              <p className='truncate text-white/90'>{s.outcomeName ?? '—'}</p>
              <p className='text-secondary truncate text-[0.65rem]'>
                {s.marketName}
                {s.eventName ? ` · ${s.eventName}` : ''}
              </p>
            </div>
            {s.price && (
              <span className='shrink-0 font-mono font-semibold text-white'>
                {Number(s.price).toFixed(2)}
              </span>
            )}
          </div>
        ))}
        {data.selections.length > 3 && (
          <p className='text-secondary text-[0.65rem]'>
            +{data.selections.length - 3} more selection
            {data.selections.length - 3 === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <div className='relative flex items-center justify-between gap-3 border-t border-white/5 pt-2.5'>
        <div className='flex flex-col'>
          <span className='text-secondary text-[0.65rem] tracking-wide uppercase'>
            Combined odds
          </span>
          <span className='text-purple-accent text-lg font-bold'>
            {data.combinedPrice ? Number(data.combinedPrice).toFixed(2) : '—'}
          </span>
        </div>

        <button
          type='button'
          onClick={handleAdd}
          disabled={allAdded || availableSelections.length === 0}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all',
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

/* -------------------------------------------------------------------------- */
/* Featured Game — a head-to-head panel: both teams centred and stacked      */
/* (avatar above name, own column, own truncation), never sharing a line     */
/* with anything else, so nothing can collide regardless of name length.     */
/* -------------------------------------------------------------------------- */

function FeaturedGameCard(props: { bet: FeaturedGameCard_bet$key }) {
  const data = useFragment(
    graphql`
      fragment FeaturedGameCard_bet on FeaturedBet {
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

  const endsIn = useEndsIn(data.validTo)
  const event = data.selections.find(s => s.event)?.event ?? null
  const matchWinner =
    event?.markets.find(m => m.kind === 'match_winner') ?? event?.markets[0] ?? null

  return (
    <div
      className={cn(
        CARD_SIZE,
        'group relative flex shrink-0 snap-start flex-col gap-3 overflow-hidden rounded-2xl border border-white/5 bg-black/30 p-3.5 transition-colors duration-300 hover:border-sky-400/40'
      )}
    >
      <CardHeader
        icon={<HiOutlineSparkles className='size-3.5' />}
        label='Featured Game'
        labelClassName='text-sky-400'
        endsIn={endsIn}
      />

      {event ? (
        <>
          <div className='text-secondary relative flex items-center justify-center gap-1.5 text-[0.65rem] uppercase'>
            <SportIcon sport={event.sport.key} className='size-3 shrink-0' />
            <span className='max-w-32 truncate'>{event.tournament.name}</span>
            <span>·</span>
            {event.status === 'LIVE' ? (
              <span className='text-destructive flex shrink-0 items-center gap-1'>
                <span className='relative inline-flex size-1.5'>
                  <span className='bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75' />
                  <span className='bg-destructive relative inline-flex size-1.5 rounded-full' />
                </span>
                Live
              </span>
            ) : (
              <span className='shrink-0'>{getRelativeDayLabel(event.startTime)}</span>
            )}
          </div>

          <div className='relative flex flex-1 items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/3 px-3'>
            <TeamBlock name={event.homeCompetitor} />
            <span className='text-secondary flex size-7 shrink-0 items-center justify-center rounded-full bg-sky-400/10 text-[0.6rem] font-bold text-sky-400'>
              VS
            </span>
            <TeamBlock name={event.awayCompetitor} />
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
            className='text-secondary relative flex items-center justify-center gap-1 border-t border-white/5 pt-2.5 text-xs font-semibold uppercase transition-colors hover:text-sky-400'
          >
            Full match odds
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

/** Team column for the head-to-head panel: avatar above name, its own
 * flex column so it never has to share a line — long names wrap to two
 * lines instead of colliding with the avatar or the neighbouring team. */
function TeamBlock(props: { name: string }) {
  const hue = stringToHue(props.name)

  return (
    <div className='flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center'>
      <div
        className='flex size-9 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold text-white'
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 40) % 360} 70% 30%))`,
        }}
      >
        {initials(props.name)}
      </div>
      <span className='line-clamp-2 text-xs leading-tight font-semibold text-white'>
        {props.name}
      </span>
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
      <div className='mb-1 flex items-center justify-between'>
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
