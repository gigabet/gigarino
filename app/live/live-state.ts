import { atom } from 'jotai'
import { groupBy, sortBy } from 'lodash'
import { graphql, readInlineData } from 'relay-runtime'
import type { LiveOrder$key } from '@/app/live/__generated__/LiveOrder.graphql'
import type { LiveSort } from '@/app/live/live-toolbar'

export const liveSortState = atom<LiveSort>('tournament')
export const liveSportFilterState = atom<string | null>(null)

const orderFragment = graphql`
  fragment LiveOrder on LiveEvent @inline {
    id
    startTime
    sport {
      key
    }
    tournament {
      key
    }
  }
`

export type OrderedLiveEvent<T> = { id: string; event: T }

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
        sport: o.sport.key,
        // tournament keys are only unique within a sport
        group: `${o.sport.key}:${o.tournament.key}`,
        start: Date.parse(o.startTime),
      }
    })
    .filter(r => !sportFilter || r.sport === sportFilter)

  const toOut = (r: (typeof rows)[number]): OrderedLiveEvent<T> => ({ id: r.id, event: r.event })

  if (sort === 'chronological')
    return { events: sortBy(rows, r => r.start).map(toOut), groups: null }

  const groups = Object.values(groupBy(rows, r => r.group)).map(g => g.map(toOut))
  return { events: groups.flat(), groups }
}
