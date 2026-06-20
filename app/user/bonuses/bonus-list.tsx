'use client'
import { useQuery } from '@tanstack/react-query'
import { AlertCircleIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { Activity } from 'react'
import { ErrorBoundary, getErrorMessage } from 'react-error-boundary'
import { TbGiftOff } from 'react-icons/tb'
import Offer from '@/app/user/bonuses/offer'
import { feedQuery } from '@/app/user/context'
import { Button } from '@/components/ui/button'
import type { User } from '@/types'

export default function BonusList(props: { user: User }) {
  const { data: bonuses, error } = useQuery({
    queryKey: ['promotions_feed', props.user.id],
    queryFn: feedQuery,
  })

  // TODO: less friction; in case of Unauthorised, perhaps show login popup

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
          <Activity mode={error ? 'visible' : 'hidden'}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className='mb-6 flex items-center gap-3 self-start rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400'
            >
              <div className='flex items-center gap-3'>
                <AlertCircleIcon className='size-5 shrink-0' />
                <p className='text-sm'>{error?.message || 'Something went wrong.'}</p>
              </div>
              <Button variant='outline' onClick={() => window.location.reload()}>
                Retry
              </Button>
            </motion.div>
          </Activity>
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
      <Activity mode={error ? 'visible' : 'hidden'}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className='mb-6 flex items-center gap-3 self-start rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400'
        >
          <div className='flex items-center gap-3'>
            <AlertCircleIcon className='size-5 shrink-0' />
            <p className='text-sm'>{error?.message || 'Something went wrong.'}</p>
          </div>
          <Button variant='outline' onClick={() => window.location.reload()}>
            Retry
          </Button>
        </motion.div>
      </Activity>
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
