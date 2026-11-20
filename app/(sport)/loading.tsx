import { CarouselSkeleton } from '@/app/(sport)/carousel'
import { TopTournamentsSkeleton } from '@/app/(sport)/top-tournaments'
import { TournamentListSkeleton } from '@/app/(sport)/tournament-list'

export default function SportPageSkeleton() {
  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <CarouselSkeleton />
      <div className='xl:hidden'>
        <TopTournamentsSkeleton layout='bar' />
      </div>
      <TournamentListSkeleton />
    </main>
  )
}
