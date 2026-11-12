'use client'

import { useAtomValue } from 'jotai'
import { Loader2Icon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { PiTicket } from 'react-icons/pi'
import { useInView } from 'react-intersection-observer'
import {
  graphql,
  type PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay'
import TicketRow, { TICKET_GRID } from '@/app/user/tickets/ticket-row'
import { CountBadge } from '@/components/count-badge'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { Skeleton } from '@/components/ui/skeleton'
import { useScrollFade } from '@/context/hooks'
import { useT, useUser } from '@/context/providers'
import { unseenResettlementsAtom } from '@/context/tickets'
import { tKey } from '@/i18n/tKey'
import { cn, isAuthError } from '@/lib/utils'
import type { TicketHistoryList$key } from '@/relay/__generated__/TicketHistoryList.graphql'
import type { TicketHistoryListPaginationQuery } from '@/relay/__generated__/TicketHistoryListPaginationQuery.graphql'
import type { TicketHistoryQuery } from '@/relay/__generated__/TicketHistoryQuery.graphql'

const PAGE_SIZE = 20

const ticketHistoryQuery = graphql`
  query TicketHistoryQuery {
    ...TicketHistoryList
  }
`

type Match = (ticket: { status: string; resettled: boolean }) => boolean

const byStatus =
  (...statuses: string[]): Match =>
  ticket =>
    statuses.includes(ticket.status)

// A partially cashed out ticket is still running, so it shows under both Open and Cashed out.
const FILTERS = {
  all: { label: tKey('All'), match: () => true },
  open: {
    label: tKey('Open'),
    match: byStatus('PENDING_ACCEPTANCE', 'ACCEPTED', 'PARTIALLY_CASHED_OUT', 'CASHOUT_PENDING'),
  },
  won: { label: tKey('Won'), match: byStatus('WON') },
  lost: { label: tKey('Lost'), match: byStatus('LOST') },
  cashed_out: {
    label: tKey('Cashed Out'),
    match: byStatus('CASHED_OUT', 'PARTIALLY_CASHED_OUT'),
  },
  void: { label: tKey('Void'), match: byStatus('VOID', 'REJECTED') },
  corrected: { label: tKey('Corrected'), match: ticket => ticket.resettled },
} satisfies Record<string, { label: string; match: Match }>

type Filter = keyof typeof FILTERS

const FILTER_KEYS = Object.keys(FILTERS) as Filter[]
const isFilter = (value: string | null): value is Filter =>
  FILTER_KEYS.some(key => key === value)

export default function TicketHistory() {
  const searchParams = useSearchParams()
  const t = useT()
  const unseen = useAtomValue(unseenResettlementsAtom)
  const fade = useScrollFade()

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<TicketHistoryQuery>(ticketHistoryQuery)

  // store-and-network: reopening the page shows what is cached and refreshes it
  useEffect(() => {
    loadQuery({}, { fetchPolicy: 'store-and-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery])

  const raw = searchParams.get('status')
  const filter: Filter = isFilter(raw) ? raw : 'all'

  // History API instead of router.replace: Next keeps useSearchParams in sync
  // without a server round trip, so switching filters is instant.
  const select = (next: Filter) => {
    const params = new URLSearchParams(searchParams)
    if (next === 'all') params.delete('status')
    else params.set('status', next)
    const query = params.toString()
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div ref={fade.ref} style={fade.style} className='flex scrollbar-none gap-2 overflow-x-auto'>
        {FILTER_KEYS.map(key => (
          <button
            key={key}
            type='button'
            aria-pressed={filter === key}
            onClick={() => select(key)}
            className={cn(
              'border-control-border flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors',
              filter === key
                ? 'bg-primary border-primary text-black'
                : 'bg-white/10 text-white hover:bg-white/15'
            )}
          >
            {t(FILTERS[key].label)}
            {/* the server counts every unseen correction, not just the loaded pages */}
            {key === 'corrected' && <CountBadge count={unseen} />}
          </button>
        ))}
      </div>

      <ErrorBoundary FallbackComponent={TicketHistoryErrorFallback}>
        <Suspense fallback={<TicketHistorySkeleton />}>
          {queryRef ? (
            <TicketHistoryContent queryRef={queryRef} filter={filter} />
          ) : (
            <TicketHistorySkeleton />
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

function TicketHistoryContent(props: {
  queryRef: PreloadedQuery<TicketHistoryQuery>
  filter: Filter
}) {
  const query = usePreloadedQuery<TicketHistoryQuery>(ticketHistoryQuery, props.queryRef)

  const { data, loadNext, hasNext, isLoadingNext, refetch } = usePaginationFragment<
    TicketHistoryListPaginationQuery,
    TicketHistoryList$key
  >(
    graphql`
      fragment TicketHistoryList on Query
      @refetchable(queryName: "TicketHistoryListPaginationQuery")
      @argumentDefinitions(first: { type: "Int", defaultValue: 20 }, after: { type: "String" }) {
        myTickets(first: $first, after: $after) @connection(key: "TicketHistoryList_myTickets") {
          edges {
            node {
              id
              status
              resettled
              ...TicketRow
            }
          }
        }
      }
    `,
    query
  )

  // The API has no status argument yet, so filters apply to the pages loaded so far.
  // While a filter has no matches the sentinel stays on screen, which keeps loading older
  // pages until something matches or the history ends.
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasNext && !isLoadingNext) loadNext(PAGE_SIZE)
  }, [inView, hasNext, isLoadingNext, loadNext])

  const t = useT()

  const tickets = data.myTickets?.edges.map(e => e.node) ?? []
  const visible = tickets.filter(FILTERS[props.filter].match)
  const refreshAll = () => refetch({}, { fetchPolicy: 'network-only' })

  return (
    <>
      {visible.length > 0 && (
        <div className='overflow-hidden rounded-2xl border border-white/5 bg-black/20'>
          <div
            className={cn(
              TICKET_GRID,
              'text-secondary hidden border-b border-white/5 px-4 py-2.5 text-[0.65rem] font-semibold tracking-wider uppercase md:grid'
            )}
          >
            <span>{t('Status')}</span>
            <span>{t('Placed')}</span>
            <span>{t('Bet')}</span>
            <span className='text-right'>{t('Stake')}</span>
            <span className='text-right'>{t('Odds')}</span>
            <span className='text-right'>{t('Return')}</span>
            <span />
          </div>
          <div className='divide-y divide-white/5'>
            {visible.map(ticket => (
              <TicketRow key={ticket.id} ticket={ticket} onCashedOut={refreshAll} />
            ))}
          </div>
        </div>
      )}

      {hasNext && (
        <div
          ref={ref}
          className='text-secondary flex items-center justify-center gap-2 py-4 text-xs'
        >
          <Loader2Icon className='size-4 animate-spin' />
          {visible.length === 0 && t('Searching older tickets...')}
        </div>
      )}

      {visible.length === 0 && !hasNext && <EmptyHistory filtered={props.filter !== 'all'} />}
    </>
  )
}

/** Past the first render an auth error means the session expired: send the player to log in. */
function TicketHistoryErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter()
  const { clearUser } = useUser()
  const authError = isAuthError(error)

  useEffect(() => {
    if (!authError) return
    clearUser()
    router.replace('/login?from=/user/tickets')
  }, [authError, clearUser, router])

  if (authError) return null

  return <SectionErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
}

function EmptyHistory(props: { filtered: boolean }) {
  const t = useT()

  return (
    <div className='text-secondary flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-6 py-16 text-center'>
      <div className='bg-dark flex size-14 items-center justify-center rounded-full border border-white/5'>
        <PiTicket className='size-6 opacity-40' />
      </div>
      <p className='text-sm'>
        {props.filtered ? t('No tickets match this filter') : t('No tickets yet')}
      </p>
      {!props.filtered && (
        <p className='max-w-xs text-xs opacity-60'>
          {t('Bets you place will show up here, open ones first.')}
        </p>
      )}
    </div>
  )
}

function TicketHistorySkeleton() {
  return (
    <div className='divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/5 bg-black/20'>
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: identical
        <div key={i} className='p-4'>
          <Skeleton className='h-9 w-full' />
        </div>
      ))}
    </div>
  )
}
