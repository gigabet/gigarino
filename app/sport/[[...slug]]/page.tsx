'use client'

import { useEffect, useRef } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import FavouriteEvents from '@/app/sport/[[...slug]]/favourite-events'
import SportPageSkeleton from '@/app/sport/[[...slug]]/loading'
import ShortcutRow from '@/app/sport/[[...slug]]/shortcut-row'
import TournamentList, { useTournamentKeysFromUrl } from '@/app/sport/[[...slug]]/tournament-list'
import Carousel from '@/app/sport/carousel'
import { useSidebarSearch } from '@/context/hooks'
import { useUser } from '@/context/providers'
import type { PrematchQuery } from '@/relay/__generated__/PrematchQuery.graphql'

export default function SportPage() {
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchQuery>(graphql`
    query PrematchQuery(
      $filterActive: Boolean!
      $hasSearch: Boolean!
      $hasAny: Boolean!
      $hasUser: Boolean!
      $tournamentKeys: [String!]!
      $eventCount: Int!
    ) {
      ...Carousel @defer
      ...ShortcutRow
      ...FavouriteEvents @include(if: $hasUser) @alias(as: "favouriteEvents")
      ...PrematchList
        @arguments(
          filterActive: $filterActive
          tournamentKeys: $tournamentKeys
          hasSearch: $hasSearch
          hasAny: $hasAny
        )
    }
  `)

  const { user } = useUser()
  const hasUser = !!user

  const tournamentKeys = useTournamentKeysFromUrl()
  const filterActive = tournamentKeys.length > 0

  const { term: search } = useSidebarSearch()
  const hasSearch = search.length > 0
  const hasAny = filterActive || hasSearch

  const vars = useRef({
    filterActive,
    tournamentKeys,
    eventCount: filterActive ? 20 : 4,
    hasAny,
    hasSearch,
  })
  useEffect(() => {
    loadQuery({ ...vars.current, hasUser }, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, hasUser])

  if (queryRef)
    return (
      <main className='flex min-w-0 flex-col gap-4'>
        <Carousel queryRef={queryRef} />
        <ShortcutRow queryRef={queryRef} />
        <FavouriteEvents queryRef={queryRef} />
        <TournamentList queryRef={queryRef} />
      </main>
    )

  return <SportPageSkeleton />
}
