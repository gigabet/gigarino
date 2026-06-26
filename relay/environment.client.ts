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
  url: 'http://localhost:3000/api/graphql',
})

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

    // Keep track of exactly one "last known valid payload" to graft onto
    let lastBufferedPayload: GraphQLResponse | null = null

    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      {
        next: (result: unknown) => {
          try {
            const envelope = result as SpecMultipartEnvelope
            const payloads = normalizePayloads(envelope) // Same normalization logic as before

            if (payloads.length === 0) {
              // This is the bare terminator envelope ({ hasNext: false })!
              // If we have a buffered payload, graft hasNext: false onto it and flush.
              if (lastBufferedPayload) {
                sink.next({ ...lastBufferedPayload, hasNext: false })
                lastBufferedPayload = null
              }
              return
            }

            // If we already had a buffered payload from a PREVIOUS network message,
            // we now know it wasn't the last one. Flush it with hasNext: true.
            if (lastBufferedPayload) {
              sink.next({ ...lastBufferedPayload, hasNext: true })
              lastBufferedPayload = null
            }

            // For the new payloads in this message:
            // Emit all of them immediately except the absolute last one.
            for (let i = 0; i < payloads.length - 1; i++) {
              sink.next({ ...payloads[i], hasNext: true })
            }

            // Hold the absolute last payload of this batch in the buffer.
            // We don't know if the server will send more data or an empty terminator next.
            lastBufferedPayload = payloads[payloads.length - 1]

            // Edge case: If the server explicitly sent `hasNext: false` inside THIS
            // multi-payload message, we don't need to wait for a bare terminator.
            if (envelope.hasNext === false && lastBufferedPayload) {
              sink.next({ ...lastBufferedPayload, hasNext: false })
              lastBufferedPayload = null
            }
          } catch (err) {
            sink.error(err instanceof Error ? err : new Error(String(err)))
          }
        },
        error: (err: Error) => sink.error(err),
        complete: () => {
          // Safety net: If the stream terminates but we still have a payload
          // waiting in the buffer, make sure it gets pushed out.
          if (lastBufferedPayload) {
            sink.next({ ...lastBufferedPayload, hasNext: false })
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
