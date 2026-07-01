'use client'

import { Suspense, useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { EventsQuery } from '@/app/live/__generated__/EventsQuery.graphql'
import LiveEventList from '@/app/live/live-event-list'
import { RefetchBatcherProvider } from '@/app/live/refetch-context'
import { Skeleton } from '@/components/ui/skeleton'

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

// TODO: error handling
export default function Page() {
  const [preloaded, loadQuery] = useQueryLoader<EventsQuery>(graphql`
    query EventsQuery($first: Int!, $last: Int, $before: String, $after: String) {
      ...LiveEventList_query
    }
  `)

  useEffect(() => {
    loadQuery({ first: 15 })
  }, [loadQuery])

  useEffect(() => {
    // prevent browser from restoring scroll position to avoid jumping
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)

    // re-enable normal behavior on other pages
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [])

  return (
    <main className='relative z-1 mx-auto flex min-h-screen w-full max-w-360 items-start gap-12 px-4 py-12 pb-24 sm:px-6 lg:px-8'>
      <RefetchBatcherProvider>
        <Suspense fallback={<Skellie size={15} />}>
          {preloaded ? <LiveEventList preloaded={preloaded} /> : <Skellie size={15} />}
        </Suspense>
      </RefetchBatcherProvider>
    </main>
  )
}
