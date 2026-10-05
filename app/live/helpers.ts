import { tKeysObj } from '@/i18n/tKey'
import type { MatchPeriod } from '@/types'

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
