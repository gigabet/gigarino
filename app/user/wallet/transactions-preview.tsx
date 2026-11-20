'use client'
import { cx } from 'class-variance-authority'
import { ChevronRightIcon, HistoryIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import TransactionsTable from '@/app/user/transactions-table'
import { buttonVariants } from '@/components/ui/button'

export default function TransactionsPreview(props: { id: string }) {
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
          Recent Transactions
        </h3>
        <Link
          href='/user/transactions'
          className={cx(
            buttonVariants({ variant: 'ghost' }),
            'text-brand hover:bg-primary/10 light:hover:bg-foreground/6 px-0! hover:text-[#a8d94a] light:hover:text-foreground md:px-3!'
          )}
        >
          View All
          <ChevronRightIcon className='size-4' />
        </Link>
      </div>

      <TransactionsTable id={props.id} />
    </motion.div>
  )
}
