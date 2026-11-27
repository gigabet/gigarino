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
import { categories } from '@/app/casino/context'
import { LocaleSwitcher } from '@/components/locale-switcher'
import Logo from '@/components/logo'
import { getT, resolveLocale } from '@/i18n/t'
import { tKey } from '@/i18n/tKey'

const footerLinks = {
  'GENERAL INFO': [
    [tKey('About Us')],
    [tKey('Help Centre')],
    [tKey('Create Shortcut')],
    [tKey('Sitemap')],
  ],
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
    [tKey('Sportsbook')],
    [tKey('Live Betting')],
    [tKey('Virtual Sports')],
    [tKey('Football')],
    [tKey('Tennis')],
    [tKey('Table Tennis')],
    [tKey('Basketball')],
    [tKey('Ice Hockey')],
    [tKey('American Football')],
    [tKey('Baseball')],
  ],
  SECURITY: [
    [tKey('Privacy Notice')],
    [tKey('Responsible Gaming')],
    [tKey('Cookie Notice')],
    [tKey('Terms and Conditions')],
  ],
  PROMOTIONS: [
    [tKey('Casino Promotions')],
    [tKey('Sport Promotions')],
    [tKey('Challenges')],
    [tKey('Shop')],
    [tKey('VIP')],
    [tKey('Payments')],
    [tKey('Partners')],
  ],
}

const paymentMethods = [
  { name: 'Visa', icon: 'VISA' },
  { name: 'Mastercard', icon: 'MC' },
  { name: 'PayPal', icon: 'PP' },
  { name: 'Crypto', icon: 'BTC' },
]

export default async function Footer() {
  const t = await getT()
  const locale = await resolveLocale()

  return (
    <footer className='relative z-0 pt-16 pb-28 lg:pb-8'>
      {/* Background with subtle pattern */}
      <div className='from-card pointer-events-none absolute inset-0 bg-linear-to-t to-transparent' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_3%,transparent),transparent_50%)]' />

      <div className='relative z-10 mx-auto max-w-7xl px-6 lg:px-8'>
        {/* Logo Section */}
        <div className='mb-12 flex flex-col items-center'>
          <Logo subtitle size='lg' />
        </div>

        {/* Links Grid */}
        <div className='mb-12 grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 lg:grid-cols-6'>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className='text-secondary mb-4 text-xs font-bold tracking-wider uppercase'>
                {category}
              </h4>
              <ul className='space-y-2'>
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href ?? ''}
                      className='hover:text-brand group text-subtle relative text-sm transition-colors duration-300'
                    >
                      {t(label)}
                      <span className='bg-brand absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full' />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className='mb-8 flex flex-wrap items-center justify-center gap-6'>
          <div className='border-line-2 bg-foreground/5 flex items-center gap-2 rounded-full border px-4 py-2'>
            <div className='bg-brand/10 flex h-6 w-6 items-center justify-center rounded-full'>
              <ShieldCheckIcon className='text-brand h-3 w-3' />
            </div>
            <span className='text-secondary text-xs'>
              {t('Secure')} &amp; {t('Licensed')}
            </span>
          </div>
          <div className='border-line-2 bg-foreground/5 flex items-center gap-2 rounded-full border px-4 py-2'>
            <div className='bg-brand/10 flex h-6 w-6 items-center justify-center rounded-full'>
              <ZapIcon className='text-brand h-3 w-3' />
            </div>
            <span className='text-secondary text-xs'>{t('Fast Payouts')}</span>
          </div>
          <div className='border-line-2 bg-foreground/5 flex items-center gap-2 rounded-full border px-4 py-2'>
            <div className='bg-brand/10 flex h-6 w-6 items-center justify-center rounded-full'>
              <LockIcon className='text-brand h-3 w-3' />
            </div>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <span className='text-secondary text-xs'>256-bit SSL</span>
          </div>
          <div className='border-line-2 bg-foreground/5 flex items-center gap-2 rounded-full border px-4 py-2'>
            <div className='bg-brand/10 flex h-6 w-6 items-center justify-center rounded-full'>
              <SmartphoneIcon className='text-brand h-3 w-3' />
            </div>
            <span className='text-secondary text-xs'>{t('Mobile Optimized')}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='mb-8'>
          <p className='text-subtle mb-4 text-center text-xs tracking-wider uppercase'>
            {t('Accepted Payment Methods')}
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            {paymentMethods.map(method => (
              <div
                key={method.name}
                className='hover:border-brand/50 hover:text-brand border-line-2 bg-foreground/5 text-secondary flex h-8 w-12 cursor-pointer items-center justify-center rounded border text-[10px] font-bold transition-all'
              >
                {method.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className='text-subtle mb-8 flex flex-wrap items-center justify-center gap-6 text-xs'>
          <a
            href='mailto:support@gigarino.com'
            className='hover:text-brand flex items-center gap-2 transition-colors'
          >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Mail className='h-4 w-4' />
            support@gigarino.com
          </a>
          <a
            href='tel:+441234567890'
            className='hover:text-brand flex items-center gap-2 transition-colors'
          >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Phone className='h-4 w-4' />
            +44 (123) 456-7890
          </a>
          <span className='flex items-center gap-2'>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <MapPin className='h-4 w-4' />
            Malta, EU
          </span>
        </div>

        {/* Divider */}
        <div className='bg-foreground/10 mb-6 h-px' />

        {/* Copyright & Legal */}
        <div className='text-muted-foreground flex flex-col items-center justify-between gap-4 text-xs md:flex-row'>
          <p>
            {t(
              'Gambling can be addictive. Play responsibly. This platform only accepts customers over 18 years of age.'
            )}
          </p>
          <div className='flex items-center gap-4'>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <p>2024 © GigaRino Gaming. All rights reserved.</p>
            <LocaleSwitcher current={locale} />
          </div>
        </div>
      </div>
    </footer>
  )
}
