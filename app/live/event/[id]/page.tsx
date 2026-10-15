'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import LiveSingleView from '@/app/live/event/[id]/live-single-view'
import SingleViewSkeleton from '@/app/live/event/[id]/loading'
import { useLiveRowRegistration } from '@/app/live/live-subscriptions'
import type { LiveSingleViewQuery } from '@/relay/__generated__/LiveSingleViewQuery.graphql'

export default function LiveEventPage() {
  const { id } = useParams<{ id: string }>()
  useLiveRowRegistration(decodeURIComponent(id))

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
