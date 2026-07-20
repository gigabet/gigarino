'use client'

import { useEffect } from 'react'
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

export default function TournamentList(props: {
  queryRef: PreloadedQuery<PrematchQuery>
  tournamentKeys: string[]
}) {
  const preloaded = usePreloadedQuery<PrematchQuery>(PrematchQueryNode, props.queryRef)

  const [data] = useRefetchableFragment(
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

  const environment = useRelayEnvironment()
  useEffect(() => {
    // updates Relay store and silently refreshes data without suspending
    // calling the refetchable hook's method suspends, disabling the UI
    const id = window.setInterval(() => {
      fetchQuery(
        environment,
        PrematchListRefetchNode,
        { filterActive: props.tournamentKeys.length > 0, tournamentKeys: props.tournamentKeys },
        { fetchPolicy: 'network-only' }
      ).subscribe({
        error: (err: Error) => console.error('[prematch-list] poll failed', err),
      })
    }, 3 * 60_000)
    return () => clearInterval(id)
  }, [environment, props.tournamentKeys])

  return (
    <div className='mt-2 space-y-8'>
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
