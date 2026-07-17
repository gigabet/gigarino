'use client'
import { experimental_streamedQuery, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

export function useSportRouteParams() {
  const params = useParams<{ slug?: string[] }>()
  const [filter = 'all', sport = null, league = null] = params.slug ?? []
  return { filter, sport, league }
}

export function useSelectedTournaments() {
  const { filter, sport, league } = useSportRouteParams()
  const router = useRouter()

  const selected = useMemo(() => league?.split(',').filter(Boolean) ?? [], [league])
  const toggle = useCallback(
    (key: string, newSport?: string) => {
      let next: string[]
      if (newSport && newSport !== sport) next = [key]
      else next = selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key]

      const next_params = next.length
        ? `${filter}/${newSport ?? sport}/${next.join(',')}`
        : `${filter}`
      router.replace(`/sport/${next_params}`, { scroll: false })
    },
    [selected, filter, sport, router]
  )

  return { selected, toggle }
}

// export function useSelectedTournaments() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   const selected = useMemo(
//     () => searchParams.get('tournaments')?.split(',').filter(Boolean) ?? [],
//     [searchParams]
//   )

//   const toggle = useCallback(
//     (key: string) => {
//       const next = selected.includes(key)
//         ? selected.filter(k => k !== key)
//         : [...selected, key]

//       const next_params = new URLSearchParams(searchParams)
//       next.length ? next_params.set('tournaments', next.join(',')) : next_params.delete('tournaments')

//       router.replace(`${pathname}?${next_params.toString()}`, { scroll: false })
//     },
//     [selected, searchParams, pathname, router]
//   )

//   return { selected, toggle }
// }
