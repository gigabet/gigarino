'use client'

import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useRelayEnvironment } from 'react-relay'
import { type Environment, fetchQuery, graphql } from 'relay-runtime'

/**
 * How often we sweep the currently-mounted rows for a refresh. Kept coarse
 * on purpose: a live list can hold hundreds of rows on a busy weekend, and
 * per-row subscriptions (eventStateUpdated) at that scale would open
 * hundreds of concurrent SSE streams. Instead we batch every mounted id
 * into a single `eventsByIds` round trip.
 */
const SWEEP_INTERVAL_MS = 3000

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
            ...LiveEvent @dangerously_unaliased_fixme
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

/** Registers this row's id with the batcher for as long as it's mounted. */
export function useLiveRowRegistration(id: string) {
  const batcher = useRefetchBatcher()
  // guards against StrictMode's mount→unmount→mount dev double-invoke
  // registering/unregistering the same id twice in a way that's still correct
  // either way, since register/unregister are idempotent Set ops.
  const idRef = useRef(id)
  idRef.current = id

  useEffect(() => {
    batcher.register(idRef.current)
    return () => batcher.unregister(idRef.current)
  }, [batcher])
}
