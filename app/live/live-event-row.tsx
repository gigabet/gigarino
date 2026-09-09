// app/live/live-event-row.tsx
'use client'

import { useSetAtom } from 'jotai'
import { Toggle } from 'radix-ui'
import { memo } from 'react'
import { useTick } from '@/app/live/hooks'
import { formatPlaytime, getElapsedSeconds } from '@/app/live/mock-data'
import { liveSelectedEventState, liveViewState } from '@/app/live/store'
import type { LiveEvent, LiveOutcome } from '@/app/live/types'
import { useViewportRegistration } from '@/app/live/viewport-batcher'
import { Separator } from '@/components/ui/separator'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn, initials, stringToHue } from '@/lib/utils'

function LiveEventRowImpl(props: { event: LiveEvent; active?: boolean }) {
  const { event } = props
  const setSelected = useSetAtom(liveSelectedEventState)
  const setView = useSetAtom(liveViewState)

  const now = useTick()
  useViewportRegistration(event.id)

  const elapsed = getElapsedSeconds(event, now)
  const mainMarket =
    event.markets?.find(m => m.kind === 'match_winner') ?? event.markets?.[0] ?? null

  const openSingle = () => {
    setSelected(event.id)
    setView('single')
  }

  return (
    <div
      className={cn(
        'sport-texture group relative flex flex-col gap-2 overflow-hidden border-b py-3 last:border-b-0 sm:gap-3 sm:rounded-2xl sm:border-b-0 sm:border-white/5 sm:bg-black/20 sm:px-4 lg:h-27 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-4 lg:px-5',
        props.active && 'ring-primary/60 ring-1'
      )}
    >
      {/* mobile row 1: teams + odds */}
      <div className='relative flex items-center gap-4 lg:contents'>
        <button
          type='button'
          onClick={openSingle}
          className='flex w-34 min-w-0 shrink-0 flex-col gap-1 text-left text-xs sm:w-40 sm:gap-2 sm:text-sm lg:order-3 lg:ml-1 lg:w-60 lg:flex-none'
        >
          <Competitor
            name={event.homeCompetitor}
            score={event.homeScore}
            redCards={event.redCards?.filter(c => c.team === 'home')?.length}
          />
          <Competitor
            name={event.awayCompetitor}
            score={event.awayScore}
            redCards={event.redCards?.filter(c => c.team === 'away')?.length}
          />
        </button>

        <div className='ml-auto flex items-center gap-1.5 lg:order-4 lg:ml-0 lg:min-w-0 lg:flex-1 lg:justify-end'>
          {mainMarket?.outcomes.map(odd => (
            <OddToggle key={odd.id} odd={odd} />
          ))}
        </div>
      </div>

      {/* mobile row 2: playtime, in the exact slot kickoff time occupies on prematch */}
      <div className='relative flex items-center justify-between gap-4 lg:contents'>
        <time
          suppressHydrationWarning
          className='text-secondary shrink-0 text-xs leading-relaxed lg:order-1 lg:w-16 lg:text-center'
        >
          {formatPlaytime(event.sportKey, elapsed, event.stage)}
        </time>
      </div>

      <Separator orientation='vertical' className='hidden lg:order-2 lg:block' />
    </div>
  )
}

function Competitor(props: { name: string; score: number; redCards: number }) {
  const hue = stringToHue(props.name)
  return (
    <div className='flex items-center gap-2'>
      <div
        className='flex size-6 min-w-6 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-bold text-white'
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 40) % 360} 70% 30%))`,
        }}
      >
        {initials(props.name)}
      </div>
      <span className='truncate'>{props.name}</span>
      {props.redCards > 0 && (
        <span className='flex shrink-0 items-center gap-1'>
          <span className='h-3 w-2.5 rounded-[1px] bg-red-500' />
          {props.redCards > 1 && (
            <span className='text-[0.6rem] text-red-400'>{props.redCards}</span>
          )}
        </span>
      )}
      <span className='ml-auto shrink-0 font-mono text-sm font-semibold text-white'>
        {props.score}
      </span>
    </div>
  )
}

function OddToggle(props: { odd: LiveOutcome }) {
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(props.odd.price)

  return (
    <Toggle.Root
      suppressHydrationWarning
      disabled={props.odd.status !== 'OPEN'}
      className={cn(
        'group/odd hover:bg-primary/5 hover:border-primary/20 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex h-13 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/5 bg-black/20 transition disabled:pointer-events-none disabled:opacity-40',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(props.odd.id)}
      onPressedChange={() => toggleOdd(props.odd.id)}
    >
      <span className='text-secondary group-data-[state=on]/odd:text-foreground text-[0.65rem]'>
        {props.odd.name}
      </span>
      <span
        className='text-foreground group-data-[state=on]/odd:text-primary text-sm font-semibold'
        suppressHydrationWarning
      >
        {props.odd.price.toFixed(2)}
      </span>
    </Toggle.Root>
  )
}

export default memo(
  LiveEventRowImpl,
  (prev, next) => prev.event === next.event && prev.active === next.active
)
