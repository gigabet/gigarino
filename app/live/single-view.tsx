// app/live/single-view.tsx
'use client'

import { useAtom } from 'jotai'
import { SearchXIcon } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { useEffect } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useTick } from '@/app/live/hooks'
import { LiveSidebar, MobileFilmstrip } from '@/app/live/live-sidebar'
import { formatPlaytime, getElapsedSeconds, STAGE_LABEL } from '@/app/live/mock-data'
import { liveSelectedEventState } from '@/app/live/store'
import type { LiveEvent, LiveMarket } from '@/app/live/types'
import { SportIcon } from '@/components/sport-icon'
import { useHasOdd, useToggleOdd } from '@/context/betslip'
import { cn, initials, stringToHue } from '@/lib/utils'

export default function LiveSingleView(props: { events: LiveEvent[] }) {
  const [selectedId, setSelected] = useAtom(liveSelectedEventState)

  useEffect(() => {
    if (props.events.length === 0) return
    if (!selectedId || !props.events.some(e => e.id === selectedId)) {
      setSelected(props.events[0].id)
    }
  }, [props.events, selectedId, setSelected])

  const selected = props.events.find(e => e.id === selectedId) ?? null

  return (
    <>
      <MobileFilmstrip events={props.events} selectedId={selectedId} onSelectAction={setSelected} />

      <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-[20rem_1fr]'>
        <LiveSidebar events={props.events} selectedId={selectedId} onSelectAction={setSelected} />
        <div className='min-w-0'>
          {selected ? <EventDetail event={selected} /> : <EmptyDetail />}
        </div>
      </div>
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
      <section className='flex flex-col gap-3 rounded-2xl border border-white/5 bg-black/20 p-4 sm:gap-4 sm:p-6'>
        <EventHeader event={event} />

        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4'>
          <DetailCompetitor
            name={event.homeCompetitor}
            redCards={event.redCards.filter(c => c.team === 'home').length}
          />

          <div className='flex shrink-0 flex-col items-center gap-1 px-1'>
            <span className='text-base leading-none font-bold text-white sm:text-lg'>
              {event.homeScore} - {event.awayScore}
            </span>
            <span
              suppressHydrationWarning
              className='text-secondary text-[0.6rem] uppercase sm:text-[0.65rem]'
            >
              {formatPlaytime(event.sportKey, elapsed, event.stage)}
            </span>
            {event.periodScores && (
              <span className='text-secondary text-[0.6rem]'>
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

function EventHeader(props: { event: LiveEvent }) {
  const { event } = props
  return (
    <div className='text-secondary flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase'>
      <SportIcon sport={event.sportKey} className='size-3.5 shrink-0' />
      <span className='flex min-w-0 items-center gap-1.5'>
        {event.countryCode && (
          <ReactCountryFlag
            svg
            countryCode={event.countryCode}
            className='w-4 shrink-0 rounded-xs shadow-xs'
            style={{ width: undefined, height: undefined }}
          />
        )}
        <span className='max-w-40 truncate sm:max-w-none'>{event.tournamentName}</span>
      </span>
      {/* other sports already show their phase in the clock caption below;
          football's caption is a bare mm:ss clock, so the half goes here */}
      {event.sportKey === 'football' && (
        <>
          <span className='shrink-0'>·</span>
          <span className='shrink-0'>{STAGE_LABEL[event.stage]}</span>
        </>
      )}
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
