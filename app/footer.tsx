import { Globe } from 'lucide-react'

const footerLinks = {
  'General Info': ['About Us', 'Help Centre', 'Create Shortcut', 'Sitemap'],
  Casino: [
    'Category A',
    'Top',
    'New',
    'Popular',
    'Special',
    'Exclusive',
    'Live Games',
    'Instant Games',
    'Slots',
    'Table Games',
  ],
  'Live Casino': [
    'Top Live Casino',
    'VIP Room',
    'Roulette',
    'Blackjack',
    'Game Shows',
    'Baccarat & Dice',
    'Poker',
    'All Live',
  ],
  Jackpots: [
    'Hot Jackpots',
    'New Jackpots',
    'Lucky Jackpots',
    'All Jackpots',
    'Daily Jackpots',
    'Drops & Wins',
  ],
  Sports: [
    'Sportsbook',
    'Live Betting',
    'Virtual Sports',
    'Football',
    'Tennis',
    'Table Tennis',
    'Basketball',
    'Ice Hockey',
    'American Football',
    'Baseball',
  ],
  Security: ['Privacy Notice', 'Responsible Gaming', 'Cookie Notice', 'Terms and Conditions'],
  Promotions: [
    'Casino Promotions',
    'Sport Promotions',
    'Challenges',
    'Shop',
    'VIP',
    'Payments',
    'Partners',
  ],
}

const paymentIcons = Array(4).fill(null)

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-400'>
      {/* Top Bar */}
      <div className='border-b border-gray-800'>
        <div className='mx-auto flex max-w-(--breakpoint-2xl) items-center px-8 py-4'>
          {/* Language Selector */}
          <button
            type='button'
            className='flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 transition-colors hover:bg-gray-700'
          >
            <Globe size={16} />
            <span className='text-sm'>English</span>
          </button>
        </div>
      </div>

      {/* Links Grid */}
      <div className='mx-auto max-w-(--breakpoint-2xl) px-8 py-8'>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7'>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className='mb-3 text-sm font-medium text-gray-300'>{category}</h4>
              <ul className='space-y-2'>
                {links.map(link => (
                  <li key={link}>
                    <a
                      href='#!'
                      className='text-sm text-gray-500 transition-colors hover:text-gray-300'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className='flex flex-col items-center justify-center border-t border-gray-800 px-4 py-6'>
        <div className='mb-4 flex items-center gap-2'>
          <span className='text-sm text-gray-500'>Payments</span>
        </div>
        <div className='flex flex-wrap gap-3'>
          {paymentIcons.map((_, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: the elements are identical
              key={index}
              className='flex h-8 w-12 items-center justify-center rounded bg-gray-700'
            >
              <div className='h-4 w-6 rounded-sm bg-gray-600' />
            </div>
          ))}
        </div>
      </div>

      {/* Partner Logo */}
      <div className='flex justify-center border-t border-gray-800 px-4 py-4'>
        <div className='flex h-8 w-24 items-center justify-center rounded bg-gray-700'>
          <span className='text-xs text-gray-500'>PARTNER</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800 px-4 py-4'>
        <p className='mb-2 text-center text-xs text-gray-500'>
          Gambling can be addictive. Play responsibly. This platform only accepts customers over 18
          years of age.
        </p>
        <p className='text-center text-xs text-gray-600'>
          2026 © Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
