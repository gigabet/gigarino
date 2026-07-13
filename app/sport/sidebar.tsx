import { SearchIcon } from 'lucide-react'
import { GiBasketballBall, GiDiamondTrophy, GiSoccerBall, GiTennisBall } from 'react-icons/gi'

export default function Sidebar() {
  return (
    <aside className='scrollbar-hide! scrollbar-thumb-dark-300 sticky top-26.25 hidden max-h-[calc(100dvh-7rem)] w-full scrollbar-thin scrollbar-track-transparent place-self-start overflow-y-auto md:flex'>
      <div className='flex w-full flex-col items-center'>
        {/* Search: icon-only pill at md, full pill w/ label at xl */}
        <div className='mb-4 flex h-10 w-full items-center justify-center gap-4 rounded-full border bg-black/50 px-4 xl:justify-start'>
          <SearchIcon className='size-4 shrink-0' />
          <span className='text-muted-foreground hidden text-sm xl:inline'>search games...</span>
        </div>

        {/* Time filter: collapses away below xl, no room for this at icon width */}
        <div className='text-secondary mb-4 hidden h-12 w-full items-center justify-center rounded-xl bg-white/3 text-xs xl:flex'>
          last minute / today / all / etc
        </div>

        <div className='mb-2 w-full rounded-full border px-4 py-3 text-center text-sm'>
          <div className='text-secondary flex items-center justify-center gap-2 xl:justify-between'>
            <span className='inline-flex items-center gap-2'>
              <GiDiamondTrophy className='size-5 shrink-0' />
              <span className='hidden xl:inline'>highlights</span>
            </span>
            <span className='hidden xl:inline'>19</span>
          </div>
        </div>

        <div className='mb-2 w-full rounded-full border px-4 py-3 text-center text-sm'>
          <div className='text-secondary flex items-center justify-center gap-2 xl:justify-between'>
            <span className='inline-flex items-center gap-2'>
              <GiSoccerBall className='size-5 shrink-0' />
              <span className='hidden xl:inline'>soccer</span>
            </span>
            <span className='hidden xl:inline'>812</span>
          </div>
        </div>

        {/* League tree: no icon-rail equivalent, just hide until xl */}
        <div className='text-secondary mb-2 hidden h-72 w-full flex-col items-center justify-center gap-2 rounded-xl bg-white/3 text-sm xl:flex'>
          <span>country/league</span>
          <span className='text-xs'>(checkboxes)</span>
        </div>

        <div className='mb-2 w-full rounded-full border px-4 py-3 text-center text-sm'>
          <div className='text-secondary flex items-center justify-center gap-2 xl:justify-between'>
            <span className='inline-flex items-center gap-2'>
              <GiTennisBall className='size-5 shrink-0' />
              <span className='hidden xl:inline'>tennis</span>
            </span>
            <span className='hidden xl:inline'>68</span>
          </div>
        </div>

        <div className='mb-2 w-full rounded-full border px-4 py-3 text-center text-sm'>
          <div className='text-secondary flex items-center justify-center gap-2 xl:justify-between'>
            <span className='inline-flex items-center gap-2'>
              <GiBasketballBall className='size-5 shrink-0' />
              <span className='hidden xl:inline'>basketball</span>
            </span>
            <span className='hidden xl:inline'>32</span>
          </div>
        </div>

        <div className='mb-2 w-full rounded-full px-4 py-3 text-center text-sm'>...</div>
      </div>
    </aside>
  )
}
