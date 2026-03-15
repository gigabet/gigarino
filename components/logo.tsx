import { cx } from 'class-variance-authority'

interface LogoProps {
  variant?: 'dark' | 'light'
  subtitle?: boolean
  size?: 'sm' | 'md' | 'lg'
}
export default function Logo(props: LogoProps = { variant: 'dark', size: 'md' }) {
  return (
    <div className='flex cursor-default flex-col gap-0.5 select-none'>
      <h1
        className={cx('font-display leading-none', {
          'text-2xl sm:text-3xl': props.size === 'sm',
          'text-3xl sm:text-4xl': props.size === 'md' || !props.size,
          'text-4xl sm:text-5xl': props.size === 'lg',
        })}
      >
        <span className='text-brand text-shadow-brand text-shadow-[0_0_24px]'>GIGA</span>
        <span
          className={cx(
            props.variant === 'light'
              ? 'text-black'
              : 'text-white text-shadow-[0_0_24px] text-shadow-white'
          )}
        >
          RINO
        </span>
      </h1>
      <div className='flex'>
        <div className='bg-brand shadow-brand h-0.75 w-full flex-8 -skew-x-10 shadow-[0_0_24px] sm:h-1' />
        <div className='h-0.75 w-full flex-1 -skew-x-10 sm:h-1' />
        <div className='bg-accent shadow-accent h-0.75 w-full flex-8 -skew-x-10 shadow-[0_0_24px] sm:h-1' />
        <div className='h-0.75 w-full flex-1 -skew-x-10 sm:h-1' />
        <div
          className={cx(
            'h-1 w-full flex-2 -skew-x-10',
            props.variant === 'light' ? 'bg-black' : 'bg-white shadow-[0_0_24px] shadow-white'
          )}
        />
      </div>
      {props.subtitle && (
        <p
          className={cx('pt-1 font-semibold text-white/80 uppercase italic', {
            'text-xs tracking-[0.13em]': props.size !== 'lg',
            'text-xs tracking-[0.18em] sm:tracking-[0.25em]': props.size === 'lg',
          })}
        >
          High Energy Gaming
        </p>
      )}
    </div>
  )
}
