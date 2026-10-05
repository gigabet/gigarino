'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import SingleViewSkeleton from '@/app/live/event/[id]/loading'
import LiveSingleView from '@/app/live/event/[id]/live-single-view'
import type { LiveSingleViewQuery } from '@/app/live/event/[id]/__generated__/LiveSingleViewQuery.graphql'

export default function LiveEventPage() {
  const { id } = useParams<{ id: string }>()

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveSingleViewQuery>(graphql`
    query LiveSingleViewQuery($id: ID!) {
      event(id: $id) {
        ...LiveSingleView @dangerously_unaliased_fixme
      }
    }
  `)

  useEffect(() => {
    loadQuery({ id: decodeURIComponent(id) }, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, id])

  if (!queryRef) return <SingleViewSkeleton />

  return <LiveSingleView queryRef={queryRef} />
}
