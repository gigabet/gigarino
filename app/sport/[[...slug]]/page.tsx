import { Suspense } from 'react'
import { graphql } from 'relay-runtime'
import type { PrematchQuery } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import PrematchList from '@/app/sport/[[...slug]]/prematch-list'
import Carousel from '@/app/sport/carousel'
import ShortcutRow from '@/app/sport/shortcut-row'
import Sidebar from '@/app/sport/sidebar'
import Betslip from '@/components/betslip'
import { cn } from '@/lib/utils'
import { getServerEnvironment } from '@/relay/environment.server'

interface PageProps {
  params: {
    /** `/ filter / sport / league` */
    slug?: string[] // Next.js passes undefined or [] for the bare /sport/ path
  }
}

export default async function SportPage(props: PageProps) {
  const [_filter = 'all', _sport = null, _league = null] = props.params.slug ?? []

  const serverEnv = getServerEnvironment()
  const queryRef = serverEnv.serverPreloadQuery<PrematchQuery>(
    graphql`
      query PrematchQuery {
        ...PrematchList
      }
    `,
    {}
  )

  // const [queryRef, loadQuery] = useQueryLoader<PrematchQuery>(graphql`
  //   query PrematchQuery {
  //     ...PrematchList
  //   }
  // `)

  // useEffect(() => {
  //   loadQuery({})
  // }, [loadQuery])

  return (
    <main
      className={cn(
        'z-1 mx-auto grid min-h-screen w-full max-w-480 gap-8 px-4 py-6 pb-24 sm:px-6 lg:px-8',
        'grid-cols-1 lg:grid-cols-[4rem_minmax(auto,1fr)] xl:grid-cols-[16rem_minmax(auto,1fr)] 2xl:grid-cols-[16rem_minmax(auto,1fr)_18.75rem]'
      )}
    >
      {/* <PromotionalBanner /> */}
      <Sidebar />
      <section className='flex min-w-0 flex-col gap-4'>
        <Carousel />
        <ShortcutRow />
        <Suspense fallback={'Loading...'}>
          <PrematchList queryRef={queryRef} />
        </Suspense>
      </section>
      <div className='hidden xl:flex'>
        <Betslip />
      </div>
    </main>
  )
}
