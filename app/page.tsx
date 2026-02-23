import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import CategoryTabs from '@/app/category-tabs'
import GameSection from '@/app/game-section'
import HeroBanner from '@/app/hero-banner'
import PromoBanner from '@/app/promo-banner'

const categories = [
  { label: 'Providers', icon: true },
  { label: 'Top Games', icon: true },
  { label: 'New Releases', icon: true },
  { label: 'Freespins', icon: true },
  { label: 'Jackpots', icon: true },
  { label: 'Bonus Buy', icon: true },
  { label: 'Classic', icon: true },
  { label: 'Live Casino', icon: true },
  { label: 'All Games', icon: true },
]

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['games'],
    queryFn: () => [
      { title: 'Game Title 1', isNew: true },
      { title: 'Game Title 2', isNew: false },
      { title: 'Game Title 3', isNew: true },
      { title: 'Game Title 4', isNew: true },
      { title: 'Game Title 5', isNew: false },
      { title: 'Game Title 6', isNew: false },
      { title: 'Game Title 7', isNew: false },
      { title: 'Game Title 8', isNew: true },
    ],
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='bg-gray-900'>
        <HeroBanner />
        <CategoryTabs categories={categories} />

        <GameSection
          title='Top Games'
          seeAllCount={160}
          // games={[
          //   { title: 'Game Title 1', isNew: true },
          //   { title: 'Game Title 2', isNew: false },
          //   { title: 'Game Title 3', isNew: true },
          //   { title: 'Game Title 4', isNew: true },
          //   { title: 'Game Title 5', isNew: false },
          //   { title: 'Game Title 6', isNew: false },
          //   { title: 'Game Title 7', isNew: false },
          //   { title: 'Game Title 8', isNew: true },
          // ]}
        />

        {/* New Games Section */}
        <GameSection
          title='New Releases'
          seeAllCount={2205}
          // games={[
          //   { title: 'Game Title 1', isNew: true },
          //   { title: 'Game Title 2', isNew: true },
          //   { title: 'Game Title 3', isNew: true },
          //   { title: 'Game Title 4', isNew: true },
          //   { title: 'Game Title 5', isNew: true },
          //   { title: 'Game Title 6', isNew: true },
          // ]}
        />

        {/* Exclusive Games Section */}
        <GameSection
          title='Freespins'
          seeAllCount={84}
          // games={[
          //   { title: 'Game Title 1', isNew: false },
          //   { title: 'Game Title 2', isNew: true },
          //   { title: 'Game Title 3', isNew: false },
          //   { title: 'Game Title 4', isNew: true },
          // ]}
        />

        {/* Sports Section
      <SportsSection /> */}

        {/* Promo Banners */}
        <div className='space-y-4 px-4 py-6'>
          {/* <PromoBanner title='Exchange your Points for Rewards!' ctaText='SHOP NOW' /> */}
          <PromoBanner title='Special Bonus Offer!' ctaText='CLAIM NOW' />
        </div>

        <GameSection
          title='Jackpots'
          seeAllCount={21}
          // games={[
          //   { title: 'Game Title 1', isNew: true },
          //   { title: 'Game Title 2', isNew: false },
          //   { title: 'Game Title 3', isNew: false },
          //   { title: 'Game Title 4', isNew: true },
          // ]}
        />

        <GameSection
          title='Bonus Buy'
          seeAllCount={226}
          // games={[
          //   { title: 'Game Title 1', isNew: true },
          //   { title: 'Game Title 2', isNew: false },
          //   { title: 'Game Title 3', isNew: true },
          //   { title: 'Game Title 4', isNew: true },
          //   { title: 'Game Title 5', isNew: true },
          //   { title: 'Game Title 6', isNew: false },
          // ]}
        />

        <GameSection
          title='Classic'
          seeAllCount={50}
          // games={[
          //   { title: 'Game Title 1', isNew: false },
          //   { title: 'Game Title 2', isNew: false },
          //   { title: 'Game Title 3', isNew: true },
          //   { title: 'Game Title 4', isNew: false },
          //   { title: 'Game Title 5', isNew: true },
          //   { title: 'Game Title 6', isNew: false },
          // ]}
        />

        {/* Live Casino Section */}
        <GameSection
          title='Live Casino'
          seeAllCount={64}
          // games={[
          //   { title: 'Game Title 1', isNew: false },
          //   { title: 'Game Title 2', isNew: true },
          //   { title: 'Game Title 3', isNew: true },
          //   { title: 'Game Title 4', isNew: false },
          //   { title: 'Game Title 5', isNew: true },
          //   { title: 'Game Title 6', isNew: false },
          // ]}
        />

        {/* All Games Section */}
        <GameSection
          title='All Games'
          seeAllCount={9716}
          // games={[
          //   { title: 'Game Title 1', isNew: false },
          //   { title: 'Game Title 2', isNew: false },
          //   { title: 'Game Title 3', isNew: true },
          //   { title: 'Game Title 4', isNew: false },
          //   { title: 'Game Title 5', isNew: true },
          //   { title: 'Game Title 6', isNew: false },
          // ]}
        />
      </main>
    </HydrationBoundary>
  )
}
