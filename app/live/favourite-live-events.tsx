'use client'

import { useAtomValue } from 'jotai'
import { StarIcon } from 'lucide-react'
import { Suspense, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import LiveEventStrip from '@/app/live/event/[id]/live-event-strip'
import LiveEvent from '@/app/live/live-event'
import { liveSportFilterState, orderLiveEvents } from '@/app/live/live-state'
import { HeaderRow } from '@/app/live/live-tournament'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { useT, useUser } from '@/context/providers'
import { getSportTheme } from '@/lib/sport-theme'
import type { FavouriteLiveEvents$key } from '@/relay/__generated__/FavouriteLiveEvents.graphql'
import type { LiveLayoutQuery } from '@/relay/__generated__/LiveLayoutQuery.graphql'
import LiveLayoutQueryNode from '@/relay/__generated__/LiveLayoutQuery.graphql'

type LayoutRef = PreloadedQuery<LiveLayoutQuery>

function useFavouriteLiveEvents(queryRef: LayoutRef) {
  const preloaded = usePreloadedQuery<LiveLayoutQuery>(LiveLayoutQueryNode, queryRef)
  const data = useFragment<FavouriteLiveEvents$key>(
    graphql`
      fragment FavouriteLiveEvents on Query {
        favouriteLiveEvents: liveEvents(first: 50, favourites: true)
          @connection(key: "FavouriteLiveEvents_favouriteLiveEvents") {
          edges {
            node {
              id
              ...LiveOrder
              ...LiveEvent
              ...LiveEventStrip
            }
          }
        }
      }
    `,
    preloaded.favouriteLive ?? null
  )
  const sportFilter = useAtomValue(liveSportFilterState)

  // The connection has no sport argument on purpose: its filters stay
  // { favourites: true }, which is what the optimistic updater looks up.
  // The sport tabs are applied here instead.
  return useMemo(
    () =>
      orderLiveEvents(
        data?.favouriteLiveEvents.edges.map(e => e.node) ?? [],
        'chronological',
        sportFilter
      ).events,
    [data, sportFilter]
  )
}

// The ref can lag a render behind the session: until it was loaded with
// hasUser, the spread was skipped and there is nothing to read.
function useCanShow(queryRef: LayoutRef | null | undefined): queryRef is LayoutRef {
  const { user } = useUser()
  return !!user && !!queryRef?.variables.hasUser
}

/* ---------------------------- list view section --------------------------- */

export default function FavouriteLiveSection(props: { queryRef: LayoutRef | null | undefined }) {
  if (!useCanShow(props.queryRef)) return null

  return (
    <ErrorBoundary FallbackComponent={SectionErrorFallback}>
      <Suspense fallback={null}>
        <ListSection queryRef={props.queryRef} />
      </Suspense>
    </ErrorBoundary>
  )
}

function ListSection(props: { queryRef: LayoutRef }) {
  const events = useFavouriteLiveEvents(props.queryRef)
  const t = useT()
  const theme = getSportTheme('highlights')

  if (events.length === 0) return null

  return (
    <section>
      <div className='pt-0.5 pb-2 sm:pb-3'>
        <HeaderRow
          left={
            <>
              <span
                className='pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-70'
                style={{
                  background: `linear-gradient(90deg, ${theme.primary}, transparent 65%)`,
                }}
              />
              <h2 className='flex items-center gap-2'>
                <StarIcon className='size-4 shrink-0 fill-yellow-400 text-yellow-400' />
                <span className='min-w-0 truncate'>{t('Favourites')}</span>
                <span className='text-xs'>{events.length}</span>
              </h2>
            </>
          }
        />
      </div>
      <div className='flex flex-col'>
        {events.map(e => (
          <div key={e.id} className='sm:pb-3'>
            <LiveEvent eventRef={e.event} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* --------------------------- single view sidebar -------------------------- */

export function FavouriteLiveStrips(props: { queryRef: LayoutRef; activeId: string }) {
  if (!useCanShow(props.queryRef)) return null

  return (
    <ErrorBoundary FallbackComponent={SectionErrorFallback}>
      <Suspense fallback={null}>
        <Strips queryRef={props.queryRef} activeId={props.activeId} />
      </Suspense>
    </ErrorBoundary>
  )
}

function Strips(props: { queryRef: LayoutRef; activeId: string }) {
  const events = useFavouriteLiveEvents(props.queryRef)
  const t = useT()
  const theme = getSportTheme('highlights')

  if (events.length === 0) return null

  return (
    <div className='mb-4'>
      {/* same look as LiveStripTournament */}
      <div className='relative mb-2 flex items-center gap-2 border-b border-white/5 bg-[#0c0c0c] px-1 py-2'>
        <span
          className='pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-70'
          style={{ background: theme.primary }}
        />
        <StarIcon className='size-4 shrink-0 fill-yellow-400 text-yellow-400' />
        <p className='text-foreground truncate text-sm font-semibold'>{t('Favourites')}</p>
        <span className='text-secondary text-xs'>{events.length}</span>
      </div>
      {events.map(e => (
        <div key={e.id} className='py-1 pt-3'>
          <LiveEventStrip event={e.event} active={e.id === props.activeId} />
        </div>
      ))}
    </div>
  )
}
