// app/live/hooks.ts
'use client'
import { useSyncExternalStore } from 'react'
import { sortTickStore, tickStore } from '@/app/live/tick-store'

/** Subscribes only the calling component to the shared 1s tick — call this
 * inside individual rows/detail panes, never at a list/page root, or every
 * row re-renders together on every tick regardless of virtualization. */
export function useTick() {
  return useSyncExternalStore(tickStore.subscribe, tickStore.getSnapshot, () => 0)
}

/** Coarser 20s tick for re-sorting a live dataset by elapsed time. */
export function useSortTick() {
  return useSyncExternalStore(sortTickStore.subscribe, sortTickStore.getSnapshot, () => 0)
}
