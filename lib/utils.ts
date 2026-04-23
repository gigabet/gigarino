export const formatBalance = (
  balance: number,
  currency: string = process.env.NEXT_APP_CURRENCY ?? 'EUR'
) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(balance)

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

      // Close EventSource when fetch is aborted
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
