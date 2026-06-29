// app/api/graphql/stream/route.ts
/** biome-ignore-all lint/correctness/useHookAtTopLevel: not a tsx file */

import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse'
import { createYoga } from 'graphql-yoga'
import { schema } from '@/app/api/graphql/schema'

const { handleRequest } = createYoga({
  schema,
  plugins: [useDeferStream(), useGraphQLSSE()],
  graphqlEndpoint: '/api/graphql/stream',
  fetchAPI: { Response },
})

export {
  handleRequest as DELETE,
  handleRequest as GET,
  handleRequest as OPTIONS,
  handleRequest as POST,
  handleRequest as PUT,
}
