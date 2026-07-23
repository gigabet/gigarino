'use client'

import { useSetAtom } from 'jotai'
import { Suspense, useEffect } from 'react'
import { fetchQuery, graphql, useQueryLoader, useRelayEnvironment } from 'react-relay'
import type { PrematchLayoutQuery } from '@/app/sport/__generated__/PrematchLayoutQuery.graphql'
import PrematchLayoutQueryNode from '@/app/sport/__generated__/PrematchLayoutQuery.graphql'
import Sidebar, { SidebarSkeleton } from '@/app/sport/sidebar'
import Betslip, { betslipSelectionsAtom } from '@/components/betslip'
import { mockBetslipSelections } from '@/components/mock.betslip'
import { cn } from '@/lib/utils'

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
    const id = window.setInterval(() => {
      fetchQuery(
        environment,
        PrematchLayoutQueryNode,
        {},
        { fetchPolicy: 'network-only' }
      ).subscribe({
        error: (err: Error) => console.error('[prematch-layout] poll failed', err),
      })
    }, 3 * 60_000)
    return () => clearInterval(id)
  }, [environment])

  const setSelections = useSetAtom(betslipSelectionsAtom)

  useEffect(() => {
    setSelections(mockBetslipSelections)
  }, [setSelections])

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
      {/* carousel, league pills, event list */}
      {/* (implicit suspense boundary, filled by loading.tsx) */}
      {children}
      <div className='hidden xl:flex'>
        <Betslip />
      </div>
    </div>
  )
}
