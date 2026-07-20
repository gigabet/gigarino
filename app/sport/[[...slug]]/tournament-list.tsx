'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import {
  fetchQuery,
  graphql,
  type PreloadedQuery,
  usePreloadedQuery,
  useRefetchableFragment,
  useRelayEnvironment,
} from 'react-relay'
import type { PrematchList$key } from '@/app/sport/[[...slug]]/__generated__/PrematchList.graphql'
import PrematchListRefetchNode from '@/app/sport/[[...slug]]/__generated__/PrematchListRefetch.graphql'
import type { PrematchQuery } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import PrematchQueryNode from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import Tournament, { TournamentSkeleton } from '@/app/sport/[[...slug]]/tournament'
import { cn } from '@/lib/utils'

function useTournamentKeysFromUrl() {
  const pathname = usePathname()
  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean) // ['sport', filter?, tournaments?]
    return segments[2]?.split(',').filter(Boolean) ?? []
  }, [pathname])
}

export default function TournamentList(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  const preloaded = usePreloadedQuery<PrematchQuery>(PrematchQueryNode, props.queryRef)
  const tournamentKeys = useTournamentKeysFromUrl()

  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment PrematchList on Query
      @refetchable(queryName: "PrematchListRefetch")
      @argumentDefinitions(filterActive: { type: "Boolean!" }, tournamentKeys: { type: "[ID!]!" }) {
        topTournaments(first: 4) @stream(initialCount: 1) @skip(if: $filterActive) {
          id
          ...Tournament
        }
        tournaments(ids: $tournamentKeys) @stream(initialCount: 1) @include(if: $filterActive) {
          id
          ...Tournament
        }
      }
    `,
    preloaded as PrematchList$key
  )

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      refetch(
        { filterActive: tournamentKeys.length > 0, tournamentKeys },
        { fetchPolicy: 'store-or-network' } // reuses store data for ids already fetched
      )
    })
  }, [tournamentKeys, refetch])

  const environment = useRelayEnvironment()
  useEffect(() => {
    const id = window.setInterval(() => {
      fetchQuery(
        environment,
        PrematchListRefetchNode,
        { filterActive: tournamentKeys.length > 0, tournamentKeys },
        { fetchPolicy: 'network-only' }
      ).subscribe({
        error: (err: Error) => console.error('[prematch-list] poll failed', err),
      })
    }, 3 * 60_000)
    return () => clearInterval(id)
  }, [environment, tournamentKeys])

  return (
    <div className={cn('mt-2 space-y-8', isPending && 'opacity-60 transition-opacity')}>
      {data?.topTournaments?.map(tournament => (
        <Tournament key={tournament.id} queryRef={tournament} />
      ))}
      {data?.tournaments?.map(tournament => (
        <Tournament key={tournament.id} queryRef={tournament} />
      ))}
    </div>
  )
}

export function TournamentListSkeleton() {
  return (
    <div className='mt-2 space-y-8'>
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
    </div>
  )
}
