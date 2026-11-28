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
import { GiLaurelCrown } from 'react-icons/gi'
import { HiOutlineSparkles, HiSquare3Stack3D } from 'react-icons/hi2'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useActiveBoost, useApplyBoost, useCombo, useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { useT } from '@/context/providers'
import { translateMarketName, translateOutcomeName } from '@/lib/api-names'
import { cn, formatBalance, getRelativeDayLabel } from '@/lib/utils'
import type { BetBoostCard$key } from '@/relay/__generated__/BetBoostCard.graphql'
import type { Carousel$data, Carousel$key } from '@/relay/__generated__/Carousel.graphql'
import type { ComboOfWeekCard$key } from '@/relay/__generated__/ComboOfWeekCard.graphql'
import type { FeaturedGameCard$key } from '@/relay/__generated__/FeaturedGameCard.graphql'
import type { PrematchQuery } from '@/relay/__generated__/PrematchQuery.graphql'
import PrematchQueryNode from '@/relay/__generated__/PrematchQuery.graphql'

const CARD_SIZE = 'h-72 w-72 sm:w-80'

const KIND_ORDER = ['COMBO_OF_WEEK', 'BET_BOOST', 'FEATURED_GAME'] as const

type FeaturedBetRow = Carousel$data['featuredBets'][number]

export default function Carousel(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  return (
    <ErrorBoundary FallbackComponent={SectionErrorFallback}>
      <Suspense fallback={<CarouselSkeleton />}>
        <CarouselContent queryRef={props.queryRef} />
      </Suspense>
    </ErrorBoundary>
  )
}

function CarouselContent(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  const preloaded = usePreloadedQuery<PrematchQuery>(PrematchQueryNode, props.queryRef)
  const data = useFragment(
    graphql`
      fragment Carousel on Query {
        featuredBets {
          id
          kind
          ...BetBoostCard
          ...ComboOfWeekCard
          ...FeaturedGameCard
        }
      }
    `,
    preloaded as Carousel$key
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

  const t = useT()

  if (bets.length === 0) return null

  return (
    <section className='relative'>
      <div className='mb-1 flex items-center justify-between'>
        <h2 className='font-display text-foreground flex items-center gap-2 text-lg font-bold sm:text-xl'>
          <HiOutlineSparkles className='text-brand size-5' />
          {t('Featured Bets')}
        </h2>
        <div className='hidden items-center gap-2 sm:flex'>
          <button
            type='button'
            onClick={() => scroll('left')}
            aria-label={t('Scroll left')}
            className='bg-surface hover:bg-surface-2 text-foreground/60 hover:text-foreground flex size-8 items-center justify-center rounded-full transition-colors'
          >
            <ChevronLeft className='size-4' />
          </button>
          <button
            type='button'
            onClick={() => scroll('right')}
            aria-label={t('Scroll right')}
            className='bg-surface hover:bg-surface-2 text-foreground/60 hover:text-foreground flex size-8 items-center justify-center rounded-full transition-colors'
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
      return <BetBoostCard bet={bet} id={bet.id} />
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

/**
 * Splits a full promo wordmark phrase into two visual lines. Translators
 * receive the *whole* phrase as a single key (e.g. `t('Bet Boost')`), and
 * we split at render time so word order / articles survive translation.
 *
 * Default: split on the last space, so the final word becomes the accent
 * line. Override with `splitAt` if a locale needs a different break
 * (e.g. `splitAt="first"` for languages where the accent word leads).
 */
function splitWordmark(
  phrase: string,
  splitAt: 'first' | 'last' = 'last'
): { top: string; bottom: string } {
  const parts = phrase.trim().split(/\s+/)
  if (parts.length < 2) return { top: '', bottom: phrase }

  const i = splitAt === 'first' ? 1 : parts.length - 1
  return {
    top: parts.slice(0, i).join(' '),
    bottom: parts.slice(i).join(' '),
  }
}

function PromoWordmark(props: {
  phrase: string
  accentClassName: string
  icon: React.ReactNode
  splitAt?: 'first' | 'last'
}) {
  const { top, bottom } = splitWordmark(props.phrase, props.splitAt)
  return (
    <div className='relative flex items-start justify-between gap-2'>
      <div className='leading-[0.82]'>
        <p className='font-display text-foreground text-xl font-black uppercase italic'>{top}</p>
        <p
          className={cn('font-display text-3xl font-black uppercase italic', props.accentClassName)}
        >
          {bottom}
        </p>
      </div>
      <div className='shrink-0 pt-1'>{props.icon}</div>
    </div>
  )
}

function BetBoostCard(props: { bet: BetBoostCard$key; id: string }) {
  const data = useFragment(
    graphql`
      fragment BetBoostCard on FeaturedBet {
        boostedPrice
        combinedPrice
        maxStake
        betsRemaining
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
  const t = useT()

  const availableSelections = data.selections.filter(s => s.available)
  const leg = data.selections[0]

  const boosted = data.boostedPrice ? Number(data.boostedPrice) : null
  const was = data.combinedPrice ? Number(data.combinedPrice) : null

  const applyBoost = useApplyBoost()
  const active = useActiveBoost()
  const allAdded = active?.id === props.id
  // null when signed out: nothing is known about the player's bets yet
  const used = data.betsRemaining === 0

  const handleSelect = () =>
    applyBoost({
      id: props.id,
      outcomeIds: availableSelections.map(s => s.outcomeId),
      boostedPrice: String(data.boostedPrice),
      combinedPrice: String(data.combinedPrice),
      maxStake: data.maxStake ? String(data.maxStake) : null,
      validTo: data.validTo ? String(data.validTo) : null,
    })

  const [home, away] = (leg?.eventName ?? '').split(' vs ')

  return (
    <div
      className={cn(
        CARD_SIZE,
        'group bg-surface border-brand/40 hover:border-brand/70 relative flex shrink-0 snap-start flex-col gap-2 overflow-hidden rounded-2xl border p-3.5 transition-colors duration-300'
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_55%)]' />

      <PromoWordmark
        phrase={t('Bet Boost')}
        accentClassName='text-brand text-glow-md'
        icon={
          <ChevronsUp
            className='text-brand icon-glow size-8'
            strokeWidth={3}
          />
        }
      />

      {endsIn && (
        <p className='text-secondary relative -mt-1 text-right text-[0.6rem] tracking-wide uppercase'>
          {t('Ends in {time}', { time: endsIn })}
        </p>
      )}

      <div className='relative min-w-0'>
        <p className='text-foreground truncate text-sm font-bold'>
          {home || leg?.eventName || '—'}
          {away && (
            <>
              <span className='text-secondary mx-1 text-xs font-normal normal-case'>{t('vs')}</span>
              {away}
            </>
          )}
        </p>
        <p className='text-secondary mt-0.5 truncate text-[0.65rem] tracking-wide uppercase'>
          {leg?.marketName && translateMarketName(t, leg.marketName)}
          {leg?.outcomeName ? ` · ${translateOutcomeName(t, leg.outcomeName)}` : ''}
        </p>
      </div>

      <div className='relative flex flex-1 flex-col justify-center gap-0.5'>
        <span className='text-secondary text-sm font-semibold line-through'>
          {was ? was.toFixed(2) : '—'}
        </span>
        <span className='text-brand text-4xl leading-none font-black'>
          {boosted ? boosted.toFixed(2) : '—'}
        </span>
      </div>

      <div className='relative flex items-center gap-2'>
        <div className='text-secondary flex min-w-0 flex-col text-[0.6rem]'>
          {data.maxStake && (
            <span className='shrink-0'>
              {t('Max {amount}', {
                amount: formatBalance(Number(data.maxStake)),
              })}
            </span>
          )}
          {data.betsRemaining != null && (
            <span className={cn('shrink-0', used && 'text-warning')}>
              {used ? t('Boost used') : t('Bets left: {n}', { n: data.betsRemaining })}
            </span>
          )}
        </div>
        <button
          type='button'
          onClick={handleSelect}
          disabled={
            allAdded ||
            used ||
            availableSelections.length === 0 ||
            availableSelections.length !== data.selections.length
          }
          className={cn(
            'group/cta ml-auto flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all',
            allAdded
              ? 'bg-brand/15 text-brand cursor-default'
              : 'bg-primary hover:shadow-glow text-primary-foreground'
          )}
        >
          {allAdded ? (
            <>
              <CheckIcon className='size-3.5' />
              {t('Added')}
            </>
          ) : (
            <>
              {t('Select')}
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
  const combo = useCombo()
  const t = useT()

  const availableSelections = data.selections.filter(s => s.available)
  const allAdded =
    availableSelections.length > 0 && availableSelections.every(s => hasOdd(s.outcomeId))

  const handleAdd = () => {
    combo(availableSelections.map(s => s.outcomeId))
  }

  return (
    <div
      className={cn(
        CARD_SIZE,
        'group bg-surface border-purple-accent/40 hover:border-purple-accent/70 relative flex shrink-0 snap-start flex-col gap-1.5 overflow-hidden rounded-2xl border p-3 transition-colors duration-300'
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_55%)]' />

      <PromoWordmark
        phrase={t('Combo of the Week')}
        accentClassName='text-purple-accent glow-accent text-glow-md'
        icon={
          <HiSquare3Stack3D className='text-purple-accent glow-accent icon-glow size-8' />
        }
      />

      <div className='text-secondary relative flex items-center gap-2 text-[0.6rem] tracking-wide uppercase'>
        {data.title && (
          <span className='text-foreground/80 min-w-0 truncate normal-case'>{data.title}</span>
        )}
        {endsIn && (
          <span className='ml-auto shrink-0'>{t('Ends in {time}', { time: endsIn })}</span>
        )}
      </div>

      <div className='relative flex flex-1 flex-col justify-center gap-1'>
        {data.selections.slice(0, 3).map(s => (
          <div
            key={s.outcomeId}
            className={cn(
              'border-line bg-foreground/3 flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1 text-[0.7rem]',
              !s.available && 'line-through opacity-40'
            )}
          >
            <span className='text-foreground/90 truncate'>
              {s.outcomeName ? translateOutcomeName(t, s.outcomeName) : '—'}
              {s.eventName && <span className='text-secondary'> · {s.eventName}</span>}
            </span>
            {s.price && (
              <span className='text-foreground shrink-0 font-semibold'>
                {Number(s.price).toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className='relative flex items-center justify-between gap-3'>
        <div className='flex flex-col'>
          <span className='text-purple-accent text-[0.55rem] font-bold tracking-wide uppercase'>
            {t('Combined odds')}
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
              {t('Added')}
            </>
          ) : (
            <>
              <PlusIcon className='size-3.5' />
              {t('Add')}
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

  const t = useT()
  const event = data.selections.find(s => s.event)?.event ?? null
  const matchWinner =
    event?.markets.find(m => m.kind === 'match_winner') ?? event?.markets[0] ?? null

  return (
    <div
      className={cn(
        CARD_SIZE,
        'group bg-surface border-info/40 hover:border-info/70 relative flex shrink-0 snap-start flex-col gap-2 overflow-hidden rounded-2xl border p-3.5 transition-colors duration-300'
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklab,var(--info)_16%,transparent),transparent_55%)]' />

      <PromoWordmark
        phrase={t('Top Pick')}
        accentClassName='text-info glow-info text-glow-md'
        icon={
          <GiLaurelCrown className='text-info glow-info icon-glow size-8' />
        }
      />

      {event ? (
        <>
          <div className='text-secondary relative flex items-center gap-1.5 text-[0.6rem] tracking-wide uppercase'>
            <SportIcon sport={event.sport.key} className='size-3 shrink-0' />
            {/* eslint-disable-next-line local-i18n/no-untranslated-api-string -- proper noun */}
            <span className='min-w-0 truncate'>{event.tournament.name}</span>
            {event.status === 'LIVE' ? (
              <span className='text-destructive ml-auto flex shrink-0 items-center gap-1 font-bold'>
                <span className='relative inline-flex size-1.5'>
                  <span className='bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75' />
                  <span className='bg-destructive relative inline-flex size-1.5 rounded-full' />
                </span>
                {t('Live')}
              </span>
            ) : (
              <span className='ml-auto shrink-0'>{getRelativeDayLabel(event.startTime)}</span>
            )}
          </div>

          <div className='relative flex-1'>
            <p className='text-foreground truncate text-base leading-tight font-bold'>
              {event.homeCompetitor}
            </p>
            <p className='text-secondary text-[0.65rem] uppercase'>{t('vs')}</p>
            <p className='text-foreground truncate text-base leading-tight font-bold'>
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
            href={`/event/${event.id}`}
            className='text-secondary hover:text-info relative flex items-center justify-end gap-1 text-[0.65rem] font-semibold uppercase transition-colors'
          >
            {t('Full match odds')}
            <ChevronRight className='size-3' />
          </Link>
        </>
      ) : (
        <div className='relative flex flex-1 flex-col items-center justify-center gap-2 text-center'>
          <div className='bg-surface-2 text-muted-foreground flex size-10 items-center justify-center rounded-full'>
            <SearchXIcon className='size-5' />
          </div>
          <p className='text-secondary text-xs'>{t('This event is no longer available.')}</p>
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
  const t = useT()

  return (
    <Toggle.Root
      disabled={suspended}
      suppressHydrationWarning
      className={cn(
        'group/odd border-control-border bg-control hover:border-info/20 hover:bg-info/5 data-[state=on]:border-info data-[state=on]:bg-info/10 flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border py-1.5 transition disabled:pointer-events-none disabled:opacity-40',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(props.outcome.id)}
      onPressedChange={() => toggleOdd(props.outcome.id)}
    >
      <span className='group-data-[state=on]/odd:text-foreground text-secondary text-[0.65rem]'>
        {translateOutcomeName(t, props.outcome.name)}
      </span>
      <span
        className='text-foreground group-data-[state=on]/odd:text-info text-sm font-semibold'
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
