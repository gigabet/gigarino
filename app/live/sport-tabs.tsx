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

  // defaults to the first sport in the list; mutually exclusive selection
  useEffect(() => {
    if (!sport && sports.length > 0) setSport(sports[0].key)
  }, [sport, sports, setSport])

  if (sports.length === 0) return null

  return (
    <div className='flex scrollbar-none items-center gap-2 overflow-x-auto pb-1'>
      {sports.map(s => {
        const theme = getSportTheme(s.key)
        const active = sport === s.key
        return (
          <button
            key={s.key}
            type='button'
            onClick={() => setSport(s.key)}
            className={cn(
              'bg-dark-200 sport-texture flex shrink-0 items-center gap-2 rounded-full border border-transparent px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors',
              active ? 'text-foreground' : 'text-white/60 hover:text-white'
            )}
            style={
              active
                ? { borderColor: theme.primary, boxShadow: `inset 0 0 10px -2px ${theme.primary}` }
                : undefined
            }
          >
            <SportIcon sport={s.key} colored className='size-4' />
            <span className='capitalize'>{s.key.replace('-', ' ')}</span>
            <span className='text-secondary flex items-center gap-1.5'>
              <span className='relative inline-flex size-1.5'>
                <span className='bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75' />
                <span className='bg-destructive relative inline-flex size-1.5 rounded-full' />
              </span>
              {s.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
