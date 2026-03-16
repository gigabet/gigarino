import { CreditCardIcon, ShieldCheckIcon, ZapIcon } from 'lucide-react'
import Logo from '@/components/logo'

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
    <footer className='bg-neutral-950 text-neutral-400'>
      {/* Top Bar */}
      <div>
        <div className='mx-auto flex max-w-(--breakpoint-2xl) items-center justify-center px-8 pt-12 pb-8'>
          <Logo subtitle size='lg' />
          {/* Language Selector */}
          {/* <button
            type='button'
            className='flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2 transition-colors hover:bg-neutral-700'
          >
            <Globe size={16} />
            <span className='text-sm'>English</span>
          </button> */}
        </div>
      </div>

      <div>
        {/* className='border-t border-t-neutral-800 bg-neutral-950 text-neutral-400'> */}
        {/* Links Grid */}
        <div className='mx-auto max-w-(--breakpoint-2xl) px-8 py-8'>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6'>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className='mb-4 text-sm font-bold tracking-wider text-white uppercase'>
                  {category}
                </h4>
                <ul className='space-y-2'>
                  {links.map(link => (
                    <li key={link}>
                      <a
                        href='#!'
                        className='hover:text-brand text-xs text-neutral-500 transition-colors'
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

        <div className='flex flex-wrap justify-center gap-6 px-4 py-6'>
          <div className='flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2'>
            <ShieldCheckIcon className='text-accent size-5' />
            <span className='text-sm text-neutral-400'>Secure and Licensed</span>
          </div>
          <div className='flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2'>
            <ZapIcon className='text-accent size-5' />
            <span className='text-sm text-neutral-400'>Fast Payouts</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='flex flex-col items-center justify-center px-4 py-6'>
          <div className='mb-4 text-center text-xs tracking-wider text-neutral-500 uppercase'>
            Accepted Payment Methods
          </div>

          <div className='flex flex-wrap gap-3'>
            {paymentIcons.map((_, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: the elements are identical
                key={index}
                className='flex h-8 w-12 items-center justify-center rounded border border-white/10 bg-neutral-800'
              >
                <CreditCardIcon className='size-4 text-neutral-500' />
              </div>
              // <div
              //   key={index}
              //   className='flex h-8 w-12 items-center justify-center rounded bg-neutral-700'
              // >
              //   <div className='h-4 w-6 rounded-sm bg-neutral-600' />
              // </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        {/* <div className='px-4 py-6'>
          <p className='mb-4 text-center text-xs tracking-wider text-neutral-600 uppercase'>
            Our Partners
          </p>
          <div className='flex items-center justify-center gap-8'>
            <div className=rounded border border-white/5 bg-neutral-800/50 px-4 py-2 text-xs text-neutral-600'>
              Partner 1
            </div>
            <div className=rounded border border-white/5 bg-neutral-800/50 px-4 py-2 text-xs text-neutral-600'>
              Partner 2
            </div>
            <div className=rounded border border-white/5 bg-neutral-800/50 px-4 py-2 text-xs text-neutral-600'>
              Partner 3
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className='px-4 py-6'>
          <p className='mb-2 text-center text-xs text-neutral-500'>
            Gambling can be addictive. Play responsibly. This platform only accepts customers over
            18 years of age.
          </p>
          <p className='text-center text-xs text-neutral-600'>
            {new Date().getFullYear()} © Gigabet GmbH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
