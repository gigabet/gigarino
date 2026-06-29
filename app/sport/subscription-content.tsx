'use client'

import { useFragment, useSubscription } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { CountdownSubscription } from '@/app/sport/__generated__/CountdownSubscription.graphql'
import type { CountdownTick_tick$key } from '@/app/sport/__generated__/CountdownTick_tick.graphql'

const sub = graphql`
  subscription CountdownSubscription($from: Int!) {
    countdown(from: $from) {
      id
      value
    }
  }
`

const fragment = graphql`
  fragment CountdownTick_tick on CountdownTick {
    id
    value
  }
`

export default function CountdownTick({ queryRef }: { queryRef: CountdownTick_tick$key }) {
  const config = { variables: { from: 10 }, subscription: sub }
  useSubscription<CountdownSubscription>(config)

  const data = useFragment(fragment, queryRef)

  return <p>{data.value}</p>
}
