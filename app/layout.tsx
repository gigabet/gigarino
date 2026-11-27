import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Poppins, Rajdhani } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Footer from '@/app/footer'
import Navbar from '@/app/navbar'
import { BetslipDrawerHost, BetslipRailSkeleton } from '@/components/betslip'
import ParticleBackground from '@/components/particle-background'
import SiteChrome from '@/components/site-chrome'
import Providers, { LocaleProvider } from '@/context/providers'
import { RailSlot } from '@/context/rail'
import TicketUpdates from '@/context/ticket-updates'
import { resolveLocale } from '@/i18n/t'
import dict from '@/i18n/translations.json'
import { getToken, getUser, getUserWallet } from '@/lib/auth'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
})

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
})

const geistMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Gigarino',
  description: 'Online betting platform',
}

// keeps the mobile browser chrome in step with the page (values = --background of each theme)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f7fd' },
    { media: '(prefers-color-scheme: dark)', color: '#08080f' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = await getToken()
  const user = await getUser()
  const wallet = await getUserWallet()
  const locale = await resolveLocale()

  // flatten to just this locale, so we don't ship de+tr to a de user
  const flatDict = Object.fromEntries(
    Object.entries(dict as Record<string, Record<string, string>>).map(([key, translations]) => [
      key,
      translations[locale] ?? '',
    ])
  )

  return (
    <html lang='en' data-scroll-behavior='smooth' suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${rajdhani.variable} ${geistMono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {/* Neon glass backdrop: tinted base with soft washes (--aurora-*), a fading grid, and
              two floating orbs. Every colour here comes from tokens, so it follows the theme. */}
          <div aria-hidden className='bg-aurora fixed inset-0 z-0'>
            <div className='bg-grid-fade absolute inset-0' />
            <div className='bg-primary/30 dark:bg-primary/5 absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full blur-[100px]' />
            <div
              className='bg-accent/15 absolute right-1/4 bottom-1/3 h-48 w-48 animate-pulse rounded-full blur-[80px]'
              style={{ animationDelay: '2s' }}
            />
          </div>
          <SiteChrome>
            <ParticleBackground />
          </SiteChrome>

          <Providers user={user} wallet={wallet}>
            <LocaleProvider locale={locale} dict={flatDict}>
              <TicketUpdates />
              <SiteChrome>
                <Navbar token={token} />
                <BetslipDrawerHost />
              </SiteChrome>
              <div className='relative z-1 mx-auto flex w-full max-w-480 flex-1 items-stretch'>
                <div className='flex min-w-0 flex-1 flex-col'>
                  {children}
                  <SiteChrome>
                    <Footer />
                  </SiteChrome>
                </div>
                <RailSlot skeleton={<BetslipRailSkeleton />} />
              </div>
            </LocaleProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
