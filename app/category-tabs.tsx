'use client'

import { entries } from 'lodash'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import type { categories } from '@/app/context'

export default function CategoryTabs(props: { categories: typeof categories }) {
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
    <section className='sticky top-16 z-20 border-b border-gray-700 bg-gray-800 lg:top-27.5'>
      {/* <div className='relative mx-auto max-w-(--breakpoint-2xl)'> */}
      {/* Scroll Buttons */}
      <button
        type='button'
        onClick={() => scroll('left')}
        className='absolute top-0 bottom-0 left-0 z-10 flex w-12 items-center justify-center bg-linear-to-r from-gray-800 to-transparent text-gray-500 hover:text-gray-300'
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type='button'
        onClick={() => scroll('right')}
        className='absolute top-0 right-0 bottom-0 z-10 flex w-12 items-center justify-center bg-linear-to-l from-gray-800 to-transparent text-gray-500 hover:text-gray-300'
      >
        <ChevronRight size={20} />
      </button>

      {/* Tabs Container */}
      <div
        ref={scrollRef}
        className='no-scrollbar flex gap-1 overflow-x-auto px-12 py-3'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {entries(props.categories).map(([label, category]) => (
          <Link
            key={label}
            href={`/casino/${category.slug}`}
            className='flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm whitespace-nowrap text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-200'
          >
            {category.icon && <div className='h-5 w-5 rounded bg-gray-600' />}
            <span>{label}</span>
          </Link>
        ))}
      </div>
      {/* </div> */}
    </section>
  )
}
