'use client'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'

const railElAtom = atom<HTMLElement | null>(null)

// routes (and their subroutes) that show the rail; the (sport) group is assumed to be "/" and "/sport/*"
const RAIL_PREFIXES = ['/event', '/live']
const wantsRail = (pathname: string) =>
  pathname === '/' || RAIL_PREFIXES.some(p => pathname === p || pathname.startsWith(`${p}/`))

/**
 * Full-height column beside the page (footer included). Reserved (with `skeleton`
 * inside it) on rail routes from the very first SSR paint; hidden everywhere else.
 * The skeleton hides itself as soon as a RailPortal has rendered its content.
 */
export function RailSlot(props: { skeleton: React.ReactNode }) {
  const setEl = useSetAtom(railElAtom)
  const reserved = wantsRail(usePathname())

  return (
    <aside
      className={
        reserved
          ? 'group bg-dark-200 hidden w-80 shrink-0 border-l border-white/5 xl:block'
          : 'hidden'
      }
    >
      {/* portal target is its own node, so React never mixes portal and regular children.
          `contents` keeps it out of layout, so the sticky rail content is sized by the aside. */}
      <div ref={setEl} className='contents' />
      <div className='contents group-has-data-rail-content:hidden'>
        {reserved && props.skeleton}
      </div>
    </aside>
  )
}

/** Renders children in the rail, pinned below the navbar and as tall as the viewport. */
export function RailPortal({ children }: { children: React.ReactNode }) {
  const el = useAtomValue(railElAtom)
  if (!el) return null

  return createPortal(
    <div data-rail-content className='sticky top-20 h-[calc(100dvh-5rem)]'>
      {children}
    </div>,
    el
  )
}
