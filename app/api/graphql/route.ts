// app/api/graphql/route.ts

import { readFileSync } from 'node:fs'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse'
import { createSchema, createYoga, Repeater } from 'graphql-yoga'

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
  },
}

const schema = createSchema({ typeDefs, resolvers })

// Create the Yoga server
const { handleRequest } = createYoga<NextContext>({
  // biome-ignore lint/suspicious/noExplicitAny: type mismatch with Yoga's schema type
  schema: schema as any,
  // GraphiQL is enabled by default, so you can test easily
  graphiql: true,
  // SSE is the default transport for subscriptions
  // biome-ignore lint/correctness/useHookAtTopLevel: not jsx
  plugins: [useDeferStream(), useGraphQLSSE()],
  graphqlEndpoint: '/api/graphql',
  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as OPTIONS, handleRequest as POST }
