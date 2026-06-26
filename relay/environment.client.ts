import { createClient, type Sink } from 'graphql-sse'
import {
  Environment,
  type GraphQLResponse,
  type GraphQLSingularResponse,
  Network,
  Observable,
  RecordSource,
  type RequestParameters,
  Store,
  type Variables,
} from 'relay-runtime'

const subscriptionsClient = createClient({
  url: 'http://localhost:3000/api/graphql',
})

// Some servers (graphql-js 17+, GraphQL Yoga, Apollo Server v4) emit the
// newer "incremental delivery" envelope: { incremental: [...], hasNext }
// Relay expects each follow-up chunk flattened: { data, path, label, hasNext }
// This adapts one shape to the other.
function normalizeIncrementalPayload(
  result: Record<string, unknown> | GraphQLResponse
): GraphQLResponse[] {
  if ('incremental' in result && Array.isArray(result.incremental)) {
    return result.incremental.flatMap(chunk => {
      const base = {
        label: chunk.label,
        extensions: chunk.extensions,
        errors: chunk.errors,
      }

      // @stream: `items` is a batch of values for consecutive array indices
      // starting at chunk.path's last element. Relay wants one payload per
      // item, each with `data` set to that item and `path` pointing at its
      // specific index.
      if ('items' in chunk && Array.isArray(chunk.items)) {
        const parentPath = chunk.path?.slice(0, -1) ?? []
        const startIndex = (chunk.path?.[chunk.path.length - 1] as number) ?? 0

        return chunk.items.map((item: GraphQLSingularResponse['data'], i: number) => ({
          ...base,
          data: item,
          path: [...parentPath, startIndex + i],
        }))
      }

      // @defer: chunk.data is the resolved fragment data for chunk.path
      if ('data' in chunk) {
        return [{ ...base, data: chunk.data, path: chunk.path }]
      }

      // Shouldn't happen, but don't silently drop something with no shape
      return []
    })
  }

  // Bare terminal message ({hasNext:false} with nothing else) — no payload
  if (!('data' in result) && !('errors' in result)) {
    return []
  }

  return [result as GraphQLResponse]
}

export function fetchOrSubscribe(operation: RequestParameters, variables: Variables) {
  return Observable.create<GraphQLResponse>(sink => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'))
    }

    let pending: GraphQLResponse[] = []

    const flushAllButLast = (nextHasNext: boolean) => {
      // Emit everything except the last buffered payload as-is (they already
      // know hasNext: true, since only the final payload's flag can change).
      for (let i = 0; i < pending.length - 1; i++) {
        sink.next(pending[i])
      }
      const last = pending[pending.length - 1]
      if (last) {
        // @ts-expect-error Relay expects hasNext to be present, but the GraphQL spec doesn't require it
        sink.next({ ...last, hasNext: nextHasNext })
      }
      pending = []
    }

    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      {
        next: (result: Record<string, unknown> | GraphQLResponse) => {
          const payloads = normalizeIncrementalPayload(result)

          if (payloads.length === 0) {
            // This IS the bare {hasNext:false} terminator (or similarly
            // empty message). It carries no data of its own — it only tells
            // us the previously buffered payload was actually the last one.
            flushAllButLast(false)
            return
          }

          // We now know a new message arrived, so whatever was buffered
          // before this was definitely NOT the last payload.
          flushAllButLast(true)
          pending = payloads
        },
        error: (err: Error) => sink.error(err),
        complete: () => {
          // Safety net: if the source completes without ever sending the
          // bare terminator (shouldn't happen per spec, but just in case).
          flushAllButLast(false)
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
