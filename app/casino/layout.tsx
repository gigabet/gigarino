import CategoryTabs from '@/app/category-tabs'
import { categories } from '@/app/context'

export default function CasinoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='bg-gray-900 text-gray-300'>
      <CategoryTabs categories={categories} />
      {children}
    </main>
  )
}
