'use client'
import { experimental_streamedQuery, useQuery } from '@tanstack/react-query'
import { atom, useAtom } from 'jotai'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { createSSEStream } from '@/lib/utils'
import type { BalanceUpdate } from '@/types'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup timeout if value changes or component unmounts
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export function useBalanceUpdates(token: string) {
  return useQuery({
    queryKey: ['balance-updates', token],
    queryFn: experimental_streamedQuery({
      streamFn: ({ signal }) =>
        Promise.resolve(
          createSSEStream<BalanceUpdate>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/players/balance-stream?token=${token}`,
            signal
          )
        ),
      refetchMode: 'replace',
    }),
  })
}

export const useUpDown = (value: number) => {
  const [prevValue, setPrevValue] = useState(value)
  const [upDown, setUpDown] = useState<'up' | 'down' | ''>('')
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
    highlight.current = window.setTimeout(() => setUpDown(''), 1500)
    return () => {
      clearTimeout(highlight.current)
    }
  }, [prevValue, value])

  return upDown
}

export const useDelta = (value: number) => {
  const [prevValue, setPrevValue] = useState(value)
  const [delta, setDelta] = useState(0)
  const highlight = useRef(0)

  useEffect(() => {
    if (prevValue !== value) {
      setDelta(value - prevValue)
      clearTimeout(highlight.current)
    }
    setPrevValue(value)
    highlight.current = window.setTimeout(() => setDelta(0), 1500)
    return () => {
      clearTimeout(highlight.current)
    }
  }, [prevValue, value])

  return delta
}

function parseTournamentsFromPath(pathname: string): string[] {
  const segments = pathname.split('/').filter(Boolean) // ['sport', filter, tournaments?]
  return segments[2]?.split(',').filter(Boolean) ?? []
}

// history.pushState/replaceState don't dispatch any event on their own —
// popstate only fires for back/forward. So we broadcast a synthetic event
// ourselves right after every write, and that's the only signal every
// subscribed component needs to re-render from the new URL.
function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback)
  window.addEventListener('locationchange', callback)
  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener('locationchange', callback)
  }
}

function getSnapshot() {
  return window.location.pathname
}

// No `window` during SSR; the real value gets picked up on the client's
// first paint via getSnapshot, same render pass — no flash, no effect needed.
function getServerSnapshot() {
  return '/sport'
}

export function useSelectedTournaments() {
  const pathname = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const selected = useMemo(() => parseTournamentsFromPath(pathname), [pathname])

  const toggle = useCallback((key: string) => {
    // read fresh from the URL at click time, not from a closed-over value —
    // this is what makes concurrent toggles across different accordions safe
    const current = parseTournamentsFromPath(window.location.pathname)
    const next = current.includes(key) ? current.filter(k => k !== key) : [...current, key]

    const parts = window.location.pathname.split('/').filter(Boolean)
    const filter = parts[1] ?? 'all'
    const nextPath = next.length ? `/sport/${filter}/${next.join(',')}` : `/sport/${filter}`

    window.history.replaceState(history.state, '', nextPath)
    window.dispatchEvent(new Event('locationchange'))
  }, [])

  return { selected, toggle }
}
