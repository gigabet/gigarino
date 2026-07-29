'use client'

import { useAtomValue } from 'jotai'
import { Suspense, useEffect, useMemo, useState } from 'react'
import {
  fetchQuery,
  graphql,
  requestSubscription,
  useQueryLoader,
  useRelayEnvironment,
  useSubscription,
} from 'react-relay'
import type { GraphQLSubscriptionConfig } from 'relay-runtime'
import type {
  BetslipSubscription,
  BetslipSubscription$data,
} from '@/app/sport/__generated__/BetslipSubscription.graphql'
import type { PrematchLayoutQuery } from '@/app/sport/__generated__/PrematchLayoutQuery.graphql'
import PrematchLayoutQueryNode from '@/app/sport/__generated__/PrematchLayoutQuery.graphql'
import Sidebar, { SidebarSkeleton } from '@/app/sport/sidebar'
import Betslip, { BetslipMobileBar } from '@/components/betslip'
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
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchLayoutQuery>(graphql`
    query PrematchLayoutQuery {
      ...Sidebar
    }
  `)

  useEffect(() => {
    loadQuery({}, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery])

  const environment = useRelayEnvironment()
  useEffect(() => {
    fetchQuery(
      environment,
      PrematchLayoutQueryNode,
      {},
      { fetchPolicy: 'network-only', networkCacheConfig: { poll: 3 * 60_000 } }
    ).subscribe({
      error: (err: Error) => console.error('[prematch-layout] poll failed', err),
    })
  }, [environment])

  // The subscription emits the full BetslipQuote immediately on init, so
  // there's no separate preloaded query to keep in sync — this is the only
  // fetch driving the betslip.
  const betslipInput = useAtomValue(betslipInputAtom)
  const [betslip, setBetslip] = useState<BetslipSubscription$data['betslipUpdated'] | null>(null)

  const config: GraphQLSubscriptionConfig<BetslipSubscription> = useMemo(
    () => ({
      subscription: betslipSubscription,
      variables: { input: betslipInput },
      onNext: response => setBetslip(response?.betslipUpdated ?? null),
      onError: (err: Error) => console.error('[betslip] subscription failed', err),
    }),
    [betslipInput]
  )
  useSubscription(config)

  return (
    <div
      className={cn(
        'z-1 mx-auto grid min-h-screen w-full max-w-480 gap-8 px-4 py-6 pb-24 sm:px-6 lg:px-8',
        'grid-cols-1 lg:grid-cols-[4rem_minmax(auto,1fr)] xl:grid-cols-[16rem_minmax(auto,1fr)] 2xl:grid-cols-[16rem_minmax(auto,1fr)_20rem]'
      )}
    >
      <Suspense fallback={<SidebarSkeleton />}>
        {queryRef ? <Sidebar queryRef={queryRef} /> : <SidebarSkeleton />}
      </Suspense>
      {children}
      <div className='hidden xl:flex'>
        <Betslip query={betslip} />
      </div>
      <BetslipMobileBar query={betslip} />
    </div>
  )
}
