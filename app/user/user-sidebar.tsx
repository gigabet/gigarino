'use client'

import { cx } from 'class-variance-authority'
import { CreditCardIcon, GiftIcon, UserIcon, WalletIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link, { type LinkProps } from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { NAVBAR_HEIGHT } from '@/app/navbar'
import type { User } from '@/types'

export default function UserSidebar(props: { user: User | null; pt: string }) {
  const pathname = usePathname()

  if (!props.user) {
    redirect(`/login?error=You must be logged in&from=${pathname}`, 'replace')
  }

  return (
    <motion.aside
      className='sticky hidden max-w-60 min-w-60 flex-col overflow-hidden rounded-2xl border border-white/5 bg-black/20 text-sm leading-relaxed min-[1440px]:flex'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        top: `${(Number(NAVBAR_HEIGHT.replace('h-', '')) + Number(props.pt.replace('pt-', ''))) / 4}rem`,
      }}
    >
      <div className='px-6 py-4'>
        <h2 className='mb-0.5 text-base'>{props.user.username}</h2>
        <div className='text-muted-foreground text-sm'>{props.user.email}</div>
      </div>
      <hr className='border-white/7' />
      <div className='flex flex-col gap-1 px-2 py-2'>
        <MenuLink href='/user/account' {...{ pathname }}>
          <UserIcon className='size-4' />
          Account
        </MenuLink>

        <MenuLink href='/user/wallet' {...{ pathname }}>
          <WalletIcon className='size-4' />
          Wallet
        </MenuLink>

        <MenuLink href='/user/transactions' {...{ pathname }}>
          <CreditCardIcon className='size-4' />
          Transactions
        </MenuLink>

        <MenuLink href='/user/bonuses' {...{ pathname }}>
          <GiftIcon className='size-4' />
          Bonuses
        </MenuLink>
      </div>
    </motion.aside>
  )
}

function MenuLink(props: { pathname: string } & LinkProps & React.JSX.IntrinsicElements['a']) {
  return (
    <Link
      href={props.href}
      className={cx(
        'flex items-center gap-2 rounded-lg px-4 py-3 text-gray-300',
        props.pathname === props.href
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-white/5 hover:text-white'
      )}
    >
      {props.children}
    </Link>
  )
}
