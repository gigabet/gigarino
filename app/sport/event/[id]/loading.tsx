import { MarketGroupsSkeleton } from '@/app/sport/event/[id]/market-groups'
import { Skeleton } from '@/components/ui/skeleton'

export default function EventPageSkeleton() {
  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
      <section className='flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-6'>
        <Skeleton className='h-4 w-48' />
        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
          <div className='flex items-center gap-3'>
            <Skeleton className='size-10 rounded-full' />
            <Skeleton className='h-4 w-24' />
          </div>
          <Skeleton className='h-8 w-16' />
          <div className='flex flex-row-reverse items-center gap-3'>
            <Skeleton className='size-10 rounded-full' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>
      </section>

      <Skeleton className='h-48 w-full rounded-2xl sm:h-60' />

      <MarketGroupsSkeleton />
    </main>
  )
}
