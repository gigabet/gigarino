'use client'
import { HistoryIcon } from 'lucide-react'
import { motion } from 'motion/react'
import TransactionsTable from '@/app/user/transactions-table'

export default function TransactionHistory(props: { id: string }) {
  return (
    <motion.div
      className='bg-surface/40 mt-8 max-w-full rounded-2xl border border-foreground/5 p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='flex items-center gap-2 text-lg font-bold text-foreground'>
          <HistoryIcon className='text-brand hidden size-5 md:block' />
          All Transactions
        </h3>
      </div>

      <TransactionsTable id={props.id} infinite />
    </motion.div>
  )
}
