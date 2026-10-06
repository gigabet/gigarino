import { useSyncExternalStore } from 'react'
import { tKeysObj } from '@/i18n/tKey'
import type { MatchPeriod } from '@/types'

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

export function getPeriod(period: MatchPeriod | null | undefined) {
  switch (period) {
    case 'BREAK':
      return tKeysObj({ long: 'Break', short: 'Break' })
    case 'EXTRA_TIME':
      return tKeysObj({ long: 'Extra Time', short: 'ET' })
    case 'FIRST_HALF':
      return tKeysObj({ long: '1st Half', short: '1H' })
    case 'FIRST_PERIOD':
      return tKeysObj({ long: '1st Period', short: '1P' })
    case 'HALF_TIME':
      return tKeysObj({ long: 'Half Time', short: 'HT' })
    case 'PENALTIES':
      return tKeysObj({ long: 'Penalties', short: 'PEN' })
    case 'SECOND_HALF':
      return tKeysObj({ long: '2nd Half', short: '2H' })
    case 'SECOND_PERIOD':
      return tKeysObj({ long: '2nd Period', short: '2P' })
    case 'THIRD_PERIOD':
      return tKeysObj({ long: '3rd Period', short: '3P' })
    default:
      return { long: 'Live', short: 'Live' }
  }
}
