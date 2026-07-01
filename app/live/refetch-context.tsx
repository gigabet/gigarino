// relay/RefetchBatcherContext.tsx
'use client'

import { createContext, useContext, useMemo } from 'react'
import { useRelayEnvironment } from 'react-relay'
import { type Environment, fetchQuery, graphql } from 'relay-runtime'

const BATCH_WINDOW_MS = 2000

const batchQuery = graphql`
  query RefetchBatcherQuery($ids: [ID!]!) {
    eventsByIds(ids: $ids) {
      id
      ...Event_event
    }
  }
`

export function createRefetchBatcher(environment: Environment) {
  let pending = new Set<string>()
  let timer: ReturnType<typeof setTimeout> | null = null

  function flush() {
    const ids = Array.from(pending)
    pending = new Set()
    timer = null

    if (ids.length === 0) return

    // fetchQuery writes results into the store as a side effect;
    // every mounted row's useFragment picks the update up automatically.
    fetchQuery(environment, batchQuery, { ids }, { fetchPolicy: 'store-or-network' }).subscribe({
      error: (err: Error) => console.error('[refetch-batcher] batch failed', err),
    })
  }

  return {
    request(itemId: string) {
      pending.add(itemId)
      timer ??= setTimeout(flush, BATCH_WINDOW_MS)
    },
    cancel(itemId: string) {
      pending.delete(itemId)
    },
    // call on unmount of the whole list if you want to abandon a pending batch
    dispose() {
      if (timer) clearTimeout(timer)
      pending = new Set()
      timer = null
    },
  }
}

const RefetchBatcherContext = createContext<ReturnType<typeof createRefetchBatcher> | null>(null)

export function RefetchBatcherProvider({ children }: { children: React.ReactNode }) {
  const environment = useRelayEnvironment()
  const batcher = useMemo(() => createRefetchBatcher(environment), [environment])
  return <RefetchBatcherContext.Provider value={batcher}>{children}</RefetchBatcherContext.Provider>
}

export function useRefetchBatcher() {
  const batcher = useContext(RefetchBatcherContext)
  if (!batcher) throw new Error('useRefetchBatcher must be used within RefetchBatcherProvider')
  return batcher
}
