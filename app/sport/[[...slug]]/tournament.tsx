import { GiSoccerBall } from 'react-icons/gi'
import PrematchEvent from '@/app/sport/[[...slug]]/prematch-event'

export default function Tournament() {
  return (
    <section>
      <h2 className='text-secondary mb-4 flex items-center gap-2 border-b py-2 text-sm'>
        <GiSoccerBall className='size-4.5' />
        <span className='text-uppercase flex size-5 items-center justify-center rounded-full bg-white/3 text-[0.5rem] leading-none'>
          EN
        </span>
        Premier league
      </h2>
      <div className='flex flex-col gap-3'>
        <PrematchEvent />
        <PrematchEvent />
        <PrematchEvent />
        <PrematchEvent />
      </div>
    </section>
  )
}
