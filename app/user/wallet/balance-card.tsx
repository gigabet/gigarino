'use client'
import { WalletIcon } from 'lucide-react'
import { motion } from 'motion/react'

export default function BalanceCard(props: { balance: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='from-dark-300/20 flex-1 rounded-2xl border border-white/5 bg-linear-to-br to-black/20 p-6'
    >
      <div className='mb-4 flex items-center gap-3'>
        <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full'>
          <WalletIcon className='text-primary h-5 w-5' />
        </div>
        <span className='text-gray-400'>Available Balance</span>
      </div>
      <div className='mb-2 text-4xl font-bold text-white'>{props.balance}</div>
    </motion.div>
  )
}
