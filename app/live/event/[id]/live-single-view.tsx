'use client'

import { format } from 'date-fns'
import { ExternalLinkIcon, ImageIcon, SearchXIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import type { EventState$key } from '@/app/live/event/[id]/__generated__/EventState.graphql'
import type { LiveSingleHeader$key } from '@/app/live/event/[id]/__generated__/LiveSingleHeader.graphql'
import type { LiveSingleView$key } from '@/app/live/event/[id]/__generated__/LiveSingleView.graphql'
import type { LiveSingleViewQuery } from '@/app/live/event/[id]/__generated__/LiveSingleViewQuery.graphql'
import LiveSingleViewQueryNode from '@/app/live/event/[id]/__generated__/LiveSingleViewQuery.graphql'
import StatisticsWidget from '@/app/live/event/[id]/statistics-widget'
import MarketGroups, { MarketGroupsSkeleton } from '@/components/market-groups'
import { SportIcon } from '@/components/sport-icon'
import { useT } from '@/context/providers'
import { getRelativeDayLabel } from '@/lib/utils'

export default function LiveSingleView(props: { queryRef: PreloadedQuery<LiveSingleViewQuery> }) {
  const preloaded = usePreloadedQuery<LiveSingleViewQuery>(LiveSingleViewQueryNode, props.queryRef)

  const data = useFragment(
    graphql`
      fragment LiveSingleView on Event {
        homeCompetitor
        awayCompetitor
        startTime
        ...LiveSingleHeader
        ...EventState
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
          <Competitor name={data.homeCompetitor} />

          <Suspense fallback={<EventLiveStateFallback startTime={data.startTime} />}>
            <EventState event={data} startTime={data.startTime} />
          </Suspense>

          <Competitor name={data.awayCompetitor} reverse />
        </div>
      </section>

      <StatisticsWidget />

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
      }
    `,
    props.event
  )

  const t = useT()

  return (
    <div className='text-secondary flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase'>
      {data.status === 'LIVE' && (
        <div className='text-foreground flex shrink-0 items-center gap-1.5 text-xs'>
          <div className='relative size-2'>
            <div className='bg-destructive absolute size-2 animate-ping rounded-full' />
            <div className='bg-destructive absolute size-2 rounded-full' />
          </div>
          {t('Live')}
        </div>
      )}
      <SportIcon sport={data.sport.key} className='size-3.5 shrink-0' />
      <div className='group relative flex min-w-0 items-center gap-2'>
        <span className='max-w-40 truncate sm:max-w-none'>{data.tournament.name}</span>
        <span className='shrink-0'>·</span>
        <span className='max-w-32 truncate sm:max-w-none'>{data.category.name}</span>
      </div>
    </div>
  )
}

function Competitor(props: { name: string; reverse?: boolean }) {
  return (
    <div
      className={`flex min-w-0 items-center gap-2 sm:gap-3 ${props.reverse ? 'flex-row-reverse text-right' : ''}`}
    >
      <div className='bg-dark-300 text-muted-foreground flex size-8 min-w-8 items-center justify-center rounded-full sm:size-10 sm:min-w-10'>
        <ImageIcon className='size-3.5 sm:size-4' />
      </div>
      <span className='truncate text-xs font-semibold text-white sm:text-sm lg:text-base'>
        {props.name}
      </span>
    </div>
  )
}

function EventState(props: { event: EventState$key; startTime: string }) {
  const data = useFragment(
    graphql`
      fragment EventState on Event {
        status
        tradingStatus
        homeScore
        awayScore
      }
    `,
    props.event
  )

  if (data.status !== 'LIVE') return <KickoffTime startTime={props.startTime} />

  return (
    <div className='flex shrink-0 flex-col items-center gap-1 px-1'>
      <span className='text-base leading-none font-bold text-white sm:text-lg'>
        {data.homeScore ?? 0} - {data.awayScore ?? 0}
      </span>
      <span className='text-secondary text-[0.6rem] uppercase sm:text-[0.65rem]'>
        {data.tradingStatus}
      </span>
    </div>
  )
}

/**
 * Suspense fallback while `EventState` resolves. `startTime` is a plain
 * prop (already available from the cached, non-suspending part of the
 * fragment tree) so we can show the correct kick-off time immediately
 * instead of a generic skeleton — it only needs correcting in the rare case
 * the match has since gone live, which swaps in a moment later.
 */
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
