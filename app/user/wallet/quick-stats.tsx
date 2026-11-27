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
      className='glass-flat flex-1 space-y-4 rounded-2xl p-6'
    >
      <h3 className='text-secondary text-sm font-semibold tracking-wider uppercase'>Quick Stats</h3>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-info/10 flex size-8 items-center justify-center rounded-full'>
            <TrendingUpIcon className='text-info size-4' />
          </div>
          <span className='text-secondary'>Total Deposited</span>
        </div>
        <span className='text-foreground font-semibold'>€0.00</span>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-danger/10 flex size-8 items-center justify-center rounded-full'>
            <TrendingDownIcon className='text-danger size-4' />
          </div>
          <span className='text-secondary'>Total Withdrawn</span>
        </div>
        <span className='text-foreground font-semibold'>€0.00</span>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-warning/10 flex size-8 items-center justify-center rounded-full'>
            <ClockIcon className='text-warning size-4' />
          </div>
          <span className='text-secondary'>Pending</span>
        </div>
        <span className='text-foreground font-semibold'>€0.00</span>
      </div>
    </motion.div>
  )
}
