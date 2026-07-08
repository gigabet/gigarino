import { SearchIcon } from 'lucide-react'
import { GiBasketballBall, GiDiamondTrophy, GiSoccerBall, GiTennisBall } from 'react-icons/gi'
import { Separator } from '@/components/ui/separator'

export default function SportPage() {
  return (
    <main className='z-1 mx-auto grid min-h-screen w-full max-w-480 grid-cols-[18.75rem_minmax(auto,1fr)_18.75rem] gap-8 px-4 py-6 pb-24 sm:px-6 lg:px-8'>
      <aside className='text-secondary col-span-3 flex h-36 items-center justify-center overflow-y-auto rounded-2xl bg-white/3'>
        promotional banner
      </aside>
      <aside className='scrollbar-hide! scrollbar-thumb-dark-300 sticky top-28 max-h-[calc(100dvh-7rem)] w-full scrollbar-thin scrollbar-track-transparent place-self-start overflow-y-auto'>
        <div className='flex h-200 w-full flex-col items-center'>
          <div className='mb-4 flex h-10 w-full items-center gap-4 rounded-full bg-black/50 px-4'>
            <SearchIcon className='size-4' />
            <span className='text-muted-foreground text-sm'>search games...</span>
          </div>
          <div className='text-secondary flex h-12 w-full items-center justify-center rounded-xl bg-white/3 text-xs'>
            last minute / today / all / etc
          </div>
          <Separator className='my-8' />
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
      <section className='flex h-500 flex-col'>
        <div className='bg-primary/10 border-primary/20 flex h-60 w-full flex-col items-center justify-center gap-2 rounded-3xl border text-lime-100'>
          top events
          <span className='text-xs'>(horizontal scroll)</span>
        </div>
        <div className='text-secondary my-4 flex items-center gap-2 border-b py-2 text-sm'>
          <GiSoccerBall className='size-4.5' />{' '}
          <span className='text-uppercase flex size-5 items-center justify-center rounded-full bg-white/3 text-[0.5rem] leading-none'>
            EN
          </span>{' '}
          Premier league
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-muted-foreground flex h-24 flex-nowrap items-center justify-center rounded-xl bg-black/20'>
            event
          </div>
          <div className='text-muted-foreground flex h-24 flex-nowrap items-center justify-center rounded-xl bg-black/20'>
            event
          </div>
        </div>
        <div className='text-secondary my-4 flex items-center gap-2 border-b py-2 text-sm'>
          <GiSoccerBall className='size-4.5' />{' '}
          <span className='text-uppercase flex size-5 items-center justify-center rounded-full bg-white/3 text-[0.5rem] leading-none'>
            ES
          </span>{' '}
          La Liga
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-muted-foreground flex h-24 flex-nowrap items-center justify-center rounded-xl bg-black/20'>
            event
          </div>
          <div className='text-muted-foreground flex h-24 flex-nowrap items-center justify-center rounded-xl bg-black/20'>
            event
          </div>
          <div className='text-muted-foreground flex h-24 flex-nowrap items-center justify-center rounded-xl bg-black/20'>
            event
          </div>
          <div className='text-muted-foreground flex h-24 flex-nowrap items-center justify-center rounded-xl bg-black/20'>
            event
          </div>
        </div>
      </section>
      <aside className='sticky top-28 flex flex-col gap-4 place-self-start'>
        <div className='flex h-100 items-center justify-center rounded-2xl bg-white/3'>Betslip</div>
        <div className='px-8 py-4 text-center text-sm'>
          when betslip empty – top leagues / recently viewed?
        </div>
      </aside>
    </main>
  )
}
