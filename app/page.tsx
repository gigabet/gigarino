/** biome-ignore-all lint/complexity/useLiteralKeys: for consistency */

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { values } from 'lodash'
import CategoryTabs from '@/app/category-tabs'
import { categories, getGameQuery } from '@/app/context'
import GameSection from '@/app/game-section'
import HeroBanner from '@/app/hero-banner'
import PromoBanner from '@/app/promo-banner'

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <CategoryTabs categories={categories} />
        <HeroBanner />
        <div className='mx-auto max-w-(--breakpoint-2xl)'>
          <GameSection title='Top Games' category={categories['Top Games']} />

          {/* New Games Section */}
          <GameSection title='New Releases' category={categories['New Releases']} />

          <GameSection title='Mobile Games' category={categories['Mobile Games']} />

          {/* Sports Section
      <SportsSection /> */}

          {/* Promo Banners */}
          <div className='space-y-4 px-8 py-6'>
            {/* <PromoBanner title='Exchange your Points for Rewards!' ctaText='SHOP NOW' /> */}
            <PromoBanner
              title='Special Bonus Offer'
              ctaText='Limited time offer - Claim your exclusive reward now'
            />
          </div>

          {/* Exclusive Games Section */}
          <GameSection title='Free Spins (ingame)' category={categories['Free Spins (ingame)']} />

          <GameSection title='Autoplay' category={categories['Autoplay']} />

          <GameSection title='Bonus Buy' category={categories['Bonus Buy']} />

          <GameSection title='Classic' category={categories['Classic']} />

          {/* Live Casino Section */}
          <GameSection title='Live Casino' category={categories['Live Casino']} />

          {/* All Games Section */}
          <GameSection title='All Games' category={categories['All Games']} />
        </div>
      </main>
    </HydrationBoundary>
  )
}
