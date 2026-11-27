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
    <section className='bg-card py-6'>
      {/* Section Header */}
      <div className='mb-4 flex items-center justify-between px-4'>
        <h2 className='text-foreground text-lg font-semibold'>Sports</h2>
        <a
          href='#!'
          className='text-subtle hover:text-secondary flex items-center gap-1 text-sm transition-colors'
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
          className='bg-surface/90 text-secondary hover:bg-surface-3 absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-colors'
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type='button'
          onClick={() => scroll('right')}
          className='bg-surface/90 text-secondary hover:bg-surface-3 absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-colors'
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
              <div className='bg-surface-3 relative aspect-square overflow-hidden rounded-xl'>
                {/* Background Gradient */}
                <div className='from-surface-3 to-surface-2 absolute inset-0 bg-linear-to-br' />

                {/* Icon Placeholder */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='bg-foreground/20 h-12 w-12 rounded-lg' />
                </div>

                {/* Live Indicator */}
                {sport.live && (
                  <div className='absolute top-3 left-3 flex items-center gap-1.5'>
                    <span className='bg-subtle h-2 w-2 animate-pulse rounded-full' />
                    <span className='text-secondary text-xs font-medium'>LIVE</span>
                  </div>
                )}

                {/* Sport Name */}
                <div className='from-background/80 absolute right-0 bottom-0 left-0 bg-linear-to-t to-transparent p-3'>
                  <span className='text-foreground text-sm font-medium'>{sport.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
