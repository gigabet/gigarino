// app/live/sport-tabs.tsx
'use client'

import { useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { liveSportState } from '@/app/live/store'
import type { LiveEvent } from '@/app/live/types'
import { SportIcon } from '@/components/sport-icon'
import { getSportTheme } from '@/lib/sport-theme'
import { cn } from '@/lib/utils'

const sportOrder = ['football', 'tennis', 'basketball', 'ice-hockey']

export default function SportTabs(props: { events: LiveEvent[] }) {
  const [sport, setSport] = useAtom(liveSportState)

  const sports = useMemo(() => {
    const counts = new Map<string, number>()
    for (const e of props.events) counts.set(e.sportKey, (counts.get(e.sportKey) ?? 0) + 1)
    return [...counts.entries()]
      .sort(
        ([a], [b]) =>
          (sportOrder.indexOf(a) === -1 ? Infinity : sportOrder.indexOf(a)) -
          (sportOrder.indexOf(b) === -1 ? Infinity : sportOrder.indexOf(b))
      )
      .map(([key, count]) => ({ key, count }))
  }, [props.events])

  useEffect(() => {
    if (!sport && sports.length > 0) setSport(sports[0].key)
  }, [sport, sports, setSport])

  if (sports.length === 0) return null

  return (
    <div className='flex scrollbar-none items-center gap-3 overflow-x-auto pb-1'>
      {sports.map(s => {
        const theme = getSportTheme(s.key)
        const active = sport === s.key
        return (
          <button
            key={s.key}
            type='button'
            onClick={() => setSport(s.key)}
            className={cn(
              'bg-dark-200 sport-texture relative flex size-16 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-transparent transition-colors sm:size-18',
              active ? 'text-foreground' : 'text-white/60 hover:text-white'
            )}
            style={
              active
                ? { borderColor: theme.primary, boxShadow: `inset 0 0 10px -2px ${theme.primary}` }
                : undefined
            }
          >
            <SportIcon sport={s.key} colored className='size-5' />
            <span className='text-[0.6rem] leading-none font-medium capitalize'>
              {s.key.replace('-', ' ')}
            </span>
            <span className='bg-dark-300 text-secondary absolute -top-1.5 -right-1.5 flex min-w-4.5 items-center justify-center rounded-full px-1 py-0.5 text-[0.55rem] font-bold'>
              {s.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
