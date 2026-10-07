'use client'

import { useAtomValue } from 'jotai'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { graphql, requestSubscription, useQueryLoader, useRelayEnvironment } from 'react-relay'
import type { LiveLayoutQuery } from '@/app/live/__generated__/LiveLayoutQuery.graphql'
import LiveEventSidebar, {
  LiveEventSidebarSkeleton,
} from '@/app/live/event/[id]/live-event-sidebar'
import LiveHeader, { LiveHeaderSkeleton } from '@/app/live/live-header'
import { LiveSubscriptionsProvider } from '@/app/live/live-subscriptions'
import { RefetchBatcherProvider } from '@/app/live/refetch-context'
import BetslipSubscriptionNode, {
  type BetslipSubscription,
  type BetslipSubscription$data,
} from '@/app/sport/__generated__/BetslipSubscription.graphql'
import Betslip, { BetslipDrawer, BetslipMobileBar } from '@/components/betslip'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { betslipInputAtom } from '@/context/betslip'
import { cn } from '@/lib/utils'

export default function LiveLayout({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const eventId = useMemo(() => {
    const match = pathname.match(/^\/live\/event\/([^/]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }, [pathname])

  const environment = useRelayEnvironment()

  const betslipInput = useAtomValue(betslipInputAtom)
  const [betslip, setBetslip] = useState<BetslipSubscription$data['betslipUpdated'] | null>(null)

  useEffect(() => {
    if (betslipInput.items.length === 0) {
      setBetslip(null)
      return
    }

    const { dispose } = requestSubscription<BetslipSubscription>(environment, {
      subscription: BetslipSubscriptionNode,
      variables: { input: betslipInput },
      onNext: response => setBetslip(response?.betslipUpdated ?? null),
      onError: (err: Error) => console.error('[betslip] subscription failed', err),
    })

    return dispose
  }, [environment, betslipInput])

  // One query for the whole route. Header and sidebar read their own fragments from it.
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveLayoutQuery>(graphql`
    query LiveLayoutQuery {
      ...LiveHeader
      ...LiveEventSidebar
    }
  `)

  useEffect(() => {
    loadQuery({}, { fetchPolicy: 'store-and-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery])

  return (
    <LiveSubscriptionsProvider>
      <RefetchBatcherProvider>
        <div className='z-1 mx-auto min-h-screen w-full max-w-480 px-4 py-6 pb-24 sm:px-6 lg:px-8'>
          <div
            className={cn(
              'grid grid-cols-1 gap-8',
              eventId
                ? 'xl:grid-cols-[16rem_minmax(auto,1fr)_20rem]'
                : 'md:grid-cols-[minmax(auto,1fr)_20rem]'
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
