/** biome-ignore-all lint/complexity/useLiteralKeys: for consistency */

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { values } from 'lodash'
import CategorySection from '@/app/category-section'
import { categories, getGameQuery, providersQuery } from '@/app/context'
import GameSection from '@/app/game-section'
import HeroBanner from '@/app/hero-banner'

export default async function Casino() {
  const queryClient = new QueryClient()

  await Promise.all(
    values(categories).map(
      c =>
        'query' in c &&
        queryClient.prefetchQuery({
          queryKey: ['games', c.query],
          queryFn: getGameQuery(c.query),
        })
    )
  )

  queryClient.prefetchQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        {/* <CategoryTabs categories={categories} /> */}
        <HeroBanner />

        <GameSection title='Top Games' category={categories['Top Games']}>
          <div className='absolute inset-0 h-full bg-linear-to-b from-black via-transparent to-transparent' />
        </GameSection>

        <GameSection title='New Releases' category={categories['New Releases']} />

        <CategorySection categories={categories} />

        {/* <GameSection title='Classic' category={categories['Classic']} />

        <GameSection title='Live Casino' category={categories['Live Casino']} />

        <GameSection title='All Games' category={categories['All Games']} /> */}

        {/* Sports Section
      <SportsSection /> */}

        {/* Promo Banners */}
        {/* <div className='space-y-4 px-8 py-6'>
          <PromoBanner
          title='Special Bonus Offer'
          ctaText='Limited time offer - Claim your exclusive reward now'
          />
          </div> */}

        {/* Exclusive Games Section */}
        {/* <GameSection title='Free Spins (ingame)' category={categories['Free Spins (ingame)']} />
          <GameSection title='Mobile Games' category={categories['Mobile Games']} />

        <GameSection title='Autoplay' category={categories['Autoplay']} />

        <GameSection title='Bonus Buy' category={categories['Bonus Buy']} />*/}
      </main>
    </HydrationBoundary>
  )
}
