import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatBalance = (
  balance: number,
  currency: string = process.env.NEXT_APP_CURRENCY ?? 'EUR'
) =>
  new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(balance)

export const formatBalanceBasic = (
  balance: number,
  currency: string = process.env.NEXT_APP_CURRENCY ?? 'EUR'
) =>
  new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(balance)

export function addToDate(isoDate: string, amount: number, unit: 'HOURS' | 'DAYS'): Date {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ISO date: ${isoDate}`)
  }

  const timeMs = date.getTime()
  const milliseconds = unit === 'HOURS' ? amount * 60 * 60 * 1000 : amount * 24 * 60 * 60 * 1000

  return new Date(timeMs + milliseconds)
}

interface StreamUpdate<T> {
  id: string
  timestamp: number
  data: T
}

export function createSSEStream<T>(
  url: string,
  signal: AbortSignal
): AsyncIterable<StreamUpdate<T>> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<StreamUpdate<T>> {
      const eventSource = new EventSource(url)
      const queue: StreamUpdate<T>[] = []
      let resolveNext: ((value: IteratorResult<StreamUpdate<T>>) => void) | null = null
      let done = false

      // Close MockEventSource when fetch is aborted
      signal.addEventListener('abort', () => {
        done = true
        eventSource.close()
        resolveNext?.({ done: true, value: undefined })
      })

      eventSource.onmessage = event => {
        try {
          const parsed: StreamUpdate<T> = JSON.parse(event.data)
          if (resolveNext) {
            resolveNext({ done: false, value: parsed })
            resolveNext = null
          } else {
            queue.push(parsed)
          }
        } catch (err) {
          console.error('Parse error:', err)
        }
      }

      eventSource.onerror = () => {
        done = true
        eventSource.close()
        resolveNext?.({ done: true, value: undefined })
      }

      return {
        next(): Promise<IteratorResult<StreamUpdate<T>>> {
          if (queue.length > 0) {
            // biome-ignore lint/style/noNonNullAssertion: If no error thrown, it must be non-null
            return Promise.resolve({ done: false, value: queue.shift()! })
          }
          if (done) {
            return Promise.resolve({ done: true, value: undefined })
          }
          return new Promise(resolve => {
            resolveNext = resolve
          })
        },
      }
    },
  }
}
