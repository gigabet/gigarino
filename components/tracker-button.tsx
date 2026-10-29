'use client'

import { atom, useAtomValue } from 'jotai'
import { ChartNoAxesColumnIcon } from 'lucide-react'
import { useMemo } from 'react'
import { GiSoccerField } from 'react-icons/gi'
import { graphql, useFragment } from 'react-relay'
import { Button } from '@/components/ui/button'
import { useT } from '@/context/providers'
import { trackedEventIdAtom, useToggleTracker } from '@/context/tracker'
import { cn } from '@/lib/utils'
import type { TrackerButton$key } from '@/relay/__generated__/TrackerButton.graphql'

/**
 * Events with a Sportradar id get the match tracker toggle;
 * everything else gets a statistics popup window instead.
 */
export function TrackerButton(props: { event: TrackerButton$key; className?: string }) {
  const { id, sportradarMatchId } = useFragment(
    graphql`
      fragment TrackerButton on Event {
        id
        sportradarMatchId
      }
    `,
    props.event
  )

  return sportradarMatchId ? (
    <TrackerToggle eventId={id} className={props.className} />
  ) : (
    <StatsButton eventId={id} className={props.className} />
  )
}

/* -------------------------------------------------------------------------- */
/*  Match tracker toggle                                                      */
/* -------------------------------------------------------------------------- */

function TrackerToggle(props: { eventId: string; className?: string }) {
  // derived per-event atom: rows only re-render when *their* active state flips
  const activeAtom = useMemo(
    () => atom(get => get(trackedEventIdAtom) === props.eventId),
    [props.eventId]
  )
  const active = useAtomValue(activeAtom)
  const toggle = useToggleTracker()
  const t = useT()

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon-sm'
      className={cn('rounded-full', props.className)}
      aria-pressed={active}
      aria-label={active ? t('Hide match tracker') : t('Show match tracker')}
      onClick={() => toggle(props.eventId)}
    >
      <GiSoccerField className={cn('size-4 transition-colors', active && 'text-primary')} />
    </Button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Statistics popup window                                                   */
/* -------------------------------------------------------------------------- */

// one shared name: clicking another event navigates the existing popup
const STATS_WINDOW = 'match-stats'
const STATS_FEATURES = 'popup=yes,width=960,height=800'

function StatsButton(props: { eventId: string; className?: string }) {
  const t = useT()
  const href = `/stats/${encodeURIComponent(props.eventId)}`

  return (
    <Button asChild variant='ghost' size='icon-sm' className={cn('rounded-full', props.className)}>
      <a
        href={href}
        target={STATS_WINDOW}
        aria-label={t('Show statistics')}
        onClick={e => {
          // let ctrl/cmd/shift/middle-click keep their normal "open in tab" meaning
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return

          const win = window.open(href, STATS_WINDOW, STATS_FEATURES)
          // blocked? don't cancel, so the anchor's own target= opens it as a tab
          if (win) {
            e.preventDefault()
            win.focus()
          }
        }}
      >
        <ChartNoAxesColumnIcon className='size-4' />
      </a>
    </Button>
  )
}
