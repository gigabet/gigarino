'use client'

import { useAtomValue } from 'jotai'
import { useParams } from 'next/navigation'
import { startTransition, useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import LiveSingleView from '@/app/live/event/[id]/live-single-view'
import SingleViewSkeleton from '@/app/live/event/[id]/loading'
import { useLiveRowRegistration } from '@/app/live/live-subscriptions'
import { statisticsEnabledAtom } from '@/context/statistics'
import type { LiveSingleViewQuery } from '@/relay/__generated__/LiveSingleViewQuery.graphql'

export default function LiveEventPage() {
  const { id } = useParams<{ id: string }>()
  const showStats = useAtomValue(statisticsEnabledAtom)
  useLiveRowRegistration(decodeURIComponent(id))

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveSingleViewQuery>(graphql`
    query LiveSingleViewQuery($id: ID!, $showStats: Boolean!) {
      event(id: $id) {
        ...LiveSingleView @alias
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

  if (!queryRef) return <SingleViewSkeleton />

  return <LiveSingleView queryRef={queryRef} />
}
