// app/live/controls.tsx
'use client'

import { useAtom } from 'jotai'
import { LayoutListIcon, PanelRightIcon, TimerIcon, TrophyIcon } from 'lucide-react'
import { liveSortState, liveViewState } from '@/app/live/store'
import { cn } from '@/lib/utils'

export default function LiveControls() {
  const [sort, setSort] = useAtom(liveSortState)
  const [view, setView] = useAtom(liveViewState)

  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <div className='bg-dark-200 flex items-center gap-1 rounded-full border border-white/5 p-1 text-xs'>
        <SegButton
          active={sort === 'tournament'}
          onClick={() => setSort('tournament')}
          icon={<TrophyIcon className='size-3.5' />}
        >
          Tournament
        </SegButton>
        <SegButton
          active={sort === 'time'}
          onClick={() => setSort('time')}
          icon={<TimerIcon className='size-3.5' />}
        >
          Time
        </SegButton>
      </div>

      <div className='bg-dark-200 flex items-center gap-1 rounded-full border border-white/5 p-1 text-xs'>
        <SegButton
          active={view === 'list'}
          onClick={() => setView('list')}
          icon={<LayoutListIcon className='size-3.5' />}
        >
          List
        </SegButton>
        <SegButton
          active={view === 'single'}
          onClick={() => setView('single')}
          icon={<PanelRightIcon className='size-3.5' />}
        >
          Single
        </SegButton>
      </div>
    </div>
  )
}

function SegButton(props: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      type='button'
      onClick={props.onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors',
        props.active ? 'bg-primary text-black' : 'text-white/60 hover:text-white'
      )}
    >
      {props.icon}
      {props.children}
    </button>
  )
}
