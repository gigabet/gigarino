'use client'

import { Suspense, useEffect } from 'react'
import { graphql, useQueryLoader } from 'react-relay'
import type { PrematchLayoutQuery } from '@/app/sport/__generated__/PrematchLayoutQuery.graphql'
import Sidebar, { SidebarSkeleton } from '@/app/sport/sidebar'
import Betslip from '@/components/betslip'
import { cn } from '@/lib/utils'

export default function SportLayout({ children }: { children: React.ReactNode }) {
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchLayoutQuery>(graphql`
    query PrematchLayoutQuery {
      ...Sidebar
    }
  `)

  useEffect(() => {
    loadQuery({}, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery])

  return (
    <div
      className={cn(
        'z-1 mx-auto grid min-h-screen w-full max-w-480 gap-8 px-4 py-6 pb-24 sm:px-6 lg:px-8',
        'grid-cols-1 lg:grid-cols-[4rem_minmax(auto,1fr)] xl:grid-cols-[16rem_minmax(auto,1fr)] 2xl:grid-cols-[16rem_minmax(auto,1fr)_18.75rem]'
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
