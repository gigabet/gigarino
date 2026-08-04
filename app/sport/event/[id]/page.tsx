'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { EventPageQuery } from '@/app/sport/event/[id]/__generated__/EventPageQuery.graphql'
import EventView from '@/app/sport/event/[id]/event-view'
import EventPageSkeleton from '@/app/sport/event/[id]/loading'

export default function EventPage() {
  const { id } = useParams<{ id: string }>()

  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<EventPageQuery>(graphql`
    query EventPageQuery($id: ID!) {
      event(id: $id) {
        id
        ...EventView
      }
    }
  `)

  useEffect(() => {
    loadQuery({ id: decodeURIComponent(id) }, { fetchPolicy: 'store-or-network' })
    return () => disposeQuery()
  }, [loadQuery, disposeQuery, id])

  if (!queryRef) return <EventPageSkeleton />

  return <EventView queryRef={queryRef} />
}
