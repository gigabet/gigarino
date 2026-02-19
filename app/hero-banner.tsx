'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 4

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <section className='relative overflow-hidden bg-gray-800'>
      {/* Banner Content */}
      <div className='relative h-70 sm:h-80 lg:h-95'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-linear-to-br from-gray-700 via-gray-800 to-gray-900'>
          {/* Decorative Elements */}
          <div className='absolute top-10 left-10 h-32 w-32 rounded-full bg-gray-600/20 blur-3xl' />
          <div className='absolute right-10 bottom-10 h-48 w-48 rounded-full bg-gray-500/10 blur-3xl' />
        </div>

        {/* Content */}
        <div className='relative flex h-full flex-col items-center justify-center px-4 text-center'>
          {/* Badge */}
          <div className='mb-4 rounded-full bg-gray-700/80 px-4 py-1.5'>
            <span className='text-xs font-medium tracking-wider text-gray-400 uppercase'>
              Welcome Offer
            </span>
          </div>

          {/* Title */}
          <h1 className='mb-3 text-2xl font-bold text-gray-200 sm:text-3xl lg:text-4xl'>
            Platform Welcome Bonus
          </h1>

          {/* Subtitle */}
          <p className='mb-6 text-lg text-gray-400 sm:text-xl lg:text-2xl'>
            100% up to $500 + 200 FS + 1 Bonus Item
          </p>

          {/* CTA Button */}
          <button
            type='button'
            className='rounded-lg bg-gray-600 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-500'
          >
            Join now
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          type='button'
          onClick={prevSlide}
          className='absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-gray-700/50 p-2 text-gray-400 transition-colors hover:bg-gray-700'
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type='button'
          onClick={nextSlide}
          className='absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-gray-700/50 p-2 text-gray-400 transition-colors hover:bg-gray-700'
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2'>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            type='button'
            // biome-ignore lint/suspicious/noArrayIndexKey: elements are identical
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-gray-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
