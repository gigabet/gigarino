'use client'

import { entries } from 'lodash'
import { CheckCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  GiBasketballBall,
  GiHockey,
  GiPingPongBat,
  GiSoccerBall,
  GiTennisBall,
  GiVolleyballBall,
} from 'react-icons/gi'
import { cn } from '@/lib/utils'

const SPORTS = {
  all: CheckCheck,
  soccer: GiSoccerBall,
  tennis: GiTennisBall,
  basketball: GiBasketballBall,
  volleyball: GiVolleyballBall,
  tabletennis: GiPingPongBat,
  icehockey: GiHockey,
}

export default function SportsSelection() {
  const pathname = usePathname()
  return (
    <nav className='flex items-center gap-6 border-b'>
      {entries(SPORTS).map(([sport, Icon]) => (
        <Link
          key={sport}
          href={`/live/${sport}`}
          className={cn(
            'group/nav relative h-8 text-sm font-medium capitalize transition-all duration-300',
            pathname === `/live/${sport}`
              ? 'text-foreground [&>div>svg]:text-primary [&>div>svg]:drop-shadow-[0_0_8px]'
              : 'text-muted-foreground'
          )}
        >
          <div className='group-hover/nav:text-foreground flex items-center gap-2'>
            {Icon && <Icon className='drop-shadow-primary size-5 transition-all duration-300' />}{' '}
            <span className='transition-all duration-300'>{sport}</span>
          </div>
          <div
            className={cn(
              'bg-primary absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300',
              pathname === `/live/${sport}` ? 'w-full' : 'group-hover/nav:w-full'
            )}
          />
        </Link>
      ))}
    </nav>
  )
}
