'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { PrematchSingleViewQuery } from '@/app/sport/event/[id]/__generated__/PrematchSingleViewQuery.graphql'
import PrematchSingleViewSkeleton from '@/app/sport/event/[id]/loading'
import PrematchSingleView from '@/app/sport/event/[id]/prematch-single-view'

export default function EventPage() {
  const { id } = useParams<{ id: string }>()

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<PrematchSingleViewQuery>(graphql`
    query PrematchSingleViewQuery($id: ID!) {
      event(id: $id) {
        ...PrematchSingleView
      }
    }
  `)

  useEffect(() => {
    loadQuery({ id: decodeURIComponent(id) }, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, id])

  if (!queryRef) return <PrematchSingleViewSkeleton />

  return <PrematchSingleView queryRef={queryRef} />
}
