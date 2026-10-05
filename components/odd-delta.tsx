'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useDelta } from '@/context/hooks'
import { cn } from '@/lib/utils'

// NB – must use a `relative` parent
export function OddDelta(props: {
  price: number
  placement?: 'below' | 'side'
  className?: string
}) {
  const delta = useDelta(props.price)
  const below = props.placement !== 'side'

  return (
    <AnimatePresence>
      {delta !== 0 && (
        <motion.span
          key={delta}
          aria-hidden
          initial={below ? { opacity: 0, y: 0 } : { opacity: 0, x: -4 }}
          animate={below ? { opacity: 1, y: 18 } : { opacity: 1, x: 0 }}
          exit={below ? { opacity: 0, y: 48 } : { opacity: 0, x: 6 }}
          transition={{ duration: 0.4 }}
          className={cn(
            'pointer-events-none absolute text-[0.6rem]',
            !below && 'top-0 left-full ml-1',
            delta > 0 ? 'text-primary' : 'text-destructive',
            props.className
          )}
        >
          {delta > 0 && '+'}
          {delta.toFixed(2)}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
