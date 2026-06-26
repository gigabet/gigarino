'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { Gamepad2Icon, OctagonAlertIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Activity, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { getGameQuery } from '@/app/context'
import { GameCard } from '@/app/game-section'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'

interface GameListProps {
  title: string
  query: string
}

export default function GameList({ title, query }: GameListProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { ref, inView } = useInView()
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, error, isPending } =
    useInfiniteQuery({
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
        <Activity mode={error ? 'visible' : 'hidden'}>
          <motion.div
            className='mb-4'
            initial={{ opacity: 0, scaleY: 0, translateY: '-50%' }}
            animate={{ opacity: 1, scaleY: 1, translateY: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Alert className='text-destructive border-destructive bg-destructive/10 inline-flex w-auto min-w-sm items-center [&>svg]:translate-0'>
              <OctagonAlertIcon className='' />
              <AlertTitle>{error?.message ?? 'Something went wrong.'}</AlertTitle>
              <div className='ml-auto'>
                <Button size='sm' variant='outline' onClick={() => router.refresh()}>
                  Retry
                </Button>
              </div>
            </Alert>
          </motion.div>
        </Activity>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cx('mb-6 flex items-center justify-between')}
        >
          <div className='flex items-center gap-2'>
            <h2 className='font-display text-2xl font-bold sm:text-3xl'>{title}</h2>
          </div>
        </motion.div>

        {!data?.pages && !isPending && (
          <Empty className='text-muted-foreground'>
            <EmptyHeader>
              <EmptyMedia>
                <Gamepad2Icon />
              </EmptyMedia>
              <EmptyTitle>No games</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}

        {/* Games Container */}
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4'>
          {isPending && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
              >
                <Skeleton className='aspect-video w-full' />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.25,
                }}
              >
                <Skeleton className='aspect-video w-full' />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3,
                }}
              >
                <Skeleton className='aspect-video w-full' />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.35,
                }}
              >
                <Skeleton className='aspect-video w-full' />
              </motion.div>
            </>
          )}
          {data?.pages.map((page, pageNo) =>
            page.items.map((game, index) => (
              <motion.div
                key={game.uuid}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (pageNo * 24 + index) * 0.05,
                }}
              >
                <GameCard game={game} />
              </motion.div>
            ))
          )}
        </div>
        <div ref={ref} />
      </div>
    </section>
  )
}
