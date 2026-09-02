'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { CheckIcon, ChevronLeft, ChevronRight, FlameIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
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
import { Skeleton } from '@/components/ui/skeleton'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { cn, formatBalance } from '@/lib/utils'

type FeaturedBet = CarouselQuery$data['featuredBets'][number]

const KIND_META = {
  COMBO_OF_WEEK: {
    label: 'Combo of the Week',
    icon: GiFlame,
    text: 'text-primary',
    chip: 'bg-primary/15',
    blob: 'bg-primary',
    ring: 'hover:border-primary/40', //'hover:shadow-[0_0_40px_-8px_rgba(209,243,102,0.35)]',
  },
  BET_BOOST: {
    label: 'Bet Boost',
    icon: BsBatteryCharging,
    text: 'text-purple-accent',
    chip: 'bg-purple-accent/15',
    blob: 'bg-purple-accent',
    ring: 'hover:border-purple-accent/40', //'hover:shadow-[0_0_40px_-8px_rgba(127,92,255,0.4)]',
  },
  FEATURED_GAME: {
    label: 'Featured Game',
    icon: HiOutlineSparkles,
    text: 'text-sky-400',
    chip: 'bg-sky-400/15',
    blob: 'bg-sky-400',
    ring: 'hover:border-sky-400/40', //'hover:shadow-[0_0_40px_-8px_rgba(56,189,248,0.35)]',
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
            eventId
            eventName
            marketName
            outcomeName
            price
            available
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
  const meta = KIND_META[bet.kind as keyof typeof KIND_META] ?? KIND_META.FEATURED_GAME
  const Icon = meta.icon

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

  const singleEventId = bet.selections.length === 1 ? bet.selections[0].eventId : null
  const price = bet.kind === 'BET_BOOST' ? bet.boostedPrice : bet.combinedPrice
  const endsIn =
    bet.validTo && Date.parse(bet.validTo) > Date.now()
      ? formatDistanceToNowStrict(new Date(bet.validTo))
      : null

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
        {endsIn && (
          <span className='text-secondary shrink-0 text-[0.65rem] whitespace-nowrap'>
            ends in {endsIn}
          </span>
        )}
      </div>

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
            {bet.kind === 'BET_BOOST' ? 'Boosted odds' : 'Combined odds'}
          </span>
          <span className='flex items-center gap-2'>
            {bet.kind === 'BET_BOOST' && bet.combinedPrice && (
              <span className='text-secondary text-xs line-through'>
                {Number(bet.combinedPrice).toFixed(2)}
              </span>
            )}
            <span className={cn('text-lg font-bold', meta.text)}>
              {price ? Number(price).toFixed(2) : '—'}
            </span>
          </span>
          {bet.kind === 'BET_BOOST' && bet.maxStake && (
            <span className='text-secondary text-[0.6rem]'>
              Max stake {formatBalance(Number(bet.maxStake))}
            </span>
          )}
        </div>

        {singleEventId ? (
          <Link
            href={`/sport/event/${singleEventId}`}
            className='bg-primary hover:shadow-glow text-primary-foreground shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all'
          >
            View
          </Link>
        ) : (
          <button
            type='button'
            onClick={handleAdd}
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
                Add
              </>
            )}
          </button>
        )}
      </div>
    </div>
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
