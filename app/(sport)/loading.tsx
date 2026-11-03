import { CarouselSkeleton } from '@/app/(sport)/carousel'
import { ShortcutRowSkeleton } from '@/app/(sport)/shortcut-row'
import { TournamentListSkeleton } from '@/app/(sport)/tournament-list'

export default function SportPageSkeleton() {
  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <CarouselSkeleton />
      <ShortcutRowSkeleton />
      <TournamentListSkeleton />
    </main>
  )
}
