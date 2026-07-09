import {
  GiAmericanFootballBall,
  GiBasketballBall,
  GiPingPongBat,
  GiSoccerBall,
  GiTennisBall,
  GiTrophyCup,
} from 'react-icons/gi'
import { PiMonitorPlayFill } from 'react-icons/pi'

const sample = [
  { label: 'World Cup 2026', icon: GiTrophyCup },
  { label: 'Wimbledon', icon: GiTennisBall },
  { label: 'Football Today', icon: GiSoccerBall },
  { label: 'Tennis Today', icon: GiTennisBall },
  { label: 'In Play', icon: PiMonitorPlayFill },
  { label: 'NBA Championship', icon: GiBasketballBall },
  { label: 'Rugby League', icon: GiAmericanFootballBall },
  { label: 'Table Tennis World', icon: GiPingPongBat },
]

export default function ShortcutRow() {
  return (
    <div className='w-full scrollbar-none overflow-x-auto'>
      <div className='flex gap-4'>
        {sample.map(e => (
          <div
            key={e.label}
            className='bg-muted/40 inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 whitespace-nowrap'
          >
            <e.icon />
            <span className='text-foreground/70 text-xs font-light tracking-wide'>{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
