'use client'

import { format } from 'date-fns'
import { SearchXIcon } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { GoalBadge, hasGoals } from '@/app/live/goal-badge'
import { getPeriod, getPeriodAt } from '@/app/live/helpers'
import { SET_SPORTS, useLiveClock } from '@/app/live/live-event'
import { ServeDot } from '@/app/live/serve-dot'
import { EventHeaderRow } from '@/components/event-header-row'
import { FavouriteButton } from '@/components/favourite-button'
import MarketGroups, { MarketGroupsSkeleton } from '@/components/market-groups'
import { MatchTracker } from '@/components/match-tracker'
import { SportIcon } from '@/components/sport-icon'
import StatisticsWidget, { StatisticsWidgetSkeleton } from '@/components/statistics-widget'
import { TeamBadge } from '@/components/team-badge'
import { useGoalFlash } from '@/context/hooks'
import { useT } from '@/context/providers'
import { cn, getRelativeDayLabel } from '@/lib/utils'
import type { EventState$key } from '@/relay/__generated__/EventState.graphql'
import type { LiveScoreboard$key } from '@/relay/__generated__/LiveScoreboard.graphql'
import type { LiveSingleHeader$key } from '@/relay/__generated__/LiveSingleHeader.graphql'
import type { LiveSingleView$key } from '@/relay/__generated__/LiveSingleView.graphql'
import type { LiveSingleViewQuery } from '@/relay/__generated__/LiveSingleViewQuery.graphql'
import LiveSingleViewQueryNode from '@/relay/__generated__/LiveSingleViewQuery.graphql'
import type { ServingIndicator$key } from '@/relay/__generated__/ServingIndicator.graphql'

export default function LiveSingleView(props: { queryRef: PreloadedQuery<LiveSingleViewQuery> }) {
  const preloaded = usePreloadedQuery<LiveSingleViewQuery>(LiveSingleViewQueryNode, props.queryRef)

  const data = useFragment<LiveSingleView$key>(
    graphql`
      fragment LiveSingleView on Event {
        homeCompetitor
        homeImageUrl
        awayCompetitor
        awayImageUrl
        startTime
        ...LiveSingleHeader
        ...EventState
        ...LiveScoreboard
        ...ServingIndicator
        ...MatchTracker
        ...StatisticsWidget @defer
        ...MarketGroups @defer
      }
    `,
    preloaded.event?.LiveSingleView
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!data) return <EventNotFound />

  return (
    <main className='flex min-w-0 flex-col gap-4 sm:gap-6'>
      <section className='flex flex-col gap-3 rounded-2xl border border-white/5 bg-black/20 p-4 sm:gap-4 sm:p-6'>
        <LiveSingleHeader event={data} />
        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4'>
          <Competitor
            name={data.homeCompetitor}
            imageUrl={data.homeImageUrl}
            badge={<ServingIndicator event={data} side='HOME' />}
          />
          <Suspense fallback={<EventLiveStateFallback startTime={data.startTime} />}>
            <EventState event={data} startTime={data.startTime} />
          </Suspense>
          <Competitor
            name={data.awayCompetitor}
            imageUrl={data.awayImageUrl}
            reverse
            badge={<ServingIndicator event={data} side='AWAY' />}
          />
        </div>
        <LiveScoreboard event={data} />
      </section>

      <MatchTracker
        event={data}
        className='overflow-hidden rounded-2xl border border-white/5 bg-black/20'
      />

      <Suspense fallback={<StatisticsWidgetSkeleton />}>
        <StatisticsWidget event={data} />
      </Suspense>

      <Suspense fallback={<MarketGroupsSkeleton />}>
        <MarketGroups event={data} />
      </Suspense>
    </main>
  )
}

function LiveSingleHeader(props: { event: LiveSingleHeader$key }) {
  const data = useFragment(
    graphql`
      fragment LiveSingleHeader on Event {
        sport {
          key
        }
        tournament {
          key
          name
        }
        category {
          name
        }
        status
        period
        ...FavouriteButton
      }
    `,
    props.event
  )

  const t = useT()

  return (
    <EventHeaderRow
      left={
        <>
          {data.status === 'LIVE' && (
            <div className='text-foreground flex shrink-0 items-center gap-1.5 text-xs'>
              <div className='relative size-2'>
                <div className='bg-destructive absolute size-2 animate-ping rounded-full' />
                <div className='bg-destructive absolute size-2 rounded-full' />
              </div>
              {t(getPeriod(data.period).long)}
            </div>
          )}
          <SportIcon sport={data.sport.key} className='size-3.5 shrink-0' />
          <div className='flex min-w-0 items-center gap-2'>
            <span className='truncate'>{data.tournament.name}</span>
            <span className='shrink-0'>·</span>
            <span className='truncate'>{data.category.name}</span>
          </div>
        </>
      }
      favourite={<FavouriteButton event={data} />}
    />
  )
}

function Competitor(props: {
  name: string
  imageUrl?: string | null
  reverse?: boolean
  badge?: React.ReactNode
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-2 sm:gap-3 ${props.reverse ? 'flex-row-reverse text-right' : ''}`}
    >
      <TeamBadge
        name={props.name}
        imageUrl={props.imageUrl}
        className='size-8 min-w-8 text-xs sm:size-10 sm:min-w-10 sm:text-sm'
      />
      <span className='truncate text-xs font-semibold text-white sm:text-sm lg:text-base'>
        {props.name}
      </span>
      {props.badge}
    </div>
  )
}

const SHOWS_SCORE = new Set(['LIVE', 'ENDED', 'ABANDONED'])

function EventState(props: { event: EventState$key; startTime: string }) {
  const data = useFragment(
    graphql`
      fragment EventState on Event {
        status
        sport {
          key
        }
        homeScore
        awayScore
        ...LiveTime
      }
    `,
    props.event
  )

  const { seconds } = useLiveClock(data)
  const enabled = data.status === 'LIVE' && hasGoals(data.sport.key)
  const homeGoal = useGoalFlash(data.homeScore, enabled)
  const awayGoal = useGoalFlash(data.awayScore, enabled)

  const mins = Math.floor((seconds ?? 0) / 60)
  const secs = Math.floor((seconds ?? 0) % 60)

  if (!SHOWS_SCORE.has(data.status)) return <KickoffTime startTime={props.startTime} />

  return (
    <div className='relative flex shrink-0 flex-col items-center gap-1 px-1'>
      <GoalBadge goalId={homeGoal} side='left' />
      <GoalBadge goalId={awayGoal} side='right' />
      <span
        className={cn(
          'text-base leading-none font-bold text-white transition-colors sm:text-lg',
          (homeGoal || awayGoal) && 'text-primary'
        )}
      >
        {data.homeScore ?? 0} - {data.awayScore ?? 0}
      </span>
      {seconds !== null && (
        <div className='text-secondary absolute top-full left-1/2 mt-1 -translate-x-1/2 font-mono text-[0.6rem] whitespace-nowrap sm:text-[0.65rem]'>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
      )}
    </div>
  )
}

function ServingIndicator(props: { event: ServingIndicator$key; side: 'HOME' | 'AWAY' }) {
  const data = useFragment(
    graphql`
      fragment ServingIndicator on Event {
        status
        serving
      }
    `,
    props.event
  )

  if (!data.serving) return null
  return <ServeDot active={data.status === 'LIVE' && data.serving === props.side} />
}

function LiveScoreboard(props: { event: LiveScoreboard$key }) {
  const data = useFragment(
    graphql`
      fragment LiveScoreboard on Event {
        status
        sport {
          key
        }
        homeCompetitor
        awayCompetitor
        homeScore
        awayScore
        pointScore {
          home
          away
        }
        periodScores {
          period
          home
          away
        }
      }
    `,
    props.event
  )
  const t = useT()

  const live = data.status === 'LIVE'
  const points = live ? data.pointScore : null
  const inSets = SET_SPORTS.has(data.sport.key)
  // set sports are scored by the period columns; elsewhere the total is the running score
  const showTotal = !inSets && (data.homeScore != null || data.awayScore != null)
  if (data.periodScores.length === 0 && !points && !showTotal) return null

  const emphasiseLast = live && inSets
  const last = data.periodScores.length - 1
  const rows = [
    {
      side: 'home',
      name: data.homeCompetitor,
      periods: data.periodScores.map(p => ({ period: p.period, score: p.home })),
      point: points?.home,
      total: data.homeScore,
    },
    {
      side: 'away',
      name: data.awayCompetitor,
      periods: data.periodScores.map(p => ({ period: p.period, score: p.away })),
      point: points?.away,
      total: data.awayScore,
    },
  ]

  return (
    <div className='border-t border-white/5 pt-3 sm:pt-4'>
      <table className='w-full table-fixed font-mono text-xs'>
        <thead>
          <tr className='text-secondary'>
            <th scope='col' className='text-left font-normal'>
              <span className='sr-only'>{t('Team')}</span>
            </th>
            {data.periodScores.map(p => (
              <th key={p.period} scope='col' className='w-8 font-normal'>
                {t(getPeriodAt(data.sport.key, p.period)?.short ?? String(p.period))}
              </th>
            ))}
            {points && (
              <th scope='col' className='text-primary w-10 font-normal'>
                {t('Pts')}
              </th>
            )}
            {showTotal && (
              <th scope='col' className='w-12 font-normal text-white'>
                {t('Total')}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.side}>
              <th
                scope='row'
                className='truncate py-1 text-left font-sans font-normal text-white/90'
              >
                {row.name}
              </th>
              {row.periods.map((p, i) => (
                <td
                  key={p.period}
                  className={cn(
                    'text-center',
                    emphasiseLast && i === last ? 'font-semibold text-white' : 'text-secondary'
                  )}
                >
                  {p.score}
                </td>
              ))}
              {points && <td className='text-primary text-center font-semibold'>{row.point}</td>}
              {showTotal && (
                <td className='text-center font-semibold text-white'>{row.total ?? '-'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function EventLiveStateFallback(props: { startTime: string }) {
  return <KickoffTime startTime={props.startTime} />
}

function KickoffTime(props: { startTime: string }) {
  return (
    <time
      suppressHydrationWarning
      dateTime={props.startTime}
      className='text-secondary shrink-0 px-1 text-center text-[0.65rem] leading-relaxed sm:text-xs'
    >
      {getRelativeDayLabel(props.startTime)}
      <br />
      {format(props.startTime, 'HH:mm')}
    </time>
  )
}

function EventNotFound() {
  return (
    <main className='flex min-w-0 flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:py-24'>
      <div className='bg-dark-300 text-muted-foreground flex size-14 items-center justify-center rounded-full'>
        <SearchXIcon className='size-6' />
      </div>
      <div className='space-y-1'>
        <h3 className='text-foreground text-sm font-semibold'>Event not found</h3>
        <p className='text-secondary text-xs'>
          This event may have ended, been removed, or is temporarily unavailable.
        </p>
      </div>
    </main>
  )
}
