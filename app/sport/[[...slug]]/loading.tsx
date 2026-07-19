import { TournamentListSkeleton } from '@/app/sport/[[...slug]]/tournament-list'
import Carousel from '@/app/sport/carousel'
import ShortcutRow from '@/app/sport/shortcut-row'

export default function SportPageSkeleton() {
  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <Carousel />
      <ShortcutRow />
      <TournamentListSkeleton />
    </main>
  )
}
