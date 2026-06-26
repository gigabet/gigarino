'use client'

import { useFragment } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { SideContent_$key } from '@/app/sport/__generated__/SideContent_.graphql'

export default function SideContent(props: { queryRef: SideContent_$key }) {
  const data = useFragment(
    graphql`
      fragment SideContent_ on Query {
        lazyContent
      }
    `,
    props.queryRef
  )

  return <p>{data.lazyContent}</p>
}
