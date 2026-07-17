'use client'

import { sortBy } from 'lodash'
import { SearchIcon } from 'lucide-react'
import { Accordion } from 'radix-ui'
import { Suspense, useEffect, useRef } from 'react'
import ReactCountryFlag from 'react-country-flag'
import {
  fetchQuery,
  graphql,
  type PreloadedQuery,
  useFragment,
  usePreloadedQuery,
  useQueryLoader,
  useRefetchableFragment,
  useRelayEnvironment,
} from 'react-relay'
import type { PreloadedQueryRef } from 'react-relay/rsc_EXPERIMENTAL'
import { useQueryFromServer } from 'react-relay/rsc-client_EXPERIMENTAL'
import type { Sidebar$key } from '@/app/sport/__generated__/Sidebar.graphql'
import type { SidebarCountryItem$key } from '@/app/sport/__generated__/SidebarCountryItem.graphql'
import type { SidebarCountryList$key } from '@/app/sport/__generated__/SidebarCountryList.graphql'
import type { SidebarSport$key } from '@/app/sport/__generated__/SidebarSport.graphql'
import SidebarSportDetailsNode, {
  type SidebarSportDetails,
} from '@/app/sport/__generated__/SidebarSportDetails.graphql'
import type { SidebarTournaments$key } from '@/app/sport/__generated__/SidebarTournaments.graphql'
import SidebarTournamentsLoadNode, {
  type SidebarTournamentsLoad,
} from '@/app/sport/__generated__/SidebarTournamentsLoad.graphql'
import PrematchQueryNode, {
  type PrematchQuery,
  type PrematchQuery$data,
  type PrematchQuery$variables,
} from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import { SportIcon } from '@/components/sport-icon'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

const sportOrder = ['football', 'tennis', 'basketball', 'ice-hockey']

export default function Sidebar(props: {
  queryRef: PreloadedQueryRef<PrematchQuery$variables, PrematchQuery$data>
}) {
  const preloaded = useQueryFromServer<PrematchQuery>(PrematchQueryNode, props.queryRef, {
    staleThresholdMs: 3 * 60_000,
  })

  const data = useFragment(
    graphql`
      fragment Sidebar on Query {
        sports @stream(initialCount: 1) {
          key
          ...SidebarSport
        }
      }
    `,
    preloaded as Sidebar$key
  )

  const orderedSports = sortBy(data.sports, sport => {
    const index = sportOrder.indexOf(sport.key)
    return index === -1 ? Infinity : index // Put unknown kinds at the end
  })

  return (
    <aside className='scrollbar-hide! scrollbar-thumb-dark-300 sticky top-26.25 hidden max-h-[calc(100dvh-7rem)] w-full scrollbar-thin scrollbar-track-transparent place-self-start overflow-y-auto md:block'>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex h-10 items-center justify-center gap-4 rounded-full border bg-black/50 px-4 xl:justify-start'>
          <SearchIcon className='size-4 shrink-0' />
          <span className='text-muted-foreground hidden text-sm xl:inline'>search games...</span>
        </div>

        <div className='text-secondary hidden h-12 items-center justify-center rounded-xl bg-white/3 text-xs xl:flex'>
          last minute / today / all / etc
        </div>

        <Accordion.Root
          data-slot='accordion'
          type='single'
          collapsible
          className='flex flex-col gap-2'
        >
          {orderedSports.map(sport => (
            <Sport key={sport.key} sport={sport} />
          ))}
        </Accordion.Root>

        <div className='mb-2 w-full rounded-full px-4 py-3 text-center text-sm'>...</div>
      </div>
    </aside>
  )
}

function Sport(props: { sport: SidebarSport$key }) {
  const data = useFragment(
    graphql`
      fragment SidebarSport on Sport {
        key
        name
      }
    `,
    props.sport
  )

  const [queryRef, loadQuery] = useQueryLoader(graphql`
    query SidebarSportDetails($key: String) {
      sport(key: $key) {
        ...SidebarCountryList
      }
    }
  `)

  return (
    <Accordion.Item
      data-slot='accordion-item'
      key={data.key}
      value={data.key}
      className='bg-dark-200 overflow-hidden rounded-xl'
    >
      <Accordion.Trigger
        data-slot='accordion-trigger'
        className='flex w-full items-center gap-2 px-4 py-3 hover:bg-white/4 data-[state=open]:bg-white/4'
        onFocus={() => loadQuery({ key: data.key })}
        onMouseDown={() => loadQuery({ key: data.key })}
      >
        <SportIcon sport={data.key} className='size-5' />{' '}
        <span className='mr-auto text-sm'>{data.name}</span>
      </Accordion.Trigger>
      <Accordion.Content
        data-slot='accordion-content'
        className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden py-3 text-sm'
      >
        <Suspense fallback={<CategorySkeleton />}>
          {queryRef && <CountryList queryRef={queryRef} />}
        </Suspense>
      </Accordion.Content>
    </Accordion.Item>
  )
}

const HOVER_PREFETCH_DELAY_MS = 300

function CountryList(props: { queryRef: PreloadedQuery<SidebarSportDetails> }) {
  const preloaded = usePreloadedQuery<SidebarSportDetails>(SidebarSportDetailsNode, props.queryRef)
  const data = useFragment(
    graphql`
      fragment SidebarCountryList on Sport {
        categories {
          key
          ...SidebarCountryItem
        }
      }
    `,
    preloaded.sport as SidebarCountryList$key
  )

  return (
    <Accordion.Root type='multiple' className='space-y-0.5'>
      {data.categories.map(country => (
        <CountryItem key={country.key} country={country} />
      ))}
    </Accordion.Root>
  )
}

function CountryItem(props: { country: SidebarCountryItem$key }) {
  const data = useFragment(
    graphql`
      fragment SidebarCountryItem on Category {
        id
        key
        countryCode
        name
        ...SidebarTournaments
      }
    `,
    props.country as SidebarCountryItem$key
  )

  const environment = useRelayEnvironment()
  const warmed = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const warm = () => {
    if (warmed.current) return
    warmed.current = true
    fetchQuery<SidebarTournamentsLoad>(
      environment,
      SidebarTournamentsLoadNode,
      { id: data.id, open: true },
      { fetchPolicy: 'store-or-network' }
    ).subscribe({ error: () => (warmed.current = false) })
  }

  return (
    <Accordion.Item value={data.key}>
      <Accordion.Trigger
        className='flex w-full items-center gap-2.5 px-4 py-2 text-sm hover:bg-white/3 data-[state=open]:bg-white/3'
        onMouseEnter={() => (timer.current = setTimeout(warm, HOVER_PREFETCH_DELAY_MS))}
        onMouseLeave={() => clearTimeout(timer.current)}
        onMouseDown={warm}
        onFocus={warm}
      >
        <ReactCountryFlag
          svg
          countryCode={data.countryCode ?? 'UN'}
          className='w-5 rounded-[3px]'
          style={{ width: undefined, height: undefined }}
        />{' '}
        <span className='text-[0.8rem] font-normal'>{data.name}</span>
      </Accordion.Trigger>
      <Accordion.Content
        data-slot='accordion-content'
        className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden bg-white/3 px-4 pt-2 pb-4 text-sm'
      >
        <Suspense fallback={<TournamentListSkeleton />}>
          <Tournaments category={data} />
        </Suspense>
      </Accordion.Content>
    </Accordion.Item>
  )
}

function Tournaments(props: { category: SidebarTournaments$key }) {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment SidebarTournaments on Category
      @argumentDefinitions(open: { type: "Boolean", defaultValue: false })
      @refetchable(queryName: "SidebarTournamentsLoad") {
        tournaments @include(if: $open) {
          key
          name
        }
      }
    `,
    props.category
  )
  const fetched = useRef(false)

  useEffect(() => {
    if (fetched.current) return
    fetched.current = true
    refetch({ open: true }, { fetchPolicy: 'store-or-network' })
  }, [refetch])

  if (!data?.tournaments) return null

  const ROW_HEIGHT = 36 // matches the Field row height incl. gap
  const totalHeight = (data.tournaments.length ?? 0) * ROW_HEIGHT

  return (
    <div className='relative pl-6'>
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: not semantic */}
      <svg
        className='pointer-events-none absolute top-0 left-0'
        width={20}
        height={totalHeight}
        viewBox={`0 0 20 ${totalHeight}`}
      >
        {/* spine, stops at the last tick, not the container's full height */}
        <line
          x1={6}
          y1={0}
          x2={6}
          y2={(data.tournaments.length - 0.5) * ROW_HEIGHT}
          stroke='currentColor'
          strokeWidth={1}
          className='text-secondary/20'
        />
        {data.tournaments.map((t, i) => (
          <line
            key={t.key}
            x1={6}
            y1={(i + 0.5) * ROW_HEIGHT}
            x2={20}
            y2={(i + 0.5) * ROW_HEIGHT}
            stroke='currentColor'
            strokeWidth={1}
            className='text-secondary/20'
          />
        ))}
      </svg>

      <FieldGroup className='gap-0 py-0.5'>
        {data.tournaments.map(t => (
          <Field
            key={t.key}
            orientation='horizontal'
            style={{ height: ROW_HEIGHT }}
            className='items-center'
          >
            <Checkbox id={t.key} name={t.key} className='peer border-secondary ml-2' />
            <Label
              htmlFor={t.key}
              className='text-secondary peer-data-[state=checked]:text-foreground cursor-pointer text-xs font-normal'
            >
              {t.name}
            </Label>
          </Field>
        ))}
      </FieldGroup>
    </div>
  )
}

function CategorySkeleton() {
  return (
    <div className='space-y-0.5'>
      {new Array(6).fill(6).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: identical elements
          key={i}
          className='flex w-full items-center gap-2 px-4 py-2 hover:bg-white/3 data-[state=open]:bg-white/3'
        >
          <Skeleton className='h-4 w-5 rounded-[3px]' /> <Skeleton className='h-4 w-25' />
        </div>
      ))}
    </div>
  )
}

function TournamentListSkeleton() {
  const ROW_HEIGHT = 36 // matches the Field row height incl. gap
  const totalHeight = 6 * ROW_HEIGHT
  const els = new Array(2).fill(2)

  return (
    <div className='relative pl-6'>
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: not semantic */}
      <svg
        className='pointer-events-none absolute top-0 left-0'
        width={20}
        height={totalHeight}
        viewBox={`0 0 20 ${totalHeight}`}
      >
        {/* spine, stops at the last tick, not the container's full height */}
        <line
          x1={6}
          y1={0}
          x2={6}
          y2={(6 - 0.5) * ROW_HEIGHT}
          stroke='currentColor'
          strokeWidth={1}
          className='text-secondary/20'
        />
        {els.map((_, i) => (
          <line
            // biome-ignore lint/suspicious/noArrayIndexKey: ...
            key={i}
            x1={6}
            y1={(i + 0.5) * ROW_HEIGHT}
            x2={20}
            y2={(i + 0.5) * ROW_HEIGHT}
            stroke='currentColor'
            strokeWidth={1}
            className='text-secondary/20'
          />
        ))}
      </svg>

      <FieldGroup className='gap-0 py-0.5'>
        {els.map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: ...
          <div key={i} style={{ height: ROW_HEIGHT }} className='flex items-center gap-3'>
            <Skeleton className='ml-2 size-4 rounded-xs' />
            <Skeleton className='h-4 w-30' />
          </div>
        ))}
      </FieldGroup>
    </div>
  )
}
