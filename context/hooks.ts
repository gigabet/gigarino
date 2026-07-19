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

export function useSelectedTournaments() {
  const router = useRouter()
  const params = useParams<{ slug?: string[] }>()

  const selected = useMemo(() => params.slug?.[1]?.split(',').filter(Boolean) ?? [], [params.slug])

  const toggle = useCallback(
    (key: string) => {
      const next = selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key]

      const filter = params.slug?.[0] ?? 'all'
      const path = next.length ? `/sport/${filter}/${next.join(',')}` : `/sport/${filter}`

      // A real router navigation is fine now — /sport has no server data
      // left to re-fetch, so this costs nothing and every mounted
      // consumer of useParams()/usePathname() picks it up automatically.
      router.replace(path, { scroll: false })
    },
    [selected, params.slug, router]
  )

  return { selected, toggle }
}
