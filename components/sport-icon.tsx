import {
  GiBasketballBall,
  GiConsoleController,
  GiHockey,
  GiSoccerBall,
  GiTennisBall,
  GiTrophyCup,
} from 'react-icons/gi'
import type { IconBaseProps } from 'react-icons/lib'
import { getSportTheme } from '@/lib/sport-theme'
import type { Sport } from '@/types'

export function SportIcon({
  sport,
  colored,
  style,
  ...props
}: { sport: Sport | string; colored?: boolean } & IconBaseProps) {
  const mergedStyle = colored ? { color: getSportTheme(sport as string).primary, ...style } : style
  const finalProps = { ...props, style: mergedStyle }

  switch (sport) {
    case 'highlights':
      return <GiTrophyCup {...finalProps} />
    case 'football':
      return <GiSoccerBall {...finalProps} />
    case 'basketball':
      return <GiBasketballBall {...finalProps} />
    case 'tennis':
      return <GiTennisBall {...finalProps} />
    case 'ice-hockey':
      return <GiHockey {...finalProps} />
    case 'esoccer':
    case 'etennis':
    case 'ebasketball':
    case 'e-ice-hockey':
    case 'esports':
      return <GiConsoleController {...finalProps} />
    default:
      return null
  }
}

/** Circular gradient badge wrapping a colored SportIcon — a stronger visual
 * anchor than a bare glyph, used in the sidebar and tournament headers. */
export function SportIconBadge(props: { sport: Sport | string; size?: 'sm' | 'md' }) {
  const theme = getSportTheme(props.sport as string)
  const size = props.size === 'sm' ? 'size-7' : 'size-9'

  return (
    <span
      className={`relative flex ${size} shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105`}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${theme.soft}, transparent 70%)`,
        border: `1px solid ${theme.glow}`,
      }}
    >
      <SportIcon
        sport={props.sport}
        colored
        className={props.size === 'sm' ? 'size-3.5' : 'size-4.5'}
      />
    </span>
  )
}
