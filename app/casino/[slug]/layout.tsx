import CategoryTabs from '@/app/casino/category-tabs'
import { categories } from '@/app/context'

export default function CasinoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='grow'>
      <CategoryTabs categories={categories} />
      {children}
    </main>
  )
}
