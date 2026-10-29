'use client'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { createPortal } from 'react-dom'

const railElAtom = atom<HTMLElement | null>(null)

/**
 * Full-height column beside the page (footer included). Empty (and therefore hidden)
 * unless a route portals something into it.
 */
export function RailSlot() {
  const setEl = useSetAtom(railElAtom)

  return (
    <aside
      ref={setEl}
      className='bg-dark-200 hidden w-80 shrink-0 border-l border-white/5 empty:hidden xl:block'
    />
  )
}

/** Renders children in the rail, pinned below the navbar and as tall as the viewport. */
export function RailPortal({ children }: { children: React.ReactNode }) {
  const el = useAtomValue(railElAtom)
  if (!el) return null

  return createPortal(<div className='sticky top-20 h-[calc(100dvh-5rem)]'>{children}</div>, el)
}
