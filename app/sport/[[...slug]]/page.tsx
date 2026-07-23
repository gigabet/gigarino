'use client'

import { useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { PrematchQuery } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import SportPageSkeleton from '@/app/sport/[[...slug]]/loading'
import ShortcutRow from '@/app/sport/[[...slug]]/shortcut-row'
import TournamentList, { useTournamentKeysFromUrl } from '@/app/sport/[[...slug]]/tournament-list'
import Carousel from '@/app/sport/carousel'

export default function SportPage() {
  // const params = useParams<{ slug?: string[] }>()
  // const [_filter = 'all', tournamentsSegment = null] = params.slug ?? []
  // const tournamentKeys = tournamentsSegment?.split(',').filter(Boolean) ?? []

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchQuery>(graphql`
    query PrematchQuery($filterActive: Boolean!, $tournamentKeys: [String!]!, $eventCount: Int!) {
      ...ShortcutRow
      ...PrematchList @arguments(filterActive: $filterActive, tournamentKeys: $tournamentKeys)
    }
  `)

  const tournamentKeys = useTournamentKeysFromUrl()
  const filterActive = tournamentKeys.length > 0
  useEffect(() => {
    loadQuery(
      { filterActive, tournamentKeys, eventCount: filterActive ? 20 : 4 },
      { fetchPolicy: 'store-or-network' }
    )
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, tournamentKeys, filterActive])

  if (queryRef)
    return (
      <main className='flex min-w-0 flex-col gap-4'>
        <Carousel />
        <ShortcutRow queryRef={queryRef} />
        <TournamentList queryRef={queryRef} />
      </main>
    )

  return <SportPageSkeleton />
}
