'use client'

import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useRelayEnvironment } from 'react-relay'
import { type Environment, fetchQuery, graphql } from 'relay-runtime'

const SWEEP_INTERVAL_MS = 30_000

export function createRefetchBatcher(environment: Environment) {
  // ids currently mounted on screen (Virtuoso's rendered window + overscan)
  const visible = new Map<string, number>()

  let timer: ReturnType<typeof setInterval> | null = null
  let listening = false

  function sweep() {
    if (visible.size === 0) return
    fetchQuery(
      environment,
      graphql`
        query RefetchBatcherQuery($ids: [ID!]!) {
          eventsByIds(ids: $ids) {
            ...LiveEvent
            ...LiveOrder
          }
        }
      `,
      { ids: Array.from(visible.keys()) },
      { fetchPolicy: 'network-only' }
    ).subscribe({
      error: (err: Error) => console.error('[live-batcher] sweep failed', err),
    })
  }

  const onWake = () => {
    if (document.visibilityState === 'visible') sweep()
  }

  function start() {
    timer ??= setInterval(sweep, SWEEP_INTERVAL_MS)
    if (!listening) {
      document.addEventListener('visibilitychange', onWake)
      window.addEventListener('online', sweep)
      listening = true
    }
  }

  return {
    register(id: string) {
      visible.set(id, (visible.get(id) ?? 0) + 1)
      start() // only ever reached from useEffect, so the browser globals exist
    },
    unregister(id: string) {
      const n = (visible.get(id) ?? 0) - 1
      if (n > 0) visible.set(id, n)
      else visible.delete(id)
    },
    dispose() {
      if (timer) clearInterval(timer)
      timer = null
      if (listening) {
        document.removeEventListener('visibilitychange', onWake)
        window.removeEventListener('online', sweep)
        listening = false
      }
      visible.clear()
    },
  }
}

const RefetchBatcherContext = createContext<ReturnType<typeof createRefetchBatcher> | null>(null)

export function RefetchBatcherProvider({ children }: { children: React.ReactNode }) {
  const environment = useRelayEnvironment()
  const batcher = useMemo(() => createRefetchBatcher(environment), [environment])

  useEffect(() => () => batcher.dispose(), [batcher])

  return <RefetchBatcherContext.Provider value={batcher}>{children}</RefetchBatcherContext.Provider>
}

export function useRefetchBatcher() {
  const batcher = useContext(RefetchBatcherContext)
  if (!batcher) throw new Error('useRefetchBatcher must be used within RefetchBatcherProvider')
  return batcher
}

export function useRefetchRegistration(id: string) {
  const batcher = useRefetchBatcher()
  const idRef = useRef(id)
  idRef.current = id

  useEffect(() => {
    batcher.register(idRef.current)
    return () => batcher.unregister(idRef.current)
  }, [batcher])
}
