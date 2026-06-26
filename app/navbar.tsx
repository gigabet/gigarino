'use client'

import { cx } from 'class-variance-authority'
import { atom, useAtom } from 'jotai'
import { last } from 'lodash'
import {
  ChevronDownIcon,
  CoinsIcon,
  CreditCardIcon,
  GiftIcon,
  LogOutIcon,
  RadioIcon,
  TvMinimalPlayIcon,
  UserIcon,
  VolleyballIcon,
  WalletIcon,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import BottomBar from '@/app/bottom-bar'
import Search from '@/app/search'
import Logo from '@/components/logo'
import * as DropdownMenu from '@/components/ui/dropdown-menu'
import { useBalanceUpdates } from '@/context/hooks'
import { logout } from '@/lib/auth'
import { formatBalance } from '@/lib/utils'
import type { User, Wallet } from '@/types'

const navLinks = [
  { label: 'Casino', href: '/', icon: CoinsIcon },
  { label: 'Live Casino', href: '/casino/live-casino', icon: RadioIcon },
  { label: 'Sports', href: '/sport', icon: VolleyballIcon },
  { label: 'In Play', href: '#!', icon: TvMinimalPlayIcon },
  // { label: 'Virtual Sports', href: '#!', icon: Gamepad2Icon },
  // { label: 'Bonus', href: '#!', icon: GiftIcon },
]
const navbarMobileMenuState = atom(false)
export const NAVBAR_HEIGHT = 'h-20'

export default function Navbar(props: {
  user: User | null
  wallet: Wallet | null
  token: string | undefined
}) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <>
      <header className='bg-dark/90 sticky top-0 right-0 left-0 z-50 border-b border-white/5 backdrop-blur-xl transition-all duration-500'>
        <div className='mx-auto max-w-360 px-6 lg:px-8'>
          {/* Top Bar */}
          <div className={cx(NAVBAR_HEIGHT, 'flex items-center justify-between py-3')}>
            {/* Left Section */}
            <div className='flex items-center gap-4'>
              <Link href='/' className='group'>
                <Logo />
              </Link>
            </div>

            {/* Middle Section */}
            <div className='hidden sm:flex'>
              {/* Navigation Links - Desktop */}
              <div className='mx-auto hidden h-16 items-center lg:flex'>
                <nav className='flex w-full grow items-center gap-1 overflow-x-auto px-4'>
                  {navLinks.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cx(
                        'group/nav relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                        pathname === link.href ? 'text-primary' : 'text-gray-400 hover:text-white'
                      )}
                    >
                      <span>{link.label}</span>
                      <span
                        className={cx(
                          'bg-primary absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300',
                          pathname === link.href ? 'w-3/4' : 'group-hover/nav:w-3/4'
                        )}
                      />
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Actions */}
            <div className='flex items-center gap-2 sm:gap-3'>
              <Search />

              {!!props.user && !!props.wallet && (
                <>
                  {/** biome-ignore lint/style/noNonNullAssertion: can't be null if wallet is non-null */}
                  <BalanceDisplay token={props.token!} wallet={props.wallet} />
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button
                        type='button'
                        className='-mr-2 flex items-center gap-2 rounded-full p-1.5 transition-colors hover:bg-white/5'
                      >
                        <div className='from-primary-200 to-primary-400 flex size-6 items-center justify-center rounded-full bg-linear-to-br sm:size-8'>
                          <UserIcon className='size-3 text-black sm:size-4' />
                        </div>
                        <span className='hidden text-sm font-medium text-white md:block'>
                          {props.user.displayName}
                        </span>
                        <ChevronDownIcon className='size-4 text-gray-400' />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align='end' className='w-56'>
                      <div className='border-b border-white/10 px-3 py-2'>
                        <p className='text-sm font-medium text-white'>{props.user.username}</p>
                        <p className='text-xs text-gray-400'>{props.user.email}</p>
                      </div>
                      <DropdownMenu.Item
                        onClick={() => router.push('/user/account')}
                        className='cursor-pointer text-gray-300 focus:bg-white/5 focus:text-white'
                      >
                        <UserIcon className='mr-2 size-4' />
                        Account
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={() => router.push('/user/wallet')}
                        className='cursor-pointer text-gray-300 focus:bg-white/5 focus:text-white'
                      >
                        <WalletIcon className='mr-2 size-4' />
                        Wallet
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={() => router.push('/user/transactions')}
                        className='cursor-pointer text-gray-300 focus:bg-white/5 focus:text-white'
                      >
                        <CreditCardIcon className='mr-2 size-4' />
                        Transactions
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={() => router.push('/user/bonuses')}
                        className='cursor-pointer text-gray-300 focus:bg-white/5 focus:text-white'
                      >
                        <GiftIcon className='mr-2 size-4' />
                        Bonuses
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className='bg-white/10' />
                      <DropdownMenu.Item
                        className='group/logout cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-300'
                        onClick={logout}
                      >
                        <LogOutIcon className='mr-2 size-4 group-focus/logout:text-red-200' />
                        Logout
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </>
              )}

              {/* Auth Buttons */}
              {!props.user && (
                <>
                  <Link
                    href='/register'
                    className='hidden cursor-default rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white uppercase transition-all hover:bg-white/5 sm:block'
                  >
                    Register
                  </Link>
                  <Link
                    href='/login'
                    className='bg-primary hover:shadow-glow flex cursor-default items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-black uppercase transition-all'
                  >
                    <span className='tracking-wide'>Log in</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <MobileMenu />
      <BottomBar links={navLinks} />
    </>
  )
}

function BalanceDisplay(props: { token: string; wallet: Wallet }) {
  const { data } = useBalanceUpdates(String(props.token))
  const balance = last(data)?.data.balance ?? props.wallet.balance

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className='border-primary-500/30 bg-primary-500/10 flex items-center gap-2 rounded-full border px-3 py-1.5'
    >
      {/* <WalletIcon className='text-primary hidden size-4 sm:block' /> */}
      <span className='text-primary text-xs font-semibold sm:text-sm'>
        {formatBalance(Number(balance))}
      </span>
    </motion.div>
  )
}

function MobileMenu() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(navbarMobileMenuState)

  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
        isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/** biome-ignore lint/a11y/noStaticElementInteractions: is background overlay */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: no need */}
      <div
        className='bg-dark/95 absolute inset-0 backdrop-blur-xl'
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`absolute top-20 right-0 left-0 p-4 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
        }`}
      >
        {/* Mobile Main Nav */}
        <div className='mb-6 space-y-2'>
          {navLinks.map(link => (
            <Link
              href={link.href}
              key={link.label}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                pathname === link.href
                  ? 'bg-primary/10 text-primary border-primary/30 border'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <link.icon className='size-5' />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
