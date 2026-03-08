'use client'

import { useQuery } from '@tanstack/react-query'
import fuzzysort from 'fuzzysort'
import { atom, useAtom, useSetAtom } from 'jotai'
import {
  Building2,
  Clock,
  Globe,
  Grid3X3,
  Menu,
  Search,
  TrendingUp,
  X,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getGameQuery, providersQuery, tagsQuery } from '@/app/context'

const navLinks = [
  { label: 'Promotions', href: '#!' },
  { label: 'Home', href: '/' },
  { label: 'Casino', href: '/' },
  { label: 'Live Casino', href: '/' },
  { label: 'Jackpots', href: '#!' },
  { label: 'Sports', href: '#!' },
  { label: 'Live Betting', href: '#!' },
  { label: 'Virtual Sports', href: '#!' },
  { label: 'Challenges', href: '#!' },
  { label: 'Tournaments', href: '#!' },
  { label: 'Bonus', href: '#!' },
  { label: 'Shop', href: '#!' },
  { label: 'VIP Levels', href: '#!' },
] as const

const searchCategories = [
  { id: 'games', label: 'Games', icon: Grid3X3 },
  { id: 'categories', label: 'Categories', icon: TrendingUp },
  { id: 'providers', label: 'Providers', icon: Building2 },
] as const

const recentSearches = ['Slots', 'Blackjack', 'Roulette', 'Live Casino']
const popularSearches = ['Book', 'Fruits', 'Dice', 'Poker']

export default function Navbar() {
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
    <header className='sticky top-0 z-50 bg-gray-900'>
      {/* Top Bar */}
      <div className='flex items-center justify-between px-4 py-3'>
        {/* Left Section */}
        <div className='flex flex-1 items-center gap-4'>
          {/* Mobile Menu Button */}
          <button
            type='button'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='p-2 text-gray-400 hover:text-gray-200 lg:hidden'
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Placeholder */}
          <div className='flex h-8 w-32 shrink-0 items-center justify-center rounded bg-gray-700'>
            <span className='text-sm font-medium text-gray-500'>LOGO</span>
          </div>

          <RichSearch />
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-3'>
          {/* Mobile Search Button */}
          <button
            type='button'
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className='p-2 text-gray-400 hover:text-gray-200 lg:hidden'
          >
            <Search size={20} />
          </button>

          {/* Register Button */}
          <button
            type='button'
            className='hidden cursor-pointer px-4 py-2 text-sm text-gray-300 transition-colors hover:text-white sm:block'
          >
            Register
          </button>

          {/* Login Button */}
          <button
            type='button'
            className='rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-500'
          >
            Log in
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className='px-4 pb-3 lg:hidden'>
          <div className='relative'>
            <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500' />
            <input
              type='text'
              placeholder='Search games, categories, providers...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full rounded-lg border border-gray-700 bg-gray-800 py-2.5 pr-10 pl-10 text-sm text-gray-200 placeholder-gray-500 focus:border-gray-500 focus:outline-none'
            />
            {searchQuery && (
              <button
                type='reset'
                onClick={clearSearch}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500'
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation Links - Desktop */}
      <nav className='hidden border-t border-gray-800 lg:block'>
        <div className='flex items-center gap-6 overflow-x-auto px-4'>
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className='flex items-center gap-1 px-0 py-3 text-sm whitespace-nowrap text-gray-400 transition-colors hover:text-gray-200'
            >
              {link.label === 'Promotions' && (
                <span className='h-1.5 w-1.5 rounded-full bg-gray-500' />
              )}
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Language Selector */}
          <button
            type='button'
            className='ml-auto flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-gray-200'
          >
            <Globe size={16} />
            <span className='text-sm'>English</span>
          </button>

          {/* Help Link */}
          {/* <Link
            href='#!'
            className='flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-gray-200'
          >
            <HelpCircle size={16} />
            <span className='text-sm'>Help Centre</span>
          </Link> */}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='border-t border-gray-700 bg-gray-800 lg:hidden'>
          <nav className='space-y-1 px-4 py-4'>
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className='flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-colors hover:bg-gray-700'
              >
                <div className='h-8 w-8 rounded bg-gray-600' />
                <span className='text-sm'>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className='space-y-2 border-t border-gray-700 px-4 py-4'>
            <button
              type='button'
              className='w-full rounded-lg py-3 text-sm text-gray-300 transition-colors hover:bg-gray-700'
            >
              Register
            </button>
            <button
              type='button'
              className='w-full rounded-lg bg-gray-600 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-500'
            >
              Log in
            </button>
          </div>
        </div>
      )}
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
  const [activeCategory, setActiveCategory] =
    useState<(typeof searchCategories)[number]['id']>('games')
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
        <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500' />
        <input
          ref={searchInputRef}
          type='text'
          placeholder='Search games, categories, providers...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          className='w-full rounded-lg border border-gray-700 bg-gray-800 py-2.5 pr-10 pl-10 text-sm text-gray-200 placeholder-gray-500 transition-all focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none'
        />
        {searchQuery && (
          <button
            type='reset'
            onClick={clearSearch}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-300'
          >
            <XCircle size={16} />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className='absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-2xl'>
          {/* Category Tabs */}
          <div className='flex border-b border-gray-700'>
            {searchCategories.map(cat => (
              <button
                type='button'
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'border-b-2 border-gray-400 text-gray-200'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Content */}
          <div className='max-h-120 overflow-auto p-4'>
            {searchQuery ? (
              // Search Results
              <SearchResults category={activeCategory} query={debouncedQuery} />
            ) : (
              // Default Content
              <div className='space-y-4'>
                {/* Recent Searches */}
                <div>
                  <div className='mb-2 flex items-center gap-2'>
                    <Clock size={14} className='text-gray-500' />
                    <p className='text-xs tracking-wider text-gray-500 uppercase'>Recent</p>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {recentSearches.map(term => (
                      <button
                        type='button'
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className='rounded-full bg-gray-700 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-gray-600'
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Searches */}
                <div>
                  <div className='mb-2 flex items-center gap-2'>
                    <TrendingUp size={14} className='text-gray-500' />
                    <p className='text-xs tracking-wider text-gray-500 uppercase'>Popular</p>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {popularSearches.map(term => (
                      <button
                        type='button'
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className='rounded-full bg-gray-700 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-gray-600'
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Categories */}
                <div>
                  <p className='mb-2 text-xs tracking-wider text-gray-500 uppercase'>
                    Quick Access
                  </p>
                  <div className='grid grid-cols-3 gap-2'>
                    {[
                      'Slots',
                      'Table Games',
                      'Live Casino',
                      'Jackpots',
                      'New Games',
                      'Popular',
                    ].map(cat => (
                      <Link
                        key={cat}
                        href='#!'
                        className='rounded-lg bg-gray-700 p-3 text-center transition-colors hover:bg-gray-600'
                      >
                        <div className='mx-auto mb-2 h-8 w-8 rounded-lg bg-gray-600' />
                        <p className='text-xs text-gray-300'>{cat}</p>
                      </Link>
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

function SearchResults(props: {
  category: (typeof searchCategories)[number]['id']
  query: string
}) {
  const games = useSearchGames(`?search=${encodeURI(props.query)}`)
  const categories = useSearchCategories(props.query)
  const providers = useSearchProviders(props.query)
  const setSearchOpen = useSetAtom(searchOpenState)

  return (
    <div className='space-y-3'>
      <p className='text-xs tracking-wider text-gray-500 uppercase'>Results</p>
      <div className='space-y-2'>
        {props.category === 'games' &&
          games.map(game => (
            <Link
              key={game.uuid}
              href='#!'
              className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-700'
              onClick={() => setSearchOpen(false)}
            >
              <div className='overflow-hidden rounded-lg'>
                <Image src={game.image} alt={game.name} width={64} height={40} />
              </div>
              <div>
                <p className='text-sm text-gray-300'>{game.name}</p>
                <p className='text-xs text-gray-500'>{game.providerName}</p>
              </div>
            </Link>
          ))}

        {props.category === 'categories' &&
          categories.map(cat => (
            <Link
              key={cat.label}
              href='#!'
              // href={`/casino/providers/${cat.providerSlug}/`}
              className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-700'
              onClick={() => setSearchOpen(false)}
            >
              {/* <div className='overflow-hidden rounded-lg'>
                <Image
                  src={`/images/providers/${cat.providerSlug}.png`}
                  alt={cat.name}
                  width={66}
                  height={30}
                />
              </div> */}
              <div>
                <p className='text-sm text-gray-300'>{cat.label}</p>
                <p className='text-xs text-gray-500'>{cat.gamesCount} Games</p>
              </div>
            </Link>
          ))}

        {props.category === 'providers' &&
          providers.map(provider => (
            <Link
              key={provider.providerSlug}
              href={`/casino/providers/${provider.providerSlug}/`}
              className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-700'
              onClick={() => setSearchOpen(false)}
            >
              <div className='overflow-hidden rounded-lg'>
                <Image
                  src={`/images/providers/${provider.providerSlug}.png`}
                  alt={provider.name}
                  width={66}
                  height={30}
                />
              </div>
              <div>
                <p className='text-sm text-gray-300'>{provider.name}</p>
                <p className='text-xs text-gray-500'>{provider.gamesCount} Games</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

function useSearchGames(query: string) {
  const { data } = useQuery({
    queryKey: ['search', query],
    queryFn: getGameQuery(query),
  })

  return data?.items ?? []
}

function useSearchCategories(query: string) {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: tagsQuery,
  })

  return fuzzysort.go(query, data ?? [], { key: 'label', threshold: 0.5 }).map(res => res.obj)
}

function useSearchProviders(query: string) {
  const { data } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return fuzzysort.go(query, data ?? [], { key: 'name', threshold: 0.5 }).map(res => res.obj)
}
