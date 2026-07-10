import { SearchIcon } from 'lucide-react'
import { GiBasketballBall, GiDiamondTrophy, GiSoccerBall, GiTennisBall } from 'react-icons/gi'

export default function Sidebar() {
  return (
    <aside className='scrollbar-hide! scrollbar-thumb-dark-300 sticky top-26.25 max-h-[calc(100dvh-7rem)] w-full scrollbar-thin scrollbar-track-transparent place-self-start overflow-y-auto'>
      <div className='flex h-200 w-full flex-col items-center'>
        <div className='mb-4 flex h-10 w-full items-center gap-4 rounded-full border bg-black/50 px-4'>
          <SearchIcon className='size-4' />
          <span className='text-muted-foreground text-sm'>search games...</span>
        </div>
        <div className='text-secondary mb-4 flex h-12 w-full items-center justify-center rounded-xl bg-white/3 text-xs'>
          last minute / today / all / etc
        </div>
        <div className='mb-2 w-full rounded-full border px-4 py-3 text-center text-sm'>
          <div className='text-secondary flex items-center justify-between'>
            <span className='inline-flex items-center gap-2'>
              <GiDiamondTrophy className='size-5' /> highlights
            </span>{' '}
            <span>19</span>
          </div>
        </div>
        <div className='mb-2 w-full rounded-full border px-4 py-3 text-center text-sm'>
          <div className='text-secondary flex items-center justify-between'>
            <span className='inline-flex items-center gap-2'>
              <GiSoccerBall className='size-5' /> soccer
            </span>{' '}
            <span>812</span>
          </div>
        </div>
        <div className='text-secondary mb-2 flex h-72 w-full flex-col items-center justify-center gap-2 rounded-xl bg-white/3 text-sm'>
          <span>country/league</span>
          <span className='text-xs'>(checkboxes)</span>
        </div>
        <div className='mb-2 w-full rounded-full border px-4 py-3 text-center text-sm'>
          <div className='text-secondary flex items-center justify-between'>
            <span className='inline-flex items-center gap-2'>
              <GiTennisBall className='size-5' /> tennis
            </span>{' '}
            <span>68</span>
          </div>
        </div>
        <div className='mb-2 w-full rounded-full border px-4 py-3 text-center text-sm'>
          <div className='text-secondary flex items-center justify-between'>
            <span className='inline-flex items-center gap-2'>
              <GiBasketballBall className='size-5' /> basketball
            </span>{' '}
            <span>32</span>
          </div>
        </div>
        <div className='mb-2 w-full rounded-full px-4 py-3 text-center text-sm'>...</div>
      </div>
    </aside>
  )
}
