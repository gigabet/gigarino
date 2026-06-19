'use client'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ErrorBoundary, getErrorMessage } from 'react-error-boundary'
import { TbGiftOff } from 'react-icons/tb'
import Offer from '@/app/user/bonuses/offer'
import { feedQuery } from '@/app/user/context'
import type { User } from '@/types'

export default function BonusList(props: { user: User }) {
  const { data: bonuses, error } = useQuery({
    queryKey: ['promotions_feed', props.user.id],
    queryFn: feedQuery,
  })

  const router = useRouter()
  if (error) {
    alert(JSON.stringify(error))
    if (error.cause === 'Unauthorized')
      router.replace(`/login?error=${error.message ?? 'You must be logged in'}&from=/user/bonuses`)
  }

  if (!bonuses?.length)
    return (
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div role='alert'>
            <p>Something went wrong:</p>
            <pre>{getErrorMessage(error)}</pre>
            <button type='button' onClick={resetErrorBoundary}>
              Try again
            </button>
          </div>
        )}
      >
        <motion.div
          className='text-muted-foreground flex flex-col items-center gap-4 text-3xl font-bold'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TbGiftOff className='size-40 stroke-[0.8]' />
          <div>No bonuses</div>
        </motion.div>
      </ErrorBoundary>
    )

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role='alert'>
          <p>Something went wrong:</p>
          <pre>{getErrorMessage(error)}</pre>
          <button type='button' onClick={resetErrorBoundary}>
            Try again
          </button>
        </div>
      )}
    >
      <motion.div
        className='@container/offers'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className='grid grid-cols-1 gap-6 @min-2xl/offers:grid-cols-2 @min-5xl/offers:grid-cols-3'>
          {bonuses?.map(({ promotion, claim }) => (
            <Offer key={promotion.id} claim={claim} {...promotion} />
          ))}
        </div>
      </motion.div>
    </ErrorBoundary>
  )
}
