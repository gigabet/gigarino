'use client'
import { last } from 'lodash'
import { WalletIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useBalanceUpdates } from '@/context/hooks'
import { formatBalance } from '@/lib/utils'

export default function BalanceCard(props: { balance: string; token: string }) {
  const { data } = useBalanceUpdates(props.token)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='from-surface-300/20 flex-1 rounded-2xl border border-foreground/5 bg-linear-to-br to-inset p-6'
    >
      <div className='mb-4 flex items-center gap-3'>
        <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full'>
          <WalletIcon className='text-brand h-5 w-5' />
        </div>
        <span className='text-secondary'>Available Balance</span>
      </div>
      <div className='mb-2 text-4xl font-bold text-foreground'>
        {(data?.length ?? 0) > 0
          ? // biome-ignore lint/style/noNonNullAssertion: data cannot be null if this condition is true
            formatBalance(Number(last(data)!.data.balance))
          : props.balance}
      </div>
    </motion.div>
  )
}
