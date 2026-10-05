'use client'

import { LayoutListIcon, Rows3Icon, SlidersHorizontalIcon } from 'lucide-react'
import * as DropdownMenu from '@/components/ui/dropdown-menu'
import { cx } from 'class-variance-authority'

export type LiveSort = 'tournament' | 'chronological'
export type LiveView = 'list' | 'single'

export default function LiveToolbar(props: {
  sort: LiveSort
  onSortChangeAction: (sort: LiveSort) => void
  view: LiveView
  onViewChangeAction: (view: LiveView) => void
}) {
  return (
    <div className='flex items-center justify-between gap-3'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type='button'
            className='bg-dark-200 hover:bg-dark-300 flex items-center gap-2 rounded-full border border-white/5 px-3.5 py-2 text-xs text-white/70 transition-colors hover:text-white'
          >
            <SlidersHorizontalIcon className='size-3.5' />
            {props.sort === 'tournament' ? 'By competition' : 'By start time'}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align='start' className='w-44'>
          <DropdownMenu.Item
            className='cursor-pointer text-gray-300 focus:bg-white/5 focus:text-white'
            onClick={() => props.onSortChangeAction('tournament')}
          >
            By competition
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className='cursor-pointer text-gray-300 focus:bg-white/5 focus:text-white'
            onClick={() => props.onSortChangeAction('chronological')}
          >
            By start time
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <div className='bg-dark-200 flex items-center gap-1 rounded-full border border-white/5 p-1'>
        <ViewButton
          active={props.view === 'list'}
          onClick={() => props.onViewChangeAction('list')}
          icon={<Rows3Icon className='size-3.5' />}
          label='List'
        />
        <ViewButton
          active={props.view === 'single'}
          onClick={() => props.onViewChangeAction('single')}
          icon={<LayoutListIcon className='size-3.5' />}
          label='Single'
        />
      </div>
    </div>
  )
}

function ViewButton(props: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type='button'
      onClick={props.onClick}
      className={cx(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
        props.active ? 'bg-primary text-black' : 'text-white/60 hover:text-white'
      )}
    >
      {props.icon}
      {props.label}
    </button>
  )
}
