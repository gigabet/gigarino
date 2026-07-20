'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { PrematchQuery } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import SportPageSkeleton from '@/app/sport/[[...slug]]/loading'
import TournamentList from '@/app/sport/[[...slug]]/tournament-list'
import Carousel from '@/app/sport/carousel'
import ShortcutRow from '@/app/sport/shortcut-row'

export default function SportPage() {
  const params = useParams<{ slug?: string[] }>()
  const [_filter = 'all', tournamentsSegment = null] = params.slug ?? []
  const tournamentKeys = tournamentsSegment?.split(',').filter(Boolean) ?? []

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchQuery>(graphql`
    query PrematchQuery($filterActive: Boolean!, $tournamentKeys: [ID!]!) {
      ...PrematchList @arguments(filterActive: $filterActive, tournamentKeys: $tournamentKeys)
    }
  `)

  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    // Load once with whatever's in the URL on first mount. Subsequent
    // tournament changes are handled entirely inside TournamentList via
    // refetch — this queryRef is not reloaded again for the life of this
    // page instance.
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
