'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { sortBy } from 'lodash'
import { CheckIcon, ChevronLeft, ChevronRight, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { Toggle } from 'radix-ui'
import { Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BsBatteryCharging } from 'react-icons/bs'
import { GiFlame } from 'react-icons/gi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { graphql, useLazyLoadQuery } from 'react-relay'
import type {
  CarouselQuery,
  CarouselQuery$data,
} from '@/app/sport/__generated__/CarouselQuery.graphql'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn, formatBalance, getRelativeDayLabel, initials, stringToHue } from '@/lib/utils'

type FeaturedBet = CarouselQuery$data['featuredBets'][number]

const KIND_META = {
  COMBO_OF_WEEK: {
    label: 'Combo of the Week',
    icon: GiFlame,
    text: 'text-purple-accent',
    chip: 'bg-purple-accent/15',
    blob: 'bg-purple-accent',
    ring: 'hover:border-purple-accent/40',
  },
  BET_BOOST: {
    label: 'Bet Boost',
    icon: BsBatteryCharging,
    text: 'text-primary',
    chip: 'bg-primary/15',
    blob: 'bg-primary',
    ring: 'hover:border-primary/40',
  },
  FEATURED_GAME: {
    label: 'Featured Game',
    icon: HiOutlineSparkles,
    text: 'text-sky-400',
    chip: 'bg-sky-400/15',
    blob: 'bg-sky-400',
    ring: 'hover:border-sky-400/40',
  },
} as const

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
          title
          subtitle
          combinedPrice
          boostedPrice
          maxStake
          validTo
          selections {
            outcomeId
            # eventId
            eventName
            marketName
            outcomeName
            price
            available
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
                name
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
        className='flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-1 py-6'
      >
        {bets.map(bet => (
          <FeaturedBetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </section>
  )
}

function FeaturedBetCard({ bet }: { bet: FeaturedBet }) {
  switch (bet.kind) {
    case 'BET_BOOST':
      return <BetBoostCard bet={bet} />
    case 'FEATURED_GAME':
      return <FeaturedGameCard bet={bet} />
    default:
      return <ComboOfWeekCard bet={bet} />
  }
}

/* -------------------------------------------------------------------------- */
/* Shared shell                                                               */
/* -------------------------------------------------------------------------- */

function useEndsIn(validTo: string | null | undefined) {
  return validTo && Date.parse(validTo) > Date.now()
    ? formatDistanceToNowStrict(new Date(validTo))
    : null
}

function CardShell(props: {
  kind: keyof typeof KIND_META
  endsIn?: string | null
  children: React.ReactNode
}) {
  const meta = KIND_META[props.kind]
  const Icon = meta.icon

  return (
    <div
      className={cn(
        'group relative flex w-72 shrink-0 snap-start flex-col gap-3 overflow-hidden rounded-2xl border border-white/5 bg-black/30 p-4 transition-all duration-300 hover:border-white/15 sm:w-80',
        meta.ring
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute -top-12 -right-12 size-40 rounded-full opacity-15 blur-3xl transition-opacity duration-300 group-hover:opacity-30',
          meta.blob
        )}
      />

      <div className='relative flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2.5'>
          <div
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full',
              meta.chip
            )}
          >
            <Icon className={cn('size-4', meta.text)} />
          </div>
          <span className={cn('text-[0.65rem] font-bold tracking-wider uppercase', meta.text)}>
            {meta.label}
          </span>
        </div>
        {props.endsIn && (
          <span className='text-secondary shrink-0 text-[0.65rem] whitespace-nowrap'>
            ends in {props.endsIn}
          </span>
        )}
      </div>

      {props.children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Bet Boost — 100% about the one boosted bet                                 */
/* -------------------------------------------------------------------------- */

function BetBoostCard({ bet }: { bet: FeaturedBet }) {
  const endsIn = useEndsIn(bet.validTo)
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()

  const availableSelections = bet.selections.filter(s => s.available)
  const allAdded =
    availableSelections.length > 0 && availableSelections.every(s => hasOdd(s.outcomeId))

  const handleSelect = () => {
    availableSelections.forEach(s => {
      if (!hasOdd(s.outcomeId)) toggleOdd(s.outcomeId)
    })
  }

  const leg = bet.selections[0]

  return (
    <CardShell kind='BET_BOOST' endsIn={endsIn}>
      <div className='relative min-w-0'>
        <h3 className='truncate text-base font-bold text-white'>{bet.title}</h3>
        {bet.subtitle && <p className='text-secondary mt-0.5 truncate text-xs'>{bet.subtitle}</p>}
      </div>

      {leg && (
        <div
          className={cn(
            'relative flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/3 px-3 py-2.5',
            !leg.available && 'line-through opacity-40'
          )}
        >
          <div className='min-w-0'>
            <p className='truncate text-sm font-bold text-white'>{leg.outcomeName ?? '—'}</p>
            <p className='text-secondary truncate text-xs'>
              {leg.marketName}
              {leg.eventName ? ` · ${leg.eventName}` : ''}
            </p>
          </div>
          {leg.price && (
            <span className='shrink-0 font-mono text-sm font-semibold text-white/70'>
              {Number(leg.price).toFixed(2)}
            </span>
          )}
        </div>
      )}

      <div className='relative mt-auto flex items-end justify-between gap-3 border-t border-white/5 pt-3'>
        <div className='flex flex-col'>
          <span className='text-secondary text-[0.65rem] tracking-wide uppercase'>
            Boosted odds
          </span>
          <span className='flex items-center gap-2'>
            {bet.combinedPrice && (
              <span className='text-secondary text-xs line-through'>
                {Number(bet.combinedPrice).toFixed(2)}
              </span>
            )}
            <span className='text-primary text-2xl font-bold'>
              {bet.boostedPrice ? Number(bet.boostedPrice).toFixed(2) : '—'}
            </span>
          </span>
          {bet.maxStake && (
            <span className='text-secondary text-[0.6rem]'>
              Max stake {formatBalance(Number(bet.maxStake))}
            </span>
          )}
        </div>

        <button
          type='button'
          onClick={handleSelect}
          disabled={allAdded || availableSelections.length === 0}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all',
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
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* Combo of the Week — the multi-leg list                                     */
/* -------------------------------------------------------------------------- */

function ComboOfWeekCard({ bet }: { bet: FeaturedBet }) {
  const endsIn = useEndsIn(bet.validTo)
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()

  const availableSelections = bet.selections.filter(s => s.available)
  const allAdded =
    availableSelections.length > 0 && availableSelections.every(s => hasOdd(s.outcomeId))

  const handleAdd = () => {
    availableSelections.forEach(s => {
      if (!hasOdd(s.outcomeId)) toggleOdd(s.outcomeId)
    })
  }

  return (
    <CardShell kind='COMBO_OF_WEEK' endsIn={endsIn}>
      <div className='relative min-w-0'>
        <h3 className='truncate text-base font-bold text-white'>{bet.title}</h3>
        {bet.subtitle && <p className='text-secondary mt-0.5 truncate text-xs'>{bet.subtitle}</p>}
      </div>

      {bet.selections.length > 0 && (
        <div className='relative flex flex-col gap-1.5'>
          {bet.selections.slice(0, 3).map(s => (
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
          {bet.selections.length > 3 && (
            <p className='text-secondary text-[0.65rem]'>
              +{bet.selections.length - 3} more selection
              {bet.selections.length - 3 === 1 ? '' : 's'}
            </p>
          )}
        </div>
      )}

      <div className='relative mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-3'>
        <div className='flex flex-col'>
          <span className='text-secondary text-[0.65rem] tracking-wide uppercase'>
            Combined odds
          </span>
          <span className='text-purple-accent text-lg font-bold'>
            {bet.combinedPrice ? Number(bet.combinedPrice).toFixed(2) : '—'}
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
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* Featured Game — mini preview of the event, with the match winner market    */
/* -------------------------------------------------------------------------- */

function FeaturedGameCard({ bet }: { bet: FeaturedBet }) {
  const endsIn = useEndsIn(bet.validTo)
  const event = bet.selections.find(s => s.event)?.event ?? null
  const matchWinner =
    event?.markets.find(m => m.kind === 'match_winner') ?? event?.markets[0] ?? null

  return (
    <CardShell kind='FEATURED_GAME' endsIn={endsIn}>
      <div className='relative min-w-0'>
        <h3 className='truncate text-base font-bold text-white'>{bet.title}</h3>
        {bet.subtitle && <p className='text-secondary mt-0.5 truncate text-xs'>{bet.subtitle}</p>}
      </div>

      {event ? (
        <>
          <div className='relative flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/3 px-3 py-3'>
            <MiniTeam name={event.homeCompetitor} />
            <div className='flex shrink-0 flex-col items-center gap-1 px-1'>
              {event.status === 'LIVE' ? (
                <span className='text-destructive flex items-center gap-1 text-[0.6rem] uppercase'>
                  <span className='relative inline-flex size-1.5'>
                    <span className='bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75' />
                    <span className='bg-destructive relative inline-flex size-1.5 rounded-full' />
                  </span>
                  Live
                </span>
              ) : (
                <span className='text-secondary flex items-center gap-1 text-[0.6rem] uppercase'>
                  <SportIcon sport={event.sport.key} className='size-3' />
                  {getRelativeDayLabel(event.startTime)}
                </span>
              )}
              <span className='text-secondary text-[0.65rem]'>vs</span>
            </div>
            <MiniTeam name={event.awayCompetitor} reverse />
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
            className='text-secondary relative mt-auto flex items-center justify-center gap-1 border-t border-white/5 pt-3 text-xs font-semibold uppercase transition-colors hover:text-sky-400'
          >
            Full match odds
          </Link>
        </>
      ) : (
        <p className='text-secondary relative text-xs'>This event is no longer available.</p>
      )}
    </CardShell>
  )
}

function MiniTeam(props: { name: string; reverse?: boolean }) {
  const hue = stringToHue(props.name)

  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-2',
        props.reverse && 'flex-row-reverse text-right'
      )}
    >
      <div
        className='flex size-7 min-w-7 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold text-white'
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 40) % 360} 70% 30%))`,
        }}
      >
        {initials(props.name)}
      </div>
      <span className='truncate text-xs font-semibold text-white'>{props.name}</span>
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
      <div className='flex gap-4 overflow-hidden py-6'>
        <Skeleton className='h-56 w-72 shrink-0 rounded-2xl sm:w-80' />
        <Skeleton className='h-56 w-72 shrink-0 rounded-2xl sm:w-80' />
        <Skeleton className='h-56 w-72 shrink-0 rounded-2xl sm:w-80' />
      </div>
    </section>
  )
}
