'use client'

import { format } from 'date-fns'
import { SearchXIcon } from 'lucide-react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { getPeriod } from '@/app/live/helpers'
import { useLiveClock } from '@/app/live/live-event'
import { EventHeaderRow } from '@/components/event-header-row'
import { FavouriteButton } from '@/components/favourite-button'
import MarketGroups, { MarketGroupsSkeleton } from '@/components/market-groups'
import { SportIcon } from '@/components/sport-icon'
import StatisticsWidget, { StatisticsWidgetSkeleton } from '@/components/statistics-widget'
import { TeamBadge } from '@/components/team-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocale, useT } from '@/context/providers'
import { getRelativeDayLabel } from '@/lib/utils'
import type { EventState$key } from '@/relay/__generated__/EventState.graphql'
import type { LiveSingleHeader$key } from '@/relay/__generated__/LiveSingleHeader.graphql'
import type { LiveSingleView$key } from '@/relay/__generated__/LiveSingleView.graphql'
import type { LiveSingleViewQuery } from '@/relay/__generated__/LiveSingleViewQuery.graphql'
import LiveSingleViewQueryNode from '@/relay/__generated__/LiveSingleViewQuery.graphql'

export default function LiveSingleView(props: { queryRef: PreloadedQuery<LiveSingleViewQuery> }) {
  const preloaded = usePreloadedQuery<LiveSingleViewQuery>(LiveSingleViewQueryNode, props.queryRef)

  const data = useFragment(
    graphql`
      fragment LiveSingleView on Event {
        homeCompetitor
        homeImageUrl
        awayCompetitor
        awayImageUrl
        startTime
        sportradarMatchId
        ...LiveSingleHeader
        ...EventState
        ...StatisticsWidget @defer
        ...MarketGroups @defer
      }
    `,
    preloaded.event as LiveSingleView$key | null
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
          <Competitor name={data.homeCompetitor} imageUrl={data.homeImageUrl} />

          <Suspense fallback={<EventLiveStateFallback startTime={data.startTime} />}>
            <EventState event={data} startTime={data.startTime} />
          </Suspense>

          <Competitor name={data.awayCompetitor} imageUrl={data.awayImageUrl} reverse />
        </div>
      </section>

      {data.sportradarMatchId && <MatchTracker matchId={data.sportradarMatchId} />}

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

function Competitor(props: { name: string; imageUrl?: string | null; reverse?: boolean }) {
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
    </div>
  )
}

const SHOWS_SCORE = new Set(['LIVE', 'ENDED', 'ABANDONED'])

function EventState(props: { event: EventState$key; startTime: string }) {
  const data = useFragment(
    graphql`
      fragment EventState on Event {
        status
        homeScore
        awayScore
        ...LiveTime
      }
    `,
    props.event
  )

  const { seconds } = useLiveClock(data)
  const mins = Math.floor((seconds ?? 0) / 60)
  const secs = Math.floor((seconds ?? 0) % 60)

  if (!SHOWS_SCORE.has(data.status)) return <KickoffTime startTime={props.startTime} />

  return (
    <div className='relative flex shrink-0 flex-col items-center gap-1 px-1'>
      <span className='text-base leading-none font-bold text-white sm:text-lg'>
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

const TRACKER_FALLBACK_HEIGHT = 420

/** Pulls a pixel height out of the shapes embeds commonly postMessage. */
function readHeight(data: unknown): number | null {
  let d = data
  if (typeof d === 'string') {
    try {
      d = JSON.parse(d)
    } catch {
      const m = String(d).match(/height\D{0,3}(\d+(?:\.\d+)?)/i)
      return m ? Number(m[1]) : null
    }
  }
  if (typeof d === 'number') return d
  if (d && typeof d === 'object') {
    const o = d as Record<string, unknown>
    const v = o.height ?? o.frameHeight ?? o.contentHeight ?? o.scrollHeight
    const n = typeof v === 'string' ? Number.parseFloat(v) : v
    if (typeof n === 'number' && Number.isFinite(n) && n > 0) return n
  }
  return null
}

function MatchTracker(props: { matchId: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(TRACKER_FALLBACK_HEIGHT)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      // only trust messages coming from our own iframe
      if (e.source !== ref.current?.contentWindow) return
      const h = readHeight(e.data)
      if (h && h > 50) setHeight(Math.ceil(h))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const locale = useLocale()

  return (
    <div className='overflow-hidden rounded-2xl border border-white/5 bg-black/20'>
      <iframe
        ref={ref}
        title='Match tracker'
        src={`/api/matchtracker#${locale}/${props.matchId}`}
        style={{ height }}
        className='block w-full border-0 transition-[height] duration-200'
        loading='lazy'
      />
    </div>
  )
}

export function MatchTrackerSkeleton() {
  return <Skeleton className='w-full rounded-2xl' style={{ height: TRACKER_FALLBACK_HEIGHT }} />
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
