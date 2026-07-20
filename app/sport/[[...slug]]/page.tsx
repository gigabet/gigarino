'use client'

import { useEffect, useRef } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { PrematchQuery } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import SportPageSkeleton from '@/app/sport/[[...slug]]/loading'
import TournamentList, { useTournamentKeysFromUrl } from '@/app/sport/[[...slug]]/tournament-list'
import Carousel from '@/app/sport/carousel'
import ShortcutRow from '@/app/sport/shortcut-row'

export default function SportPage() {
  // const params = useParams<{ slug?: string[] }>()
  // const [_filter = 'all', tournamentsSegment = null] = params.slug ?? []
  // const tournamentKeys = tournamentsSegment?.split(',').filter(Boolean) ?? []

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchQuery>(graphql`
    query PrematchQuery($filterActive: Boolean!, $tournamentKeys: [ID!]!) {
      ...PrematchList @arguments(filterActive: $filterActive, tournamentKeys: $tournamentKeys)
    }
  `)

  const tournamentKeys = useTournamentKeysFromUrl()
  const initialised = useRef(false)
  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    loadQuery(
      { filterActive: tournamentKeys.length > 0, tournamentKeys },
      { fetchPolicy: 'store-or-network' }
    )
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, tournamentKeys])

  if (queryRef)
    return (
      <main className='flex min-w-0 flex-col gap-4'>
        <Carousel />
        <ShortcutRow />
        <TournamentList queryRef={queryRef} />
      </main>
    )

  return <SportPageSkeleton />
}
