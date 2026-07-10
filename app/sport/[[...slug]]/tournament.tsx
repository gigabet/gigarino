'use client'

import { GiSoccerBall } from 'react-icons/gi'
// import { graphql, useFragment } from 'react-relay'
// import type { TournamentFragment$key } from '@/app/sport/[[...slug]]/__generated__/TournamentFragment.graphql'
import PrematchEvent from '@/app/sport/[[...slug]]/prematch-event'

export default function Tournament() {
  // props: { queryRef: TournamentFragment$key }
  // const data = useFragment(
  //   graphql`
  //     fragment TournamentFragment on Tournament {
  //       sport {
  //         key
  //       }
  //       category {
  //         countryCode
  //       }
  //       name
  //       events(first: 10) {
  //         edges {
  //           node {
  //             id
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   props.queryRef
  // )

  return (
    <section>
      <h2 className='text-secondary mb-4 flex items-center gap-2 border-b py-2 text-sm'>
        <GiSoccerBall className='size-4.5' />
        {/* <pre>{data.sport.key}</pre> */}
        <span className='text-uppercase flex size-5 items-center justify-center rounded-full bg-white/3 text-[0.5rem] leading-none'>
          EN
          {/* {data.category.countryCode} */}
        </span>
        {/* {data.name} */}
        Premier League
      </h2>
      <div className='flex flex-col gap-3'>
        {/* {data.events.edges.map(edge => (
          <PrematchEvent key={edge.node.id} />
        ))} */}
        <PrematchEvent />
        <PrematchEvent />
        <PrematchEvent />
        <PrematchEvent />
      </div>
    </section>
  )
}
