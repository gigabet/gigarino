'use client'

import { usePathname, useSearchParams } from 'next/navigation'
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

export function useTournamentKeysFromUrl() {
  const searchParams = useSearchParams()
  return useMemo(
    () => searchParams.get('tournaments')?.split(',').filter(Boolean) ?? [],
    [searchParams]
  )
}

export default function TournamentList(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  const preloaded = usePreloadedQuery<PrematchQuery>(PrematchQueryNode, props.queryRef)
  const tournamentKeys = useTournamentKeysFromUrl()
  const filterActive = tournamentKeys.length > 0

  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment PrematchList on Query
      @refetchable(queryName: "PrematchListRefetch")
      @argumentDefinitions(
        filterActive: { type: "Boolean!" }
        tournamentKeys: { type: "[String!]!" }
      ) {
        topTournaments(first: 4) @stream(initialCount: 1) @skip(if: $filterActive) {
          id
          ...Tournament
        }
        tournaments(keys: $tournamentKeys) @stream(initialCount: 1) @include(if: $filterActive) {
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
        { filterActive, tournamentKeys, eventCount: filterActive ? 20 : 4 },
        { fetchPolicy: 'store-or-network' }
      )
    })
  }, [tournamentKeys, refetch, filterActive])

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
      {data.topTournaments?.map(tournament => (
        <Tournament key={tournament.id} queryRef={tournament} />
      ))}
      {data.tournaments?.map(tournament => (
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
