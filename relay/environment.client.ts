import { createClient, type Sink } from 'graphql-sse'
import {
  Environment,
  type GraphQLResponse,
  type GraphQLResponseWithData,
  Network,
  Observable,
  type PayloadData,
  RecordSource,
  type RequestParameters,
  Store,
  type Variables,
} from 'relay-runtime'

const subscriptionsClient = createClient({
  url: `${process.env.NEXT_PUBLIC_API_URL}/api/graphql/stream`,
  singleConnection: true,
})

// if (typeof window !== 'undefined') {
//   window.addEventListener('beforeunload', () => {
//     subscriptionsClient.dispose()
//   })
// }

interface SpecIncrementalChunk extends GraphQLResponseWithData {
  items?: PayloadData[]
}

interface SpecMultipartEnvelope {
  incremental?: SpecIncrementalChunk[]
  data?: PayloadData | null
  errors?: unknown[]
  hasNext?: boolean
}

/**
 * Transforms the Stage 2/3 Multipart Incremental Delivery shape into
 * individual flattened payloads that the Relay core runtime natively expects.
 */
function normalizePayloads(result: SpecMultipartEnvelope): GraphQLResponse[] {
  const globalHasNext = result.hasNext ?? false

  // Scenario 1: Modern @defer/@stream chunk array
  if (result.incremental && Array.isArray(result.incremental)) {
    return result.incremental.flatMap(chunk => {
      const base = {
        label: chunk.label,
        extensions: chunk.extensions,
        errors: chunk.errors,
        hasNext: globalHasNext, // Directly apply the stream's structural continuity state
      }

      // @stream: Unpack array values into consecutive indices
      if ('items' in chunk && Array.isArray(chunk.items)) {
        const parentPath = chunk.path?.slice(0, -1) ?? []
        const startIndex = (chunk.path?.[chunk.path.length - 1] as number) ?? 0

        return chunk.items.map((item, i) => ({
          ...base,
          data: item,
          path: [...parentPath, startIndex + i],
        }))
      }

      // @defer: Map fragment data directly to its targeted path
      if ('data' in chunk) {
        return [{ ...base, data: chunk.data, path: chunk.path }]
      }

      return []
    })
  }

  // Scenario 2: Standard bootstrap payload or terminal message carrying root data/errors
  if ('data' in result || 'errors' in result) {
    return [{ ...result, hasNext: globalHasNext } as GraphQLResponse]
  }

  // Scenario 3: Bare terminator envelope (e.g. { hasNext: false }) - yield nothing
  return []
}

export function fetchOrSubscribe(operation: RequestParameters, variables: Variables) {
  return Observable.create<GraphQLResponse & { hasNext?: boolean }>(sink => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'))
    }

    let lastPayload: GraphQLResponse | null = null

    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      {
        next: (result: SpecMultipartEnvelope) => {
          console.log(result)
          const payloads = normalizePayloads(result)

          if (payloads.length === 0) {
            // Bare terminal {hasNext:false} — re-send the last known
            // payload, same path, hasNext flipped. No new data, just
            // confirms completion in place. No delay introduced.
            if (lastPayload) {
              sink.next({ ...lastPayload, hasNext: false })
            }
            return
          }

          for (const payload of payloads) {
            sink.next({ ...payload, hasNext: true }) // flush immediately
            lastPayload = payload
          }
        },
        error: (err: Error) => sink.error(err),
        complete: () => {
          // Safety net: If the stream terminates but we still have a payload
          // waiting in the buffer, make sure it gets pushed out.
          if (lastPayload) {
            sink.next({ ...lastPayload, hasNext: false })
          }
          sink.complete()
        },
      } as Sink
    )
  })
}

let environment: Environment | null = null
export function getClientEnvironment(): Environment {
  environment ??= new Environment({
    network: Network.create(fetchOrSubscribe, fetchOrSubscribe),
    store: new Store(new RecordSource()),
  })
  return environment
}
