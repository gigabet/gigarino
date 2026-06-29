// app/api/graphql/route.ts

import { readFileSync } from 'node:fs'
import { createSchema, Repeater } from 'graphql-yoga'

interface NextContext {
  params: Promise<Record<string, string>>
}

const typeDefs = readFileSync(new URL('@/relay/schema.graphql', import.meta.url), 'utf-8')

// Resolvers
const resolvers = {
  Query: {
    mainContent: () => 'This is the main content (delivered immediately).',
    // Simulate a slow resolver that triggers @defer
    lazyContent: () =>
      new Promise(resolve => setTimeout(() => resolve(`This content was deferred`), 2000)),
    // Returns a list that can be streamed with @stream
    streamableContent: () =>
      new Repeater<{ value: string }>(async (push, stop) => {
        const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
        const publish = () => {
          const value = values.shift()
          console.log('publish', { value })

          if (value) {
            push({ value })
          }

          if (values.length === 0) {
            stop()
          }
        }

        const interval = setInterval(publish, Math.random() * 500 + 200)
        publish()

        await stop.then(() => {
          console.log('cancel')
          clearInterval(interval)
        })
      }),
    ticker: (_: unknown, { itemId, from }: { itemId: string; from: number }) => ({
      id: `Ticker:${itemId}`,
      itemId,
      value: from,
    }),
    countdown: (_: unknown, { from }: { from: number }) => ({
      id: `countdown:${from}`,
      value: from,
    }),
  },
  Subscription: {
    countdown: {
      subscribe: (_: NextContext, { from }: { from: number }) =>
        new Repeater<{ id: string; value: number }>(async (push, stop) => {
          let current = from
          while (current >= 0) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            push({ id: `countdown:${from}`, value: current })
            current--
          }
          stop()
        }),
      resolve: (payload: { id: string; value: number }) => payload,
    },
    ticker: {
      subscribe: (_: NextContext, { itemId, from }: { itemId: string; from: number }) =>
        new Repeater<{ id: string; itemId: string; value: number }>(async (push, stop) => {
          let current = from
          console.log(`[ticker:${itemId}] subscribed, starting at ${from}`)

          const interval = setInterval(() => {
            current = current + 1
            push({ id: `Ticker:${itemId}`, itemId, value: current })
          }, 1000)

          await stop.then(() => {
            console.log(`[ticker:${itemId}] unsubscribed at ${current}`)
            clearInterval(interval)
          })
        }),
      resolve: (payload: { id: string; itemId: string; value: number }) => payload,
    },
  },
}

export const schema = createSchema({ typeDefs, resolvers })
