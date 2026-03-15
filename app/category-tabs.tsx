'use client'

import { cx } from 'class-variance-authority'
import { entries } from 'lodash'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { categories } from '@/app/context'

export default function CategoryTabs(props: { categories: typeof categories }) {
  const pathname = usePathname()

  return (
    <section className='bg-background sticky top-20 z-20 border-y border-neutral-800 lg:top-36.25'>
      <div
        className='no-scrollbar mx-auto flex h-12 max-w-(--breakpoint-2xl) items-center gap-2 overflow-x-auto px-4 py-3'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {entries(props.categories).map(([label, category]) => (
          <Link
            key={label}
            href={`/casino/${category.slug}`}
            className={cx(
              'flex items-center gap-2 rounded-full px-4 py-2 text-xs leading-none whitespace-nowrap transition-colors',
              pathname === `/casino/${category.slug}`
                ? 'bg-brand text-brand-fg'
                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'
            )}
          >
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
