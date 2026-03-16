'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { getGameQuery } from '@/app/context'
import { CasinoGame } from '@/app/game-section'

interface GameListProps {
  title: string
  query: string
}

export default function GameList({ title, query }: GameListProps) {
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
    <div className='px-8 py-6'>
      <h2 className='font-display mb-4 text-xl text-white sm:text-2xl lg:text-3xl'>{title}</h2>
      <div className='@container grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {data?.pages.map(page => page.items.map(game => <CasinoGame key={game.uuid} {...game} />))}
      </div>
      <div ref={ref}>
        {/* <button type='button' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetching}>
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button> */}
      </div>
      {/* <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div> */}
    </div>
  )
}
