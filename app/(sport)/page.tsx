'use client'

import { useEffect } from 'react'
import { type PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import Carousel from '@/app/(sport)/carousel'
import FavouriteEvents from '@/app/(sport)/favourite-events'
import SportPageSkeleton from '@/app/(sport)/loading'
import TopTournaments from '@/app/(sport)/top-tournaments'
import TournamentList from '@/app/(sport)/tournament-list'
import { useUser } from '@/context/providers'
import type { PrematchQuery } from '@/relay/__generated__/PrematchQuery.graphql'
import PrematchQueryNode from '@/relay/__generated__/PrematchQuery.graphql'

export default function SportPage() {
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchQuery>(graphql`
    query PrematchQuery($hasUser: Boolean!) {
      ...Carousel @defer
      ...TopTournaments
      ...FavouriteEvents @include(if: $hasUser) @alias(as: "favouriteEvents")
    }
  `)

  const { user } = useUser()
  const hasUser = !!user

  useEffect(() => {
    loadQuery({ hasUser }, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, hasUser])

  if (!queryRef) return <SportPageSkeleton />

  return (
    <main className='flex min-w-0 flex-col gap-4'>
      <Carousel queryRef={queryRef} />
      {/* xl+ shows them in the sidebar instead */}
      <div className='xl:hidden'>
        <MobileTopTournaments queryRef={queryRef} />
      </div>
      <FavouriteEvents queryRef={queryRef} />
      <TournamentList />
    </main>
  )
}

function MobileTopTournaments(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  const preloaded = usePreloadedQuery<PrematchQuery>(PrematchQueryNode, props.queryRef)
  return <TopTournaments query={preloaded} layout='bar' />
}
