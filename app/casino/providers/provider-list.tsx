'use client'

import { useQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useEffect, useRef, useState } from 'react'
import { providersQuery } from '@/app/context'
import { ProviderCard } from '@/app/provider-section'

export default function GameList() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const { data } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return (
    <section ref={sectionRef} className={cx('relative pt-8 pb-16 sm:pb-20')}>
      <div className='mx-auto max-w-360 px-6 lg:px-8'>
        {/* Section Header */}
        <div
          className={cx(
            'mb-6 flex items-center justify-between transition-all duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <div className='flex items-center gap-2'>
            <h2 className='font-display text-2xl font-bold sm:text-3xl'>Providers</h2>
          </div>
        </div>

        {/* Games Container */}
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4'>
          {data?.map((provider, index) => (
            <div
              key={provider.id}
              className={cx(
                'duration-700',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <ProviderCard {...{ provider }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
