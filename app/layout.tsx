import type { Metadata } from 'next'
import { Geist_Mono, Lato, Racing_Sans_One } from 'next/font/google'
import Footer from '@/app/footer'
import Navbar from '@/app/navbar'
import Providers from '@/context/providers'
import './globals.css'

const lato = Lato({
  variable: '--font-lato',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
})

const racingSansOne = Racing_Sans_One({
  variable: '--font-racing-sans-one',
  weight: '400',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${lato.variable} ${racingSansOne.variable} ${geistMono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
