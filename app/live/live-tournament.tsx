'use client'

import ReactCountryFlag from 'react-country-flag'
import { graphql, useFragment } from 'react-relay'
import type { LiveTournament$key } from '@/app/live/__generated__/LiveTournament.graphql'
import { ListViewMarketDropdowns } from '@/components/list-view-markets'
import { SportIconBadge } from '@/components/sport-icon'
import { getSportTheme } from '@/lib/sport-theme'
import { cn } from '@/lib/utils'

export function HeaderRow(props: { left?: React.ReactNode }) {
  return (
    <div className='text-secondary relative flex h-12 items-center gap-4 border-b border-white/5 text-sm'>
      <div className='w-34 shrink-0 overflow-hidden sm:w-44 lg:w-90 lg:flex-none'>{props.left}</div>
      <ListViewMarketDropdowns />
      <div className='hidden sm:block sm:w-0 lg:w-29' />
    </div>
  )
}

/** Space below any header, so chrono and tournament headers match. */
const GAP = 'pb-2 sm:pb-3'
// const NAVBAR_PX = 80 // NAVBAR_HEIGHT = 'h-20'; used by the chrono sentinel

/** Chronological mode: the pinned markets bar.  */
export function LiveMarketsHeader(props: { stuck?: boolean }) {
  return (
    // gap lives outside the tinted box; it still reserves space in the list
    // but lets clicks through to the row underneath
    <div className={cn('pointer-events-none', GAP)}>
      <div
        className={cn(
          'bg-dark/10 pointer-events-auto backdrop-blur-sm transition-colors'
          // props.stuck ? 'bg-dark/10 backdrop-blur-xl' : 'bg-transparent'
        )}
      >
        <HeaderRow />
      </div>
    </div>
  )
}

// export function useStuckSentinel() {
//   const [stuck, setStuck] = useState(false)
//   const { ref } = useInView({
//     rootMargin: `-${NAVBAR_PX}px 0px 0px 0px`,
//     onChange: (inView, entry) => setStuck(!inView && entry.boundingClientRect.top < NAVBAR_PX),
//   })
//   return { stuck, sentinelRef: ref }
// }

/** Title + accent line. Positions against HeaderRow (the nearest `relative`). */
export function TournamentTitle(props: { tournamentRef: LiveTournament$key }) {
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
    <>
      <span
        className='pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-70'
        style={{
          background: `linear-gradient(90deg, ${theme.primary}, transparent 65%)`,
        }}
      />
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
    </>
  )
}

/** Tournament header row: title on the left, market dropdowns on the right. */
export default function LiveTournament(props: { tournamentRef: LiveTournament$key }) {
  return (
    <div className={cn('pt-0.5', GAP)}>
      <HeaderRow left={<TournamentTitle tournamentRef={props.tournamentRef} />} />
    </div>
  )
}
