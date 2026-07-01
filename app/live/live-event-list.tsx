'use client'

import { useCallback, useRef, useState } from 'react'
import { type PreloadedQuery, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'
import type { EventsQuery } from '@/app/live/__generated__/EventsQuery.graphql'
import EventsQueryNode from '@/app/live/__generated__/EventsQuery.graphql'
import LiveEventList_queryNode, {
  type LiveEventList_query$key,
} from '@/app/live/__generated__/LiveEventList_query.graphql'
import LiveEvent from '@/app/live/live-event'
import { Skeleton } from '@/components/ui/skeleton'

const POSITION_DEBOUNCE_MS = 300
const PAGE_SIZE = 15
// Large headroom so backward pagination never needs the offset to go negative.
// Purely an internal Virtuoso offset, not a backing array — costs nothing.
const INITIAL_FIRST_ITEM_INDEX = 100_000

export default function LiveEventList(props: { preloaded: PreloadedQuery<EventsQuery> }) {
  const queryData = usePreloadedQuery<EventsQuery>(EventsQueryNode, props.preloaded)
  const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious } =
    usePaginationFragment<EventsQuery, LiveEventList_query$key>(LiveEventList_queryNode, queryData)

  const edges = data.events.edges
  const [firstItemIndex, setFirstItemIndex] = useState(INITIAL_FIRST_ITEM_INDEX)
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
        // Guard against onComplete firing with stale `edges` closure: only
        // trust a positive delta, otherwise re-derive from data length is
        // unreliable here, so just no-op rather than risk a bad jump.
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

  const updatePositionInUrl = useCallback(
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
      rangeChanged={({ startIndex }) => updatePositionInUrl(startIndex)}
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
