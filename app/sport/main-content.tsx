'use client'

import { Suspense } from 'react'
import type { PreloadedQueryRef } from 'react-relay/rsc_EXPERIMENTAL'
import { useQueryFromServer } from 'react-relay/rsc-client_EXPERIMENTAL'
import SideContent from '@/app/sport/side-content'
import StreamContent from '@/app/sport/stream-content'
import SubscriptionContent from '@/app/sport/subscription-content'
import type {
  pageQuery,
  pageQuery$data,
  pageQuery$variables,
} from './__generated__/pageQuery.graphql'
import pageQueryNode from './__generated__/pageQuery.graphql'

export default function MainContent(props: {
  preloaded: PreloadedQueryRef<pageQuery$variables, pageQuery$data>
}) {
  const data = useQueryFromServer<pageQuery>(pageQueryNode, props.preloaded)

  return (
    <div>
      <h1>{data.mainContent}</h1>
      <Suspense fallback={<div className='text-yellow-500'>Loading slow data...</div>}>
        <SideContent queryRef={data} />
      </Suspense>
      <Suspense fallback={<div className='text-yellow-500'>Loading stream...</div>}>
        <StreamContent queryRef={data} />
      </Suspense>
      <SubscriptionContent queryRef={data.countdown} />
    </div>
  )
}
