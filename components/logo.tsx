import { cx } from 'class-variance-authority'

interface LogoProps {
  variant?: 'dark' | 'light'
  subtitle?: boolean
  size?: 'sm' | 'md' | 'lg'
}
export default function Logo({ size = 'md', subtitle }: LogoProps) {
  return (
    <div className='flex flex-col items-center gap-2 select-none'>
      <h1
        className={cx('font-display font-bold tracking-wider', {
          'text-3xl lg:text-3xl': size === 'md',
          'text-4xl lg:text-4xl': size === 'lg',
        })}
      >
        <span className='text-primary text-shadow-primary group-hover:animate-pulse-glow-primary transition-all text-shadow-none'>
          GIGA
        </span>
        <span className='group-hover:animate-pulse-glow-white text-white transition-all text-shadow-none text-shadow-white'>
          RINO
        </span>
      </h1>
      {subtitle && (
        <p className='text-sm tracking-[0.3em] text-gray-500 uppercase'>High Energy Gaming</p>
      )}
    </div>
  )
}
