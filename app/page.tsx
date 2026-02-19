import CategoryTabs from '@/app/category-tabs'
import GameSection from '@/app/game-section'
import HeroBanner from '@/app/hero-banner'
import PromoBanner from '@/app/promo-banner'
import SportsSection from '@/app/sports-section'

export default function Home() {
  return (
    <main className='bg-gray-900'>
      <HeroBanner />
      <CategoryTabs />

      {/* Top Games Section */}
      <GameSection
        title='Top Games'
        seeAllCount={160}
        games={[
          { title: 'Game Title 1', isNew: true },
          { title: 'Game Title 2', isNew: false },
          { title: 'Game Title 3', isNew: true },
          { title: 'Game Title 4', isNew: true },
          { title: 'Game Title 5', isNew: false },
          { title: 'Game Title 6', isNew: false },
          { title: 'Game Title 7', isNew: false },
          { title: 'Game Title 8', isNew: true },
        ]}
      />

      {/* Category Section */}
      <GameSection
        title='Category Name'
        seeAllCount={41}
        games={[
          { title: 'Game Title 1', isNew: true },
          { title: 'Game Title 2', isNew: false },
          { title: 'Game Title 3', isNew: true },
          { title: 'Game Title 4', isNew: false },
          { title: 'Game Title 5', isNew: false },
          { title: 'Game Title 6', isNew: false },
        ]}
      />

      {/* New Games Section */}
      <GameSection
        title='New Releases'
        seeAllCount={2205}
        games={[
          { title: 'Game Title 1', isNew: true },
          { title: 'Game Title 2', isNew: true },
          { title: 'Game Title 3', isNew: true },
          { title: 'Game Title 4', isNew: true },
          { title: 'Game Title 5', isNew: true },
          { title: 'Game Title 6', isNew: true },
        ]}
      />

      {/* Popular Games Section */}
      <GameSection
        title='Popular'
        seeAllCount={179}
        games={[
          { title: 'Game Title 1', isNew: false },
          { title: 'Game Title 2', isNew: false },
          { title: 'Game Title 3', isNew: true },
          { title: 'Game Title 4', isNew: true },
          { title: 'Game Title 5', isNew: false },
          { title: 'Game Title 6', isNew: true },
        ]}
      />

      {/* Exclusive Games Section */}
      <GameSection
        title='Exclusive'
        seeAllCount={84}
        games={[
          { title: 'Game Title 1', isNew: false },
          { title: 'Game Title 2', isNew: true },
          { title: 'Game Title 3', isNew: false },
          { title: 'Game Title 4', isNew: true },
        ]}
      />

      {/* Sports Section */}
      <SportsSection />

      {/* Promo Banners */}
      <div className='space-y-4 px-4 py-6'>
        {/* <PromoBanner title='Exchange your Points for Rewards!' ctaText='SHOP NOW' /> */}
        <PromoBanner title='Special Bonus Offer!' ctaText='CLAIM NOW' />
      </div>

      {/* Live Casino Section */}
      <GameSection
        title='Live Casino'
        seeAllCount={64}
        games={[
          { title: 'Game Title 1', isNew: false },
          { title: 'Game Title 2', isNew: true },
          { title: 'Game Title 3', isNew: true },
          { title: 'Game Title 4', isNew: false },
          { title: 'Game Title 5', isNew: true },
          { title: 'Game Title 6', isNew: false },
        ]}
      />

      {/* Game Shows Section */}
      <GameSection
        title='Game Shows'
        seeAllCount={21}
        games={[
          { title: 'Game Title 1', isNew: true },
          { title: 'Game Title 2', isNew: false },
          { title: 'Game Title 3', isNew: false },
          { title: 'Game Title 4', isNew: true },
        ]}
      />

      {/* Table Games Section */}
      <GameSection
        title='Table Games'
        seeAllCount={226}
        games={[
          { title: 'Game Title 1', isNew: true },
          { title: 'Game Title 2', isNew: false },
          { title: 'Game Title 3', isNew: true },
          { title: 'Game Title 4', isNew: true },
          { title: 'Game Title 5', isNew: true },
          { title: 'Game Title 6', isNew: false },
        ]}
      />

      {/* Jackpots Section */}
      <GameSection
        title='Jackpots'
        seeAllCount={50}
        games={[
          { title: 'Game Title 1', isNew: false },
          { title: 'Game Title 2', isNew: false },
          { title: 'Game Title 3', isNew: true },
          { title: 'Game Title 4', isNew: false },
          { title: 'Game Title 5', isNew: true },
          { title: 'Game Title 6', isNew: false },
        ]}
      />

      {/* All Games Section */}
      <GameSection
        title='All Games'
        seeAllCount={9716}
        games={[
          { title: 'Game Title 1', isNew: false },
          { title: 'Game Title 2', isNew: false },
          { title: 'Game Title 3', isNew: true },
          { title: 'Game Title 4', isNew: false },
          { title: 'Game Title 5', isNew: true },
          { title: 'Game Title 6', isNew: false },
        ]}
      />
    </main>
  )
}
