import { atom } from 'jotai'
import { groupBy, sortBy } from 'lodash'
import { useMemo } from 'react'
import { graphql, useFragment } from 'react-relay'
import type { LiveSort } from '@/app/live/live-toolbar'
import type { LiveOrder$key } from '@/relay/__generated__/LiveOrder.graphql'

export const liveSortState = atom<LiveSort>('tournament')
export const liveSportFilterState = atom<string | null>(null)
export const ORDER = {
  tournament: 'TOURNAMENT',
  chronological: 'START_TIME',
} as const

const orderFragment = graphql`
  fragment LiveOrder on Event @relay(plural: true) {
    id
    startTime
    status
    sport {
      key
    }
    tournament {
      key
    }
  }
`

export const FINISHED = new Set(['ENDED', 'CANCELLED', 'ABANDONED', 'POSTPONED'])

export type OrderedLiveEvent<T> = { id: string; group: string; event: T }
type LiveOrderRef = LiveOrder$key[number]

export function useOrderedLiveEvents<T extends LiveOrderRef>(
  events: ReadonlyArray<T>,
  sort: LiveSort,
  sportFilter: string | null
): { events: OrderedLiveEvent<T>[]; groups: OrderedLiveEvent<T>[][] | null } {
  const order = useFragment(orderFragment, events as unknown as LiveOrder$key)

  return useMemo(() => {
    const rows = order
      .map((o, i) => ({
        id: o.id,
        event: events[i],
        status: o.status,
        sport: o.sport.key,
        group: `${o.sport.key}:${o.tournament.key}`,
        start: Date.parse(o.startTime),
      }))
      .filter(r => !FINISHED.has(r.status))
      .filter(r => !sportFilter || r.sport === sportFilter)

    const toOut = (r: (typeof rows)[number]): OrderedLiveEvent<T> => ({
      id: r.id,
      group: r.group,
      event: r.event,
    })

    if (sort === 'chronological')
      return { events: sortBy(rows, r => r.start).map(toOut), groups: null }

    const groups = Object.values(groupBy(rows, r => r.group)).map(g => g.map(toOut))
    return { events: groups.flat(), groups }
  }, [order, events, sort, sportFilter])
}
