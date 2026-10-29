'use client'

import { useAtom } from 'jotai'
import { XIcon } from 'lucide-react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { GiSoccerField } from 'react-icons/gi'
import {
  graphql,
  type PreloadedQuery,
  useFragment,
  useLazyLoadQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useMediaQuery } from '@/context/hooks'
import { useLocale, useT } from '@/context/providers'
import { trackedEventIdAtom } from '@/context/tracker'
import type { MatchTracker$key } from '@/relay/__generated__/MatchTracker.graphql'
import type { MatchTrackerPanel$key } from '@/relay/__generated__/MatchTrackerPanel.graphql'
import type { MatchTrackerPanelQuery } from '@/relay/__generated__/MatchTrackerPanelQuery.graphql'

const TRACKER_FALLBACK_HEIGHT = 277

// get the widget height
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

export function MatchTracker(props: { event: MatchTracker$key; className?: string }) {
  const data = useFragment(
    graphql`
      fragment MatchTracker on Event {
        sportradarMatchId
      }
    `,
    props.event
  )

  if (!data.sportradarMatchId) return null
  return <TrackerFrame matchId={data.sportradarMatchId} className={props.className} />
}

function TrackerFrame(props: { matchId: string; className?: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(TRACKER_FALLBACK_HEIGHT)
  const locale = useLocale()

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

  return (
    <div className={props.className}>
      <iframe
        ref={ref}
        title='Match tracker'
        src={`https://googstreams.com/matchtracker.html#${locale}/${props.matchId}`}
        style={{ height }}
        className='block w-full overflow-hidden border-0 transition-[height] duration-200'
        loading='lazy'
      />
    </div>
  )
}

export function MatchTrackerSkeleton() {
  return <Skeleton className='w-full rounded-2xl' style={{ height: TRACKER_FALLBACK_HEIGHT }} />
}

/* -------------------------------------------------------------------------- */
/*  Betslip panel                                                             */
/* -------------------------------------------------------------------------- */

const trackerPanelQuery = graphql`
  query MatchTrackerPanelQuery($id: ID!) {
    event(id: $id) {
      ...MatchTrackerPanel @dangerously_unaliased_fixme
    }
  }
`

/**
 * Rendered at the top of <Betslip>. The xl aside renders the 'panel' variant and the
 * drawer renders the 'drawer' variant, so only the one that is actually visible mounts
 * (and therefore only that one loads the query and creates the iframe).
 */
export function BetslipTracker(props: { variant: 'panel' | 'drawer' }) {
  const [eventId, setEventId] = useAtom(trackedEventIdAtom)
  const isXl = useMediaQuery('(min-width: 1280px)')

  if (!eventId || (props.variant === 'panel') !== isXl) return null

  return (
    <div className='shrink-0 border-b border-white/5'>
      <ErrorBoundary
        // a different event is a fresh attempt
        key={eventId}
        FallbackComponent={SectionErrorFallback}
      >
        <TrackerLoader eventId={eventId} onClose={() => setEventId(null)} />
      </ErrorBoundary>
    </div>
  )
}

function TrackerLoader(props: { eventId: string; onClose: () => void }) {
  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<MatchTrackerPanelQuery>(trackerPanelQuery)

  // Effect-only, so nothing is fetched during SSR. The list rows already put these
  // fields in the store, so this normally resolves from cache.
  useEffect(() => {
    loadQuery({ id: props.eventId }, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, props.eventId])

  if (!queryRef) return <TrackerPanelSkeleton />

  return (
    <Suspense fallback={<TrackerPanelSkeleton />}>
      <TrackerPanel queryRef={queryRef} onClose={props.onClose} />
    </Suspense>
  )
}

function TrackerPanel(props: {
  queryRef: PreloadedQuery<MatchTrackerPanelQuery>
  onClose: () => void
}) {
  const preloaded = usePreloadedQuery<MatchTrackerPanelQuery>(trackerPanelQuery, props.queryRef)

  const data = useFragment(
    graphql`
      fragment MatchTrackerPanel on Event {
        homeCompetitor
        awayCompetitor
        ...MatchTracker
      }
    `,
    preloaded.event as MatchTrackerPanel$key | null
  )
  const t = useT()

  if (!data) return null

  return (
    <>
      <div className='flex items-center gap-2 px-4 py-2'>
        <GiSoccerField className='text-primary size-4 shrink-0' />
        <p className='min-w-0 flex-1 truncate text-xs font-semibold text-white'>
          {data.homeCompetitor} <span className='text-secondary font-normal'>vs</span>{' '}
          {data.awayCompetitor}
        </p>
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          className='rounded-full'
          aria-label={t('Close match tracker')}
          onClick={props.onClose}
        >
          <XIcon className='size-4' />
        </Button>
      </div>
      <MatchTracker event={data} className='bg-black/20' />
    </>
  )
}

function TrackerPanelSkeleton() {
  return <Skeleton className='h-81.5 w-full rounded-none' />
}
