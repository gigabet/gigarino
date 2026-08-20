'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDebounce, useSidebarSearch } from '@/context/hooks'

const MIN_CHARS = 3

export default function SidebarSearch() {
  const { term, setTerm } = useSidebarSearch()
  const [value, setValue] = useState(term)
  const debounced = useDebounce(value, 300)
  const lastCommitted = useRef(term)

  // only search if 3+ chars
  useEffect(() => {
    if (debounced === lastCommitted.current) return
    if (debounced.length === 0 || debounced.length >= MIN_CHARS) {
      lastCommitted.current = debounced
      setTerm(debounced)
    }
  }, [debounced, setTerm])

  // sync with `q` in case user types in the url, refreshes, or uses back/forward
  useEffect(() => {
    if (term !== lastCommitted.current) {
      lastCommitted.current = term
      setValue(term)
    }
  }, [term])

  return (
    <div className='focus-within:border-primary/40 flex h-10 items-center gap-3 rounded-full border bg-black/50 px-4'>
      <SearchIcon className='text-muted-foreground size-4 shrink-0' />
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='search teams, leagues...'
        aria-label='Search sports'
        className='text-foreground placeholder:text-muted-foreground w-full min-w-0 bg-transparent text-sm outline-none'
      />
      {value.length > 0 && (
        <button
          type='button'
          aria-label='Clear search'
          onClick={() => setValue('')}
          className='text-muted-foreground hover:text-foreground shrink-0'
        >
          <XIcon className='size-3.5' />
        </button>
      )}
    </div>
  )
}
