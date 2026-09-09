// app/live/viewport-batcher.tsx
'use client'

import { createContext, useContext, useEffect, useMemo, useRef } from 'react'

const BATCH_WINDOW_MS = 2000

/**
 * Viewport-driven batched refresh — same shape as a real-backend refetch
 * batcher (see the `RefetchBatcherProvider` proof of concept): rows
 * register themselves while mounted (i.e. while Virtuoso has them in the
 * DOM ± overscan) and a shared timer flushes every currently-registered id
 * in one call every `BATCH_WINDOW_MS`, instead of hundreds of concurrent
 * per-row subscriptions or a single page-wide poll that refreshes events
 * nobody can currently see.
 *
 * `onFlush` is injected so the mock feed and a future real feed (a batched
 * `mockEventsByIds`/`eventsByIds`-style query, or a viewport-scoped
 * `eventStateUpdated` subscription) share this exact registration
 * mechanism — only what happens inside `onFlush` needs to change.
 */
function createViewportBatcher(onFlush: (ids: string[]) => void) {
  let pending = new Set<string>()
  let timer: ReturnType<typeof setTimeout> | null = null

  function flush() {
    const ids = Array.from(pending)
    pending = new Set()
    timer = null
    if (ids.length > 0) onFlush(ids)
  }

  return {
    register(id: string) {
      pending.add(id)
      timer ??= setTimeout(flush, BATCH_WINDOW_MS)
    },
    unregister(id: string) {
      pending.delete(id)
    },
    dispose() {
      if (timer) clearTimeout(timer)
      pending = new Set()
      timer = null
    },
  }
}

const ViewportBatcherContext = createContext<ReturnType<typeof createViewportBatcher> | null>(null)

export function ViewportBatcherProvider(props: {
  children: React.ReactNode
  onFlush: (ids: string[]) => void
}) {
  // ref so a re-created `onFlush` callback from the parent doesn't force us
  // to tear down and rebuild the batcher (and lose pending registrations)
  const onFlushRef = useRef(props.onFlush)
  onFlushRef.current = props.onFlush

  const batcher = useMemo(() => createViewportBatcher(ids => onFlushRef.current(ids)), [])

  useEffect(() => () => batcher.dispose(), [batcher])

  return (
    <ViewportBatcherContext.Provider value={batcher}>
      {props.children}
    </ViewportBatcherContext.Provider>
  )
}

export function useViewportBatcher() {
  const batcher = useContext(ViewportBatcherContext)
  if (!batcher) throw new Error('useViewportBatcher must be used within ViewportBatcherProvider')
  return batcher
}

/** Registers/unregisters `id` with the batcher for as long as the calling
 * component is mounted — a row only participates in refresh batches while
 * Virtuoso actually renders it, not while it's scrolled off-screen. */
export function useViewportRegistration(id: string) {
  const batcher = useViewportBatcher()
  useEffect(() => {
    batcher.register(id)
    return () => batcher.unregister(id)
  }, [id, batcher])
}
