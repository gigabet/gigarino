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
        <Suspense fallback='Loading...'>{queryRef && <CountryList queryRef={queryRef} />}</Suspense>
      </Accordion.Content>
    </Accordion.Item>
  )
}

const HOVER_PREFETCH_DELAY_MS = 200

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
        className='flex w-full items-center gap-2 px-4 py-2 hover:bg-white/3 data-[state=open]:bg-white/3'
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
        <span className='text-sm'>{data.name}</span>
      </Accordion.Trigger>
      <Accordion.Content
        data-slot='accordion-content'
        className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden bg-white/3 px-4 pt-2 pb-4 text-sm'
      >
        <Suspense>
          <Tournaments country={data} />
        </Suspense>
      </Accordion.Content>
    </Accordion.Item>
  )
}

function Tournaments(props: { country: SidebarTournaments$key }) {
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
    props.country
  )
  const fetched = useRef(false)

  useEffect(() => {
    if (fetched.current) return
    fetched.current = true
    refetch({ open: true }, { fetchPolicy: 'store-or-network' })
  }, [refetch])

  return (
    <FieldGroup className='gap-5 px-1'>
      {data.tournaments?.map(t => (
        <Field key={t.key} orientation='horizontal'>
          <Checkbox id={t.key} name={t.key} className='border-secondary' />
          <Label
            htmlFor={t.key}
            className='text-secondary data-[state=checked]:text-primary cursor-pointer text-xs'
          >
            {t.name}
          </Label>
        </Field>
      ))}
    </FieldGroup>
  )
}

function CategorySkeleton() {
  return <div className='bg-dark-200 h-12 animate-pulse rounded-xl' />
}
