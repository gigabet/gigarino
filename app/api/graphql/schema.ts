// relay/schema.ts
//
// Shared schema instance imported by BOTH route handlers (main + stream),
// so the two endpoints can never drift out of sync.

import { readFileSync } from 'node:fs'
import { createSchema, Repeater } from 'graphql-yoga'
import { type EventData, events, eventsById, oddsIdForEvent } from '@/app/api/graphql/mock-data'

const typeDefs = readFileSync(new URL('@/relay/schema.graphql', import.meta.url), 'utf-8')

// --- Cursor pagination -----------------------------------------------------
// Cursor is just the base64-encoded array index. Fine for a mock; swap for a
// real opaque cursor (e.g. encoding a DB sort key) once this hits Postgres.

function toCursor(index: number): string {
  return Buffer.from(`cursor:${index}`, 'utf-8').toString('base64')
}

function fromCursor(cursor: string): number {
  const decoded = Buffer.from(cursor, 'base64').toString('utf-8')
  const index = Number(decoded.replace('cursor:', ''))
  if (Number.isNaN(index)) throw new Error(`Invalid cursor: ${cursor}`)
  return index
}

function paginate(args: {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
}) {
  const { first, after, last, before } = args

  // Backward page: `last` items immediately before `before`.
  if (last != null && before != null) {
    const beforeIndex = fromCursor(before)
    const startIndex = Math.max(0, beforeIndex - last)
    const slice = events.slice(startIndex, beforeIndex)
    return {
      edges: slice.map((node, i) => ({ cursor: toCursor(startIndex + i), node })),
      pageInfo: {
        hasNextPage: beforeIndex < events.length,
        hasPreviousPage: startIndex > 0,
        startCursor: slice.length > 0 ? toCursor(startIndex) : null,
        endCursor: slice.length > 0 ? toCursor(beforeIndex - 1) : null,
      },
    }
  }

  // Forward page (default): `first` items after `after`.
  const pageSize = first ?? 15
  const startIndex = after ? fromCursor(after) + 1 : 0
  const slice = events.slice(startIndex, startIndex + pageSize)

  return {
    edges: slice.map((node, i) => ({
      cursor: toCursor(startIndex + i),
      node,
    })),
    pageInfo: {
      hasNextPage: startIndex + pageSize < events.length,
      hasPreviousPage: startIndex > 0,
      startCursor: slice.length > 0 ? toCursor(startIndex) : null,
      endCursor: slice.length > 0 ? toCursor(startIndex + slice.length - 1) : null,
    },
  }
}

// --- Batched lookup ----------------------------------------------------
// Stand-in for a DataLoader-backed resolver. Real version should batch
// through whatever the NestJS service exposes (single SQL `WHERE id IN (...)`
// or a Redis MGET), not N sequential lookups.

function getEventsByIds(ids: readonly string[]): EventData[] {
  return ids.map(id => eventsById.get(id)).filter((event): event is EventData => Boolean(event))
}

// --- Live odds simulation ---------------------------------------------
// Jitters the odds for one event on an interval, pushed only to subscribers
// of that specific eventId. Mutates the shared mock record too, so a fresh
// query/refetch sees the latest values even without the subscription.

function simulateOddsTicks(eventId: string) {
  return new Repeater<EventData['odds']>(async (push, stop) => {
    const event = eventsById.get(eventId)
    if (!event) return stop()

    console.log(`[odds:${eventId}] subscribed`)

    const interval = setInterval(() => {
      const drift = () => Number((Math.random() * 0.2 - 0.1).toFixed(2))
      event.odds = {
        id: oddsIdForEvent(eventId),
        home: Math.max(1.01, Number((event.odds.home + drift()).toFixed(2))),
        draw: Math.max(1.01, Number((event.odds.draw + drift()).toFixed(2))),
        away: Math.max(1.01, Number((event.odds.away + drift()).toFixed(2))),
        updatedAt: new Date().toISOString(),
      }
      push(event.odds)
    }, 1500)

    await stop.then(() => {
      console.log(`[odds:${eventId}] unsubscribed`)
      clearInterval(interval)
    })
  })
}

// --- Resolvers ----------------------------------------------------------

// --- Node interface -------------------------------------------------------
// Global object lookup, required for Relay's @refetchable/GC machinery.
// Ids are prefixed per type ("event-0", "Odds:event-0") so we can route
// node(id) to the right backing store without a separate type registry.

function resolveNode(
  id: string
): { __typename: 'Event' | 'Odds'; data: EventData | EventData['odds'] } | null {
  if (id.startsWith('Odds:')) {
    const eventId = id.slice('Odds:'.length)
    const event = eventsById.get(eventId)
    return event ? { __typename: 'Odds', data: event.odds } : null
  }
  const event = eventsById.get(id)
  return event ? { __typename: 'Event', data: event } : null
}

const resolvers = {
  Node: {
    __resolveType: (obj: { __typename: string }) => obj.__typename,
  },
  Query: {
    node: (_: unknown, { id }: { id: string }) => {
      const resolved = resolveNode(id)
      if (!resolved) return null
      return { __typename: resolved.__typename, ...resolved.data }
    },
    events: (
      _: unknown,
      args: {
        first?: number | null
        after?: string | null
        last?: number | null
        before?: string | null
      }
    ) => paginate(args),
    eventsByIds: (_: unknown, { ids }: { ids: string[] }) => getEventsByIds(ids),
  },
  Subscription: {
    eventOdds: {
      subscribe: (_: unknown, { eventId }: { eventId: string }) => simulateOddsTicks(eventId),
      resolve: (payload: EventData['odds']) => payload,
    },
  },
}

export const schema = createSchema({ typeDefs, resolvers })
