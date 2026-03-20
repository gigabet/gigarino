'use client'

import { cx } from 'class-variance-authority'
import { ChevronRightIcon, ShieldCheckIcon, ZapIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const [pos, setPos] = useState({ x: 0, y: 0 })
  const lastMouse = useRef({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    lastMouse.current = { x: e.clientX, y: e.clientY }

    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return

    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return

      setPos({
        x: lastMouse.current.x - rect.left,
        y: lastMouse.current.y - rect.top,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: cosmetic only
    <section
      ref={heroRef}
      onMouseMove={handleMove}
      onPointerMove={handleMove}
      className='group relative flex h-[90dvh] max-h-200 items-center justify-center overflow-hidden'
    >
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-linear-to-b via-black to-black' />
        <div
          className='absolute inset-0 opacity-60 transition-all duration-700 ease-out'
          style={{
            background: `radial-gradient(600px at 40.9031% 43.0162%, rgba(209, 243, 102, 0.15), transparent 40%)`,
          }}
        />
        <div
          className='absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 opacity-30'
          style={{
            background: `radial-gradient(circle, rgba(209, 243, 102, 0.3) 0%, rgba(127, 92, 255, 0.1) 40%, transparent 70%)`,
            filter: `blur(60px)`,
          }}
        />
        <div className='bg-primary/10 animate-float absolute top-20 left-10 h-32 w-32 rounded-full blur-3xl'></div>
        <div
          className='bg-purple-accent/10 animate-float absolute right-10 bottom-20 h-40 w-40 rounded-full blur-3xl'
          style={{ animationDelay: '1s' }}
        />
        <div
          className='bg-primary/5 animate-float absolute top-1/3 right-1/4 h-24 w-24 rounded-full blur-2xl'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage: `linear-gradient(rgba(209, 243, 102, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(209, 243, 102, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Spotlight */}
        <div
          className='from-primary/15 pointer-events-none absolute size-100 -translate-1/2 rounded-full bg-radial to-transparent opacity-0 blur-3xl transition-opacity duration-200 group-hover:opacity-100'
          style={{
            left: pos.x,
            top: pos.y,
          }}
        />

        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='via-primary/30 absolute top-20/100 -left-1/1 h-px w-full bg-linear-to-r from-transparent to-transparent'
            style={{ animation: '3s linear 0s infinite normal none running shimmer' }}
          />
          <div
            className='via-primary/30 absolute top-35/100 -left-1/1 h-px w-full bg-linear-to-r from-transparent to-transparent'
            style={{ animation: '3s linear 0s infinite normal none running shimmer' }}
          />
          <div
            className='via-primary/30 absolute top-50/100 -left-1/1 h-px w-full bg-linear-to-r from-transparent to-transparent'
            style={{ animation: '3s linear 0s infinite normal none running shimmer' }}
          />
          <div
            className='via-primary/30 absolute top-65/100 -left-1/1 h-px w-full bg-linear-to-r from-transparent to-transparent'
            style={{ animation: '3s linear 0s infinite normal none running shimmer' }}
          />
          <div
            className='via-primary/30 absolute top-80/100 -left-1/1 h-px w-full bg-linear-to-r from-transparent to-transparent'
            style={{ animation: '3s linear 0s infinite normal none running shimmer' }}
          />
        </div>
      </div>
      <div className='relative mx-auto max-w-4xl px-4 text-center'>
        <div
          className={cx(
            'bg-primary/10 border-primary/30 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          <span className='text-primary text-xs font-medium tracking-wider uppercase'>
            Welcome Offer
          </span>
        </div>
        <h1
          className={cx(
            'font-display mb-4 text-5xl font-bold transition-all delay-100 duration-700 sm:text-6xl lg:text-7xl xl:text-8xl',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          <span className='text-white'>Turbo</span>{' '}
          <span className='gradient-text-primary text-glow'>Boost</span>
        </h1>
        <p
          className={cx(
            'mb-8 text-lg text-gray-300 transition-all delay-200 duration-700 sm:text-xl lg:text-2xl',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          <span className='text-primary font-semibold'>100% up to €50</span>
          <span className='mx-2 text-gray-500'>+</span>
          <span className='font-medium text-white'>200 FS</span>
          <span className='mx-2 text-gray-500'>+</span>
          <span className='text-purple-accent font-medium'>1 Bonus Item</span>
        </p>
        <div
          className={cx(
            'transition-all delay-300 duration-700',
            isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
          )}
        >
          <button
            type='button'
            className='group/button bg-primary hover:shadow-glow-lg relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105'
          >
            <div className='from-primary to-primary absolute inset-0 bg-linear-to-r via-white/30 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100'></div>
            <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full'></div>
            <span className='relative'>JOIN NOW</span>
            <ChevronRightIcon className='relative size-5 transition-transform group-hover/button:translate-x-1' />
          </button>
        </div>
        <div
          className={cx(
            'mt-10 flex flex-wrap items-center justify-center gap-6 transition-all delay-400 duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <div className='flex items-center gap-2 text-gray-400'>
            <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full'>
              <ShieldCheckIcon className='text-primary size-4' />
            </div>
            <span className='text-sm'>Secure &amp; Licensed</span>
          </div>
          <div className='flex items-center gap-2 text-gray-400'>
            <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full'>
              <ZapIcon className='text-primary size-4' />
            </div>
            <span className='text-sm'>Fast Payouts</span>
          </div>
        </div>
      </div>
      <div className='absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-black to-transparent' />
    </section>
  )
}
