'use client'

import { useT } from '@/context/providers'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'dark' | 'light'
  subtitle?: boolean
  size?: 'sm' | 'md' | 'lg'
  Component?: keyof React.JSX.IntrinsicElements
}
export default function Logo({ size = 'md', subtitle, Component = 'h1' }: LogoProps) {
  const t = useT()

  return (
    <div className='inline-flex flex-col items-center gap-2 select-none'>
      <Component
        className={cn('font-display font-bold tracking-wider', {
          'text-[1.67rem] sm:text-3xl': size === 'md',
          'text-4xl lg:text-4xl': size === 'lg',
        })}
      >
        <span className='text-brand text-shadow-primary group-hover:animate-pulse-glow-primary transition-all text-shadow-none'>
          GIGA
        </span>
        <span className='group-hover:animate-pulse-glow-white text-foreground text-shadow-foreground transition-all text-shadow-none'>
          RINO
        </span>
      </Component>
      {subtitle && (
        <p className='text-subtle text-sm tracking-[0.3em] uppercase'>{t('High Energy Gaming')}</p>
      )}
    </div>
  )
}
