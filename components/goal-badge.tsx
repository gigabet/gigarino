'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useT } from '@/context/providers'
import { cn } from '@/lib/utils'

const GOAL_SPORTS = new Set(['football', 'esoccer'])
export const hasGoals = (sportKey?: string | null) => !!sportKey && GOAL_SPORTS.has(sportKey)

// NB – must use a `relative` parent. `side` = which side of the parent it floats on.
export function GoalBadge(props: {
  goalId: number | null
  side?: 'left' | 'right'
  className?: string
}) {
  const t = useT()
  const left = props.side !== 'right'

  return (
    <AnimatePresence>
      {props.goalId !== null && (
        <motion.span
          key={props.goalId}
          aria-hidden
          initial={{ opacity: 0, x: left ? 10 : -10, scale: 0.7 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: left ? -10 : 10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
          className={cn(
            'bg-primary text-primary-foreground shadow-glow pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 rounded-full px-1.5 py-0.5 text-[0.55rem] leading-none font-black tracking-wide whitespace-nowrap uppercase [corner-shape:squircle]',
            left ? 'right-full mr-1.5' : 'left-full ml-1.5',
            props.className
          )}
        >
          {t('Goal')}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
