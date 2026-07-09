/** biome-ignore-all lint/suspicious/noArrayIndexKey: idc */
'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Toggle } from 'radix-ui'
import { graphql, useFragment } from 'react-relay'
import type { odds_MockOdds$key } from '@/app/live/__generated__/odds_MockOdds.graphql'
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useDelta } from '@/context/hooks'
import { cn } from '@/lib/utils'

// const SUBSCRIBE_DELAY_MS = 2000
const odds_Odds = graphql`
  fragment odds_MockOdds on MockOdds {
    home
    away
    draw
  }
`

export default function Odds(props: {
  eid: string
  queryRef: odds_MockOdds$key
  className?: string
}) {
  const data = useFragment(odds_Odds, props.queryRef)
  // const environment = useRelayEnvironment()

  // delayed subscriptions
  // useEffect(() => {
  //   let disposable: Disposable | null = null

  //   const startTimer = window.setTimeout(() => {
  //     disposable = requestSubscription<odds_Odds_sub>(environment, {
  //       subscription,
  //       variables: { eventId: props.eid },
  //       onError: err => console.error('[odds subscription] error', err),
  //     })
  //   }, SUBSCRIBE_DELAY_MS)

  //   return () => {
  //     if (disposable) disposable.dispose()
  //     clearTimeout(startTimer)
  //   }
  // }, [environment, props.eid])

  return (
    <div className={cn('flex gap-1', props.className)}>
      <Odd label='1' odd={data.home} />
      <Odd label='X' odd={data.draw} />
      <Odd label='2' odd={data.away} />
    </div>
  )
}

// const VARIANT: 'delta' | 'odometer' = 'odometer' // flip to A/B test
function Odd(props: { label: string; odd: number }) {
  const delta = useDelta(props.odd)
  const positive = delta > 0

  return (
    <Toggle.Root
      value={props.label}
      className='bg-dark-300/50 data-[updown=up]:border-primary data-[updown=down]:border-destructive data-[state=on]:bg-accent group/odd relative flex w-16 flex-col items-center rounded-lg py-2'
      // data-updown={delta === 0 ? '' : positive ? 'up' : 'down'}
    >
      <span className='text-secondary group-data-[state=on]/odd:text-accent-foreground text-xs'>
        {props.label}
      </span>
      <span className='text-sm font-semibold' suppressHydrationWarning>
        {props.odd.toFixed(2)}
      </span>
      {/* {VARIANT === 'odometer' ? (
        <NumberFlow
          value={props.odd}
          format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
          plugins={[continuous]}
          className='text-sm font-semibold'
          transformTiming={{ duration: 1500, easing: 'ease-out' }}
          spinTiming={{ duration: 1500, easing: 'ease-out' }}
        />
      ) : ( */}
      <AnimatePresence mode='wait'>
        {delta !== 0 && (
          <motion.span
            key={delta}
            className={[
              'pointer-events-none absolute -bottom-4 text-xs font-medium',
              positive ? 'text-primary' : 'text-destructive',
            ].join(' ')}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{
              opacity: 0,
              y: 8,
              transition: { duration: 0.2, delay: 0.2 },
            }}
          >
            {positive ? '+' : ''}
            {delta.toFixed(2)}
          </motion.span>
        )}
      </AnimatePresence>
      {/* )} */}
    </Toggle.Root>
  )
}
