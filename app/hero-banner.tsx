import { ShieldCheckIcon, ZapIcon } from 'lucide-react'
import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className='relative overflow-hidden bg-neutral-900'>
      {/* Banner Content */}
      <div className='relative h-70 sm:h-80 lg:h-95'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-linear-to-br from-neutral-800 via-neutral-900 to-neutral-950'>
          {/* Decorative Elements */}
          <div className='absolute top-10 left-10 size-32 rounded-full bg-neutral-600/20 blur-3xl' />
          <div className='absolute right-10 bottom-10 size-48 rounded-full bg-neutral-500/10 blur-3xl' />
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23B8FF2C' fill-opacity='0.04'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content */}
        <div className='relative flex h-full flex-col items-center justify-center px-4 text-center'>
          {/* Badge */}
          <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/80 px-4 py-2'>
            <span className='bg-brand h-2 w-2 animate-pulse rounded-full'></span>
            <span className='font-mono text-xs tracking-widest text-neutral-400 uppercase'>
              Welcome Offer
            </span>
          </div>

          {/* Title */}
          <h1 className='font-display mb-3 text-2xl text-white sm:text-3xl lg:text-6xl'>
            Turbo Boost
          </h1>

          {/* Subtitle */}
          <p className='mb-6 text-lg text-neutral-300 sm:text-xl lg:text-2xl'>
            100% up to <span className='text-brand font-semibold'>€50</span> +{' '}
            <span className='text-brand font-semibold'>200 FS</span> +{' '}
            <span className='text-brand font-semibold'>1 Bonus Item</span>
          </p>

          {/* CTA Button */}
          <Link href='/' className='btn-brand-main transition-all hover:scale-110 lg:px-6 lg:py-3'>
            <span>Join now</span>
          </Link>

          {/* Blurbs */}
          <div className='mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-300'>
            <div className='flex items-center gap-2'>
              <ShieldCheckIcon className='text-accent size-5' />
              <span>Secure &amp; Licensed</span>
            </div>
            <div className='flex items-center gap-2'>
              <ZapIcon className='text-accent size-5' />
              <span>Fast Payouts</span>
            </div>
          </div>
        </div>
      </div>
      <div className='via-brand h-2 w-full bg-linear-to-r from-transparent to-transparent' />
      {/* bg-linear-[90deg,transparent_0%,var(--color-brand)_33%,var(--color-accent)_67%,transparent_100%]' /> */}
    </section>
  )
}
