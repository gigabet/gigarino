'use client'

// import { Suspense } from 'react'
// import { graphql, useFragment } from 'react-relay'
// import type { PreloadedQueryRef } from 'react-relay/rsc_EXPERIMENTAL'
// import { useQueryFromServer } from 'react-relay/rsc-client_EXPERIMENTAL'
// import type { PrematchList$key } from '@/app/sport/[[...slug]]/__generated__/PrematchList.graphql'
// import type {
//   PrematchQuery,
//   PrematchQuery$data,
//   PrematchQuery$variables,
// } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
// import PrematchQueryNode from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import Tournament from '@/app/sport/[[...slug]]/tournament'

export default function PrematchList() {
  //   props: {
  //   queryRef: PreloadedQueryRef<PrematchQuery$variables, PrematchQuery$data>
  // }
  // const preloaded = useQueryFromServer<PrematchQuery>(PrematchQueryNode, props.queryRef)

  // const data = useFragment(
  //   graphql`
  //     fragment PrematchList on Query {
  //       topTournaments(first: 4, sport: "football") {
  //         id
  //         ...TournamentFragment @defer
  //       }
  //     }
  //   `,
  //   preloaded as PrematchList$key
  // )

  return (
    <div className='mt-2 space-y-8'>
      {/* <Suspense fallback='Loading...'>
        {data.topTournaments.map(tournament => (
          <Tournament key={tournament.id} queryRef={tournament} />
        ))}
      </Suspense> */}
      <Tournament />
      <Tournament />
      <Tournament />
      <Tournament />
    </div>
  )
}
