'use client'

import { entries } from 'lodash'
import { useEffect, useState } from 'react'
import {
  type Disposable,
  graphql,
  requestSubscription,
  useFragment,
  useRelayEnvironment,
} from 'react-relay'
import type { Event_odds$key } from '@/app/live/__generated__/Event_odds.graphql'
import type { LiveEventSubscription } from '@/app/live/__generated__/LiveEventSubscription.graphql'
import { useUpDown } from '@/context/hooks'
import { cn } from '@/lib/utils'

const SUBSCRIBE_DELAY_MS = 2000
const Event_odds = graphql`
  fragment Event_odds on Event {
    id
    odds {
      id
      home
      away
      draw
    }
  }
`
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

export default function Odds(props: { queryRef: Event_odds$key }) {
  const data = useFragment(Event_odds, props.queryRef)
  const environment = useRelayEnvironment()
  const [live, setLive] = useState(false)

  // delayed subscriptions
  useEffect(() => {
    let disposable: Disposable | null = null

    const startTimer = window.setTimeout(() => {
      disposable = requestSubscription<LiveEventSubscription>(environment, {
        subscription,
        variables: { eventId: data.id },
        onError: err => console.error('[odds subscription] error', err),
      })
      setLive(true)
    }, SUBSCRIBE_DELAY_MS)

    return () => {
      if (disposable) disposable.dispose()
      setLive(false)
      clearTimeout(startTimer)
    }
  }, [environment, data.id])

  return (
    <div className={cn('flex gap-1', live && 'bg-destructive/15')}>
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
