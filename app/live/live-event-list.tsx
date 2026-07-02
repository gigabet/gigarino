'use client'

import { useCallback } from 'react'
import { graphql, type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'
import type { EventsQuery } from '@/app/live/__generated__/EventsQuery.graphql'
import EventsQueryNode from '@/app/live/__generated__/EventsQuery.graphql'
import type { LiveEventList_query$key } from '@/app/live/__generated__/LiveEventList_query.graphql'
import LiveEvent from '@/app/live/live-event'
import { Skeleton } from '@/components/ui/skeleton'

const PAGE_SIZE = 15

const LiveEventList_query = graphql`
  fragment LiveEventList_query on Query @refetchable(queryName: "LiveEventListPaginationQuery") {
    events(first: $first, last: $last, before: $before, after: $after)
      @connection(key: "LiveEventList_events") {
      edges {
        cursor
        node {
          ...Event_event
        }
        cursor
      }
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
    }
  }
`

export default function LiveEventList(props: { preloaded: PreloadedQuery<EventsQuery> }) {
  const queryData = usePreloadedQuery<EventsQuery>(EventsQueryNode, props.preloaded)
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    EventsQuery,
    LiveEventList_query$key
  >(LiveEventList_query, queryData)

  const edges = data.events.edges

  const handleEndReached = useCallback(() => {
    if (!hasNext || isLoadingNext) return
    loadNext(PAGE_SIZE)
  }, [hasNext, isLoadingNext, loadNext])

  // never return a completely blank jank
  if (!edges.length) return <Skellie size={15} />

  return (
    <Virtuoso
      useWindowScroll
      data={edges}
      itemContent={(_virtualIndex, edge) => <LiveEvent eventRef={edge.node} />}
      endReached={handleEndReached}
      overscan={5}
    />
  )
}

const Skellie = (props: { size?: number }) => (
  <div>
    {new Array(props.size ?? 15).fill(15).map((_, i) => (
      <Skeleton
        // biome-ignore lint/suspicious/noArrayIndexKey: idc
        key={i}
        className='mb-2 h-27.5 w-full min-w-120 rounded-lg'
      />
    ))}
  </div>
)
