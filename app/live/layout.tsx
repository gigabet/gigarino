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
import Betslip, { BetslipDrawer, BetslipMobileBar } from '@/components/betslip'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { betslipInputAtom } from '@/context/betslip'

export default function LiveLayout({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const eventId = useMemo(() => {
    const match = pathname.match(/^\/sport\/event\/([^/]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }, [pathname])

  const environment = useRelayEnvironment()

  // subscription returns full BetslipQuote immediately on init,
  // so there's no separate preloaded query
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
    <div className='z-1 mx-auto grid min-h-screen w-full max-w-480 grid-cols-1 gap-8 px-4 py-6 pb-24 sm:px-6 md:grid-cols-[minmax(auto,1fr)_20rem] lg:px-8'>
      {children}
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
  )
}
