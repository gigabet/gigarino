import { useQuery } from '@tanstack/react-query'
import fuzzysort from 'fuzzysort'
import { atom, useAtom, useSetAtom } from 'jotai'
import { isEmpty } from 'lodash'
import { FlameIcon, Link, SearchIcon, SparklesIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { getGameDemo, getGameQuery, providersQuery } from '@/app/context'
import GameSection from '@/app/game-section'
import * as Dialog from '@/components/ui/dialog'
import { useDebounce } from '@/context/hooks'
import { isLoadingOverlayState } from '@/context/providers'
import type { Game, GameProvider } from '@/types'

const searchOpenState = atom(false)
export default function Search() {
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
        <SearchIcon className='size-5 text-neutral-500 hover:text-white sm:size-6' />
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
