'use client'

import { ChevronDown } from 'lucide-react'
import { GiSoccerBall } from 'react-icons/gi'
import { PiCaretUpDown } from 'react-icons/pi'
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
      <div className='text-secondary mb-4 flex items-end gap-4 border-b py-2 text-sm'>
        <h2 className='flex w-90 items-center gap-2'>
          <GiSoccerBall className='size-4.5' />
          {/* <pre>{data.sport.key}</pre> */}
          <span className='text-uppercase flex size-5 items-center justify-center rounded-full bg-white/3 text-[0.5rem] leading-none'>
            EN
            {/* {data.category.countryCode} */}
          </span>
          {/* {data.name} */}
          Premier League
        </h2>
        <div className='text-foreground @container/markets ml-auto flex grow items-center justify-end gap-4'>
          <div className='flex max-w-60 min-w-50 flex-1 items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all'>
            <span>Match Winner</span>
            <ChevronDown className='size-4' />
          </div>
          <div className='hidden max-w-60 min-w-50 flex-1 items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all @md/markets:flex'>
            <span>double chance</span>
            <ChevronDown className='size-4' />
          </div>
          <div className='hidden max-w-60 min-w-50 flex-1 items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all @2xl/markets:flex'>
            <span>next goal</span>
            <ChevronDown className='size-4' />
          </div>
          <div className='justify-betweenr hidden max-w-60 min-w-50 flex-1 items-center rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs tracking-wide capitalize transition transition-all @4xl/markets:flex'>
            <span>over/under</span>
            <ChevronDown className='size-4' />
          </div>
        </div>
        <div className='w-29' />
      </div>
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
