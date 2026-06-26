'use client'

import { useFragment } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { StreamContent_$key } from '@/app/sport/__generated__/StreamContent_.graphql'

export default function StreamContent(props: { queryRef: StreamContent_$key }) {
  const data = useFragment(
    graphql`
      fragment StreamContent_ on Query {
        streamableContent @stream(initialCount: 1) {
          value
        }
      }
    `,
    props.queryRef
  )

  return <p>{data.streamableContent.map(e => e.value)}</p>
}
