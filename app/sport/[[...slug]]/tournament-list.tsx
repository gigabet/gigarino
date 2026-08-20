'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useTransition } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
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
import SearchResults from '@/app/sport/[[...slug]]/search-results'
import Tournament, { TournamentSkeleton } from '@/app/sport/[[...slug]]/tournament'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { useSidebarSearch } from '@/context/hooks'
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
  const { term: search } = useSidebarSearch()

  const filterActive = tournamentKeys.length > 0
  const hasSearch = search.length > 0
  const hasAny = filterActive || hasSearch

  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment PrematchList on Query
      @refetchable(queryName: "PrematchListRefetch")
      @argumentDefinitions(
        tournamentKeys: { type: "[String!]!" }
        filterActive: { type: "Boolean!" }
        hasSearch: { type: "Boolean!" }
        hasAny: { type: "Boolean!" }
        search: { type: "String" }
      ) {
        topTournaments(first: 4) @stream(initialCount: 1) @skip(if: $hasAny) {
          id
          ...Tournament
        }
        tournaments(keys: $tournamentKeys)
          @stream(initialCount: 1)
          @include(if: $filterActive)
          @skip(if: $hasSearch) {
          id
          ...Tournament
        }
        searchResults: events(search: $search, first: 20) @include(if: $hasSearch) {
          totalCount
          edges {
            node {
              id
              ...PrematchEvent
            }
          }
        }
      }
    `,
    preloaded as PrematchList$key
  )

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      refetch(
        {
          filterActive,
          tournamentKeys,
          eventCount: filterActive ? 20 : 4,
          hasSearch,
          hasAny,
          search: hasSearch ? search : null,
        },
        { fetchPolicy: 'store-or-network' }
      )
    })
  }, [tournamentKeys, refetch, filterActive, hasSearch, search, hasAny])

  const environment = useRelayEnvironment()
  useEffect(() => {
    const id = window.setInterval(() => {
      fetchQuery(
        environment,
        PrematchListRefetchNode,
        {
          filterActive: tournamentKeys.length > 0,
          tournamentKeys,
          eventCount: filterActive ? 20 : 4,
          hasSearch,
          hasAny,
          search: hasSearch ? search : null,
        },
        { fetchPolicy: 'network-only' }
      ).subscribe({
        error: (err: Error) => console.error('[prematch-list] poll failed', err),
      })
    }, 60_000)
    return () => clearInterval(id)
  }, [environment, tournamentKeys, filterActive, hasSearch, search, hasAny])

  const refetchTournaments = () =>
    startTransition(() => {
      refetch(
        { filterActive, tournamentKeys, eventCount: filterActive ? 20 : 4 },
        { fetchPolicy: 'network-only' }
      )
    })

  return (
    <div className={cn('mt-2 space-y-8', isPending && 'opacity-60 transition-opacity')}>
      {hasSearch ? (
        <SearchResults
          query={search}
          totalCount={data.searchResults?.totalCount}
          events={data.searchResults?.edges.map(e => e.node)}
        />
      ) : (
        <>
          {data.topTournaments?.map(tournament => (
            <ErrorBoundary
              key={tournament.id}
              FallbackComponent={SectionErrorFallback}
              onReset={refetchTournaments}
            >
              <Suspense fallback={<TournamentSkeleton />}>
                <Tournament queryRef={tournament} />
              </Suspense>
            </ErrorBoundary>
          ))}
          {data.tournaments?.map(tournament => (
            <ErrorBoundary
              key={tournament.id}
              FallbackComponent={SectionErrorFallback}
              onReset={refetchTournaments}
            >
              <Suspense fallback={<TournamentSkeleton />}>
                <Tournament queryRef={tournament} />
              </Suspense>
            </ErrorBoundary>
          ))}
        </>
      )}
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
