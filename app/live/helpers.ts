import { useSyncExternalStore } from 'react'
import type { MatchPeriod } from '@/app/live/__generated__/LiveTime.graphql'
import { tKeysObj } from '@/i18n/tKey'

const listeners = new Set<() => void>()
let timer: ReturnType<typeof setInterval> | undefined

function subscribe(cb: () => void) {
  listeners.add(cb)
  timer ??= setInterval(
    () =>
      listeners.forEach(l => {
        l()
      }),
    250
  )
  return () => {
    listeners.delete(cb)
    if (listeners.size === 0) {
      clearInterval(timer)
      timer = undefined
    }
  }
}

const noop = () => () => {}
// floored to the second so the snapshot is stable between ticks
const snapshot = () => Math.floor(Date.now() / 1000) * 1000

/** Current time, re-rendering once a second while `active`. Remount-safe: always fresh. */
export function useNow(active = true) {
  return useSyncExternalStore(active ? subscribe : noop, snapshot, snapshot)
}

export function getPeriod(period: MatchPeriod | null) {
  switch (period) {
    case 'BREAK':
      return tKeysObj({ long: 'Break', short: 'Break' })
    case 'EXTRA_TIME':
      return tKeysObj({ long: 'Extra Time', short: 'ET' })
    case 'FIRST_HALF':
      return tKeysObj({ long: '1. Half', short: '1H' })
    case 'FIRST_PERIOD':
      return tKeysObj({ long: '1. Period', short: '1P' })
    case 'HALF_TIME':
      return tKeysObj({ long: 'Halftime', short: 'HT' })
    case 'PENALTIES':
      return tKeysObj({ long: 'Penalties', short: 'PEN' })
    case 'SECOND_HALF':
      return tKeysObj({ long: '2. Half', short: '2H' })
    case 'SECOND_PERIOD':
      return tKeysObj({ long: '2. Period', short: '2P' })
    case 'THIRD_PERIOD':
      return tKeysObj({ long: '3. Period', short: '3P' })
    case 'FIFTH_SET':
      return tKeysObj({ long: '5. Set', short: '5S' })
    case 'FIRST_SET':
      return tKeysObj({ long: '1. Set', short: '1S' })
    case 'FOURTH_PERIOD':
      return tKeysObj({ long: '4. Period', short: '4P' })
    case 'FOURTH_SET':
      return tKeysObj({ long: '4. Set', short: '4S' })
    case 'OVERTIME':
      return tKeysObj({ long: 'Overtime', short: 'OT' })
    case 'SECOND_SET':
      return tKeysObj({ long: '2. Set', short: '2S' })
    case 'THIRD_SET':
      return tKeysObj({ long: '3. Set', short: '3S' })
    default:
      return { long: 'Live', short: 'Live' }
  }
}
