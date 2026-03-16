'use client'

import { useQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import fuzzysort from 'fuzzysort'
import { atom, useAtom, useSetAtom } from 'jotai'
import { isEmpty } from 'lodash'
import {
  ClockIcon,
  CoinsIcon,
  GiftIcon,
  GlobeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  RadioIcon,
  SearchIcon,
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
import Logo from '@/components/logo'
import { isLoadingOverlayState } from '@/context/providers'
import type { Game, GameProvider } from '@/types'

const navLinks = [
  { label: 'Casino', href: '/', icon: CoinsIcon },
  { label: 'Live Casino', href: '/casino/live-casino', icon: RadioIcon },
  { label: 'Sports', href: '#!', icon: VolleyballIcon },
  { label: 'In Play', href: '#!', icon: TvMinimalPlayIcon },
  { label: 'Virtual Sports', href: '#!', icon: ListOrderedIcon },
  { label: 'Bonus', href: '#!', icon: GiftIcon },
] as const

const recentSearches = ['Slots', 'Blackjack', 'Roulette', 'Live Casino']
const popularSearches = ['Book', 'Fruits', 'Dice', 'Poker']

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
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
  }, [])

  const clearSearch = () => {
    setSearchQuery('')
    searchInputRef.current?.focus()
  }

  return (
    <header className='sticky top-0 z-50 bg-neutral-900'>
      <div className='mx-auto max-w-(--breakpoint-2xl)'>
        {/* Top Bar */}
        <div className='flex h-20 items-center justify-between px-4 py-3'>
          {/* Left Section */}
          <div className='flex items-center gap-4'>
            {/* Mobile Menu Button */}
            <button
              type='button'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='p-2 text-neutral-400 hover:text-neutral-200 lg:hidden'
            >
              {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>

            {/* Logo Placeholder */}
            <Link href='/'>
              <Logo />
            </Link>
          </div>

          {/* Middle Section */}
          <div className='hidden w-full max-w-xl sm:flex'>
            <RichSearch />
          </div>

          {/* Right Section */}
          <div className='flex items-center gap-3'>
            {/* Mobile Search Button */}
            <button
              type='button'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className='p-2 text-neutral-400 hover:text-neutral-200 lg:hidden'
            >
              <SearchIcon size={20} />
            </button>

            {/* Register Button */}
            <button type='button' className='btn-brand-outline hidden h-10 sm:block'>
              <span className='flex skew-x-10 items-center gap-2'>Register</span>
            </button>

            {/* Login Button */}
            <button type='button' className='btn-brand-main h-10 px-2 text-xs sm:px-4 sm:text-sm'>
              <span className='items-center gap-2'>
                <LogInIcon className='hidden size-4 sm:block' /> Log in
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className='px-4 pb-3 lg:hidden'>
            <div className='relative'>
              <SearchIcon
                size={18}
                className='absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500'
              />
              <input
                type='text'
                placeholder='Search games, categories, providers...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full rounded-full border border-neutral-700 bg-neutral-800 px-10 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 focus:border-neutral-500 focus:outline-none'
              />
              {searchQuery && (
                <button
                  type='reset'
                  onClick={clearSearch}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500'
                >
                  <XCircleIcon size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='border-t border-neutral-700 bg-neutral-800 lg:hidden'>
            <nav className='space-y-1 px-4 py-4'>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className='flex items-center gap-3 rounded-lg px-4 py-3 text-neutral-300 transition-colors hover:bg-neutral-700'
                >
                  <div className='h-8 w-8 rounded bg-neutral-600' />
                  <span className='text-sm'>{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className='space-y-2 border-t border-neutral-700 px-4 py-4'>
              <button
                type='button'
                className='w-full rounded-lg py-3 text-sm text-neutral-300 transition-colors hover:bg-neutral-700'
              >
                Register
              </button>
              <button
                type='button'
                className='w-full rounded-lg bg-neutral-600 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-500'
              >
                Log in
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='border-t border-neutral-800'>
        {/* Navigation Links - Desktop */}
        <nav className='mx-auto hidden h-16 w-full max-w-(--breakpoint-2xl) items-center lg:flex'>
          <div className='custom-scrollbar flex w-full grow items-center gap-2 overflow-x-auto px-4'>
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className={cx(
                  'flex items-center gap-1.5 rounded-md px-4 py-2 text-sm whitespace-nowrap transition-colors',
                  pathname === link.href
                    ? 'text-brand bg-brand/10 hover:bg-brand/15'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <link.icon className='size-4' />
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Language Selector */}
            <button
              type='button'
              className='ml-auto flex items-center gap-2 px-4 py-3 text-neutral-400 hover:text-neutral-200'
            >
              <GlobeIcon size={16} />
              <span className='text-sm'>English</span>
            </button>

            {/* Help Link */}
            {/* <Link
            href='#!'
            className='flex items-center gap-2 px-4 py-3 text-neutral-400 hover:text-neutral-200'
          >
            <HelpCircle size={16} />
            <span className='text-sm'>Help Centre</span>
          </Link> */}
          </div>
        </nav>
      </div>
    </header>
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
    <div ref={searchRef} className='relative hidden max-w-xl flex-1 lg:block'>
      <div className='relative'>
        <SearchIcon
          size={18}
          className='absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500'
        />
        <input
          ref={searchInputRef}
          type='text'
          placeholder='Search games, categories, providers...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          className='focus:border-brand focus:ring-brand/20 w-full rounded-full border border-neutral-700 bg-neutral-800 px-10 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 transition-all focus:ring-4 focus:outline-none'
        />
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

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className='absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800 shadow-2xl'>
          {/* Search Content */}
          <div className='custom-scrollbar max-h-120 overflow-auto p-4'>
            {searchQuery ? (
              // Search Results
              <SearchResults query={debouncedQuery} />
            ) : (
              // Default Content
              <div className='space-y-4'>
                {/* Recent Searches */}
                <div>
                  <div className='mb-2 flex items-center gap-2'>
                    <ClockIcon size={14} className='text-neutral-500' />
                    <p className='text-xs tracking-wider text-neutral-500 uppercase'>Recent</p>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {recentSearches.map(term => (
                      <button
                        type='button'
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className='rounded-full bg-neutral-700 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-neutral-600'
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Searches */}
                <div>
                  <div className='mb-2 flex items-center gap-2'>
                    <TrendingUpIcon size={14} className='text-neutral-500' />
                    <p className='text-xs tracking-wider text-neutral-500 uppercase'>Popular</p>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {popularSearches.map(term => (
                      <button
                        type='button'
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className='rounded-full bg-neutral-700 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-neutral-600'
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SearchResults(props: { query: string }) {
  const games = useSearchGames(`?search=${encodeURI(props.query)}`)
  const providers = useSearchProviders(props.query)

  return (
    <div className='space-y-3'>
      {/* <p className='text-xs tracking-wider text-neutral-500 uppercase'>Results</p> */}
      <div className='space-y-2'>
        {!isEmpty(providers) && (
          <h3 className='px-2 text-xs tracking-wider text-neutral-500 uppercase'>Providers</h3>
        )}
        {providers.map(provider => (
          <SearchResultProvider key={provider.providerSlug} {...provider} />
        ))}

        <h3 className='px-2 text-xs tracking-wider text-neutral-500 uppercase'>
          {games.length} Games
        </h3>
        {games.map(game => (
          <SearchResultCasinoGame key={game.uuid} {...game} />
        ))}
      </div>
    </div>
  )
}

function SearchResultProvider(props: GameProvider) {
  const setSearchOpen = useSetAtom(searchOpenState)

  return (
    <Link
      href={`/casino/providers/${props.providerSlug}/`}
      className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-700'
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
      className='flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-700'
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
