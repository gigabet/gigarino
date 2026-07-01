'use client'

import { useCallback, useRef, useState } from 'react'
import { graphql, type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'
import type { EventsQuery } from '@/app/live/__generated__/EventsQuery.graphql'
import LiveEventList_queryNode, {
  type LiveEventList_query$key,
} from '@/app/live/__generated__/LiveEventList_query.graphql'
import LiveEvent from '@/app/live/live-event'
import { Skeleton } from '@/components/ui/skeleton'

const POSITION_DEBOUNCE_MS = 300
const PAGE_SIZE = 15
// so virtuoso never accidentally goes negative
const INITIAL_FIRST_ITEM_INDEX = 100_000

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
  const queryData = usePreloadedQuery<EventsQuery>(LiveEventList_query, props.preloaded)
  const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious } =
    usePaginationFragment<EventsQuery, LiveEventList_query$key>(LiveEventList_queryNode, queryData)

  const edges = data.events.edges
  const [firstItemIndex, setFirstItemIndex] = useState(INITIAL_FIRST_ITEM_INDEX)

  // virtuoso doesn't understand cursors, so we need a cursor <-> index adapter
  const edgeCountBeforeLoad = useRef(edges.length)
  const loadDirection = useRef<'next' | 'previous' | null>(null)

  const handleStartReached = useCallback(() => {
    if (!hasPrevious || isLoadingPrevious || isLoadingNext) return
    loadDirection.current = 'previous'
    edgeCountBeforeLoad.current = edges.length
    loadPrevious(PAGE_SIZE, {
      onComplete: () => {
        if (loadDirection.current !== 'previous') return
        const prependedCount = edges.length - edgeCountBeforeLoad.current
        // in case we lost some events at the front in the meantime
        if (prependedCount > 0) {
          setFirstItemIndex(i => i - prependedCount)
        }
        loadDirection.current = null
      },
    })
  }, [hasPrevious, isLoadingPrevious, isLoadingNext, loadPrevious, edges.length])

  const handleEndReached = useCallback(() => {
    if (!hasNext || isLoadingNext || isLoadingPrevious) return
    loadDirection.current = 'next'
    loadNext(PAGE_SIZE, {
      onComplete: () => {
        loadDirection.current = null
      },
    })
  }, [hasNext, isLoadingNext, isLoadingPrevious, loadNext])

  const positionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [initialIndex, setInitialIndex] = useState(0)

  // incredibly important – virtuoso doesn't fire updates otherwise
  const updatePosition = useCallback(
    (virtualStartIndex: number) => {
      const arrayIndex = virtualStartIndex - firstItemIndex
      const cursor = edges[arrayIndex]?.cursor
      if (!cursor) return

      if (positionTimer.current) clearTimeout(positionTimer.current)
      positionTimer.current = setTimeout(() => {
        setInitialIndex(arrayIndex)
      }, POSITION_DEBOUNCE_MS)
    },
    [edges, firstItemIndex]
  )

  // never return a completely blank jank
  if (!edges.length) return <Skellie size={15} />

  return (
    <Virtuoso
      useWindowScroll
      initialTopMostItemIndex={initialIndex}
      firstItemIndex={firstItemIndex}
      data={edges}
      itemContent={(_virtualIndex, edge) => <LiveEvent eventRef={edge.node} />}
      startReached={handleStartReached}
      endReached={handleEndReached}
      overscan={5}
      rangeChanged={({ startIndex }) => updatePosition(startIndex)}
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
