'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Command } from 'cmdk'
import { format } from 'date-fns'
import fuzzysort from 'fuzzysort'
import { atom, useAtom, useSetAtom } from 'jotai'
import { SearchIcon, SearchXIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useDeferredValue, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'
import { getGameDemo, getGameQuery, providersQuery } from '@/app/casino/context'
import { SectionErrorFallback } from '@/components/section-error-fallback'
import { TeamBadge } from '@/components/team-badge'
import * as Dialog from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import * as Tabs from '@/components/ui/tabs'
import { useDebounce } from '@/context/hooks'
import { isLoadingOverlayState, useT } from '@/context/providers'
import { cn, getRelativeDayLabel, pairToHues } from '@/lib/utils'
import type { SearchEvent$key } from '@/relay/__generated__/SearchEvent.graphql'
import type { SearchEventsQuery } from '@/relay/__generated__/SearchEventsQuery.graphql'

const MIN_CHARS = 3
const MAX_EVENTS = 6
const MAX_GAMES = 6
const MAX_PROVIDERS = 3
// fetched per list; upcoming is filtered client-side (starting-soon events also sit in the live list)
const FETCH_EVENTS = 12

const searchOpenState = atom(false)

const ITEM =
  'flex w-full cursor-pointer items-center gap-4 rounded-lg p-2 text-left transition-colors data-[selected=true]:bg-white/8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50'
const GROUP =
  '**:[[cmdk-group-heading]]:text-secondary **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:pb-1 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:tracking-wider **:[[cmdk-group-heading]]:uppercase'
const TAB =
  'data-[state=active]:bg-primary flex-none rounded-full bg-white/8 px-4 py-2 text-xs font-medium whitespace-nowrap text-white shadow-none data-[state=active]:text-black'

type SearchTab = 'events' | 'casino'

export default function Search() {
  const [open, setOpen] = useAtom(searchOpenState)
  const [tab, setTab] = useState<SearchTab>('events')
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debounced = useDebounce(value, 300)
  const router = useRouter()
  const t = useT()

  const term = debounced.trim()
  // `value` is checked too, so a stale debounced term never shows after clearing
  const searching = value.trim().length >= MIN_CHARS && term.length >= MIN_CHARS

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setValue('')
      setTab('events')
    }
  }

  const navigate = (href: string) => {
    handleOpenChange(false)
    router.push(href)
  }

  // clicking a tab moves focus to it; hand it back so typing keeps working
  const focusInput = () => inputRef.current?.focus()

  const idle = (title: string, description: string) => (
    <Hint
      icon={<SearchIcon className='size-5' />}
      title={title}
      description={
        value.trim().length > 0
          ? t('Type at least {n} characters to search.', { n: MIN_CHARS })
          : description
      }
    />
  )

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger aria-label={t('Search')}>
        <SearchIcon className='size-5 text-neutral-500 hover:text-white sm:size-6' />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/70 backdrop-blur-sm' />
        <Dialog.Content className='bg-dark-200 flex h-dvh w-full max-w-dvw flex-col gap-0 overflow-hidden border-white/10 p-0 shadow-2xl sm:h-[75dvh] sm:max-w-2xl!'>
          <Dialog.Title className='sr-only'>{t('Search')}</Dialog.Title>

          {/* results come from the server, so cmdk only does keyboard navigation */}
          <Command
            shouldFilter={false}
            loop
            label={t('Search')}
            className='flex min-h-0 grow flex-col'
          >
            <Tabs.Root
              value={tab}
              onValueChange={v => setTab(v === 'casino' ? 'casino' : 'events')}
              className='min-h-0 grow gap-0'
            >
              {/* pr-12 leaves room for the dialog's close button */}
              <div className='flex flex-col gap-3 border-b border-white/10 p-4 pr-12'>
                <div className='relative'>
                  <Command.Input
                    ref={inputRef}
                    autoFocus
                    value={value}
                    onValueChange={setValue}
                    placeholder={
                      tab === 'events'
                        ? t('Search teams, leagues...')
                        : t('Search games, providers...')
                    }
                    className='bg-dark focus:border-primary focus:ring-primary/20 w-full rounded-full border border-white/10 px-10 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 transition-all focus:ring-4 focus:outline-none'
                  />
                  <SearchIcon className='pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400' />
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

                <Tabs.List className='h-auto w-fit justify-start gap-2 bg-transparent p-0'>
                  <Tabs.Trigger value='events' className={TAB} onClick={focusInput}>
                    {t('Events')}
                  </Tabs.Trigger>
                  <Tabs.Trigger value='casino' className={TAB} onClick={focusInput}>
                    {t('Casino')}
                  </Tabs.Trigger>
                </Tabs.List>
              </div>

              {/* inactive tabs unmount, so only the active tab ever sends requests */}
              <Tabs.Content value='events' className='min-h-0 flex-1 overflow-y-auto p-4'>
                {searching ? (
                  <EventsTab term={term} onNavigateAction={navigate} />
                ) : (
                  idle(t('Search events'), t('Find matches by team, league or tournament.'))
                )}
              </Tabs.Content>

              <Tabs.Content value='casino' className='min-h-0 flex-1 overflow-y-auto p-4'>
                {searching ? (
                  <CasinoTab term={term} onNavigateAction={navigate} />
                ) : (
                  idle(t('Search casino'), t('Find games and providers by name.'))
                )}
              </Tabs.Content>
            </Tabs.Root>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Hint(props: { icon: React.ReactNode; title: string; description?: string }) {
  return (
    <div className='flex flex-col items-center justify-center gap-3 px-6 py-16 text-center'>
      <div className='bg-dark-300 text-secondary flex size-12 items-center justify-center rounded-full'>
        {props.icon}
      </div>
      <div className='space-y-1'>
        <p className='text-foreground text-sm font-semibold'>{props.title}</p>
        {props.description && <p className='text-secondary text-xs'>{props.description}</p>}
      </div>
    </div>
  )
}

function ResultsSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-14 w-full rounded-lg' />
      <Skeleton className='h-14 w-full rounded-lg' />
      <Skeleton className='h-14 w-full rounded-lg' />
    </div>
  )
}

/* --------------------------------- Events --------------------------------- */

function EventsTab(props: { term: string; onNavigateAction: (href: string) => void }) {
  // old results stay on screen (dimmed) while the next term loads, instead of flashing skeletons
  const term = useDeferredValue(props.term)

  return (
    <div className={cn(term !== props.term && 'opacity-60 transition-opacity')}>
      {/* resetKeys: a new term retries after an error instead of keeping the fallback */}
      <ErrorBoundary FallbackComponent={SectionErrorFallback} resetKeys={[term]}>
        <Suspense fallback={<ResultsSkeleton />}>
          <EventResults term={term} onNavigateAction={props.onNavigateAction} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

function EventResults(props: { term: string; onNavigateAction: (href: string) => void }) {
  const data = useLazyLoadQuery<SearchEventsQuery>(
    graphql`
      query SearchEventsQuery($search: String!, $first: Int!) {
        live: liveEvents(search: $search, first: $first) {
          edges {
            node {
              id
              ...SearchEvent
            }
          }
        }
        upcoming: events(search: $search, first: $first) {
          edges {
            node {
              id
              isLive
              ...SearchEvent
            }
          }
        }
      }
    `,
    { search: props.term, first: FETCH_EVENTS },
    { fetchPolicy: 'store-and-network' }
  )
  const t = useT()

  const live = data.live.edges.map(e => e.node).slice(0, MAX_EVENTS)
  // same rule as the prematch lists: live events belong to the live group
  const upcoming = data.upcoming.edges
    .map(e => e.node)
    .filter(n => !n.isLive)
    .slice(0, MAX_EVENTS)

  if (live.length === 0 && upcoming.length === 0) {
    return (
      <Hint
        icon={<SearchXIcon className='size-5' />}
        title={t('No matches for "{query}"', { query: props.term })}
        description={t('Try a different team, league, or spelling.')}
      />
    )
  }

  return (
    <Command.List className='flex flex-col gap-4'>
      {live.length > 0 && (
        <Command.Group heading={t('Live')} className={GROUP}>
          {live.map(node => (
            <EventResult key={node.id} event={node} onSelectAction={props.onNavigateAction} />
          ))}
        </Command.Group>
      )}
      {upcoming.length > 0 && (
        <Command.Group heading={t('Upcoming')} className={GROUP}>
          {upcoming.map(node => (
            <EventResult key={node.id} event={node} onSelectAction={props.onNavigateAction} />
          ))}
        </Command.Group>
      )}
    </Command.List>
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
        status
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

  const [homeHue, awayHue] = pairToHues(data.homeCompetitor, data.awayCompetitor)
  const href = data.isLive ? `/live/event/${data.id}` : `/event/${data.id}`
  // isLive with status SCHEDULED is "starting soon": no score or running clock yet
  const inPlay = data.status === 'LIVE'

  return (
    <Command.Item
      value={`event:${data.id}`}
      onSelect={() => props.onSelectAction(href)}
      className={ITEM}
    >
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        <p className='text-secondary truncate text-[0.65rem] uppercase'>{data.tournament.name}</p>
        <div className='flex items-center gap-2 text-sm text-neutral-200'>
          <TeamBadge name={data.homeCompetitor} imageUrl={data.homeImageUrl} hue={homeHue} />
          <span className='truncate'>{data.homeCompetitor}</span>
        </div>
        <div className='flex items-center gap-2 text-sm text-neutral-200'>
          <TeamBadge name={data.awayCompetitor} imageUrl={data.awayImageUrl} hue={awayHue} />
          <span className='truncate'>{data.awayCompetitor}</span>
        </div>
      </div>

      {inPlay ? (
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
          suppressHydrationWarning
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

function CasinoTab(props: { term: string; onNavigateAction: (href: string) => void }) {
  const t = useT()
  const setLoading = useSetAtom(isLoadingOverlayState)

  const gamesQuery = `?search=${encodeURIComponent(props.term)}`
  const {
    data: gamesData,
    isPending,
    isPlaceholderData,
  } = useQuery({
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
    .slice(0, MAX_PROVIDERS)

  const openGame = async (uuid: string) => {
    setLoading(true)
    try {
      const url = await getGameDemo(uuid)
      // getGameDemo swallows its own errors and returns '#!'
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

  if (!isPending && games.length === 0 && providers.length === 0) {
    return (
      <Hint
        icon={<SearchXIcon className='size-5' />}
        title={t('No matches for "{query}"', { query: props.term })}
        description={t('Try a different team, league, or spelling.')}
      />
    )
  }

  return (
    <Command.List
      className={cn('flex flex-col gap-4', isPlaceholderData && 'opacity-60 transition-opacity')}
    >
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
                <p className='text-sm text-neutral-200'>{provider.name}</p>
                <p className='text-xs text-neutral-500'>
                  {t('{n} Games', { n: provider.gamesCount })}
                </p>
              </div>
            </Command.Item>
          ))}
        </Command.Group>
      )}

      {isPending ? (
        <ResultsSkeleton />
      ) : (
        games.length > 0 && (
          <Command.Group
            heading={t('{n} Games', { n: gamesData?.total ?? games.length })}
            className={GROUP}
          >
            {games.slice(0, MAX_GAMES).map(game => (
              <Command.Item
                key={game.uuid}
                value={`game:${game.uuid}`}
                // GameCard treats a missing image as "unavailable"; next/image throws on an empty src
                disabled={!game.image}
                onSelect={() => openGame(game.uuid)}
                className={ITEM}
              >
                <div className='h-10 w-16 overflow-hidden rounded-lg bg-white/5'>
                  {game.image && <Image src={game.image} alt={game.name} width={64} height={40} />}
                </div>
                <div>
                  <p className='text-sm text-neutral-200'>{game.name}</p>
                  <p className='text-xs text-neutral-500'>{game.providerName}</p>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        )
      )}
    </Command.List>
  )
}
