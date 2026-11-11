'use client'

import { useSetAtom } from 'jotai'
import { useEffect, useEffectEvent } from 'react'
import { fetchQuery, graphql, requestSubscription, useRelayEnvironment } from 'react-relay'
import { toast } from 'sonner'
import { useT, useUser } from '@/context/providers'
import { unseenResettlementsAtom } from '@/context/tickets'
import { isAuthError } from '@/lib/utils'
import type { TicketUpdatesCountQuery } from '@/relay/__generated__/TicketUpdatesCountQuery.graphql'
import type { TicketUpdatesSubscription } from '@/relay/__generated__/TicketUpdatesSubscription.graphql'

const countQuery = graphql`
  query TicketUpdatesCountQuery {
    unseenResettlementCount
  }
`
const subscription = graphql`
  subscription TicketUpdatesSubscription {
    myTicketUpdated {
      reason
      ticket {
        id
        ...TicketCard
      }
    }
  }
`

export default function TicketUpdates() {
  const { user, clearUser } = useUser()
  const env = useRelayEnvironment()
  const setUnseen = useSetAtom(unseenResettlementsAtom)
  const t = useT()

  // Effect events: always see the latest t / clearUser without being effect deps,
  // so a re-render never tears down and reopens the subscription.
  const notify = useEffectEvent((reason: string | undefined) => {
    if (reason === 'RESETTLED') toast.warning(t('One of your tickets was corrected.'))
    else if (reason === 'SETTLED') toast(t('One of your tickets was settled.'))
  })

  // An auth failure means the session died while the tab stayed open. Dropping to
  // guest sets userId to undefined, and the effect cleanup disposes the subscription.
  const fail = useEffectEvent((label: string, err: unknown) => {
    if (isAuthError(err)) clearUser()
    else console.error(`[ticket-updates] ${label}`, err)
  })

  const userId = user?.id
  useEffect(() => {
    if (!userId) {
      setUnseen(0)
      return
    }

    let cancelled = false

    const refreshCount = async () => {
      try {
        const d = await fetchQuery<TicketUpdatesCountQuery>(
          env,
          countQuery,
          {},
          { fetchPolicy: 'network-only' }
        ).toPromise()
        if (!cancelled) setUnseen(d?.unseenResettlementCount ?? 0)
      } catch (e) {
        if (!cancelled) fail('count failed', e)
      }
    }

    refreshCount()
    const { dispose } = requestSubscription<TicketUpdatesSubscription>(env, {
      subscription,
      variables: {},
      onNext: res => {
        const reason = res?.myTicketUpdated?.reason
        notify(reason)
        if (reason === 'RESETTLED') refreshCount()
      },
      onError: (err: Error) => fail('subscription failed', err),
    })

    return () => {
      cancelled = true
      dispose()
    }
  }, [userId, env, setUnseen])

  return null
}
