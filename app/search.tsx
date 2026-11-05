'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Command } from 'cmdk'
import { format } from 'date-fns'
import fuzzysort from 'fuzzysort'
import { atom, useAtom, useSetAtom } from 'jotai'
import { FlameIcon, SearchIcon, SparklesIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useDeferredValue, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'
import { getGameDemo, getGameQuery, providersQuery } from '@/app/casino/context'
import GameSection from '@/app/casino/game-section'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { TeamBadge } from '@/components/team-badge'
import * as Dialog from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useDebounce } from '@/context/hooks'
import { isLoadingOverlayState, useT } from '@/context/providers'
import { cn, getRelativeDayLabel, pairToHues } from '@/lib/utils'
import type { SearchEvent$key } from '@/relay/__generated__/SearchEvent.graphql'
import type { SearchEventsQuery } from '@/relay/__generated__/SearchEventsQuery.graphql'

const MIN_CHARS = 3
const MAX_EVENTS = 6
const MAX_GAMES = 6

const searchOpenState = atom(false)

const ITEM =
  'flex w-full cursor-pointer items-center gap-4 rounded-lg p-2 text-left transition-colors data-[selected=true]:bg-white/7 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50'
const GROUP =
  '**:[[cmdk-group-heading]]:text-secondary **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:pb-1 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:tracking-wider **:[[cmdk-group-heading]]:uppercase'

export default function Search() {
  const [open, setOpen] = useAtom(searchOpenState)
  const [value, setValue] = useState('')
  const debounced = useDebounce(value, 300)
  const router = useRouter()
  const t = useT()

  const term = debounced.trim()
  // `value` is checked too, so a stale debounced term never shows after clearing
  const searching = value.trim().length >= MIN_CHARS && term.length >= MIN_CHARS

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) setValue('')
  }

  const navigate = (href: string) => {
    handleOpenChange(false)
    router.push(href)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger aria-label={t('Search')}>
        <SearchIcon className='size-5 text-neutral-500 hover:text-white sm:size-6' />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className='h-dvh w-full max-w-dvw sm:h-[75dvh] sm:max-w-2xl!'>
          <Dialog.Title className='sr-only'>{t('Search')}</Dialog.Title>

          {/* results come from the server, so cmdk only does keyboard navigation */}
          <Command
            shouldFilter={false}
            loop
            label={t('Search')}
            className='flex min-h-0 grow flex-col p-4'
          >
            <div className='relative'>
              <Command.Input
                autoFocus
                value={value}
                onValueChange={setValue}
                placeholder={t('Search events, games, providers...')}
                className='focus:border-primary focus:ring-primary/20 border-border w-full rounded-full border bg-black px-10 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 transition-all focus:ring-4 focus:outline-none'
              />
              <SearchIcon className='pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-200' />
              {value && (
                <button
                  type='button'
                  aria-label={t('Clear search')}
                  // keep focus in the input
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => setValue('')}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-300'
                >
                  <XIcon className='size-4' />
                </button>
              )}
            </div>

            {searching ? (
              <Command.List className='mt-6 min-h-0 grow overflow-y-auto pr-2'>
                <SearchResults term={term} onNavigateAction={navigate} />
              </Command.List>
            ) : (
              <div className='@container mt-6 min-h-0 grow space-y-8 overflow-y-auto'>
                {value.length > 0 && (
                  <p className='text-secondary text-xs'>
                    {t('Type at least {n} characters to search.', {
                      n: MIN_CHARS,
                    })}
                  </p>
                )}
                <div>
                  <h3 className='font-display -mb-6 flex items-center gap-2 text-xl font-bold'>
                    <FlameIcon className='text-primary size-5' /> {t('Most Searched')}
                  </h3>
                  <GameSection
                    title={t('Most Searched')}
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
                    <SparklesIcon className='text-accent size-5' /> {t('New Releases')}
                  </h3>
                  <GameSection
                    title={t('New Releases')}
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
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SearchResults(props: { term: string; onNavigateAction: (href: string) => void }) {
  // old results stay on screen (dimmed) while the next term loads, instead of flashing skeletons
  const term = useDeferredValue(props.term)

  return (
    <div
      className={cn('flex flex-col gap-6', term !== props.term && 'opacity-60 transition-opacity')}
    >
      <ErrorBoundary FallbackComponent={SectionErrorFallback}>
        <Suspense fallback={<ResultsSkeleton />}>
          <EventResults term={term} onNavigateAction={props.onNavigateAction} />
        </Suspense>
      </ErrorBoundary>
      <CasinoResults term={term} onNavigateAction={props.onNavigateAction} />
    </div>
  )
}

/* --------------------------------- Events --------------------------------- */

function EventResults(props: { term: string; onNavigateAction: (href: string) => void }) {
  const data = useLazyLoadQuery<SearchEventsQuery>(
    graphql`
      query SearchEventsQuery($search: String!, $first: Int!) {
        events(search: $search, first: $first) {
          edges {
            node {
              id
              ...SearchEvent
            }
          }
        }
      }
    `,
    { search: props.term, first: MAX_EVENTS },
    { fetchPolicy: 'store-and-network' }
  )
  const t = useT()

  const events = data.events.edges.map(e => e.node)

  return (
    <Command.Group heading={t('Events')} className={GROUP}>
      {events.length === 0 ? (
        <p className='text-secondary px-2 py-1 text-xs'>{t('No events found')}</p>
      ) : (
        events.map(node => (
          <EventResult key={node.id} event={node} onSelectAction={props.onNavigateAction} />
        ))
      )}
    </Command.Group>
  )
}

function EventResult(props: { event: SearchEvent$key; onSelectAction: (href: string) => void }) {
  const data = useFragment(
    graphql`
      fragment SearchEvent on Event {
        id
        homeCompetitor
        homeImageUrl
        awayCompetitor
        awayImageUrl
        startTime
        isLive
        homeScore
        awayScore
        tournament {
          name
        }
      }
    `,
    props.event
  )
  const t = useT()

  const href = data.isLive ? `/live/event/${data.id}` : `/event/${data.id}`
  const [homeHue, awayHue] = pairToHues(data.homeCompetitor, data.awayCompetitor)

  return (
    <Command.Item
      value={`event:${data.id}`}
      onSelect={() => props.onSelectAction(href)}
      className={ITEM}
    >
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        <p className='text-secondary truncate text-[0.65rem] uppercase'>{data.tournament.name}</p>
        <div className='flex items-center gap-2 text-sm text-neutral-300'>
          <TeamBadge name={data.homeCompetitor} imageUrl={data.homeImageUrl} hue={homeHue} />
          <span className='truncate'>{data.homeCompetitor}</span>
        </div>
        <div className='flex items-center gap-2 text-sm text-neutral-300'>
          <TeamBadge name={data.awayCompetitor} imageUrl={data.awayImageUrl} hue={awayHue} />
          <span className='truncate'>{data.awayCompetitor}</span>
        </div>
      </div>

      {data.isLive ? (
        <div className='flex shrink-0 items-center gap-3 font-mono text-sm'>
          <span className='text-destructive flex items-center gap-1.5 font-sans text-xs font-bold'>
            <span className='bg-destructive size-1.5 animate-pulse rounded-full' />
            {t('Live')}
          </span>
          <span className='flex flex-col items-end'>
            <span>{data.homeScore ?? '-'}</span>
            <span>{data.awayScore ?? '-'}</span>
          </span>
        </div>
      ) : (
        <time
          dateTime={data.startTime}
          className='text-secondary shrink-0 text-right text-xs leading-relaxed'
        >
          {getRelativeDayLabel(data.startTime)}
          <br />
          {format(data.startTime, 'HH:mm')}
        </time>
      )}
    </Command.Item>
  )
}

/* --------------------------------- Casino --------------------------------- */

function CasinoResults(props: { term: string; onNavigateAction: (href: string) => void }) {
  const t = useT()
  const setLoading = useSetAtom(isLoadingOverlayState)

  const gamesQuery = `?search=${encodeURIComponent(props.term)}`
  const { data: gamesData, isPending: gamesPending } = useQuery({
    queryKey: ['search', gamesQuery],
    queryFn: getGameQuery(gamesQuery),
    placeholderData: keepPreviousData,
  })
  const { data: allProviders } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  const games = gamesData?.items ?? []
  const providers = fuzzysort
    .go(props.term, allProviders ?? [], { key: 'name', threshold: 0.5 })
    .map(res => res.obj)

  const openGame = async (uuid: string) => {
    setLoading(true)
    try {
      const url = await getGameDemo(uuid)
      if (url === '#!') {
        setLoading(false)
        return
      }
      props.onNavigateAction(url)
    } catch (error) {
      console.error('[search] opening game failed', error)
      setLoading(false)
    }
  }

  return (
    <>
      {providers.length > 0 && (
        <Command.Group heading={t('Providers')} className={GROUP}>
          {providers.map(provider => (
            <Command.Item
              key={provider.providerSlug}
              value={`provider:${provider.providerSlug}`}
              onSelect={() => props.onNavigateAction(`/casino/providers/${provider.providerSlug}/`)}
              className={ITEM}
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
                <p className='text-sm text-neutral-300'>{provider.name}</p>
                <p className='text-xs text-neutral-500'>
                  {t('{n} Games', { n: provider.gamesCount })}
                </p>
              </div>
            </Command.Item>
          ))}
        </Command.Group>
      )}

      <Command.Group heading={t('{n} Games', { n: games.length })} className={GROUP}>
        {gamesPending ? (
          <ResultsSkeleton />
        ) : (
          games.slice(0, MAX_GAMES).map(game => (
            <Command.Item
              key={game.uuid}
              value={`game:${game.uuid}`}
              disabled={!game.image}
              onSelect={() => openGame(game.uuid)}
              className={ITEM}
            >
              <div className='h-10 w-16 overflow-hidden rounded-lg bg-white/5'>
                {game.image && <Image src={game.image} alt={game.name} width={64} height={40} />}
              </div>
              <div>
                <p className='text-sm text-neutral-300'>{game.name}</p>
                <p className='text-xs text-neutral-500'>{game.providerName}</p>
              </div>
            </Command.Item>
          ))
        )}
      </Command.Group>
    </>
  )
}

function ResultsSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-14 w-full rounded-lg' />
      <Skeleton className='h-14 w-full rounded-lg' />
    </div>
  )
}
