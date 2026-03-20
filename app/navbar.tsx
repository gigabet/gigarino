'use client'

import { useQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import fuzzysort from 'fuzzysort'
import { atom, useAtom, useSetAtom } from 'jotai'
import { isEmpty } from 'lodash'
import {
  CoinsIcon,
  FlameIcon,
  Gamepad2Icon,
  GiftIcon,
  MenuIcon,
  RadioIcon,
  SearchIcon,
  SparklesIcon,
  TrendingUpIcon,
  TvMinimalPlayIcon,
  VolleyballIcon,
  XCircleIcon,
  XIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { getGameDemo, getGameQuery, providersQuery } from '@/app/context'
import GameSection from '@/app/game-section'
import Logo from '@/components/logo'
import * as Dialog from '@/components/ui/dialog'
import { isLoadingOverlayState } from '@/context/providers'
import type { Game, GameProvider } from '@/types'

const navLinks = [
  { label: 'Casino', href: '/', icon: CoinsIcon },
  { label: 'Live Casino', href: '/casino/live-casino', icon: RadioIcon },
  { label: 'Sports', href: '#!', icon: VolleyballIcon },
  { label: 'In Play', href: '#!', icon: TvMinimalPlayIcon },
  { label: 'Virtual Sports', href: '#!', icon: Gamepad2Icon },
  { label: 'Bonus', href: '#!', icon: GiftIcon },
] as const

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header className='bg-dark/90 sticky top-0 right-0 left-0 z-50 border-b border-white/5 backdrop-blur-xl transition-all duration-500'>
        <div className='mx-auto max-w-360 px-6 lg:px-8'>
          {/* Top Bar */}
          <div className='flex h-20 items-center justify-between py-3'>
            {/* Left Section */}
            <div className='flex items-center gap-4'>
              <Link href='/' className='group'>
                <Logo />
              </Link>
            </div>

            {/* Middle Section */}
            <div className='hidden sm:flex'>
              {/* Navigation Links - Desktop */}
              <nav className='mx-auto hidden h-16 items-center lg:flex'>
                <div className='custom-scrollbar flex w-full grow items-center gap-1 overflow-x-auto px-4'>
                  {navLinks.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cx(
                        'group/nav relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                        pathname === link.href ? 'text-primary' : 'text-gray-400 hover:text-white'
                      )}
                    >
                      {/* <link.icon className='size-4' /> */}
                      <span>{link.label}</span>
                      <span
                        className={cx(
                          'bg-primary absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300',
                          pathname === link.href ? 'w-3/4' : 'group-hover/nav:w-3/4'
                        )}
                      />
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            {/* Right Actions */}
            <div className='flex items-center gap-3'>
              <RichSearch />

              {/* Auth Buttons */}
              <button
                type='button'
                className='hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white uppercase transition-all hover:bg-white/5 sm:block'
              >
                Register
              </button>
              <button
                type='button'
                className='bg-primary hover:shadow-glow flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-black uppercase transition-all'
              >
                <span className='tracking-wide'>Log in</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type='button'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='p-2 text-white lg:hidden'
              >
                {isMobileMenuOpen ? <XIcon className='size-6' /> : <MenuIcon className='size-6' />}
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
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
                <link.icon className='h-5 w-5' />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup timeout if value changes or component unmounts
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

const searchOpenState = atom(false)
function RichSearch() {
  const [isSearchOpen, setIsSearchOpen] = useAtom(searchOpenState)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsSearchOpen])

  const clearSearch = () => {
    setSearchQuery('')
    searchInputRef.current?.focus()
  }

  const debouncedQuery = useDebounce(searchQuery, 300)

  return (
    <Dialog.Root open={isSearchOpen} onOpenChange={() => setIsSearchOpen(o => !o)}>
      <Dialog.Trigger>
        <SearchIcon className='size-6 text-neutral-500 hover:text-white' />
      </Dialog.Trigger>

      {/* Search Modal */}
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className='h-dvh w-full max-w-dvw sm:h-[75dvh] sm:max-w-2xl!'>
          <Dialog.Title className='px-4'>Search</Dialog.Title>
          {/* Search Content */}
          <div className='flex grow flex-col p-4'>
            <div className='relative'>
              <input
                ref={searchInputRef}
                type='text'
                placeholder='Search games, providers...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='focus:border-primary focus:ring-primary/20 border-border w-full rounded-full border bg-black px-10 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 transition-all focus:ring-4 focus:outline-none'
              />
              <SearchIcon className='absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-200' />
              {searchQuery && (
                <button
                  type='reset'
                  onClick={clearSearch}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-300'
                >
                  <XCircleIcon size={16} />
                </button>
              )}
            </div>
            {searchQuery ? (
              // Search Results
              <SearchResults query={debouncedQuery} />
            ) : (
              // Default Content
              <div className='@container mt-10 space-y-8'>
                <div>
                  <h3 className='font-display -mb-6 flex items-center gap-2 text-xl font-bold'>
                    <FlameIcon className='text-primary size-5' /> Most Searched
                  </h3>
                  <GameSection
                    title='Most Searched'
                    category={{
                      icon: '',
                      slug: '',
                      query: '?sortBy=playCount&limit=3',
                    }}
                    noHeader
                  />
                </div>

                <div>
                  <h3 className='font-display -mb-6 flex items-center gap-2 text-xl font-bold'>
                    <SparklesIcon className='text-accent size-5' /> New Releases
                  </h3>
                  <GameSection
                    title='New Releases'
                    category={{
                      icon: '',
                      slug: '',
                      query: '?category=new&limit=3',
                    }}
                    noHeader
                  />
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SearchResults(props: { query: string }) {
  const games = useSearchGames(`?search=${encodeURI(props.query)}`)
  const providers = useSearchProviders(props.query)

  return (
    <div className='mt-10 max-h-[75dvh] overflow-y-auto pr-2 sm:max-h-[50dvh]'>
      {/* <p className='text-xs tracking-wider text-neutral-500 uppercase'>Results</p> */}
      <div className='flex flex-col gap-8'>
        {!isEmpty(providers) && (
          <div>
            <h3 className='font-display mb-2 text-xl font-bold'>Providers</h3>
            {providers.map(provider => (
              <SearchResultProvider key={provider.providerSlug} {...provider} />
            ))}
          </div>
        )}

        <div>
          <h3 className='font-display mb-2 text-xl font-bold'>{games.length} Games</h3>
          {games.map(game => (
            <SearchResultCasinoGame key={game.uuid} {...game} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SearchResultProvider(props: GameProvider) {
  const setSearchOpen = useSetAtom(searchOpenState)

  return (
    <Link
      href={`/casino/providers/${props.providerSlug}/`}
      className='flex items-center gap-6 rounded-lg p-2 transition-colors hover:bg-white/7'
      onClick={() => setSearchOpen(false)}
    >
      <div className='overflow-hidden rounded-lg'>
        <Image
          src={`/images/providers/${props.providerSlug}.png`}
          alt={props.name}
          width={66}
          height={30}
        />
      </div>
      <div>
        <p className='text-sm text-neutral-300'>{props.name}</p>
        <p className='text-xs text-neutral-500'>{props.gamesCount} Games</p>
      </div>
    </Link>
  )
}

function SearchResultCasinoGame(props: Game) {
  const setSearchOpen = useSetAtom(searchOpenState)
  const router = useRouter()
  const setLoading = useSetAtom(isLoadingOverlayState)

  const handleClick = async () => {
    setLoading(true)
    setSearchOpen(false)
    const url = await getGameDemo(props.uuid)
    router.push(url)
  }

  return (
    <button
      key={props.uuid}
      type='button'
      className='flex w-full cursor-pointer items-center gap-6 rounded-lg p-2 transition-colors hover:bg-white/7'
      onClick={handleClick}
    >
      <div className='overflow-hidden rounded-lg'>
        <Image src={props.image} alt={props.name} width={64} height={40} />
      </div>
      <div className='text-left'>
        <p className='text-sm text-neutral-300'>{props.name}</p>
        <p className='text-xs text-neutral-500'>{props.providerName}</p>
      </div>
    </button>
  )
}

function useSearchGames(query: string) {
  const { data } = useQuery({
    queryKey: ['search', query],
    queryFn: getGameQuery(query),
  })

  return data?.items ?? []
}

function useSearchProviders(query: string) {
  const { data } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return fuzzysort.go(query, data ?? [], { key: 'name', threshold: 0.5 }).map(res => res.obj)
}
