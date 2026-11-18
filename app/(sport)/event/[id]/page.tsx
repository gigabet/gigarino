'use client'

import { useAtomValue } from 'jotai'
import { useParams } from 'next/navigation'
import { startTransition, useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import PrematchSingleViewSkeleton from '@/app/(sport)/event/[id]/loading'
import PrematchSingleView from '@/app/(sport)/event/[id]/prematch-single-view'
import { statisticsEnabledAtom } from '@/context/statistics'
import type { PrematchSingleViewQuery } from '@/relay/__generated__/PrematchSingleViewQuery.graphql'

export default function EventPage() {
  const { id } = useParams<{ id: string }>()
  const showStats = useAtomValue(statisticsEnabledAtom)

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchSingleViewQuery>(graphql`
    query PrematchSingleViewQuery($id: ID!, $showStats: Boolean!) {
      event(id: $id) {
        ...PrematchSingleView @alias
      }
    }
  `)

  // in a transition so toggling the widget keeps the page on screen until the new data lands
  useEffect(() => {
    startTransition(() => {
      loadQuery({ id: decodeURIComponent(id), showStats }, { fetchPolicy: 'store-or-network' })
    })
  }, [loadQuery, id, showStats])

  useEffect(() => () => disposeQuery(), [disposeQuery])

  if (!queryRef) return <PrematchSingleViewSkeleton />

  return <PrematchSingleView queryRef={queryRef} />
}
