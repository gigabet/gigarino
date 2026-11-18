'use client'

import { format } from 'date-fns'
import { useAtomValue } from 'jotai'
import { Loader2Icon, XIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { VisuallyHidden } from 'radix-ui'
import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { PiTicket } from 'react-icons/pi'
import { useInView } from 'react-intersection-observer'
import {
  graphql,
  type PreloadedQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay'
import { Drawer } from 'vaul'
import TicketRow, { TICKET_GRID } from '@/app/user/tickets/ticket-row'
import { CountBadge } from '@/components/count-badge'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import {
  betTypeLabel,
  TicketCardDetails,
  TicketStatusPill,
  useAcknowledgeCorrections,
} from '@/components/ticket-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useMediaQuery, useScrollFade } from '@/context/hooks'
import { useT, useUser } from '@/context/providers'
import { RailPortal } from '@/context/rail'
import { unseenResettlementsAtom } from '@/context/tickets'
import { tKey } from '@/i18n/tKey'
import { cn, formatBalance, isAuthError } from '@/lib/utils'
import type { TicketHistoryDetails$key } from '@/relay/__generated__/TicketHistoryDetails.graphql'
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
const isFilter = (value: string | null): value is Filter => FILTER_KEYS.some(key => key === value)

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
              ...TicketHistoryDetails
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

  // `open` is separate from `id` so the drawer can slide out while still showing its ticket
  const [selection, setSelection] = useState<{ id: string; open: boolean } | null>(null)
  const isXl = useMediaQuery('(min-width: 1280px)')
  const isWiderThanMobile = useMediaQuery('(min-width: 640px)')

  const tickets = data.myTickets?.edges.map(e => e.node) ?? []
  const visible = tickets.filter(FILTERS[props.filter].match)
  const refreshAll = () => refetch({}, { fetchPolicy: 'network-only' })

  const select = (id: string) =>
    setSelection(cur => (cur?.id === id && cur.open ? { id, open: false } : { id, open: true }))
  const close = () => setSelection(cur => cur && { ...cur, open: false })

  // a ticket the current filter hides is no longer selected
  const shown = visible.find(ticket => ticket.id === selection?.id) ?? null
  const selectedId = selection?.open ? (shown?.id ?? null) : null

  return (
    <>
      {visible.length > 0 && (
        <div className='@container flex flex-col gap-2'>
          <div
            className={cn(
              TICKET_GRID,
              'text-secondary hidden px-4.25 pb-1 text-[0.65rem] font-semibold tracking-wider uppercase @4xl:grid'
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
          {visible.map(ticket => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              selected={ticket.id === selectedId}
              onSelect={() => select(ticket.id)}
            />
          ))}
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

      {/* xl: a side rail that scrolls on its own. Below that the same panel slides in as a
          drawer (bottom sheet on phones), so only one of the two is ever mounted. */}
      {isXl ? (
        <RailPortal>
          {shown && selectedId ? (
            <TicketDetailsPanel
              key={shown.id}
              ticket={shown}
              onClose={close}
              onCashedOut={refreshAll}
            />
          ) : (
            <NoTicketSelected />
          )}
        </RailPortal>
      ) : (
        <Drawer.Root
          open={selection?.open ?? false}
          onOpenChange={open => {
            if (!open) close()
          }}
          // unmount the ticket only once the exit animation is done, unless another was picked
          onAnimationEnd={open => {
            if (!open) setSelection(cur => (cur?.open ? cur : null))
          }}
          direction={isWiderThanMobile ? 'right' : 'bottom'}
        >
          <Drawer.Portal>
            <Drawer.Overlay className='fixed inset-0 z-50 bg-black/50' />
            <Drawer.Content
              className={cn(
                'bg-dark-200 fixed z-50 flex flex-col outline-none',
                isWiderThanMobile
                  ? 'inset-y-0 right-0 h-full w-full max-w-sm'
                  : 'inset-x-0 bottom-0 max-h-[85dvh]'
              )}
              aria-describedby={undefined}
            >
              <VisuallyHidden.Root>
                <Drawer.Title>{t('Ticket details')}</Drawer.Title>
              </VisuallyHidden.Root>
              {!isWiderThanMobile && (
                <div className='mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-white/20' />
              )}
              {shown && (
                <TicketDetailsPanel
                  key={shown.id}
                  ticket={shown}
                  onClose={close}
                  onCashedOut={refreshAll}
                />
              )}
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  )
}

/** Header, then the details in their own scroll area, so long tickets never push the header away. */
function TicketDetailsPanel(props: {
  ticket: TicketHistoryDetails$key
  onClose: () => void
  onCashedOut: () => void
}) {
  const data = useFragment(
    graphql`
      fragment TicketHistoryDetails on Ticket {
        id
        betType
        status
        stake
        currency
        createdAt
        resettled
        resettlementSeen
        items {
          # eslint-disable-next-line relay/unused-fields
          id
        }
        ...TicketCardDetails
      }
    `,
    props.ticket
  )

  const t = useT()
  // the panel only exists while the player is looking at this ticket
  useAcknowledgeCorrections(data, true)

  return (
    <div className='flex h-full min-h-0 flex-1 flex-col'>
      <div className='flex shrink-0 items-start justify-between gap-3 border-b border-white/5 px-4 py-3'>
        <div className='min-w-0 space-y-1'>
          <div className='flex items-center gap-2'>
            <TicketStatusPill status={data.status} />
            <span className='text-secondary text-xs'>
              {betTypeLabel(t, data.betType, data.items.length)}
            </span>
          </div>
          <p className='text-secondary text-[0.7rem]'>
            {t('Placed')} {format(new Date(data.createdAt), 'dd MMM, HH:mm')} · {t('Stake')}{' '}
            <span className='font-mono text-white/80'>
              {formatBalance(Number(data.stake), data.currency)}
            </span>
          </p>
        </div>
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          className='rounded-full'
          aria-label={t('Close')}
          onClick={props.onClose}
        >
          <XIcon className='size-4' />
        </Button>
      </div>
      <div className='min-h-0 flex-1 overflow-y-auto px-4 py-2'>
        <TicketCardDetails ticket={data} onCashedOutAction={props.onCashedOut} />
      </div>
    </div>
  )
}

function NoTicketSelected() {
  const t = useT()

  return (
    <div className='text-secondary flex h-full flex-col items-center justify-center gap-3 px-6 text-center'>
      <div className='bg-dark flex size-14 items-center justify-center rounded-full border border-white/5'>
        <PiTicket className='size-6 opacity-40' />
      </div>
      <p className='text-sm'>{t('Select a ticket')}</p>
      <p className='max-w-50 text-xs opacity-60'>
        {t('Its selections, score and payout show up here.')}
      </p>
    </div>
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
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: identical
        <div key={i} className='rounded-xl border border-white/5 bg-black/20 p-4'>
          <Skeleton className='h-9 w-full' />
        </div>
      ))}
    </div>
  )
}
