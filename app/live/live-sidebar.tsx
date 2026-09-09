// app/live/live-sidebar.tsx
'use client'

import { Toggle } from 'radix-ui'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useTick } from '@/app/live/hooks'
import { formatPlaytime, getElapsedSeconds } from '@/app/live/mock-data'
import type { LiveEvent, LiveOutcome } from '@/app/live/types'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useUpDown } from '@/context/hooks'
import { cn, initials, stringToHue } from '@/lib/utils'

function EventStrip(props: {
  event: LiveEvent
  active: boolean
  onSelect: () => void
  className?: string
}) {
  const { event } = props
  const now = useTick()
  const elapsed = getElapsedSeconds(event, now)
  const mainMarket =
    event.markets?.find(m => m.kind === 'match_winner') ?? event.markets?.[0] ?? null

  return (
    // biome-ignore lint/a11y/useSemanticElements: contains a nested button (odds toggle), so this can't be a <button>
    <div
      role='button'
      tabIndex={0}
      onClick={props.onSelect}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') props.onSelect()
      }}
      className={cn(
        'group relative flex w-full shrink-0 cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-colors',
        props.active
          ? 'border-primary bg-primary/10 shadow-primary/30 shadow-[0_0_12px]'
          : 'border-white/5 bg-black/20 hover:border-white/20',
        props.className
      )}
    >
      {props.active && (
        <span className='bg-primary text-primary-foreground absolute -top-2 left-3 rounded-full px-2 py-0.5 text-[0.6rem] font-bold tracking-wide uppercase'>
          Viewing
        </span>
      )}

      <div className='text-secondary flex items-center justify-between gap-2 text-[0.6rem] uppercase'>
        <span suppressHydrationWarning>{formatPlaytime(event.sportKey, elapsed, event.stage)}</span>
        <span className='truncate'>{event.tournamentName}</span>
      </div>

      <div className='flex flex-col gap-1 text-xs'>
        <StripCompetitor
          name={event.homeCompetitor}
          score={event.homeScore}
          active={props.active}
        />
        <StripCompetitor
          name={event.awayCompetitor}
          score={event.awayScore}
          active={props.active}
        />
      </div>

      {mainMarket && (
        // biome-ignore lint/a11y/noStaticElementInteractions: contains a nested button (odds toggle), so this can't be a <button>
        // biome-ignore lint/a11y/useKeyWithClickEvents: contains a nested button (odds toggle), so this can't be a <button>
        <div className='flex gap-1.5' onClick={e => e.stopPropagation()}>
          {mainMarket.outcomes.map(odd => (
            <StripOdd key={odd.id} odd={odd} />
          ))}
        </div>
      )}
    </div>
  )
}

function StripCompetitor(props: { name: string; score: number; active: boolean }) {
  const hue = stringToHue(props.name)
  return (
    <div className='flex items-center gap-2'>
      <div
        className='flex size-5 min-w-5 shrink-0 items-center justify-center rounded-full text-[0.5rem] font-bold text-white'
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 40) % 360} 70% 30%))`,
        }}
      >
        {initials(props.name)}
      </div>
      <span className={cn('truncate', props.active ? 'text-primary' : 'text-white')}>
        {props.name}
      </span>
      <span className='ml-auto shrink-0 font-mono text-xs font-semibold text-white'>
        {props.score}
      </span>
    </div>
  )
}

function StripOdd(props: { odd: LiveOutcome }) {
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()
  const upDown = useUpDown(props.odd.price)

  return (
    <Toggle.Root
      suppressHydrationWarning
      disabled={props.odd.status !== 'OPEN'}
      className={cn(
        'group/odd hover:bg-primary/5 hover:border-primary/20 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/5 bg-black/20 py-1 transition disabled:pointer-events-none disabled:opacity-40',
        upDown === 'up' && 'animate-odds-flash-up',
        upDown === 'down' && 'animate-odds-flash-down'
      )}
      pressed={hasOdd(props.odd.id)}
      onPressedChange={() => toggleOdd(props.odd.id)}
    >
      <span className='text-secondary group-data-[state=on]/odd:text-foreground text-[0.6rem]'>
        {props.odd.name}
      </span>
      <span
        className='text-foreground group-data-[state=on]/odd:text-primary text-xs font-semibold'
        suppressHydrationWarning
      >
        {props.odd.price.toFixed(2)}
      </span>
    </Toggle.Root>
  )
}

/** Desktop: sticky aside, styled like the prematch event-sidebar's tournament rail. */
export function LiveSidebar(props: {
  events: LiveEvent[]
  selectedId: string | null
  onSelectAction: (id: string) => void
}) {
  return (
    <aside className='scrollbar-hide! scrollbar-thumb-dark-300 sticky top-26.25 hidden max-h-[calc(100dvh-7rem)] w-full scrollbar-thin scrollbar-track-transparent flex-col gap-2 place-self-start overflow-y-auto lg:flex'>
      <p className='text-secondary px-1 pb-1 text-xs font-semibold tracking-wider uppercase'>
        Live events
      </p>
      {props.events.map(e => (
        <EventStrip
          key={e.id}
          event={e}
          active={e.id === props.selectedId}
          onSelect={() => props.onSelectAction(e.id)}
        />
      ))}
    </aside>
  )
}

/** Mobile: sticky filmstrip at the top, drag/gesture-scrollable — same
 * pattern and offsets as the sport sidebar's mobile topbar. */
export function MobileFilmstrip(props: {
  events: LiveEvent[]
  selectedId: string | null
  onSelectAction: (id: string) => void
}) {
  return (
    <ScrollContainer
      className='bg-dark sticky top-20 z-20 -mx-4 -mt-8 w-full cursor-grab scrollbar-none overflow-x-auto border-b border-white/5 px-4 py-3 sm:-mx-6 sm:px-6 lg:hidden'
      vertical={false}
    >
      <div className='flex gap-2'>
        {props.events.map(e => (
          <EventStrip
            key={e.id}
            event={e}
            active={e.id === props.selectedId}
            onSelect={() => props.onSelectAction(e.id)}
            className='w-56'
          />
        ))}
      </div>
    </ScrollContainer>
  )
}
