'use client'

import { RotateCwIcon, SearchXIcon } from 'lucide-react'
import { Suspense, useCallback, useEffect, useTransition } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { graphql, useFragment, useRefetchableFragment } from 'react-relay'
import type { Tournament$key } from '@/app/sport/[[...slug]]/__generated__/Tournament.graphql'
import type { TournamentEventList$key } from '@/app/sport/[[...slug]]/__generated__/TournamentEventList.graphql'
import { ListViewMarketDropdowns } from '@/app/sport/[[...slug]]/list-view-markets'
import PrematchEvent, { PrematchEventSkeleton } from '@/app/sport/[[...slug]]/prematch-event'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'

export default function Tournament(props: { queryRef: Tournament$key }) {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment Tournament on Tournament @refetchable(queryName: "TournamentRefetch") {
        id
        sport @required(action: NONE) {
          key @required(action: NONE)
        }
        category {
          name
          countryCode
        }
        name
        ...TournamentEventList @defer
      }
    `,
    props.queryRef
  )

  const [isRefreshing, startTransition] = useTransition()
  const handleRefresh = useCallback(() => {
    if (data?.id)
      startTransition(() => {
        refetch({}, { fetchPolicy: 'network-only' })
      })
  }, [refetch, data?.id])

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') handleRefresh()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [handleRefresh])

  if (!data)
    return (
      <section>
        <div className='flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-black/20 px-6 py-16 text-center'>
          <div className='bg-dark-300 text-muted-foreground flex size-14 items-center justify-center rounded-full'>
            <SearchXIcon className='size-6' />
          </div>

          <div className='space-y-1'>
            <h3 className='text-foreground text-sm font-semibold'>Tournament not found</h3>
            <p className='text-secondary text-xs'>
              We couldn't find this tournament. It may have been removed or is temporarily
              unavailable.
            </p>
          </div>

          <button
            type='button'
            onClick={handleRefresh}
            disabled={isRefreshing}
            className='hover:bg-primary/10 hover:border-primary/30 hover:text-primary group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-medium text-white uppercase transition-all disabled:opacity-60'
          >
            <RotateCwIcon className={isRefreshing ? 'size-3.5 animate-spin' : 'size-3.5'} />
            Refresh
          </button>
        </div>
      </section>
    )

  return (
    <section>
      <div className='text-secondary mb-4 flex items-end gap-4 border-b py-2 text-sm'>
        <h2 className='flex w-34 shrink-0 items-center gap-2 overflow-hidden sm:w-44 lg:w-90 lg:flex-none'>
          <SportIcon sport={data.sport.key} className='size-4.5 shrink-0' />
          <ReactCountryFlag
            svg
            countryCode={data.category.countryCode ?? 'UN'}
            className='w-5 shrink-0 rounded-xs shadow-xs'
            style={{ width: undefined, height: undefined }}
          />
          <span className='min-w-0 truncate'>{data.name.replace(data.category.name, '')}</span>
        </h2>
        <ListViewMarketDropdowns />
        <div className='hidden sm:block sm:w-0 lg:w-29' />
      </div>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList tournament={data} />
      </Suspense>
    </section>
  )
}

function EventList(props: { tournament: TournamentEventList$key }) {
  const data = useFragment(
    graphql`
      fragment TournamentEventList on Tournament {
        events(first: $eventCount) {
          edges {
            node {
              id
              ...PrematchEvent
            }
          }
        }
      }
    `,
    props.tournament
  )

  return (
    <div className='flex flex-col gap-3' suppressHydrationWarning>
      {data?.events?.edges.map(edge => (
        <PrematchEvent key={edge.node.id} node={edge.node} />
      ))}
    </div>
  )
}

export function TournamentSkeleton() {
  return (
    <section>
      <div className='text-secondary mb-4 flex flex-col gap-2 border-b py-2 text-sm sm:flex-row sm:items-end sm:gap-4'>
        <Skeleton className='my-1 flex h-4 w-full sm:w-90' />
        <div className='h-8.5 w-29 max-sm:hidden' />
      </div>
      <EventListSkeleton />
    </section>
  )
}

function EventListSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
    </div>
  )
}
