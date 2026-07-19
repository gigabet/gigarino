'use client'
import { Suspense, useEffect, useRef } from 'react'
import { graphql, useQueryLoader } from 'react-relay'
import type { PrematchLayoutQuery } from '@/app/sport/__generated__/PrematchLayoutQuery.graphql'
import { PageSkeleton } from '@/app/sport/[[...slug]]/page'
import Sidebar, { SidebarSkeleton } from '@/app/sport/sidebar'
import Betslip from '@/components/betslip'
import { cn } from '@/lib/utils'

export default function SportLayout({ children }: { children: React.ReactNode }) {
  const [queryRef, loadQuery] = useQueryLoader<PrematchLayoutQuery>(graphql`
    query PrematchLayoutQuery {
      ...Sidebar
    }
  `)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    loadQuery({}, { fetchPolicy: 'store-or-network' })
  }, [loadQuery])

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
      <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
      <div className='hidden xl:flex'>
        <Betslip />
      </div>
    </div>
  )
}
