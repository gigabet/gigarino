'use client'

import { useAtomValue } from 'jotai'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { requestSubscription, useRelayEnvironment } from 'react-relay'
import BetslipSubscriptionNode, {
  type BetslipSubscription,
  type BetslipSubscription$data,
} from '@/app/sport/__generated__/BetslipSubscription.graphql'
import LiveEventSidebar from '@/app/live/event/[id]/live-event-sidebar'
import LiveHeader from '@/app/live/live-header'
import { LiveSubscriptionsProvider } from '@/app/live/live-subscriptions'
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

  return (
    <LiveSubscriptionsProvider>
      <div className='z-1 mx-auto min-h-screen w-full max-w-480 px-4 py-6 pb-24 sm:px-6 lg:px-8'>
        <div
          className={cn(
            'grid grid-cols-1 gap-8',
            eventId
              ? 'xl:grid-cols-[16rem_minmax(auto,1fr)_20rem]'
              : 'md:grid-cols-[minmax(auto,1fr)_20rem]'
          )}
        >
          {eventId && <LiveEventSidebar eventId={eventId} />}

          <div className='flex min-w-0 flex-col gap-4'>
            <LiveHeader eventId={eventId} />
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
    </LiveSubscriptionsProvider>
  )
}
