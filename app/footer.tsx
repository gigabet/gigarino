import { entries } from 'lodash'
import {
  LockIcon,
  Mail,
  MapPin,
  Phone,
  ShieldCheckIcon,
  SmartphoneIcon,
  ZapIcon,
} from 'lucide-react'
import Link from 'next/link'
import { categories } from '@/app/context'
import Logo from '@/components/logo'

const footerLinks = {
  'GENERAL INFO': [['About Us'], ['Help Centre'], ['Create Shortcut'], ['Sitemap']],
  CASINO: entries(categories).map(([label, cat]) => [label, `/casino/${cat.slug}`]),
  'LIVE CASINO': [
    ['Top Live Casino'],
    ['VIP Room'],
    ['Roulette'],
    ['Blackjack'],
    ['Game Shows'],
    ['Baccarat & Dice'],
    ['Poker'],
    ['All Live', '/casino/live-casino'],
  ],
  SPORTS: [
    ['Sportsbook'],
    ['Live Betting'],
    ['Virtual Sports'],
    ['Football'],
    ['Tennis'],
    ['Table Tennis'],
    ['Basketball'],
    ['Ice Hockey'],
    ['American Football'],
    ['Baseball'],
  ],
  SECURITY: [
    ['Privacy Notice'],
    ['Responsible Gaming'],
    ['Cookie Notice'],
    ['Terms and Conditions'],
  ],
  PROMOTIONS: [
    ['Casino Promotions'],
    ['Sport Promotions'],
    ['Challenges'],
    ['Shop'],
    ['VIP'],
    ['Payments'],
    ['Partners'],
  ],
}

const paymentMethods = [
  { name: 'Visa', icon: 'VISA' },
  { name: 'Mastercard', icon: 'MC' },
  { name: 'PayPal', icon: 'PP' },
  { name: 'Crypto', icon: 'BTC' },
]

export default function Footer() {
  return (
    <footer className='relative border-none border-white/5 pt-16 pb-8'>
      {/* Background with subtle pattern */}
      <div className='from-dark-100 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(209,243,102,0.03),transparent_50%)]' />

      <div className='relative z-10 mx-auto max-w-7xl px-6 lg:px-8'>
        {/* Logo Section */}
        <div className='mb-12 flex flex-col items-center'>
          <Logo subtitle size='lg' />
        </div>

        {/* Links Grid */}
        <div className='mb-12 grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 lg:grid-cols-6'>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className='mb-4 text-xs font-bold tracking-wider text-gray-300 uppercase'>
                {category}
              </h4>
              <ul className='space-y-2'>
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href ?? ''}
                      className='hover:text-primary group relative text-sm text-gray-500 transition-colors duration-300'
                    >
                      {label}
                      <span className='bg-primary absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full' />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className='mb-8 flex flex-wrap items-center justify-center gap-6'>
          <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2'>
            <div className='bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full'>
              <ShieldCheckIcon className='text-primary h-3 w-3' />
            </div>
            <span className='text-xs text-gray-400'>Secure and Licensed</span>
          </div>
          <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2'>
            <div className='bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full'>
              <ZapIcon className='text-primary h-3 w-3' />
            </div>
            <span className='text-xs text-gray-400'>Fast Payouts</span>
          </div>
          <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2'>
            <div className='bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full'>
              <LockIcon className='text-primary h-3 w-3' />
            </div>
            <span className='text-xs text-gray-400'>256-bit SSL</span>
          </div>
          <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2'>
            <div className='bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full'>
              <SmartphoneIcon className='text-primary h-3 w-3' />
            </div>
            <span className='text-xs text-gray-400'>Mobile Optimized</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='mb-8'>
          <p className='mb-4 text-center text-xs tracking-wider text-gray-500 uppercase'>
            Accepted Payment Methods
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            {paymentMethods.map(method => (
              <div
                key={method.name}
                className='hover:border-primary/50 hover:text-primary flex h-8 w-12 cursor-pointer items-center justify-center rounded border border-white/10 bg-white/5 text-[10px] font-bold text-gray-400 transition-all'
              >
                {method.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className='mb-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500'>
          <a
            href='mailto:support@gigarino.com'
            className='hover:text-primary flex items-center gap-2 transition-colors'
          >
            <Mail className='h-4 w-4' />
            support@gigarino.com
          </a>
          <a
            href='tel:+441234567890'
            className='hover:text-primary flex items-center gap-2 transition-colors'
          >
            <Phone className='h-4 w-4' />
            +44 (123) 456-7890
          </a>
          <span className='flex items-center gap-2'>
            <MapPin className='h-4 w-4' />
            Malta, EU
          </span>
        </div>

        {/* Divider */}
        <div className='mb-6 h-px bg-white/10' />

        {/* Copyright & Legal */}
        <div className='flex flex-col items-center justify-between gap-4 text-xs text-gray-600 md:flex-row'>
          <p>
            Gambling can be addictive. Play responsibly. This platform only accepts customers over
            18 years of age.
          </p>
          <p>2024 © GigaRino Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
