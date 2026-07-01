import { Suspense } from 'react'
import { graphql } from 'relay-runtime'
import type { EventsQuery } from '@/app/live/__generated__/EventsQuery.graphql'
import LiveEventList from '@/app/live/live-event-list'
import { RefetchBatcherProvider } from '@/app/live/refetch-context'
import { Skeleton } from '@/components/ui/skeleton'
import { getServerEnvironment } from '@/relay/environment.server'

export const dynamic = 'force-static'

export default async function Page() {
  const serverEnv = getServerEnvironment()
  const preloaded = serverEnv.serverPreloadQuery<EventsQuery>(
    graphql`
      query EventsQuery($first: Int!, $last: Int, $before: String, $after: String) {
        ...LiveEventList_query
      }

      fragment LiveEventList_query on Query
      @refetchable(queryName: "LiveEventListPaginationQuery") {
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

      fragment Event_event on Event {
        id
        league
        name
        startTime
        ...Event_odds
      }

      fragment Event_odds on Event {
        id
        odds {
          id
          home
          away
          draw
        }
      }
    `,
    { first: 15 }
  )

  return (
    <main className='relative z-1 mx-auto flex min-h-screen w-full max-w-360 items-start gap-12 px-4 py-12 pb-24 sm:px-6 lg:px-8'>
      <RefetchBatcherProvider>
        <Suspense fallback={<Skellie size={15} />}>
          <LiveEventList preloaded={preloaded} />
        </Suspense>
      </RefetchBatcherProvider>
    </main>
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
