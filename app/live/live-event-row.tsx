// app/live/live-event-row.tsx
'use client'

import { useSetAtom } from 'jotai'
import { memo } from 'react'
import { Toggle } from 'radix-ui'
import { formatPlaytime, getElapsedSeconds } from '@/app/live/mock-data'
import { useTick } from '@/app/live/hooks'
import { liveSelectedEventState, liveViewState } from '@/app/live/store'
import type { LiveEvent, LiveOutcome } from '@/app/live/types'
import { useViewportRegistration } from '@/app/live/viewport-batcher'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn, initials, stringToHue } from '@/lib/utils'

function LiveEventRowImpl(props: { event: LiveEvent; active?: boolean }) {
  const { event } = props
  const setSelected = useSetAtom(liveSelectedEventState)
  const setView = useSetAtom(liveViewState)

  // own clock subscription — this row updates every second independent of
  // its siblings and independent of the list/sort computation above it
  const now = useTick()
  // only participates in batched refreshes while actually mounted (i.e.
  // while Virtuoso renders it, ± overscan) — scrolled-off rows unregister
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
      <button type='button' onClick={openSingle} className='contents text-left'>
        <div className='flex min-w-0 items-center gap-4 lg:contents'>
          <div className='flex w-34 min-w-0 shrink-0 flex-col gap-1.5 text-xs sm:w-40 sm:text-sm lg:order-3 lg:ml-1 lg:w-60 lg:flex-none'>
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
          </div>

          <div className='text-primary flex shrink-0 items-center gap-1.5 text-xs font-semibold lg:order-1 lg:w-16 lg:flex-col lg:justify-center lg:gap-0.5'>
            <span className='relative size-2'>
              <span className='bg-destructive absolute size-2 animate-ping rounded-full' />
              <span className='bg-destructive absolute size-2 rounded-full' />
            </span>
            <span suppressHydrationWarning>{formatPlaytime(elapsed, event.stage)}</span>
          </div>
        </div>
      </button>

      <div className='ml-auto flex items-center justify-end gap-1.5 lg:order-4'>
        {mainMarket?.outcomes.map(odd => (
          <OddToggle key={odd.id} odd={odd} />
        ))}
      </div>
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

// with hundreds of rows mounted via Virtuoso overscan, prevent a row from
// re-rendering when a sibling's identity changes or unrelated parent state
// updates — this row's own tick/betslip subscriptions handle its own updates
export default memo(
  LiveEventRowImpl,
  (prev, next) => prev.event === next.event && prev.active === next.active
)
