'use client'

import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useRelayEnvironment } from 'react-relay'
import { type Environment, fetchQuery, graphql } from 'relay-runtime'

const SWEEP_INTERVAL_MS = 30_000

export function createRefetchBatcher(environment: Environment) {
  // ids currently mounted on screen (Virtuoso's rendered window + overscan).
  // A row registers on mount and unregisters on unmount — including when
  // Virtuoso virtualizes it away and later remounts it, which naturally
  // re-adds it here without any extra bookkeeping.
  const visible = new Set<string>()
  let timer: ReturnType<typeof setInterval> | null = null

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
      { ids: Array.from(visible) },
      { fetchPolicy: 'network-only' }
    ).subscribe({
      error: (err: Error) => console.error('[live-batcher] sweep failed', err),
    })
  }

  return {
    register(id: string) {
      visible.add(id)
      timer ??= setInterval(sweep, SWEEP_INTERVAL_MS)
    },
    unregister(id: string) {
      visible.delete(id)
    },
    // call on unmount of the whole list
    dispose() {
      if (timer) clearInterval(timer)
      timer = null
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
