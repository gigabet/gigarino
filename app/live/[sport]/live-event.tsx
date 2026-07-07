'use client'

import { format } from 'date-fns'
import { useEffect, useRef } from 'react'
import { IoStatsChart } from 'react-icons/io5'
import { graphql, useFragment } from 'react-relay'
import type { liveEvent_Event$key } from '@/app/live/[sport]/__generated__/liveEvent_Event.graphql'
import Odds from '@/app/live/[sport]/odds'
import { useRefetchBatcher } from '@/app/live/[sport]/refetch-context'
import { Button } from '@/components/ui/button'

export default function LiveEvent({ eventRef }: { eventRef: liveEvent_Event$key }) {
  const event = useFragment(
    graphql`
      fragment liveEvent_Event on MockEvent {
        id
        league
        name
        startTime
        odds {
          ...odds_MockOdds
        }
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
    <div className='@container w-full pb-2'>
      <div className='w-full min-w-120 rounded-lg bg-black/50 px-6 py-4'>
        <div className='mb-2 flex justify-between text-xs'>
          <span className='text-primary/70'>{event.league}</span>
          {process.env.NODE_ENV === 'development' && (
            <span className='text-muted-foreground'>{event.id}</span>
          )}
        </div>
        <div className='flex items-center gap-4'>
          <time className='text-secondary flex flex-col items-center text-xs'>
            <span>{format(event.startTime, 'dd MMM')}</span>
            <span>{format(event.startTime, 'HH:mm')}</span>
          </time>
          <div className='flex grow flex-col text-sm'>
            {event.name.split(' vs ').map((team, i) => (
              <div key={team} className='flex justify-between font-medium'>
                <span>{team}</span>
                <span className='text-primary font-mono'>{i}</span>
              </div>
            ))}
          </div>
          <div className='flex flex-nowrap items-center gap-4'>
            <Odds eid={event.id} queryRef={event.odds} />
            <Odds eid={event.id} queryRef={event.odds} className='@max-2xl:hidden' />
            <Odds eid={event.id} queryRef={event.odds} className='@max-5xl:hidden' />
            <Odds eid={event.id} queryRef={event.odds} className='@max-6xl:hidden' />
            <Odds eid={event.id} queryRef={event.odds} className='@max-[84rem]:hidden' />
          </div>
          <div className='flex flex-nowrap'>
            <Button variant='ghost'>+119</Button>
            <Button variant='ghost'>
              <IoStatsChart />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
