import { ShortcutRowSkeleton } from '@/app/sport/[[...slug]]/shortcut-row'
import { TournamentListSkeleton } from '@/app/sport/[[...slug]]/tournament-list'
import { CarouselSkeleton } from '@/app/sport/carousel'

export default function SportPageSkeleton() {
  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <CarouselSkeleton />
      <ShortcutRowSkeleton />
      <TournamentListSkeleton />
    </main>
  )
}
