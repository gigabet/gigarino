// app/live/single-view.tsx
'use client'

import { useAtom } from 'jotai'
import { ArrowLeftIcon, SearchXIcon } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { useEffect } from 'react'
import LiveEventList from '@/app/live/event-list'
import { useTick } from '@/app/live/hooks'
import { formatPlaytime, getElapsedSeconds, STAGE_LABEL } from '@/app/live/mock-data'
import { liveSelectedEventState } from '@/app/live/store'
import type { LiveEvent, LiveMarket } from '@/app/live/types'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { useMediaQuery } from '@/context/hooks'
import { cn, initials, stringToHue } from '@/lib/utils'

export default function LiveSingleView(props: { events: LiveEvent[] }) {
  const [selectedId, setSelected] = useAtom(liveSelectedEventState)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (props.events.length === 0) return
    if (!selectedId || !props.events.some(e => e.id === selectedId)) {
      setSelected(props.events[0].id)
    }
  }, [props.events, selectedId, setSelected])

  const selected = props.events.find(e => e.id === selectedId) ?? null
  const rail = (
    <LiveEventList events={props.events} selectedId={selectedId} windowScroll={isDesktop} />
  )

  if (isDesktop) {
    return (
      <div className='grid grid-cols-[22rem_1fr] items-start gap-6'>
        {/* bounded height + windowScroll=false: Virtuoso manages its own
            internal scroll box here instead of the window, since this rail
            shares the row with a sticky detail pane rather than owning the
            whole page's scroll */}
        <div className='h-[calc(100dvh-14rem)]'>{rail}</div>
        <div className='sticky top-26.25'>
          {selected ? <EventDetail event={selected} /> : <EmptyDetail />}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={selected ? 'hidden' : undefined}>{rail}</div>
      {selected && (
        <div className='bg-dark fixed inset-0 z-40 flex flex-col overflow-y-auto pb-24'>
          <div className='bg-dark/95 sticky top-0 z-10 flex items-center gap-3 border-b border-white/5 px-4 py-3 backdrop-blur-xl'>
            <button
              type='button'
              onClick={() => setSelected(null)}
              className='text-secondary hover:bg-dark-300 hover:text-foreground flex size-8 items-center justify-center rounded-full transition-colors'
            >
              <ArrowLeftIcon className='size-4' />
            </button>
            <span className='text-sm font-semibold text-white'>Live Event</span>
          </div>
          <div className='p-4'>
            <EventDetail event={selected} />
          </div>
        </div>
      )}
    </>
  )
}

function EmptyDetail() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-black/20 px-6 py-16 text-center'>
      <div className='bg-dark-300 text-muted-foreground flex size-14 items-center justify-center rounded-full'>
        <SearchXIcon className='size-6' />
      </div>
      <p className='text-secondary text-sm'>Select an event to see live markets.</p>
    </div>
  )
}

function EventDetail(props: { event: LiveEvent }) {
  const { event } = props
  const now = useTick()
  const elapsed = getElapsedSeconds(event, now)

  return (
    <div className='flex flex-col gap-4'>
      <section className='flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 sm:p-6'>
        <div className='text-secondary flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase'>
          <div className='text-primary flex shrink-0 items-center gap-1.5'>
            <span className='relative size-2'>
              <span className='bg-destructive absolute size-2 animate-ping rounded-full' />
              <span className='bg-destructive absolute size-2 rounded-full' />
            </span>
            Live · <span suppressHydrationWarning>{formatPlaytime(elapsed, event.stage)}</span>
          </div>
          <span>· {event.tournamentName}</span>
          <span>· {STAGE_LABEL[event.stage]}</span>
        </div>

        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4'>
          <DetailCompetitor
            name={event.homeCompetitor}
            redCards={event.redCards.filter(c => c.team === 'home').length}
          />
          <div className='flex flex-col items-center gap-1 px-1'>
            <span className='text-lg font-bold text-white sm:text-xl'>
              {event.homeScore} - {event.awayScore}
            </span>
            {event.periodScores && (
              <span className='text-secondary text-[0.65rem]'>
                {event.periodScores.map(([h, a]) => `${h}-${a}`).join(' · ')}
              </span>
            )}
          </div>
          <DetailCompetitor
            name={event.awayCompetitor}
            redCards={event.redCards.filter(c => c.team === 'away').length}
            reverse
          />
        </div>
      </section>

      <div className='flex flex-col gap-3'>
        {event.markets.map(market => (
          <MarketBlock key={market.id} market={market} />
        ))}
      </div>
    </div>
  )
}

function DetailCompetitor(props: { name: string; redCards: number; reverse?: boolean }) {
  const hue = stringToHue(props.name)
  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-2 sm:gap-3',
        props.reverse && 'flex-row-reverse text-right'
      )}
    >
      <div
        className='flex size-8 min-w-8 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold text-white sm:size-10 sm:min-w-10'
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 40) % 360} 70% 30%))`,
        }}
      >
        {initials(props.name)}
      </div>
      <span className='truncate text-xs font-semibold text-white sm:text-sm lg:text-base'>
        {props.name}
      </span>
      {props.redCards > 0 && (
        <span className='flex shrink-0 items-center gap-1'>
          <span className='h-3.5 w-3 rounded-[1px] bg-red-500' />
          {props.redCards > 1 && <span className='text-xs text-red-400'>{props.redCards}</span>}
        </span>
      )}
    </div>
  )
}

function MarketBlock(props: { market: LiveMarket }) {
  const { market } = props
  const suspended = market.status !== 'OPEN'

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-xl border border-white/5 bg-black/20 p-4',
        suspended && 'opacity-50'
      )}
    >
      <div className='text-secondary truncate text-xs font-medium'>
        <span>{market.name}</span> {!!market.line && <span>{market.line}</span>}
      </div>
      <div
        className={cn('grid gap-1.5', market.outcomes.length === 3 ? 'grid-cols-3' : 'grid-cols-2')}
      >
        {market.outcomes.map(odd => (
          <DetailOddToggle key={odd.id} odd={odd} suspended={suspended} />
        ))}
      </div>
    </div>
  )
}

function DetailOddToggle(props: { odd: LiveMarket['outcomes'][number]; suspended: boolean }) {
  const hasOdd = useHasOdd()
  const toggleOdd = useToggleOdd()

  return (
    <Toggle.Root
      disabled={props.suspended || props.odd.status !== 'OPEN'}
      suppressHydrationWarning
      className='group hover:bg-primary/5 hover:border-primary/20 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-col items-center justify-center gap-0.5 rounded-lg border border-white/5 bg-black/20 py-2 transition disabled:pointer-events-none'
      pressed={hasOdd(props.odd.id)}
      onPressedChange={() => toggleOdd(props.odd.id)}
    >
      <span className='group-data-[state=on]:text-foreground text-secondary text-[0.7rem]'>
        {props.odd.name}
      </span>
      <span
        className='group-data-[state=on]:text-primary text-foreground text-sm font-semibold'
        suppressHydrationWarning
      >
        {props.odd.price.toFixed(2)}
      </span>
    </Toggle.Root>
  )
}
