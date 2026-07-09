'use client'

import { useCallback } from 'react'
import { graphql, type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'
import type { LiveEventList_query$key } from '@/app/live/[[...slug]]/__generated__/LiveEventList_query.graphql'
import MockEventsQueryNode, {
  type MockEventsQuery,
} from '@/app/live/[[...slug]]/__generated__/MockEventsQuery.graphql'
import LiveEvent from '@/app/live/live-event'
import { Skeleton } from '@/components/ui/skeleton'

const PAGE_SIZE = 15

const LiveEventList_query = graphql`
  fragment LiveEventList_query on Query @refetchable(queryName: "LiveEventListPaginationQuery") {
    mockEvents(first: $first, last: $last, before: $before, after: $after)
      @connection(key: "liveEventList_mockEvents") {
      edges {
        node {
          ...liveEvent_Event
        }
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

export default function LiveEventList(props: { preloaded: PreloadedQuery<MockEventsQuery> }) {
  const queryData = usePreloadedQuery<MockEventsQuery>(MockEventsQueryNode, props.preloaded)
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    MockEventsQuery,
    LiveEventList_query$key
  >(LiveEventList_query, queryData)

  const edges = data.mockEvents.edges

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
