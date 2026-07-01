import { graphql } from 'relay-runtime'
import type { EventsQuery } from '@/app/live/__generated__/EventsQuery.graphql'
import LiveEventList from '@/app/live/live-event-list'
import { RefetchBatcherProvider } from '@/app/live/refetch-context'
import { getServerEnvironment } from '@/relay/environment.server'
import type { SearchParams } from '@/types'

export const dynamic = 'force-dynamic'

export default async function Page(props: { searchParams: SearchParams }) {
  const index = Number((await props.searchParams).index ?? 0)

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
    { first: 15 + index }
  )

  return (
    <main className='relative z-1 mx-auto flex w-full max-w-360 items-start gap-12 px-4 py-12 pb-24 sm:px-6 lg:px-8'>
      <RefetchBatcherProvider>
        <LiveEventList preloaded={preloaded} initialIndex={index} />
      </RefetchBatcherProvider>
    </main>
  )
}
