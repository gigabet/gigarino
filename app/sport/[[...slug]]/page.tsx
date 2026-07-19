'use client'

import { useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { PrematchQuery } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import SportPageSkeleton from '@/app/sport/[[...slug]]/loading'
import TournamentList from '@/app/sport/[[...slug]]/tournament-list'
import Carousel from '@/app/sport/carousel'
import ShortcutRow from '@/app/sport/shortcut-row'

export default function SportPage() {
  // const params = useParams<{ slug?: string[] }>()
  // const [_filter = 'all', tournamentsSegment = null] = params.slug ?? [] // only if page.tsx itself needs it
  // const initialTournaments = tournamentsSegment?.split(',').filter(Boolean) ?? []

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchQuery>(graphql`
    query PrematchQuery {
      ...PrematchList
    }
  `)

  useEffect(() => {
    loadQuery({}, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery])

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
