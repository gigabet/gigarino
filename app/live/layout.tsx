'use client'

import { useAtomValue } from 'jotai'
import { usePathname } from 'next/navigation'
import { Suspense, startTransition, useEffect, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { graphql, useQueryLoader } from 'react-relay'
import type { LiveLayoutQuery } from '@/app/live/__generated__/LiveLayoutQuery.graphql'
import LiveEventSidebar, {
  LiveEventSidebarSkeleton,
} from '@/app/live/event/[id]/live-event-sidebar'
import LiveHeader, { LiveHeaderSkeleton } from '@/app/live/live-header'
import { liveSortState, liveSportFilterState, ORDER } from '@/app/live/live-state'
import { LiveSubscriptionsProvider } from '@/app/live/live-subscriptions'
import { RefetchBatcherProvider } from '@/app/live/refetch-context'
import Betslip, { BetslipDrawer, BetslipMobileBar } from '@/components/betslip'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { useBetslipQuote } from '@/context/providers'
import { cn } from '@/lib/utils'

export default function LiveLayout({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const eventId = useMemo(() => {
    const match = pathname.match(/^\/live\/event\/([^/]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }, [pathname])

  const sort = useAtomValue(liveSortState)
  const sportFilter = useAtomValue(liveSportFilterState)

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveLayoutQuery>(graphql`
    query LiveLayoutQuery($orderBy: LiveEventOrder!, $sport: String) {
      ...LiveHeader
      ...LiveEventSidebar @arguments(orderBy: $orderBy, sport: $sport)
    }
  `)

  useEffect(() => {
    startTransition(() => {
      loadQuery({ orderBy: ORDER[sort], sport: sportFilter }, { fetchPolicy: 'store-or-network' })
    })
  }, [loadQuery, sort, sportFilter])
  useEffect(() => () => disposeQuery(), [disposeQuery])

  const betslip = useBetslipQuote()

  return (
    <LiveSubscriptionsProvider>
      <RefetchBatcherProvider>
        <div className='z-1 mx-auto min-h-screen w-full max-w-480 px-4 py-6 pb-24 sm:px-6 lg:px-8'>
          <div
            className={cn(
              'grid grid-cols-1 gap-8',
              eventId
                ? 'xl:grid-cols-[16rem_minmax(auto,1fr)_20rem]'
                : 'xl:grid-cols-[minmax(auto,1fr)_20rem]'
            )}
          >
            {eventId && (
              <ErrorBoundary FallbackComponent={SectionErrorFallback}>
                <Suspense fallback={<LiveEventSidebarSkeleton />}>
                  {queryRef ? (
                    <LiveEventSidebar queryRef={queryRef} eventId={eventId} />
                  ) : (
                    <LiveEventSidebarSkeleton />
                  )}
                </Suspense>
              </ErrorBoundary>
            )}

            <div className='flex min-w-0 flex-col gap-4'>
              <ErrorBoundary FallbackComponent={SectionErrorFallback}>
                <Suspense fallback={<LiveHeaderSkeleton />}>
                  {queryRef ? (
                    <LiveHeader queryRef={queryRef} eventId={eventId} />
                  ) : (
                    <LiveHeaderSkeleton />
                  )}
                </Suspense>
              </ErrorBoundary>
              {children}
            </div>

            <div className='sticky top-26.25 hidden self-start xl:flex'>
              <ErrorBoundary FallbackComponent={SectionErrorFallback}>
                <Betslip query={betslip} />
              </ErrorBoundary>
            </div>
            <div className='xl:hidden'>
              <BetslipMobileBar query={betslip} />
              <BetslipDrawer query={betslip} />
            </div>
          </div>
        </div>
      </RefetchBatcherProvider>
    </LiveSubscriptionsProvider>
  )
}
