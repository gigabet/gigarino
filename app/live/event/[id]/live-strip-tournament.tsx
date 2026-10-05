'use client'

import type { LiveStripTournament$key } from '@/app/live/event/[id]/__generated__/LiveStripTournament.graphql'
import { SportIconBadge } from '@/components/sport-icon'
import { getSportTheme } from '@/lib/sport-theme'
import { cn } from '@/lib/utils'
import { graphql, useFragment } from 'react-relay'

export default function LiveStripTournament(props: {
  tournament: LiveStripTournament$key
  pad?: boolean
}) {
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

  const theme = getSportTheme(data.sport.key)

  return (
    // opaque so rows scroll under the sticky group header cleanly
    <div
      className={cn(
        'relative mb-2 flex items-center gap-2 border-b border-white/5 bg-[#0c0c0c] px-1 py-2',
        props.pad && 'mt-8'
      )}
    >
      <span
        className='pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-70'
        style={{ background: theme.primary }}
      />
      <SportIconBadge sport={data.sport.key} size='sm' />
      <div className='min-w-0'>
        <p className='text-secondary truncate text-[0.65rem] tracking-wider uppercase'>
          {data.category.name}
        </p>
        <p className='text-foreground truncate text-sm font-semibold'>
          {data.name.replace(data.category.name, '').trim() || data.name}
        </p>
      </div>
    </div>
  )
}
