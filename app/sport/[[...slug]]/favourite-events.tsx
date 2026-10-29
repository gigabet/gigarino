'use client'

import { StarIcon } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  fetchQuery,
  graphql,
  type PreloadedQuery,
  useFragment,
  usePreloadedQuery,
  useRelayEnvironment,
} from 'react-relay'
import PrematchEvent from '@/app/sport/[[...slug]]/prematch-event'
import { HEADER_LEAD, ListViewMarketDropdowns } from '@/components/list-view-markets'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { useT, useUser } from '@/context/providers'
import { getSportTheme } from '@/lib/sport-theme'
import { cn } from '@/lib/utils'
import type { FavouriteEvents$key } from '@/relay/__generated__/FavouriteEvents.graphql'
import FavouriteEventsPollQueryNode from '@/relay/__generated__/FavouriteEventsPollQuery.graphql'
import type { PrematchQuery } from '@/relay/__generated__/PrematchQuery.graphql'
import PrematchQueryNode from '@/relay/__generated__/PrematchQuery.graphql'

export const favouriteEventsPollQuery = graphql`
  query FavouriteEventsPollQuery {
    ...FavouriteEvents
  }
`

export default function FavouriteEvents(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  const { user } = useUser()
  // The ref can lag a render behind the session: until it was loaded with
  // hasUser, the fragment spread was skipped and there is nothing to read.
  if (!user || !props.queryRef.variables.hasUser) return null

  return (
    <ErrorBoundary FallbackComponent={SectionErrorFallback}>
      <Suspense fallback={null}>
        <FavouriteEventsList queryRef={props.queryRef} />
      </Suspense>
    </ErrorBoundary>
  )
}

function FavouriteEventsList(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  const preloaded = usePreloadedQuery<PrematchQuery>(PrematchQueryNode, props.queryRef)
  const data = useFragment<FavouriteEvents$key>(
    graphql`
      fragment FavouriteEvents on Query {
        events(first: 50, favourites: true) @connection(key: "FavouriteEvents_events") {
          edges {
            node {
              id
              isLive
              ...PrematchEvent
            }
          }
        }
      }
    `,
    preloaded.favouriteEvents ?? null
  )
  const t = useT()

  const env = useRelayEnvironment()
  useEffect(() => {
    const id = window.setInterval(() => {
      fetchQuery(env, FavouriteEventsPollQueryNode, {}, { fetchPolicy: 'network-only' }).subscribe({
        error: (err: Error) => console.error('[favourite-events] poll failed', err),
      })
    }, 60_000)
    return () => clearInterval(id)
  }, [env])

  // same rule as the regular lists: live events belong to /live
  const events = data?.events.edges.map(e => e.node).filter(n => !n.isLive) ?? []
  if (events.length === 0) return null

  const theme = getSportTheme('highlights')

  return (
    <section>
      <div className='text-secondary relative mb-4 flex items-end gap-4 border-b border-white/5 py-2 text-sm'>
        <span
          className='pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-70'
          style={{
            background: `linear-gradient(90deg, ${theme.primary}, transparent 65%)`,
          }}
        />
        <h2 className={cn(HEADER_LEAD, 'flex items-center gap-2')}>
          <StarIcon className='mb-0.5 size-4 shrink-0 fill-yellow-400 text-yellow-400' />
          <span className='text-foreground font-display min-w-0 truncate text-lg font-bold'>
            {t('Favourites')}
          </span>
          <span className='bg-dark-300 flex size-5 items-center justify-center rounded-full text-[0.6rem] leading-none font-semibold'>
            {events.length}
          </span>
        </h2>
        <ListViewMarketDropdowns />
        <div className='hidden sm:block sm:w-0 lg:w-34' />
      </div>
      <div className='flex flex-col gap-3'>
        {events.map(node => (
          <PrematchEvent key={node.id} node={node} />
        ))}
      </div>
    </section>
  )
}
