// app/api/graphql/stream/route.ts
/** biome-ignore-all lint/correctness/useHookAtTopLevel: not a tsx file */
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse'
import { createYoga } from 'graphql-yoga'
import type { NextRequest } from 'next/server'
import { schema } from '@/app/api/graphql/schema'

const { handleRequest } = createYoga({
  schema,
  plugins: [useDeferStream(), useGraphQLSSE()],
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
})

// Yoga's handleRequest context type doesn't satisfy Next.js 15's strict
// RouteHandlerConfig constraint. Wrapping it in a plain NextRequest => Response
// function is the correct fix — the runtime behavior is identical.
function nextHandler(req: NextRequest, ctx: Record<string, unknown>) {
  return handleRequest(req, ctx)
}

export {
  nextHandler as GET,
  nextHandler as POST,
  nextHandler as PUT,
  nextHandler as DELETE,
  nextHandler as OPTIONS,
}
