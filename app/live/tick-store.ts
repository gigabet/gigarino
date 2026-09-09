// app/live/tick-store.ts
type Listener = () => void

/**
 * External store ticking on a fixed interval. Components read it via
 * `useSyncExternalStore` so only the components that actually call the
 * corresponding hook re-render on each tick — nothing above them (list,
 * grouping, sorting) re-renders just because time passed. With hundreds of
 * concurrent live rows, a single `useState` tick at the page root would
 * force sorting/grouping over the full dataset every second; this
 * decouples "time passing" from "the dataset changed".
 */
function createTickStore(intervalMs: number) {
  let value = Date.now()
  const listeners = new Set<Listener>()
  let timer: ReturnType<typeof setInterval> | null = null

  const ensureRunning = () => {
    if (timer || listeners.size === 0) return
    timer = setInterval(() => {
      value = Date.now()
      listeners.forEach(l => l())
    }, intervalMs)
  }

  return {
    subscribe(listener: Listener) {
      listeners.add(listener)
      ensureRunning()
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0 && timer) {
          clearInterval(timer)
          timer = null
        }
      }
    },
    getSnapshot() {
      return value
    },
  }
}

/** 1s — for per-row playtime display. */
export const tickStore = createTickStore(1000)

/** 20s — for anything that reorders/regroups the dataset by elapsed time.
 * Resorting hundreds of rows every second is wasted work for a ranking
 * that barely changes second to second. */
export const sortTickStore = createTickStore(20_000)
