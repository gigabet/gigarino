import { atom } from 'jotai'
import { groupBy, sortBy } from 'lodash'
import { graphql, readInlineData } from 'relay-runtime'
import type { LiveOrder$key } from '@/app/live/__generated__/LiveOrder.graphql'
import type { LiveSort } from '@/app/live/live-toolbar'

export const liveSortState = atom<LiveSort>('tournament')
export const liveSportFilterState = atom<string | null>(null)
export const ORDER = { tournament: 'TOURNAMENT', chronological: 'START_TIME' } as const

const orderFragment = graphql`
  fragment LiveOrder on Event @inline {
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

const FINISHED = new Set(['ENDED', 'CANCELLED', 'ABANDONED', 'POSTPONED'])

export type OrderedLiveEvent<T> = { id: string; group: string; event: T }

export function orderLiveEvents<T extends LiveOrder$key>(
  events: ReadonlyArray<T>,
  sort: LiveSort,
  sportFilter: string | null
): { events: OrderedLiveEvent<T>[]; groups: OrderedLiveEvent<T>[][] | null } {
  const rows = events
    .map(event => {
      const o = readInlineData<LiveOrder$key>(orderFragment, event)
      return {
        id: o.id,
        event,
        status: o.status,
        sport: o.sport.key,
        group: `${o.sport.key}:${o.tournament.key}`,
        start: Date.parse(o.startTime),
      }
    })
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
}
