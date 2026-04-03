import type { Metadata } from 'next'
import { Geist_Mono, Poppins, Rajdhani } from 'next/font/google'
import Footer from '@/app/footer'
import Navbar from '@/app/navbar'
import ParticleBackground from '@/components/particle-background'
import Providers from '@/context/providers'
import { getUser, getUserWallet } from '@/lib/auth'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
})

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Gigarino',
  description: 'Online betting platform',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()
  const wallet = user?.preferredCurrency ? await getUserWallet(user.preferredCurrency) : null

  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <body
        className={`${poppins.variable} ${rajdhani.variable} ${geistMono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <div className='fixed inset-0 z-0'>
          {/* Base gradient - dark but not pure black */}
          <div className='from-dark via-dark-100 to-dark absolute inset-0 bg-linear-to-br' />

          {/* Subtle radial glow from center */}
          <div className='absolute top-1/2 left-1/2 h-300 w-300 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(209,243,102,0.05)_0%,transparent_50%)]' />

          {/* Subtle grid pattern */}
          <div
            className='absolute inset-0 opacity-[0.02]'
            style={{
              backgroundImage: `
              linear-gradient(rgba(209, 243, 102, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(209, 243, 102, 0.5) 1px, transparent 1px)
            `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating orbs for depth */}
          <div className='bg-primary/5 absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full blur-[100px]' />
          <div
            className='bg-purple-accent/15 absolute right-1/4 bottom-1/3 h-48 w-48 animate-pulse rounded-full blur-[80px]'
            style={{ animationDelay: '2s' }}
          />
        </div>
        <ParticleBackground />

        <Providers user={user} wallet={wallet}>
          <Navbar user={user} wallet={wallet} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
