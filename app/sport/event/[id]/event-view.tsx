'use client'

import { format } from 'date-fns'
import { ImageIcon, SearchXIcon } from 'lucide-react'
import { Suspense } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import type { EventPageQuery } from '@/app/sport/event/[id]/__generated__/EventPageQuery.graphql'
import EventPageQueryNode from '@/app/sport/event/[id]/__generated__/EventPageQuery.graphql'
import type { EventView$key } from '@/app/sport/event/[id]/__generated__/EventView.graphql'
import MarketGroups, { MarketGroupsSkeleton } from '@/app/sport/event/[id]/market-groups'
import StatisticsWidget from '@/app/sport/event/[id]/statistics-widget'
import { SportIcon } from '@/components/sport-icon'
import { Badge } from '@/components/ui/badge'
import { getRelativeDayLabel } from '@/lib/utils'

export default function EventView(props: { queryRef: PreloadedQuery<EventPageQuery> }) {
  const preloaded = usePreloadedQuery<EventPageQuery>(EventPageQueryNode, props.queryRef)

  const data = useFragment(
    graphql`
      fragment EventView on Event {
        homeCompetitor
        awayCompetitor
        homeScore
        awayScore
        startTime
        status
        tradingStatus
        sport {
          key
        }
        category {
          name
          # countryCode
        }
        tournament {
          name
        }
        ...MarketGroups
      }
    `,
    preloaded.event as EventView$key | null
  )

  if (!data) return <EventNotFound />

  const isLive = data.status === 'LIVE'

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
      {/* ---------------------------------------------------------------- */}
      {/* Header: competitors, score/kick-off, breadcrumb                  */}
      {/* ---------------------------------------------------------------- */}
      <section className='flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-6'>
        <div className='text-secondary flex items-center gap-2 text-xs uppercase'>
          <SportIcon sport={data.sport.key} className='size-3.5' />
          <span>{data.tournament.name}</span>
          <span>·</span>
          <span>{data.category.name}</span>
          {isLive && (
            <Badge variant='destructive' className='ml-auto animate-pulse'>
              Live
            </Badge>
          )}
        </div>

        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
          <Competitor name={data.homeCompetitor} score={data.homeScore} />

          <div className='flex flex-col items-center gap-1 text-center'>
            <time
              suppressHydrationWarning
              dateTime={data.startTime}
              className='text-secondary text-xs leading-relaxed'
            >
              {isLive ? data.tradingStatus : getRelativeDayLabel(data.startTime)}
              <br />
              {!isLive && format(data.startTime, 'HH:mm')}
            </time>
          </div>

          <Competitor name={data.awayCompetitor} score={data.awayScore} reverse />
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

function Competitor(props: { name: string; score?: number | null; reverse?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${props.reverse ? 'flex-row-reverse text-right' : ''}`}
    >
      <div className='bg-dark-300 text-muted-foreground flex size-10 min-w-10 items-center justify-center rounded-full'>
        <ImageIcon className='size-4' />
      </div>
      <div className='flex flex-col'>
        <span className='truncate text-sm font-semibold text-white sm:text-base'>{props.name}</span>
        {props.score != null && (
          <span className='text-primary text-lg leading-none font-bold'>{props.score}</span>
        )}
      </div>
    </div>
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
