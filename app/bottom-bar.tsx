'use client'

import { cx } from 'class-variance-authority'
import type { LucideProps } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomBar(props: {
  links: {
    label: string
    href: string
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >
  }[]
}) {
  const pathname = usePathname()

  return (
    <div className='glass-dark fixed bottom-0 left-0 z-50 h-20 w-full lg:hidden [body[data-scroll-locked]_&]:pr-2'>
      <nav className='mx-auto flex h-full w-full max-w-360 items-center justify-between px-6 lg:px-8'>
        {props.links.map(link => (
          <Link
            key={link.label}
            href={link.href}
            className={cx(
              'group flex flex-col items-center justify-center gap-1.5 transition-all duration-300 text-shadow-[0_0_18px] text-shadow-transparent',
              pathname === link.href
                ? 'text-primary text-shadow-primary'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <span className='relative'>
              <link.icon className='size-4' />
              <div
                className={cx(
                  'absolute inset-0 top-1/2 left-1/2 size-8 -translate-1/2 scale-100 rounded-full blur-lg transition-all duration-300',
                  pathname === link.href
                    ? 'bg-primary/40'
                    : 'bg-white/30 opacity-0 group-hover:opacity-100'
                )}
              />
            </span>
            <span className='text-xs'>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
