'use client'

import { useAtomValue } from 'jotai'
import { usePathname } from 'next/navigation'
import { Suspense, startTransition, useEffect, useMemo, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  fetchQuery,
  graphql,
  requestSubscription,
  useQueryLoader,
  useRelayEnvironment,
} from 'react-relay'
import type {
  BetslipSubscription,
  BetslipSubscription$data,
} from '@/app/sport/__generated__/BetslipSubscription.graphql'
import type { PrematchLayoutQuery } from '@/app/sport/__generated__/PrematchLayoutQuery.graphql'
import PrematchLayoutQueryNode from '@/app/sport/__generated__/PrematchLayoutQuery.graphql'
import EventSidebar, { EventSidebarSkeleton } from '@/app/sport/event/[id]/event-sidebar'
import Sidebar, { SidebarSkeleton } from '@/app/sport/sidebar'
import Betslip, { BetslipDrawer, BetslipMobileBar } from '@/components/betslip'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { betslipInputAtom } from '@/context/betslip'
import { cn } from '@/lib/utils'

const betslipSubscription = graphql`
  subscription BetslipSubscription($input: BetslipQuoteInput!) {
    betslipUpdated(input: $input) {
      ...Betslip
      ...BetslipMobileBar
    }
  }
`

export default function SportLayout({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const eventId = useMemo(() => {
    const match = pathname.match(/^\/sport\/event\/([^/]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }, [pathname])

  // One query for the whole route. The sports tree is always included;
  // the event sidebar only when we're on an event page.
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchLayoutQuery>(graphql`
    query PrematchLayoutQuery($hasEvent: Boolean!, $eventId: ID = "") {
      ...Sidebar
      ...EventSidebar @include(if: $hasEvent) @alias(as: "eventSidebar")
    }
  `)

  const variables = useMemo(
    () => (eventId ? { hasEvent: true, eventId } : { hasEvent: false }),
    [eventId]
  )

  // In a transition so switching events keeps the old sidebar on screen
  // (instead of the skeleton) until the new data lands.
  useEffect(() => {
    startTransition(() => {
      loadQuery(variables, { fetchPolicy: 'store-or-network' })
    })
  }, [loadQuery, variables])

  useEffect(() => () => disposeQuery(), [disposeQuery])

  const environment = useRelayEnvironment()
  useEffect(() => {
    const id = window.setInterval(
      () =>
        fetchQuery(environment, PrematchLayoutQueryNode, variables, {
          fetchPolicy: 'network-only',
        }).subscribe({
          error: (err: Error) => console.error('[prematch-layout] poll failed', err),
        }),
      60_000
    )
    return () => clearInterval(id)
  }, [environment, variables])

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
      subscription: betslipSubscription,
      variables: { input: betslipInput },
      onNext: response => setBetslip(response?.betslipUpdated ?? null),
      onError: (err: Error) => console.error('[betslip] subscription failed', err),
    })

    return dispose
  }, [environment, betslipInput])

  return (
    <div
      className={cn(
        'z-1 mx-auto grid min-h-screen w-full max-w-480 gap-8 px-4 py-6 pb-24 sm:px-6 lg:px-8',
        // md and below: single column (sidebar renders as a sticky topbar, out of grid flow)
        // lg: narrow collapsible strip + content
        // xl+: full sidebar + content + betslip aside
        'grid-cols-1',
        eventId
          ? 'xl:grid-cols-[16rem_minmax(auto,1fr)_20rem]'
          : 'lg:grid-cols-[4rem_minmax(auto,1fr)] xl:grid-cols-[16rem_minmax(auto,1fr)_20rem]'
      )}
    >
      <Suspense fallback={eventId ? <EventSidebarSkeleton /> : <SidebarSkeleton />}>
        {eventId ? (
          // the ref can lag a render behind the URL; until it carries the
          // event fragment, useFragment would hit a skipped spread
          queryRef?.variables.hasEvent ? (
            <ErrorBoundary FallbackComponent={SectionErrorFallback}>
              <EventSidebar queryRef={queryRef} eventId={eventId} />
            </ErrorBoundary>
          ) : (
            <EventSidebarSkeleton />
          )
        ) : queryRef ? (
          <Sidebar queryRef={queryRef} />
        ) : (
          <SidebarSkeleton />
        )}
      </Suspense>

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
