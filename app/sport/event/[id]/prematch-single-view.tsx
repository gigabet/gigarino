'use client'

import { format } from 'date-fns'
import { ExternalLinkIcon, ImageIcon, SearchXIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import type { EventLiveState$key } from '@/app/sport/event/[id]/__generated__/EventLiveState.graphql'
import type { PrematchSingleHeader$key } from '@/app/sport/event/[id]/__generated__/PrematchSingleHeader.graphql'
import type { PrematchSingleView$key } from '@/app/sport/event/[id]/__generated__/PrematchSingleView.graphql'
import type { PrematchSingleViewQuery } from '@/app/sport/event/[id]/__generated__/PrematchSingleViewQuery.graphql'
import PrematchSingleViewQueryNode from '@/app/sport/event/[id]/__generated__/PrematchSingleViewQuery.graphql'
import MarketGroups, { MarketGroupsSkeleton } from '@/app/sport/event/[id]/market-groups'
import StatisticsWidget from '@/app/sport/event/[id]/statistics-widget'
import { SportIcon } from '@/components/sport-icon'
import { getRelativeDayLabel } from '@/lib/utils'

export default function PrematchSingleView(props: {
  queryRef: PreloadedQuery<PrematchSingleViewQuery>
}) {
  const preloaded = usePreloadedQuery<PrematchSingleViewQuery>(
    PrematchSingleViewQueryNode,
    props.queryRef
  )

  const data = useFragment(
    graphql`
      fragment PrematchSingleView on PrematchEvent {
        homeCompetitor
        awayCompetitor
        startTime
        ...PrematchSingleHeader
        ...EventLiveState
        ...MarketGroups @defer
      }
    `,
    preloaded.event as PrematchSingleView$key | null
  )

  if (!data) return <EventNotFound />

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
      {/* ---------------------------------------------------------------- */}
      {/* Header: competitors, score/kick-off, breadcrumb                  */}
      {/* ---------------------------------------------------------------- */}
      <section className='flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-6'>
        <PrematchSingleHeader event={data} />
        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
          <Competitor name={data.homeCompetitor} />

          <Suspense fallback={<EventLiveStateFallback startTime={data.startTime} />}>
            <EventLiveState event={data} startTime={data.startTime} />
          </Suspense>

          <Competitor name={data.awayCompetitor} reverse />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Statistics widget — reserved slot, filled in separately          */}
      {/* ---------------------------------------------------------------- */}
      <StatisticsWidget />

      {/* ---------------------------------------------------------------- */}
      {/* Markets, grouped main > goals > corners > cards > penalties >    */}
      {/* players > special                                               */}
      {/* ---------------------------------------------------------------- */}
      <Suspense fallback={<MarketGroupsSkeleton />}>
        <MarketGroups event={data} />
      </Suspense>
    </main>
  )
}

function PrematchSingleHeader(props: { event: PrematchSingleHeader$key }) {
  const data = useFragment(
    graphql`
      fragment PrematchSingleHeader on PrematchEvent {
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

  return (
    <div className='text-secondary flex items-center gap-2 text-xs uppercase'>
      {data.status === 'LIVE' && (
        <div className='text-foreground flex items-center gap-1.5 text-xs'>
          <div className='relative size-2'>
            <div className='bg-destructive absolute size-2 animate-ping rounded-full' />
            <div className='bg-destructive absolute size-2 rounded-full' />
          </div>
          Live
        </div>
      )}
      <SportIcon sport={data.sport.key} className='size-3.5' />
      <Link
        href={{
          pathname: '/sport',
          query: { tournaments: `${data.sport.key}:${data.tournament.key}` },
        }}
        className='group relative flex items-center gap-2 text-current transition-colors hover:text-white'
      >
        <span>{data.tournament.name}</span>
        <span>·</span>
        <span>{data.category.name}</span>
        <ExternalLinkIcon className='size-3' />
        <span className='bg-primary absolute -bottom-0.5 h-px w-full opacity-0 transition-all group-hover:opacity-100' />
      </Link>
    </div>
  )
}

function Competitor(props: { name: string; reverse?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${props.reverse ? 'flex-row-reverse text-right' : ''}`}
    >
      <div className='bg-dark-300 text-muted-foreground flex size-10 min-w-10 items-center justify-center rounded-full'>
        <ImageIcon className='size-4' />
      </div>
      <span className='truncate text-sm font-semibold text-white sm:text-base'>{props.name}</span>
    </div>
  )
}

function EventLiveState(props: { event: EventLiveState$key; startTime: string }) {
  const data = useFragment(
    graphql`
      fragment EventLiveState on Event {
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
    <div className='flex flex-col items-center gap-1'>
      <span className='text-lg leading-none font-bold text-white'>
        {data.homeScore ?? 0} - {data.awayScore ?? 0}
      </span>
      <span className='text-secondary text-[0.65rem] uppercase'>{data.tradingStatus}</span>
    </div>
  )
}

/**
 * Suspense fallback while `EventLiveState` resolves. `startTime` is a plain
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
      className='text-secondary text-center text-xs leading-relaxed'
    >
      {getRelativeDayLabel(props.startTime)}
      <br />
      {format(props.startTime, 'HH:mm')}
    </time>
  )
}

function EventNotFound() {
  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 py-24 text-center'>
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
