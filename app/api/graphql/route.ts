// app/api/graphql/route.ts

import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse'
import { createSchema, createYoga, Repeater } from 'graphql-yoga'

interface NextContext {
  params: Promise<Record<string, string>>
}

const typeDefs = /* GraphQL */ `
  schema {
    query: Query
    subscription: Subscription
  }

  type WrappedString {
    value: String!
  }

  type Query {
    mainContent: String!
    lazyContent: String!
    streamableContent: [WrappedString!]!
  }

  type Subscription {
    countdown(from: Int!): Int!
  }

  directive @defer(
    "If this argument label has a value other than null, it will be passed on to the result of this defer directive. This label is intended to give client applications a way to identify to which fragment a deferred result belongs to."
    label: String
    "Deferred when true."
    if: Boolean
  ) on FRAGMENT_SPREAD | INLINE_FRAGMENT

  # @stream directive
  directive @stream(label: String, initialCount: Int = 0, if: Boolean) on FIELD
`

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
  },
  Subscription: {
    countdown: {
      subscribe: (_: NextContext, { from }: { from: number }) =>
        new Repeater(async (push, stop) => {
          let current = from
          while (current >= 0) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            push(current--)
          }
          stop()
        }),
      resolve: (payload: number) => payload,
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
