'use client'

import ReactCountryFlag from 'react-country-flag'
import { graphql, useFragment } from 'react-relay'
import type { LiveTournament$key } from '@/app/live/__generated__/LiveTournament.graphql'
import { ListViewMarketDropdowns } from '@/components/list-view-markets'
import { SportIconBadge } from '@/components/sport-icon'
import { getSportTheme } from '@/lib/sport-theme'

export default function LiveTournament(props: { tournamentRef: LiveTournament$key }) {
  const data = useFragment(
    graphql`
      fragment LiveTournament on Tournament {
        name
        sport {
          key
        }
        category {
          name
          countryCode
        }
      }
    `,
    props.tournamentRef
  )

  const theme = getSportTheme(data.sport.key)
  return (
    <div className='text-secondary relative mb-4 flex items-end gap-4 border-b border-white/5 py-2 text-sm'>
      <span
        className='pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-70'
        style={{
          background: `linear-gradient(90deg, ${theme.primary}, transparent 65%)`,
        }}
      />
      <h2 className='flex w-34 shrink-0 items-center gap-2 overflow-hidden sm:w-44 lg:w-90 lg:flex-none'>
        <SportIconBadge sport={data.sport.key} size='sm' />
        <ReactCountryFlag
          svg
          countryCode={data.category.countryCode ?? 'UN'}
          className='w-5 shrink-0 rounded-xs shadow-xs'
          style={{ width: undefined, height: undefined }}
        />
        <span className='min-w-0 truncate'>{data.name.replace(data.category.name, '')}</span>
      </h2>
      <ListViewMarketDropdowns />
      <div className='hidden sm:block sm:w-0 lg:w-29' />
    </div>
  )
}
