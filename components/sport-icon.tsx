import { GiBasketballBall, GiHockey, GiSoccerBall, GiTennisBall, GiTrophyCup } from 'react-icons/gi'
import type { IconBaseProps } from 'react-icons/lib'
import type { Sport } from '@/types'

export function SportIcon({ sport, ...props }: { sport: Sport | string } & IconBaseProps) {
  switch (sport) {
    case 'highlights':
      return <GiTrophyCup {...props} />
    case 'football':
      return <GiSoccerBall {...props} />
    case 'basketball':
      return <GiBasketballBall {...props} />
    case 'tennis':
      return <GiTennisBall {...props} />
    case 'ice-hockey':
      return <GiHockey {...props} />
    default:
      return null
  }
}
