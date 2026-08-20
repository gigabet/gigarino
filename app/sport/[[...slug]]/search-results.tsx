'use client'

import { SearchXIcon } from 'lucide-react'
import type { PrematchEvent$key } from '@/app/sport/[[...slug]]/__generated__/PrematchEvent.graphql'
import PrematchEvent, { PrematchEventSkeleton } from '@/app/sport/[[...slug]]/prematch-event'

export default function SearchResults(props: {
  query: string
  totalCount?: number
  events?: ReadonlyArray<{ id: string } & PrematchEvent$key>
}) {
  const events = props.events ?? []

  if (events.length === 0) {
    return (
      <section className='flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-black/20 px-6 py-16 text-center'>
        <div className='bg-dark-300 text-muted-foreground flex size-14 items-center justify-center rounded-full'>
          <SearchXIcon className='size-6' />
        </div>
        <div className='space-y-1'>
          <h3 className='text-foreground text-sm font-semibold'>No matches for "{props.query}"</h3>
          <p className='text-secondary text-xs'>Try a different team, league, or spelling.</p>
        </div>
      </section>
    )
  }

  const count = props.totalCount ?? events.length

  return (
    <section>
      <div className='text-secondary mb-4 border-b py-2 text-sm'>
        {count} result{count === 1 ? '' : 's'} for "{props.query}"
      </div>
      <div className='flex flex-col gap-3'>
        {events.map(event => (
          <PrematchEvent key={event.id} node={event} />
        ))}
      </div>
    </section>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
      <PrematchEventSkeleton />
    </div>
  )
}
