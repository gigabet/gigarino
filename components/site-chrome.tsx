'use client'

import { usePathname } from 'next/navigation'

// hides site chrome (navbar, footer, background) on chromeless routes such as the stats popup
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/stats') || pathname.startsWith('/admin')) return null
  return children
}
