'use client'

import { format } from 'date-fns'
import { useEffect, useRef } from 'react'
import { graphql, useFragment } from 'react-relay'
import type { Event_event$key } from '@/app/live/__generated__/Event_event.graphql'
import Odds from '@/app/live/odds'
import { useRefetchBatcher } from '@/app/live/refetch-context'

export default function LiveEvent({ eventRef }: { eventRef: Event_event$key }) {
  const event = useFragment(
    graphql`
      fragment Event_event on Event {
        id
        league
        name
        startTime
        ...Event_odds
      }
    `,
    eventRef
  )
  const batcher = useRefetchBatcher()
  const hasReappeared = useRef(false)

  useEffect(() => {
    if (hasReappeared.current === true) batcher.request(event.id)
    else hasReappeared.current = true
    return () => batcher.cancel(event.id)
  }, [event.id, batcher])

  return (
    <div className='pb-2'>
      <div className='w-full min-w-120 rounded-lg bg-black/50 px-6 py-4'>
        <div className='mb-2 flex justify-between text-xs'>
          <span className='text-muted-foreground'>{event.id}</span>
          <span className='text-primary/70'>{event.league}</span>
        </div>
        <div className='flex items-center gap-4'>
          <time className='text-secondary flex flex-col items-center text-xs'>
            <span>{format(event.startTime, 'dd MMM')}</span>
            <span>{format(event.startTime, 'HH:mm')}</span>
          </time>
          <div className='mr-auto flex w-40 flex-col text-sm'>
            {event.name.split(' vs ').map(team => (
              <div key={team} className='font-medium'>
                {team}
              </div>
            ))}
          </div>
          <Odds queryRef={event} />
        </div>
      </div>
    </div>
  )
}
