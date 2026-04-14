'use client'

import { cx } from 'class-variance-authority'
import { CreditCardIcon, GiftIcon, UserIcon, WalletIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import type { User } from '@/types'

export default function UserSidebar(props: { user: User | null }) {
  const pathname = usePathname()

  if (!props.user) {
    redirect(`/login?error=You must be logged in&from=${pathname}`, 'replace')
  }

  return (
    <motion.aside
      className='sticky top-32 hidden max-w-60 min-w-60 flex-col overflow-hidden rounded-2xl border border-white/5 bg-black/20 text-sm leading-relaxed min-[1440px]:flex'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='px-6 py-4'>
        <h2 className='mb-0.5 text-base'>{props.user.username}</h2>
        <div className='text-muted-foreground text-sm'>{props.user.email}</div>
      </div>
      <hr className='border-white/10' />
      <div className='flex flex-col gap-0.5 px-1 py-4'>
        <Link
          href='/user/account'
          className={cx(
            'flex items-center gap-2 rounded px-5 py-3 text-gray-300',
            pathname === '/user/account'
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-white/5 hover:text-white'
          )}
        >
          <UserIcon className='size-4' />
          Account
        </Link>
        <Link
          href='/user/wallet'
          className={cx(
            'flex items-center gap-2 rounded px-5 py-3 text-gray-300',
            pathname === '/user/wallet'
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-white/5 hover:text-white'
          )}
        >
          <WalletIcon className='size-4' />
          Wallet
        </Link>
        <Link
          href='/user/transactions'
          className={cx(
            'flex items-center gap-2 rounded px-5 py-3 text-gray-300',
            pathname === '/user/transactions'
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-white/5 hover:text-white'
          )}
        >
          <CreditCardIcon className='size-4' />
          Transactions
        </Link>
        <Link
          href='/user/bonuses'
          className={cx(
            'flex items-center gap-2 rounded px-5 py-3 text-gray-300',
            pathname === '/user/bonuses'
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-white/5 hover:text-white'
          )}
        >
          <GiftIcon className='size-4' />
          Bonuses
        </Link>
      </div>
    </motion.aside>
  )
}
