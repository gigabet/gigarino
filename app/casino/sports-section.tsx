'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

const sports = [
  { name: 'Live Betting', live: true },
  { name: 'Football', live: false },
  { name: 'Tennis', live: false },
  { name: 'Table Tennis', live: false },
  { name: 'Basketball', live: false },
  { name: 'Ice Hockey', live: false },
  { name: 'American Football', live: false },
  { name: 'Baseball', live: false },
]

export default function SportsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className='bg-neutral-900 py-6'>
      {/* Section Header */}
      <div className='mb-4 flex items-center justify-between px-4'>
        <h2 className='text-lg font-semibold text-neutral-200'>Sports</h2>
        <a
          href='#!'
          className='flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-300'
        >
          <span>See all (10)</span>
        </a>
      </div>

      {/* Sports Carousel */}
      <div className='relative'>
        {/* Scroll Buttons */}
        <button
          type='button'
          onClick={() => scroll('left')}
          className='absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-800/90 text-neutral-300 shadow-lg transition-colors hover:bg-neutral-700'
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type='button'
          onClick={() => scroll('right')}
          className='absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-800/90 text-neutral-300 shadow-lg transition-colors hover:bg-neutral-700'
        >
          <ChevronRight size={20} />
        </button>

        {/* Sports Container */}
        <div
          ref={scrollRef}
          className='no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sports.map(sport => (
            <a key={sport.name} href='#!' className='group w-35 shrink-0 sm:w-40'>
              {/* Sport Card */}
              <div className='relative aspect-square overflow-hidden rounded-xl bg-neutral-700'>
                {/* Background Gradient */}
                <div className='absolute inset-0 bg-linear-to-br from-neutral-600 to-neutral-800' />

                {/* Icon Placeholder */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='h-12 w-12 rounded-lg bg-neutral-500/40' />
                </div>

                {/* Live Indicator */}
                {sport.live && (
                  <div className='absolute top-3 left-3 flex items-center gap-1.5'>
                    <span className='h-2 w-2 animate-pulse rounded-full bg-neutral-400' />
                    <span className='text-xs font-medium text-neutral-300'>LIVE</span>
                  </div>
                )}

                {/* Sport Name */}
                <div className='absolute right-0 bottom-0 left-0 bg-linear-to-t from-neutral-900/80 to-transparent p-3'>
                  <span className='text-sm font-medium text-neutral-200'>{sport.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
