'use client'

import { entries } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { graphql, requestSubscription, useFragment, useRelayEnvironment } from 'react-relay'
import Event_odds, { type Event_odds$key } from '@/app/live/__generated__/Event_odds.graphql'
import type { LiveEventSubscription } from '@/app/live/__generated__/LiveEventSubscription.graphql'

const SUBSCRIBE_DELAY_MS = 2000

const subscription = graphql`
  subscription LiveEventSubscription($eventId: ID!) {
    eventOdds(eventId: $eventId) {
      id
      home
      draw
      away
    }
  }
`

const useUpDown = (value: number) => {
  const [prevValue, setPrevValue] = useState(value)
  const [upDown, setUpDown] = useState<'up' | 'down' | null>(null)
  const highlight = useRef(0)

  useEffect(() => {
    if (Number(prevValue) > Number(value)) {
      clearTimeout(highlight.current)
      setUpDown('down')
    } else if (Number(prevValue) < Number(value)) {
      clearTimeout(highlight.current)
      setUpDown('up')
    }
    setPrevValue(value)
    highlight.current = window.setTimeout(() => setUpDown(null), 4000)
    return () => {
      clearTimeout(highlight.current)
    }
  }, [prevValue, value])

  return upDown
}

export default function Odds(props: { queryRef: Event_odds$key }) {
  const data = useFragment(Event_odds, props.queryRef)
  const environment = useRelayEnvironment()

  // requestSubscription, not useSubscription — we need real start/stop
  // control (delay + cleanup on unmount), and useSubscription has no
  // `skip`/`shouldSkip` config option to support that.
  useEffect(() => {
    let disposable: { dispose: () => void } | null = null

    const startTimer = window.setTimeout(() => {
      disposable = requestSubscription<LiveEventSubscription>(environment, {
        subscription,
        variables: { eventId: data.id },
        onError: err => console.error('[odds subscription] error', err),
        // No onNext/updater needed: with `Odds` implementing Node and the
        // fragment selecting `id`, the payload normalizes straight into
        // the existing store record and useFragment re-renders on its own.
      })
    }, SUBSCRIBE_DELAY_MS)

    return () => {
      clearTimeout(startTimer)
      disposable?.dispose()
    }
  }, [environment, data.id])

  return (
    <div className='flex gap-1'>
      {entries(data.odds).map(([label, odd]) => {
        if (label === 'id') return null
        return <Odd key={label} label={label} odd={odd as number} />
      })}
    </div>
  )
}

function Odd(props: { label: string; odd: number }) {
  const upDown = useUpDown(props.odd)

  return (
    <div
      key={props.label}
      className='glass data-[updown=up]:border-primary data-[updown=down]:border-destructive flex w-16 flex-col items-center rounded-lg py-2'
      data-updown={upDown}
    >
      <span className='text-secondary text-xs'>{props.label}</span>
      <span className='text-sm font-semibold' suppressHydrationWarning>
        {props.odd.toFixed(2)}
      </span>
    </div>
  )
}
