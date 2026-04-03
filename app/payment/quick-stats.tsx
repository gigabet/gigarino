'use client'
import { ClockIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { motion } from 'motion/react'

export default function QuickStats() {
  // TODO: actual funds when api is ready
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='space-y-4 rounded-2xl border border-white/5 bg-black/20 p-6'
    >
      <h3 className='text-sm font-semibold tracking-wider text-gray-400 uppercase'>Quick Stats</h3>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-full bg-sky-500/10'>
            <TrendingUpIcon className='size-4 text-sky-400' />
          </div>
          <span className='text-gray-400'>Total Deposited</span>
        </div>
        <span className='font-semibold text-white'>€0.00</span>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-full bg-red-500/10'>
            <TrendingDownIcon className='size-4 text-red-400' />
          </div>
          <span className='text-gray-400'>Total Withdrawn</span>
        </div>
        <span className='font-semibold text-white'>€0.00</span>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-full bg-yellow-500/10'>
            <ClockIcon className='size-4 text-yellow-400' />
          </div>
          <span className='text-gray-400'>Pending</span>
        </div>
        <span className='font-semibold text-white'>€0.00</span>
      </div>
    </motion.div>
  )
}
