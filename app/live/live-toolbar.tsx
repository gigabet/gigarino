'use client'

import { cx } from 'class-variance-authority'
import { LayoutListIcon, Rows3Icon, SlidersHorizontalIcon } from 'lucide-react'
import * as DropdownMenu from '@/components/ui/dropdown-menu'

export type LiveSort = 'tournament' | 'chronological'
export type LiveView = 'list' | 'single'

const SEARCH_DEBOUNCE_MS = 300

export default function LiveToolbar(props: {
  sort: LiveSort
  onSortChangeAction: (sort: LiveSort) => void
  view: LiveView
  onViewChangeAction: (view: LiveView) => void
  search: string
  onSearchChangeAction: (search: string) => void
}) {
  // const t = useT()

  // // typing stays local; only the settled value reaches the queries
  // const [text, setText] = useState(props.search)
  // const debounced = useDebounce(text, SEARCH_DEBOUNCE_MS)
  // const { onSearchChangeAction } = props
  // useEffect(() => {
  //   onSearchChangeAction(debounced.trim())
  // }, [debounced, onSearchChangeAction])

  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type='button'
            className='bg-control border-control-border flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs text-white/80 transition-colors hover:bg-white/12 hover:text-white'
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

      {/* lg: between sort and view; below lg: its own full-width row underneath them */}
      {/* <div className='relative order-last w-full lg:order-0 lg:mx-auto lg:w-auto lg:max-w-md lg:flex-1'>
        <SearchIcon className='pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-white/50' />
        <input
          type='text'
          inputMode='search'
          enterKeyHint='search'
          autoComplete='off'
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={t('Search live events')}
          aria-label={t('Search live events')}
          className='bg-control focus:border-primary w-full rounded-full border border-control-border py-2 pr-9 pl-9 text-xs text-white transition-colors outline-none placeholder:text-white/40'
        />
        {text && (
          <button
            type='button'
            onClick={() => setText('')}
            aria-label={t('Clear search')}
            className='absolute top-1/2 right-2.5 flex size-5 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white'
          >
            <XIcon className='size-3.5' />
          </button>
        )}
      </div> */}

      <div className='bg-control border-control-border flex items-center gap-1 rounded-full border p-1'>
        <ViewButton
          active={props.view === 'single'}
          onClick={() => props.onViewChangeAction('single')}
          icon={<LayoutListIcon className='size-3.5' />}
          label='Single'
        />
        <ViewButton
          active={props.view === 'list'}
          onClick={() => props.onViewChangeAction('list')}
          icon={<Rows3Icon className='size-3.5' />}
          label='List'
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
