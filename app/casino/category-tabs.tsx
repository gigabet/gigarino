'use client'

import { cx } from 'class-variance-authority'
import { entries } from 'lodash'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { categories } from '@/app/context'

export default function CategoryTabs(props: { categories: typeof categories }) {
  const pathname = usePathname()

  return (
    <section className='backdrop-blur-[0]'>
      <div className='custom-scrollbar mx-auto flex h-20 max-w-360 items-center gap-2 overflow-x-auto overflow-y-hidden px-6 lg:px-8'>
        {entries(props.categories).map(([label, category]) => (
          <Link
            key={label}
            href={`/casino/${category.slug}`}
            className={cx(
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              pathname === `/casino/${category.slug}`
                ? 'bg-primary text-primary-foreground shadow-primary shadow-[0_0_20px]'
                : 'bg-dark-200 text-white/70 hover:bg-white/10 hover:text-white'
            )}
          >
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
