'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { type categories, getGameQuery } from '@/app/context'
import type { Game } from '@/types'

interface GameSectionProps {
  title: string
  category: (typeof categories)[Exclude<keyof typeof categories, 'Providers'>]
}

export default function GameSection({ title, category }: GameSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const { data } = useQuery({
    queryKey: ['games', category.query],
    queryFn: getGameQuery(category.query),
  })

  const games = data?.items

  return (
    <section className='bg-gray-900 py-6'>
      {/* Section Header */}
      <div className='mb-4 flex items-center justify-between px-8'>
        <h2 className='text-lg font-semibold text-gray-200'>{title}</h2>
        <Link
          href={`/casino/${category.slug}`}
          className='flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-300'
        >
          <span>See all ({data?.total})</span>
        </Link>
      </div>

      {/* Games Carousel */}
      <div className='relative'>
        {/* Scroll Buttons */}
        <button
          type='button'
          onClick={() => scroll('left')}
          className='absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-3/4 items-center justify-center rounded-full bg-gray-800/90 text-gray-300 shadow-lg transition-colors hover:bg-gray-700'
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type='button'
          onClick={() => scroll('right')}
          className='absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-3/4 items-center justify-center rounded-full bg-gray-800/90 text-gray-300 shadow-lg transition-colors hover:bg-gray-700'
        >
          <ChevronRight size={20} />
        </button>

        {/* Games Container */}
        <div className='w-full overflow-hidden px-8 pb-2'>
          <div
            ref={scrollRef}
            className='no-scrollbar @container flex gap-4 overflow-x-auto'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {games?.map(game => (
              <CasinoGame key={game.uuid} {...game} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CasinoGame(props: Game) {
  return (
    <Link
      key={props.name}
      href='#!'
      className='group w-[calc(50cqi-1rem)] shrink-0 sm:w-[calc(33.33cqi-1rem)] md:w-[calc(25cqi-1rem)] lg:w-[calc(20cqi-1rem)] xl:w-[calc(16.67cqi-1rem)]'
    >
      {/* Game Card */}
      <div className='relative mb-2 aspect-16/10 overflow-hidden rounded-xl bg-gray-700'>
        {/* Game Image */}
        <div className='relative h-full w-full'>
          <Image src={props.image} alt={props.name} fill objectFit='cover' />
        </div>

        {/* New Badge */}
        {props.isNew && (
          <div className='absolute top-2 left-2 rounded bg-gray-900 px-2 py-0.5 text-xs font-medium text-white'>
            new
          </div>
        )}

        {/* Hover Overlay */}
        <div className='absolute inset-0 bg-gray-900/0 transition-colors group-hover:bg-gray-900/30' />
      </div>

      {/* Game Title */}
      <p className='line-clamp-2 text-sm text-gray-400 transition-colors group-hover:text-gray-200'>
        {props.name}
      </p>
    </Link>
  )
}
