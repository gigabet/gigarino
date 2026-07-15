'use client'

import { Suspense, useEffect, useRef } from 'react'
import { graphql, useFragment, useRefetchableFragment } from 'react-relay'
import type { PreloadedQueryRef } from 'react-relay/rsc_EXPERIMENTAL'
import { useQueryFromServer } from 'react-relay/rsc-client_EXPERIMENTAL'
import type { PrematchList$key } from '@/app/sport/[[...slug]]/__generated__/PrematchList.graphql'
import type {
  PrematchQuery,
  PrematchQuery$data,
  PrematchQuery$variables,
} from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import PrematchQueryNode from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import Tournament, { TournamentSkeleton } from '@/app/sport/[[...slug]]/tournament'

export default function PrematchList(props: {
  queryRef: PreloadedQueryRef<PrematchQuery$variables, PrematchQuery$data>
}) {
  const preloaded = useQueryFromServer<PrematchQuery>(PrematchQueryNode, props.queryRef)

  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment PrematchList on Query @refetchable(queryName: "PrematchListRefetch") {
        topTournaments(first: 4) @stream(initialCount: 1) {
          id
          ...Tournament
        }
      }
    `,
    preloaded as PrematchList$key
  )

  const refetchRef = useRef(0)
  useEffect(() => {
    refetchRef.current = window.setInterval(refetch, 3 * 60_000)
    return () => {
      clearInterval(refetchRef.current)
    }
  }, [refetch])

  return (
    <div className='mt-2 space-y-8'>
      {/* <Suspense fallback={<TournamentSkeleton />}> */}
      {data.topTournaments.map(tournament => (
        <Tournament key={tournament.id} queryRef={tournament} />
      ))}
      {/* </Suspense> */}
    </div>
  )
}

export function PrematchListSkeleton() {
  return (
    <div className='mt-2 space-y-8'>
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
    </div>
  )
}
