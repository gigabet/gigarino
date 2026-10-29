'use client'

import { usePathname } from 'next/navigation'

// hides site chrome (navbar, footer, background) on chromeless routes such as the stats popup
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/stats')) return null
  return children
}
