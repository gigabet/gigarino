'use client'
import { useQuery } from '@tanstack/react-query'
import { AlertCircleIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Activity } from 'react'
import { TbGiftOff } from 'react-icons/tb'
import Offer from '@/app/user/bonuses/offer'
import { feedQuery } from '@/app/user/context'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { User } from '@/types'

export default function BonusList(props: { user: User }) {
  const {
    data: bonuses,
    error,
    isPending,
  } = useQuery({
    queryKey: ['promotions_feed', props.user.id],
    queryFn: feedQuery,
  })
  const router = useRouter()
  // TODO: less friction; in case of Unauthorised, perhaps show login popup

  if (isPending)
    return (
      <motion.div
        className='@container/offers'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className='grid grid-cols-1 gap-6 @min-2xl/offers:grid-cols-2 @min-5xl/offers:grid-cols-3'>
          <Skeleton className='aspect-video w-full' />
          <Skeleton className='aspect-video w-full' />
          <Skeleton className='aspect-video w-full' />
        </div>
      </motion.div>
    )

  if (!bonuses?.length)
    return (
      <motion.div
        className='text-muted-foreground flex flex-col items-center gap-4 text-3xl font-bold'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Activity mode={error ? 'visible' : 'hidden'}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className='mb-6 inline-flex items-center gap-8 self-start rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400'
          >
            <div className='flex items-center gap-3'>
              <AlertCircleIcon className='size-5 shrink-0' />
              <p className='text-sm'>{error?.message || 'Something went wrong.'}</p>
            </div>
            <Button variant='outline' onClick={() => router.refresh()}>
              Retry
            </Button>
          </motion.div>
        </Activity>
        <TbGiftOff className='size-40 stroke-[0.8]' />
        <div>No bonuses</div>
      </motion.div>
    )

  return (
    <>
      <Activity mode={error ? 'visible' : 'hidden'}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className='mb-6 inline-flex items-center gap-8 self-start rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400'
        >
          <div className='flex items-center gap-3'>
            <AlertCircleIcon className='size-5 shrink-0' />
            <p className='text-sm'>{error?.message || 'Something went wrong.'}</p>
          </div>
          <Button variant='outline' onClick={() => router.refresh()}>
            Retry
          </Button>
        </motion.div>
      </Activity>
      <motion.div className='@container/offers'>
        <div className='grid grid-cols-1 gap-6 @min-2xl/offers:grid-cols-2 @min-5xl/offers:grid-cols-3'>
          {bonuses?.map(({ promotion, claim }, i) => (
            <motion.div
              key={promotion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.2 }}
            >
              <Offer claim={claim} {...promotion} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
