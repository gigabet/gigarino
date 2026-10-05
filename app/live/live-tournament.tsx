'use client'

import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useInView } from 'react-intersection-observer'
import { graphql, useFragment } from 'react-relay'
import type { LiveTournament$key } from '@/app/live/__generated__/LiveTournament.graphql'
import { ListViewMarketDropdowns } from '@/components/list-view-markets'
import { SportIconBadge } from '@/components/sport-icon'
import { getSportTheme } from '@/lib/sport-theme'
import { cn } from '@/lib/utils'

const NAVBAR_PX = 80 // NAVBAR_HEIGHT = 'h-20'; keep in sync with `top-20` below

// The left slot and trailing spacer must match PrematchEvent's row so the
// dropdowns line up with the odds columns underneath.
function HeaderRow(props: { left?: React.ReactNode; accent?: string }) {
  return (
    <div className='text-secondary relative flex items-end gap-4 border-b border-white/5 py-2 text-sm'>
      {props.accent && (
        <span
          className='pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-70'
          style={{ background: `linear-gradient(90deg, ${props.accent}, transparent 65%)` }}
        />
      )}
      <div className='w-34 shrink-0 overflow-hidden sm:w-44 lg:w-90 lg:flex-none'>{props.left}</div>
      <ListViewMarketDropdowns />
      <div className='hidden sm:block sm:w-0 lg:w-29' />
    </div>
  )
}

/** Start-time mode: market dropdowns, sticky under the navbar, opaque only once stuck. */
export function LiveMarketsHeader() {
  const [stuck, setStuck] = useState(false)

  // 1px sentinel right above the header. Once it scrolls above the navbar line
  // (not just out of view below), the header is stuck.
  const { ref } = useInView({
    rootMargin: `-${NAVBAR_PX}px 0px 0px 0px`,
    onChange: (inView, entry) => setStuck(!inView && entry.boundingClientRect.top < NAVBAR_PX),
  })

  return (
    <>
      <div ref={ref} className='h-px' />
      <div className={cn('sticky top-20 z-10 pb-4 transition-colors', stuck && 'bg-dark')}>
        <HeaderRow />
      </div>
    </>
  )
}

/** Tournament mode: a plain, non-sticky row. */
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
    <div className='pb-4'>
      <HeaderRow
        accent={theme.primary}
        left={
          <h2 className='flex items-center gap-2'>
            <SportIconBadge sport={data.sport.key} size='sm' />
            <ReactCountryFlag
              svg
              countryCode={data.category.countryCode ?? 'UN'}
              className='w-5 shrink-0 rounded-xs shadow-xs'
              style={{ width: undefined, height: undefined }}
            />
            <span className='min-w-0 truncate'>{data.name.replace(data.category.name, '')}</span>
          </h2>
        }
      />
    </div>
  )
}
