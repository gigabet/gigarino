'use client'

import { ChartNoAxesColumnIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { graphql, useFragment } from 'react-relay'
import type { LiveEvent$key } from '@/app/live/__generated__/LiveEvent.graphql'
import type { LiveScore$key } from '@/app/live/__generated__/LiveScore.graphql'
import type { LiveTeams$key } from '@/app/live/__generated__/LiveTeams.graphql'
import type { LiveTime$key } from '@/app/live/__generated__/LiveTime.graphql'
import { getPeriod, useNow } from '@/app/live/helpers'
import { useLiveRowRegistration } from '@/app/live/live-subscriptions'
import { useRefetchRegistration } from '@/app/live/refetch-context'
import { ListViewMarkets } from '@/components/list-view-markets'
import { TeamBadge } from '@/components/team-badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useT } from '@/context/providers'
import { cn } from '@/lib/utils'

export default function LiveEvent(props: { eventRef: LiveEvent$key }) {
  const event = useFragment(
    graphql`
      fragment LiveEvent on Event {
        id
        homeCompetitor
        awayCompetitor
        homeScore
        awayScore
        # status
        tradingStatus
        oddCount
        ...LiveTime
        ...LiveTeams
        ...LiveScore
        ...ListViewMarkets
      }
    `,
    props.eventRef
  )

  // keeps this row's id in the batcher's currently-visible set for as long
  // as it's mounted; Virtuoso mounts/unmounts rows as they scroll in and out
  useLiveRowRegistration(event.id)
  useRefetchRegistration(event.id)

  const t = useT()
  const suspended = event.tradingStatus === 'SUSPENDED'

  return (
    <div className='sport-texture group relative flex flex-col gap-2 overflow-hidden border-b py-3 last:border-b-0 sm:gap-3 sm:rounded-2xl sm:border-b-0 sm:border-white/5 sm:bg-black/20 sm:px-4 lg:h-27 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-4 lg:px-5'>
      <div
        className={cn('relative flex items-center gap-4 lg:contents', suspended && 'opacity-60')}
      >
        <div className='flex w-34 min-w-0 shrink-0 justify-between text-xs sm:w-40 sm:gap-2 sm:text-sm lg:order-3 lg:ml-1 lg:w-60 lg:flex-none'>
          <LiveTeams event={event} />
          <LiveScore event={event} />
        </div>

        <ListViewMarkets event={event} />
      </div>

      <div className='relative flex items-center justify-between gap-4 lg:contents'>
        <div className='text-secondary shrink-0 text-xs leading-relaxed lg:order-1 lg:w-16 lg:text-center'>
          <div className='flex items-center justify-center gap-1.5'>
            {/* <span className='relative inline-flex size-1.5'>
              <span className='bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75' />
              <span className='bg-destructive relative inline-flex size-1.5 rounded-full' />
            </span> */}

            <LiveTime event={event} />
          </div>
        </div>

        <div className='flex items-center lg:order-5 lg:w-24 lg:justify-end'>
          <Link
            href={`/live/event/${event.id}`}
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            +{event.oddCount}
          </Link>
          <Button variant='ghost' size='icon-sm' className='rounded-full'>
            <ChartNoAxesColumnIcon />
          </Button>
        </div>
      </div>

      <Separator orientation='vertical' className='hidden lg:order-2 lg:block' />
    </div>
  )
}

export function LiveTime(props: { event: LiveTime$key; aside?: boolean }) {
  const data = useFragment(
    graphql`
      fragment LiveTime on Event {
        period
        clockRunning
        clockElapsedSeconds
        clockAnchorAt
      }
    `,
    props.event
  )
  const now = useNow(data.clockRunning)
  const t = useT()

  let seconds = data.clockElapsedSeconds
  if (seconds != null && data.clockRunning && data.clockAnchorAt)
    seconds += Math.max(0, (now - Date.parse(data.clockAnchorAt)) / 1000)

  const mins = Math.floor((seconds ?? 0) / 60)
  const secs = Math.floor((seconds ?? 0) % 60)

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-1',
        props.aside ? 'flex-row' : 'flex-col'
      )}
    >
      <div className='text-foreground flex gap-1.5'>
        <div className='relative flex items-center justify-center'>
          <div className='absolute size-2 animate-ping rounded-full bg-red-500' />
          <div className='size-2 rounded-full bg-red-500' />
        </div>
        {t(getPeriod(data.period).long)}
      </div>
      {seconds !== null && (
        <time className='text-foreground font-mono'>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </time>
      )}
    </div>
  )
}

export function LiveTeams(props: { event: LiveTeams$key }) {
  const data = useFragment(
    graphql`
      fragment LiveTeams on Event {
        homeCompetitor
        homeImageUrl
        awayCompetitor
        awayImageUrl
      }
    `,
    props.event
  )

  return (
    <div className='flex flex-col gap-2 truncate'>
      {/* home */}
      <div className='flex items-center gap-2'>
        <TeamBadge name={data.homeCompetitor} imageUrl={data.homeImageUrl} />
        <span className='truncate'>{data.homeCompetitor}</span>
      </div>
      {/* away */}
      <div className='flex items-center gap-2'>
        <TeamBadge name={data.awayCompetitor} imageUrl={data.awayImageUrl} />
        <span className='truncate'>{data.awayCompetitor}</span>
      </div>
    </div>
  )
}

export function LiveScore(props: { event: LiveScore$key }) {
  const data = useFragment(
    graphql`
      fragment LiveScore on Event {
        homeScore
        awayScore
      }
    `,
    props.event
  )

  return (
    <div className='text-foreground ml-auto grid grid-cols-1 gap-y-2 font-mono font-semibold'>
      <span className='flex h-6 items-center' suppressHydrationWarning>
        {data.homeScore ?? '-'}
      </span>
      <span className='flex h-6 items-center' suppressHydrationWarning>
        {data.awayScore ?? '-'}
      </span>
    </div>
  )
}

export function LiveEventSkeleton() {
  return <div className='bg-muted h-24 w-full animate-pulse rounded-xl lg:h-27' />
}
