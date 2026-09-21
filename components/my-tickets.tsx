'use client'

import { Loader2Icon, LockKeyholeIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { PiTicket } from 'react-icons/pi'
import { useInView } from 'react-intersection-observer'
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import type { MyTicketsList$key } from '@/components/__generated__/MyTicketsList.graphql'
import type { MyTicketsListPaginationQuery } from '@/components/__generated__/MyTicketsListPaginationQuery.graphql'
import type { MyTicketsQuery } from '@/components/__generated__/MyTicketsQuery.graphql'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import TicketCard, { TicketCardSkeleton } from '@/components/ticket-card'
import { buttonVariants } from '@/components/ui/button'
import { useT, useUser } from '@/context/providers'
import { isAuthError } from '@/lib/utils'

const OPEN_STATUSES = new Set(['PENDING_ACCEPTANCE', 'ACCEPTED', 'PARTIALLY_CASHED_OUT'])

export default function MyTickets() {
  const { user } = useUser()

  return (
    <div className='scrollbar-hide flex-1 overflow-y-auto'>
      {!user ? (
        <LoggedOutTickets />
      ) : (
        <ErrorBoundary FallbackComponent={MyTicketsErrorFallback}>
          <Suspense fallback={<MyTicketsSkeleton />}>
            <MyTicketsContent />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}

/**
 * Catches errors thrown while `MyTicketsContent` is mounted — most notably
 * a session that expired *after* the tab was already open (initial mount
 * succeeded, a later refetch/paginate/cashout didn't). An auth error here
 * means the client's belief that it's logged in is now wrong, so we correct
 * it via `clearUser()` and show the same sign-in prompt as the logged-out
 * state, instead of a generic "Retry" that would just fail the same way
 * again.
 */
function MyTicketsErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { clearUser } = useUser()

  useEffect(() => {
    // Log unconditionally — we need to see the *actual* error text before
    // trusting any heuristic about what kind of failure this is.
    console.error('[my-tickets]', error)
    if (isAuthError(error)) clearUser()
  }, [error, clearUser])

  if (isAuthError(error)) return <LoggedOutTickets />

  return <SectionErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
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

  const t = useT()
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
            {t('Open ({n})', { n: open.length })}
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
            {t('Recent')}
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

function FakeTicketRow(props: { status: 'Open' | 'Won' | 'Lost'; combi?: boolean }) {
  const t = useT()
  const meta =
    props.status === 'Open'
      ? { label: t('Open'), className: 'bg-sky-500/10 text-sky-400' }
      : props.status === 'Won'
        ? { label: t('Won'), className: 'bg-primary/10 text-primary' }
        : { label: t('Lost'), className: 'bg-red-500/10 text-red-400' }

  return (
    <div className='rounded-xl border border-white/5 bg-black/20 p-3'>
      <div className='flex w-full items-center justify-between gap-3'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase ${meta.className}`}
            >
              {meta.label}
            </span>
            <span className='text-secondary text-xs'>
              {props.combi ? t('{n}-fold Combi', { n: 3 }) : t('Single')}
            </span>
          </div>
          <p className='text-secondary mt-1 truncate text-xs'>Team A vs Team B</p>
        </div>
        <div className='flex shrink-0 flex-col items-end'>
          <span className='font-mono text-sm font-semibold text-white'>€25.00</span>
          <span className='text-secondary text-[0.65rem]'>{t('Today, 18:30')}</span>
        </div>
      </div>
    </div>
  )
}

function LoggedOutTickets() {
  const t = useT()
  return (
    <div className='relative min-h-96.25'>
      <div aria-hidden className='pointer-events-none space-y-6 px-5 py-4 blur-sm select-none'>
        <section>
          <h3 className='text-secondary mb-2 text-xs font-semibold tracking-wider uppercase'>
            {t('Open ({n})', { n: 2 })}
          </h3>
          <div className='space-y-3'>
            <FakeTicketRow status='Open' combi />
            <FakeTicketRow status='Open' />
          </div>
        </section>
        <section>
          <h3 className='text-secondary mb-2 text-xs font-semibold tracking-wider uppercase'>
            {t('Recent')}
          </h3>
          <div className='space-y-3'>
            <FakeTicketRow status='Won' />
            <FakeTicketRow status='Lost' combi />
          </div>
        </section>
      </div>

      <div className='bg-dark-200/70 absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center backdrop-blur-[1px]'>
        <div className='bg-dark flex size-14 items-center justify-center rounded-full border border-white/10'>
          <LockKeyholeIcon className='text-secondary size-6' />
        </div>
        <div>
          <p className='font-semibold text-white'>{t('Sign in to view your tickets')}</p>
          <p className='text-secondary mt-1 max-w-56 text-xs'>
            {t("Track your open bets and betting history once you're logged in.")}
          </p>
        </div>
        <Link href={{ pathname: '/login', query: { from: '/sport' } }} className={buttonVariants()}>
          {t('Log in')}
        </Link>
      </div>
    </div>
  )
}

function EmptyTickets() {
  const t = useT()
  return (
    <div className='text-secondary flex h-96.25 flex-col items-center justify-center gap-3 px-6 text-center'>
      <div className='bg-dark flex size-14 items-center justify-center rounded-full border border-white/5'>
        <PiTicket className='size-6 opacity-40' />
      </div>
      <p className='text-sm'>{t('No tickets yet')}</p>
      <p className='max-w-50 text-xs opacity-60'>
        {t('Bets you place will show up here, open ones first.')}
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
