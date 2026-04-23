'use client'
import { experimental_streamedQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
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
