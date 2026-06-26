// src/app/page.tsx – Server Component

import { graphql } from 'relay-runtime'
import type { pageQuery } from '@/app/sport/__generated__/pageQuery.graphql'
import MainContent from '@/app/sport/main-content'
import { getServerEnvironment } from '@/relay/environment.server'

export default async function Page() {
  const serverEnv = getServerEnvironment()
  const preloaded = serverEnv.serverPreloadQuery<pageQuery>(
    graphql`
      query pageQuery {
        mainContent
        ...StreamContent_ @defer
        ...SideContent_ @defer
      }
    `,
    {}
  )

  return (
    <main className='relative z-1 mx-auto flex w-full max-w-360 items-start gap-12 px-4 py-12 pb-24 sm:px-6 lg:px-8'>
      {/* MainContent renders immediately once the initial response arrives */}
      <MainContent preloaded={preloaded} />
    </main>
  )
}
