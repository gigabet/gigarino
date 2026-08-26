'use client'

import { Loader2Icon } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { PiTicket } from 'react-icons/pi'
import { useInView } from 'react-intersection-observer'
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import type { MyTicketsList$key } from '@/components/__generated__/MyTicketsList.graphql'
import type { MyTicketsListPaginationQuery } from '@/components/__generated__/MyTicketsListPaginationQuery.graphql'
import type { MyTicketsQuery } from '@/components/__generated__/MyTicketsQuery.graphql'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import TicketCard, { TicketCardSkeleton } from '@/components/ticket-card'
import { Skeleton } from '@/components/ui/skeleton'

const OPEN_STATUSES = new Set(['PENDING_ACCEPTANCE', 'ACCEPTED', 'PARTIALLY_CASHED_OUT'])

export default function MyTickets() {
  return (
    <div className='scrollbar-hide flex-1 overflow-y-auto'>
      <ErrorBoundary FallbackComponent={SectionErrorFallback}>
        <Suspense fallback={<MyTicketsSkeleton />}>
          <MyTicketsContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

function MyTicketsContent() {
  const query = useLazyLoadQuery<MyTicketsQuery>(
    graphql`
      query MyTicketsQuery {
        ...MyTicketsList
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' }
  )

  const { data, loadNext, hasNext, isLoadingNext, refetch } = usePaginationFragment<
    MyTicketsListPaginationQuery,
    MyTicketsList$key
  >(
    graphql`
      fragment MyTicketsList on Query
      @refetchable(queryName: "MyTicketsListPaginationQuery")
      @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" }) {
        myTickets(first: $first, after: $after) @connection(key: "MyTicketsList_myTickets") {
          # totalCount
          edges {
            node {
              id
              status
              ...TicketCard
            }
          }
        }
      }
    `,
    query
  )

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasNext && !isLoadingNext) loadNext(10)
  }, [inView, hasNext, isLoadingNext, loadNext])

  const tickets = data.myTickets.edges.map(e => e.node)
  const open = tickets.filter(t => OPEN_STATUSES.has(t.status))
  const settled = tickets.filter(t => !OPEN_STATUSES.has(t.status))

  const refreshAll = () => refetch({}, { fetchPolicy: 'network-only' })

  if (tickets.length === 0) return <EmptyTickets />

  return (
    <div className='space-y-6 px-5 py-4'>
      {open.length > 0 && (
        <section>
          <h3 className='text-secondary mb-2 text-xs font-semibold tracking-wider uppercase'>
            Open ({open.length})
          </h3>
          <div className='space-y-3'>
            {open.map(t => (
              <TicketCard key={t.id} ticket={t} action={refreshAll} />
            ))}
          </div>
        </section>
      )}

      {settled.length > 0 && (
        <section>
          <h3 className='text-secondary mb-2 text-xs font-semibold tracking-wider uppercase'>
            Recent
          </h3>
          <div className='space-y-3'>
            {settled.map(t => (
              <TicketCard key={t.id} ticket={t} />
            ))}
          </div>
        </section>
      )}

      {hasNext && (
        <div ref={ref} className='text-secondary flex items-center justify-center py-2 text-xs'>
          {isLoadingNext && <Loader2Icon className='size-4 animate-spin' />}
        </div>
      )}
    </div>
  )
}

function EmptyTickets() {
  return (
    <div className='text-secondary flex h-96.25 flex-col items-center justify-center gap-3 px-6 text-center'>
      <div className='bg-dark flex size-14 items-center justify-center rounded-full border border-white/5'>
        <PiTicket className='size-6 opacity-40' />
      </div>
      <p className='text-sm'>No tickets yet</p>
      <p className='max-w-50 text-xs opacity-60'>
        Bets you place will show up here, open ones first.
      </p>
    </div>
  )
}

function MyTicketsSkeleton() {
  return (
    <div className='space-y-3 px-5 py-4'>
      <TicketCardSkeleton />
      <TicketCardSkeleton />
      <TicketCardSkeleton />
    </div>
  )
}

// Referenced so bundlers don't tree-shake the Skeleton import if unused elsewhere.
void Skeleton
