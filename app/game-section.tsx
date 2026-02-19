'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

interface Game {
  title: string
  isNew?: boolean
}

interface GameSectionProps {
  title: string
  seeAllCount: number
  games: Game[]
}

export default function GameSection({ title, seeAllCount, games }: GameSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className='bg-gray-900 py-6'>
      {/* Section Header */}
      <div className='mb-4 flex items-center justify-between px-4'>
        <h2 className='text-lg font-semibold text-gray-200'>{title}</h2>
        <a
          href='#!'
          className='flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-300'
        >
          <span>See all ({seeAllCount})</span>
        </a>
      </div>

      {/* Games Carousel */}
      <div className='relative'>
        {/* Scroll Buttons */}
        <button
          type='button'
          onClick={() => scroll('left')}
          className='absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800/90 text-gray-300 shadow-lg transition-colors hover:bg-gray-700'
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type='button'
          onClick={() => scroll('right')}
          className='absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800/90 text-gray-300 shadow-lg transition-colors hover:bg-gray-700'
        >
          <ChevronRight size={20} />
        </button>

        {/* Games Container */}
        <div
          ref={scrollRef}
          className='scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-2'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {games.map(game => (
            <a key={game.title} href='#!' className='group w-40 shrink-0 sm:w-45'>
              {/* Game Card */}
              <div className='relative mb-2 aspect-3/4 overflow-hidden rounded-xl bg-gray-700'>
                {/* Placeholder Image */}
                <div className='absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-600 to-gray-700'>
                  <div className='h-16 w-16 rounded-lg bg-gray-500/30' />
                </div>

                {/* New Badge */}
                {game.isNew && (
                  <div className='absolute top-2 left-2 rounded bg-gray-900 px-2 py-0.5 text-xs font-medium text-white'>
                    new
                  </div>
                )}

                {/* Hover Overlay */}
                <div className='absolute inset-0 bg-gray-900/0 transition-colors group-hover:bg-gray-900/30' />
              </div>

              {/* Game Title */}
              <p className='line-clamp-2 text-sm text-gray-400 transition-colors group-hover:text-gray-200'>
                {game.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
