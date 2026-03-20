'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getGameQuery } from '@/app/context'
import { GameCard } from '@/app/game-section'

interface GameListProps {
  title: string
  query: string
}

export default function GameList({ title, query }: GameListProps) {
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

  const { ref, inView } = useInView()
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['games-infinite', query],
    initialPageParam: 1,
    getNextPageParam: last => (last.page < last.totalPages ? last.page + 1 : null),
    getPreviousPageParam: last => (last.page > 1 ? last.page - 1 : null),
    queryFn: getGameQuery(query),
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

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
            <h2 className='font-display text-2xl font-bold sm:text-3xl'>{title}</h2>
          </div>
        </div>

        {/* Games Container */}
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4'>
          {data?.pages.map((page, pageNo) =>
            page.items.map((game, index) => (
              <div
                key={game.uuid}
                className={cx(
                  'duration-700',
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}
                style={{ transitionDelay: `${(pageNo * 24 + index) * 0.15}s` }}
              >
                <GameCard game={game} />
              </div>
            ))
          )}
        </div>
        <div ref={ref} />
      </div>
    </section>
  )
}
