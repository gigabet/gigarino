'use client'

import { useSetAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { fetchQuery, graphql, requestSubscription, useRelayEnvironment } from 'react-relay'
import { toast } from 'sonner'
import type { TicketUpdatesCountQuery } from '@/context/__generated__/TicketUpdatesCountQuery.graphql'
import type { TicketUpdatesSubscription } from '@/context/__generated__/TicketUpdatesSubscription.graphql'
import { useT, useUser } from '@/context/providers'
import { unseenResettlementsAtom } from '@/context/tickets'

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
  const { user } = useUser()
  const env = useRelayEnvironment()
  const setUnseen = useSetAtom(unseenResettlementsAtom)
  const t = useT()

  const refreshCount = useCallback(async () => {
    try {
      const d = await fetchQuery<TicketUpdatesCountQuery>(
        env,
        countQuery,
        {},
        {
          fetchPolicy: 'network-only',
        }
      ).toPromise()
      setUnseen(d?.unseenResettlementCount ?? 0)
    } catch (e) {
      console.error('[ticket-updates] count failed', e)
    }
  }, [env, setUnseen])

  const userId = user?.id
  useEffect(() => {
    if (!userId) {
      setUnseen(0)
      return
    }
    refreshCount()
    const { dispose } = requestSubscription<TicketUpdatesSubscription>(env, {
      subscription,
      variables: {},
      onNext: res => {
        const reason = res?.myTicketUpdated?.reason
        if (reason === 'RESETTLED') {
          toast.warning(t('One of your tickets was corrected.'))
          refreshCount()
        } else if (reason === 'SETTLED') {
          toast(t('One of your tickets was settled.'))
        }
      },
      onError: (err: Error) => console.error('[ticket-updates] subscription failed', err),
    })
    return dispose
  }, [userId, env, refreshCount, setUnseen, t])

  return null
}
