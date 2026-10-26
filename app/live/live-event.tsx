'use client'

import { BanIcon, TriangleAlert, WifiOff } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import {
  MdSignalWifiStatusbarConnectedNoInternet,
  MdSignalWifiStatusbarConnectedNoInternet1,
} from 'react-icons/md'
import { graphql, useFragment } from 'react-relay'
import { getPeriod, useNow } from '@/app/live/helpers'
import { FINISHED } from '@/app/live/live-state'
import { useLiveRowRegistration } from '@/app/live/live-subscriptions'
import { useRefetchBatcher, useRefetchRegistration } from '@/app/live/refetch-context'
import { FavouriteButton } from '@/components/favourite-button'
import { ListViewMarkets } from '@/components/list-view-markets'
import { TeamBadge } from '@/components/team-badge'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useT } from '@/context/providers'
import { tKey } from '@/i18n/tKey'
import { cn } from '@/lib/utils'
import type { LiveEvent$key } from '@/relay/__generated__/LiveEvent.graphql'
import type { LiveScore$key } from '@/relay/__generated__/LiveScore.graphql'
import type { LiveTeams$key } from '@/relay/__generated__/LiveTeams.graphql'
import type { LiveTime$key } from '@/relay/__generated__/LiveTime.graphql'

const STATUS_LABEL: Record<string, string> = {
  ENDED: tKey('Ended'),
  CANCELLED: tKey('Cancelled'),
  ABANDONED: tKey('Abandoned'),
  POSTPONED: tKey('Postponed'),
}

export default function LiveEvent(props: { eventRef: LiveEvent$key }) {
  const event = useFragment(
    graphql`
      fragment LiveEvent on Event {
        id
        homeCompetitor
        awayCompetitor
        homeScore
        awayScore
        tradingStatus
        oddCount
        ...LiveTime
        ...LiveTeams
        ...LiveScore
        ...ListViewMarkets
        ...FavouriteButton
      }
    `,
    props.eventRef
  )

  useLiveRowRegistration(event.id)
  useRefetchRegistration(event.id)

  const { stale } = useLiveClock(event)
  const suspended = stale || event.tradingStatus !== 'OPEN'

  return (
    <div
      className={cn(
        'sport-texture group relative flex h-32 flex-col gap-2 overflow-hidden border-b py-3 last:border-b-0 sm:gap-3 sm:rounded-2xl sm:border-b-0 sm:border-white/5 sm:bg-black/20 sm:px-4 lg:h-27 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-4 lg:px-5',
        suspended && 'opacity-60'
      )}
    >
      <div className='relative flex items-center gap-4 lg:contents'>
        <Link
          href={`/live/event/${event.id}`}
          className='flex w-34 min-w-0 shrink-0 justify-between text-xs sm:w-40 sm:gap-2 sm:text-sm lg:order-3 lg:ml-1 lg:w-60 lg:flex-none'
        >
          <LiveTeams event={event} />
          <LiveScore event={event} />
        </Link>
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
          <FavouriteButton event={event} />
        </div>
      </div>

      <Separator orientation='vertical' className='hidden lg:order-2 lg:block' />
    </div>
  )
}

const STALE_AFTER_MS = 2 * 60_000

export function useLiveClock(event: LiveTime$key) {
  const data = useFragment(
    graphql`
      fragment LiveTime on Event {
        id
        status
        period
        clockRunning
        clockDirection
        clockElapsedSeconds
        clockAnchorAt
        liveSeenAt
        tradingStatus
      }
    `,
    event
  )

  const finished = FINISHED.has(data.status)
  const seenAt = data.liveSeenAt ? Date.parse(data.liveSeenAt) : null
  const running = data.clockRunning && !finished && seenAt !== null
  const now = useNow(running)

  // Never extrapolate past the last server confirmation + grace.
  // The clock stops where trust ran out instead of jumping backwards.
  const horizon = seenAt !== null ? seenAt + STALE_AFTER_MS : now
  const effectiveNow = Math.min(now, horizon)
  const stale = seenAt !== null && !finished && now > horizon

  let seconds = data.clockElapsedSeconds
  if (seconds != null && running && data.clockAnchorAt) {
    const delta = Math.max(0, (effectiveNow - Date.parse(data.clockAnchorAt)) / 1000)
    seconds = data.clockDirection === 'DOWN' ? Math.max(0, seconds - delta) : seconds + delta
  }

  const batcher = useRefetchBatcher()
  useEffect(() => {
    if (stale) batcher.refresh(data.id)
  }, [stale, batcher, data.id])

  return { data, finished, seconds, stale }
}

export function LiveTime(props: { event: LiveTime$key; aside?: boolean; className?: string }) {
  const { data, finished, seconds, stale } = useLiveClock(props.event)
  const t = useT()

  if (finished) {
    return (
      <div className={cn('flex items-center gap-1.5', props.className)}>
        <div className='size-2 rounded-full bg-neutral-500' />
        <span className='text-foreground'>{t(STATUS_LABEL[data.status] ?? 'Ended')}</span>
      </div>
    )
  }

  const mins = Math.floor((seconds ?? 0) / 60)
  const secs = Math.floor((seconds ?? 0) % 60)

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-1',
        props.aside ? 'flex-row' : 'flex-row gap-2 lg:flex-col lg:gap-1',
        props.className
      )}
    >
      <div className='text-foreground flex items-center gap-1.5'>
        {!stale && (
          <>
            <div className='relative flex shrink-0 items-center justify-center'>
              <div className='absolute size-2 animate-ping rounded-full bg-red-500' />
              <div className='size-2 rounded-full bg-red-500' />
            </div>
            {seconds !== null ? (
              <time className='text-foreground font-mono'>
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </time>
            ) : (
              <span>{t('Live')}</span>
            )}
          </>
        )}
        {stale && <MdSignalWifiStatusbarConnectedNoInternet1 className='text-destructive size-5' />}
      </div>
      {!props.aside && seconds !== null && data.period && <span className='lg:hidden'>·</span>}
      {data.period && <div>{t(getPeriod(data.period).long)}</div>}
      {data.tradingStatus === 'SUSPENDED' && (
        <div className='flex items-center gap-1 truncate text-[0.6rem] text-amber-400'>
          <TriangleAlert className='size-3' /> <span>{t('Suspended')}</span>
        </div>
      )}
      {data.tradingStatus === 'CLOSED' && (
        <div className='text-destructive flex items-center gap-1 truncate text-[0.6rem]'>
          <BanIcon className='size-3' /> <span>{t('Closed')}</span>
        </div>
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
  return <div className='bg-muted h-32 w-full animate-pulse rounded-xl lg:h-27' />
}
