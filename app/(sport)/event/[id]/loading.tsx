import { EventHeaderRow } from '@/components/event-header-row'
import { MarketGroupsSkeleton } from '@/components/market-groups'
import { MatchTrackerSkeleton } from '@/components/match-tracker'
import { Skeleton } from '@/components/ui/skeleton'

// mirrors <PrematchSingleView>: keep its spacing and sizing in sync
export default function PrematchSingleViewSkeleton() {
  return (
    <main className='mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-4 sm:gap-6'>
      <section className='glass-flat flex flex-col gap-3 rounded-2xl p-4 sm:gap-4 sm:p-6'>
        <EventHeaderRow
          left={<Skeleton className='h-4 w-48 max-w-full' />}
          favourite={<Skeleton className='size-8 rounded-full' />}
        />
        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4'>
          <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
            <Skeleton className='size-8 shrink-0 rounded-full sm:size-10' />
            <Skeleton className='h-4 w-16 sm:w-24' />
          </div>
          <Skeleton className='mx-1 h-8 w-12 shrink-0 sm:h-10 sm:w-16' />
          <div className='flex min-w-0 flex-row-reverse items-center gap-2 sm:gap-3'>
            <Skeleton className='size-8 shrink-0 rounded-full sm:size-10' />
            <Skeleton className='h-4 w-16 sm:w-24' />
          </div>
        </div>
      </section>

      <MatchTrackerSkeleton />

      {/* statistics switch; the widget itself is off by default */}
      <div className='flex items-center gap-2'>
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-5 w-9 rounded-full' />
      </div>

      <MarketGroupsSkeleton />
    </main>
  )
}
