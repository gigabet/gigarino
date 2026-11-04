'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useTransition } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  fetchQuery,
  graphql,
  type PreloadedQuery,
  useFragment,
  usePreloadedQuery,
  useQueryLoader,
  useRelayEnvironment,
} from 'react-relay'
import SearchResults, { SearchResultsSkeleton } from '@/app/(sport)/search-results'
import Tournament, { TournamentSkeleton } from '@/app/(sport)/tournament'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { useSidebarSearch } from '@/context/hooks'
import { cn } from '@/lib/utils'
import type { TournamentList$key } from '@/relay/__generated__/TournamentList.graphql'
import type { TournamentListQuery } from '@/relay/__generated__/TournamentListQuery.graphql'

const tournamentListQuery = graphql`
  query TournamentListQuery(
    $filterActive: Boolean!
    $hasSearch: Boolean!
    $hasAny: Boolean!
    $tournamentKeys: [String!]!
    $search: String
    $eventCount: Int!
  ) {
    ...TournamentList
  }
`

export function useTournamentKeysFromUrl() {
  const searchParams = useSearchParams()
  return useMemo(
    () => searchParams.get('tournaments')?.split(',').filter(Boolean) ?? [],
    [searchParams]
  )
}

export default function TournamentList() {
  const tournamentKeys = useTournamentKeysFromUrl()
  const { term: search } = useSidebarSearch()
  const filterActive = tournamentKeys.length > 0
  const hasSearch = search.length > 0

  const variables = useMemo<TournamentListQuery['variables']>(
    () => ({
      filterActive,
      tournamentKeys,
      hasSearch,
      hasAny: filterActive || hasSearch,
      search: hasSearch ? search : null,
      eventCount: filterActive ? 20 : 4,
    }),
    [filterActive, tournamentKeys, hasSearch, search]
  )

  const [queryRef, loadQuery, disposeQuery] =
    useQueryLoader<TournamentListQuery>(tournamentListQuery)
  const [isPending, startTransition] = useTransition()

  // in a transition so the old list stays on screen (dimmed) while the new one loads
  useEffect(() => {
    startTransition(() => {
      loadQuery(variables, { fetchPolicy: 'store-or-network' })
    })
  }, [loadQuery, variables])

  useEffect(() => () => disposeQuery(), [disposeQuery])

  const environment = useRelayEnvironment()
  useEffect(() => {
    const id = window.setInterval(() => {
      fetchQuery<TournamentListQuery>(environment, tournamentListQuery, variables, {
        fetchPolicy: 'network-only',
      }).subscribe({
        error: (err: Error) => console.error('[prematch-list] poll failed', err),
      })
    }, 60_000)
    return () => clearInterval(id)
  }, [environment, variables])

  const reload = () =>
    startTransition(() => {
      loadQuery(variables, { fetchPolicy: 'network-only' })
    })

  if (!queryRef) return <TournamentListSkeleton />

  return (
    <div className={cn('mt-2 space-y-8', isPending && 'opacity-60 transition-opacity')}>
      <Suspense fallback={hasSearch ? <SearchResultsSkeleton /> : <TournamentSkeletons />}>
        <TournamentListContent queryRef={queryRef} onReset={reload} />
      </Suspense>
    </div>
  )
}

function TournamentListContent(props: {
  queryRef: PreloadedQuery<TournamentListQuery>
  onReset: () => void
}) {
  const preloaded = usePreloadedQuery<TournamentListQuery>(tournamentListQuery, props.queryRef)
  const data = useFragment<TournamentList$key>(
    graphql`
      fragment TournamentList on Query {
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
              isLive
              ...PrematchEvent
            }
          }
        }
      }
    `,
    preloaded
  )

  // read from the loaded variables, not the URL, so the view always matches its data
  const { hasSearch, search } = props.queryRef.variables

  if (hasSearch) {
    return (
      <SearchResults
        query={search ?? ''}
        totalCount={data.searchResults?.totalCount}
        events={data.searchResults?.edges.filter(e => !e.node.isLive).map(e => e.node)}
      />
    )
  }

  return (
    <>
      {data.topTournaments?.map(tournament => (
        <ErrorBoundary
          key={tournament.id}
          FallbackComponent={SectionErrorFallback}
          onReset={props.onReset}
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
          onReset={props.onReset}
        >
          <Suspense fallback={<TournamentSkeleton />}>
            <Tournament queryRef={tournament} />
          </Suspense>
        </ErrorBoundary>
      ))}
    </>
  )
}

function TournamentSkeletons() {
  return (
    <>
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
    </>
  )
}

export function TournamentListSkeleton() {
  return (
    <div className='mt-2 space-y-8'>
      <TournamentSkeletons />
    </div>
  )
}
