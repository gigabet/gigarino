'use client'

import { useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import Carousel from '@/app/(sport)/carousel'
import FavouriteEvents from '@/app/(sport)/favourite-events'
import SportPageSkeleton from '@/app/(sport)/loading'
import ShortcutRow from '@/app/(sport)/shortcut-row'
import TournamentList from '@/app/(sport)/tournament-list'
import { useUser } from '@/context/providers'
import type { PrematchQuery } from '@/relay/__generated__/PrematchQuery.graphql'

export default function SportPage() {
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchQuery>(graphql`
    query PrematchQuery($hasUser: Boolean!) {
      ...Carousel @defer
      ...ShortcutRow
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
      <ShortcutRow queryRef={queryRef} />
      <FavouriteEvents queryRef={queryRef} />
      <TournamentList />
    </main>
  )
}
