import { ArrowRightIcon, GiftIcon } from 'lucide-react'

interface PromoBannerProps {
  title: string
  ctaText: string
}

export default function PromoBanner({ title, ctaText }: PromoBannerProps) {
  return (
    <div className='border-brand/40 relative overflow-hidden rounded-xl border'>
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='animate-speed-lines absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_49%,rgba(163,230,53,0.3)_50%,transparent_51%)] opacity-20'
          style={{
            backgroundSize: `100px 100%`,
          }}
        />
      </div>
      <div className='relative z-10 flex flex-col items-center justify-between gap-4 p-6 md:flex-row'>
        <div className='flex items-center gap-4'>
          <div className='bg-brand flex h-14 w-14 -skew-x-6 transform items-center justify-center rounded-xl'>
            <GiftIcon className='text-brand-fg skew-x-6' />
          </div>
          <div>
            <h3 className='font-display text-xl tracking-wide text-white uppercase md:text-2xl'>
              {title}
            </h3>
            <p className='text-brand text-sm md:text-base'>{ctaText}</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <button className='btn-brand-main' type='button'>
            <span className='flex items-center gap-2'>
              Claim now
              <ArrowRightIcon className='size-4' />
            </span>
          </button>
        </div>
      </div>
      {/* <div className='absolute top-0 right-0 h-20 w-20 text-lime-400 opacity-20'>
        <svg viewBox='0 0 100 100' className='h-full w-full'>
          <title>Title</title>
          <polygon points='100,0 100,100 0,0' fill='currentColor'></polygon>
        </svg>
      </div> */}
      <div className='from-brand via-brand to-accent absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r via-70% to-80%'></div>
    </div>
  )
}
