// app/live/event-list.tsx
'use client'

import { useAtomValue } from 'jotai'
import { groupBy } from 'lodash'
import { useMemo } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso'
import { useSortTick } from '@/app/live/hooks'
import LiveEventRow from '@/app/live/live-event-row'
import { getElapsedSeconds } from '@/app/live/mock-data'
import { liveSortState } from '@/app/live/store'
import type { LiveEvent } from '@/app/live/types'
import { SportIconBadge } from '@/components/sport-icon'
import { getSportTheme } from '@/lib/sport-theme'

export default function LiveEventList(props: {
  events: LiveEvent[]
  selectedId?: string | null
  /** Window-scroll (full page, the default list view) vs a bounded parent
   * with its own height (the single-view rail). */
  windowScroll?: boolean
}) {
  const sort = useAtomValue(liveSortState)
  const sortTick = useSortTick()
  const windowScroll = props.windowScroll ?? true

  const sorted = useMemo(
    () =>
      [...props.events].sort(
        (a, b) => (getElapsedSeconds(b, sortTick) ?? 0) - (getElapsedSeconds(a, sortTick) ?? 0)
      ),
    [props.events, sortTick]
  )

  const groups = useMemo(
    () => Object.values(groupBy(props.events, e => e.tournamentKey)),
    [props.events]
  )
  const groupCounts = useMemo(() => groups.map(g => g.length), [groups])
  const flatGrouped = useMemo(() => groups.flat(), [groups])

  if (props.events.length === 0) {
    return (
      <div className='text-secondary rounded-2xl border border-white/5 bg-black/20 px-6 py-16 text-center text-sm'>
        No live events for this sport right now.
      </div>
    )
  }

  if (sort === 'time') {
    return (
      <Virtuoso
        useWindowScroll={windowScroll}
        style={windowScroll ? undefined : { height: '100%' }}
        data={sorted}
        overscan={400}
        itemContent={(_i, event) => (
          <div className='pb-3'>
            <LiveEventRow event={event} active={event.id === props.selectedId} />
          </div>
        )}
      />
    )
  }

  return (
    <GroupedVirtuoso
      useWindowScroll={windowScroll}
      style={windowScroll ? undefined : { height: '100%' }}
      groupCounts={groupCounts}
      overscan={400}
      groupContent={index => {
        const first = groups[index][0]
        const theme = getSportTheme(first.sportKey)
        return (
          <div className='bg-dark text-secondary relative mb-3 flex items-center gap-2 border-b border-white/5 py-2 text-sm'>
            <span
              className='pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-70'
              style={{ background: `linear-gradient(90deg, ${theme.primary}, transparent 65%)` }}
            />
            <SportIconBadge sport={first.sportKey} size='sm' />
            {first.countryCode && (
              <ReactCountryFlag
                svg
                countryCode={first.countryCode}
                className='w-5 shrink-0 rounded-xs shadow-xs'
                style={{ width: undefined, height: undefined }}
              />
            )}
            <span className='truncate font-medium text-white'>{first.tournamentName}</span>
          </div>
        )
      }}
      itemContent={index => (
        <div className='pb-3'>
          <LiveEventRow
            event={flatGrouped[index]}
            active={flatGrouped[index].id === props.selectedId}
          />
        </div>
      )}
    />
  )
}
