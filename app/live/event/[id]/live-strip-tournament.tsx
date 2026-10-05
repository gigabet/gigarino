'use client'

import { graphql, useFragment } from 'react-relay'
import type { LiveStripTournament$key } from '@/app/live/event/[id]/__generated__/LiveStripTournament.graphql'
import { SportIconBadge } from '@/components/sport-icon'

export default function LiveStripTournament(props: { tournament: LiveStripTournament$key }) {
  const data = useFragment(
    graphql`
      fragment LiveStripTournament on Tournament {
        name
        sport {
          key
        }
        category {
          name
        }
      }
    `,
    props.tournament
  )

  return (
    // opaque so rows scroll under the sticky group header cleanly
    <div className='bg-dark flex items-center gap-2 px-1 py-2'>
      <SportIconBadge sport={data.sport.key} size='sm' />
      <div className='min-w-0'>
        <p className='text-secondary truncate text-[0.65rem] tracking-wider uppercase'>
          {data.category.name}
        </p>
        <p className='truncate text-sm font-semibold text-white'>
          {data.name.replace(data.category.name, '').trim() || data.name}
        </p>
      </div>
    </div>
  )
}
