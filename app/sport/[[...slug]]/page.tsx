import { GiSoccerBall } from 'react-icons/gi'
import Carousel from '@/app/sport/carousel'
import ShortcutRow from '@/app/sport/shortcut-row'
import Sidebar from '@/app/sport/sidebar'
import Betslip from '@/components/betslip'

interface PageProps {
  params: {
    /** `/ filter / sport / league` */
    slug?: string[] // Next.js passes undefined or [] for the bare /sport/ path
  }
}

export default async function SportPage(props: PageProps) {
  const [_filter = 'all', _sport = null, _league = null] = props.params.slug ?? []

  return (
    <main className='z-1 mx-auto grid min-h-screen w-full max-w-480 grid-cols-[18.75rem_minmax(auto,1fr)_18.75rem] gap-8 px-4 py-6 pb-24 sm:px-6 lg:px-8'>
      {/* <PromotionalBanner /> */}
      <Sidebar />
      <section className='flex h-500 min-w-0 flex-col gap-4'>
        <Carousel />
        <ShortcutRow />
        <div className='text-secondary flex items-center gap-2 border-b py-2 text-sm'>
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
        <div className='text-secondary flex items-center gap-2 border-b py-2 text-sm'>
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
      <Betslip />
    </main>
  )
}
