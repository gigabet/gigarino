'use client'

import { createContext, useContext, useEffect, useMemo } from 'react'
import { useRelayEnvironment } from 'react-relay'
import { type Disposable, type Environment, graphql, requestSubscription } from 'relay-runtime'
import type { LiveOddsSubscription } from '@/app/live/__generated__/LiveOddsSubscription.graphql'
import type { LiveStateSubscription } from '@/app/live/__generated__/LiveStateSubscription.graphql'

// Scrolling churns the registered set; wait for it to settle before swapping streams
const RESUBSCRIBE_DEBOUNCE_MS = 300

// Outcome nodes merge into the store by id, so list rows, strips and the single view all update
const oddsSubscription = graphql`
  subscription LiveOddsSubscription($eventIds: [ID!]!) {
    oddsUpdated(eventIds: $eventIds) {
      outcomes {
        id
        price
        status
      }
    }
  }
`

const stateSubscription = graphql`
  subscription LiveStateSubscription($eventIds: [ID!]!) {
    eventStateUpdated(eventIds: $eventIds) {
      event {
        id
        status
        tradingStatus
        ...LiveScore
        ...LiveTime
      }
    }
  }
`

function createLiveSubscriptions(environment: Environment) {
  // ref-counted: the list row, a strip and the single view can all register the same id
  const refs = new Map<string, number>()
  let subscribedKey = ''
  let active: Disposable[] = []
  let timer: ReturnType<typeof setTimeout> | undefined

  const onError = (err: Error) => console.error('[live-subscriptions]', err)

  function sync() {
    const ids = Array.from(refs.keys()).sort()
    const key = ids.join(',')
    if (key === subscribedKey) return
    subscribedKey = key

    const previous = active
    // open the new streams before closing the old ones so no tick falls in the gap
    active =
      ids.length === 0
        ? []
        : [
            requestSubscription<LiveOddsSubscription>(environment, {
              subscription: oddsSubscription,
              variables: { eventIds: ids },
              onError,
            }),
            requestSubscription<LiveStateSubscription>(environment, {
              subscription: stateSubscription,
              variables: { eventIds: ids },
              onError,
            }),
          ]
    previous.forEach(d => {
      d.dispose()
    })
  }

  const schedule = () => {
    clearTimeout(timer)
    timer = setTimeout(sync, RESUBSCRIBE_DEBOUNCE_MS)
  }

  return {
    register(id: string) {
      refs.set(id, (refs.get(id) ?? 0) + 1)
      schedule()
    },
    unregister(id: string) {
      const n = (refs.get(id) ?? 0) - 1
      if (n > 0) refs.set(id, n)
      else refs.delete(id)
      schedule()
    },
    // keeps refs so a StrictMode remount re-registers cleanly
    dispose() {
      clearTimeout(timer)
      active.forEach(d => {
        d.dispose()
      })
      active = []
      subscribedKey = ''
    },
  }
}

const LiveSubscriptionsContext = createContext<ReturnType<typeof createLiveSubscriptions> | null>(
  null
)

export function LiveSubscriptionsProvider({ children }: { children: React.ReactNode }) {
  const environment = useRelayEnvironment()
  const feed = useMemo(() => createLiveSubscriptions(environment), [environment])

  useEffect(() => () => feed.dispose(), [feed])

  return (
    <LiveSubscriptionsContext.Provider value={feed}>{children}</LiveSubscriptionsContext.Provider>
  )
}

export function useLiveRowRegistration(id: string) {
  const feed = useContext(LiveSubscriptionsContext)
  if (!feed) throw new Error('useLiveRowRegistration must be used within LiveSubscriptionsProvider')

  useEffect(() => {
    feed.register(id)
    return () => feed.unregister(id)
  }, [feed, id])
}
