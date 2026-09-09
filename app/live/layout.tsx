// app/live/layout.tsx
'use client'

import Betslip, { BetslipDrawer, BetslipMobileBar } from '@/components/betslip'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { useBetslipSubscription } from '@/context/betslip'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from 'react-error-boundary'

export default function LiveLayout({ children }: React.PropsWithChildren) {
  const betslip = useBetslipSubscription()

  return (
    <div
      className={cn(
        'z-1 mx-auto grid min-h-screen w-full max-w-480 gap-8 px-4 py-6 pb-24 sm:px-6 lg:px-8',
        'grid-cols-1 xl:grid-cols-[minmax(auto,1fr)_20rem]'
      )}
    >
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
