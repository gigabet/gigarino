import { sortBy } from 'lodash'

const sportOrder = [
  'football',
  'tennis',
  'basketball',
  'ice-hockey',
  'esoccer',
  'etennis',
  'ebasketball',
  'e-ice-hockey',
]

/** Sorts anything with a sport `key` into the canonical sport order. Unknown keys go last. */
export function sortBySportOrder<T extends { key: string }>(sports: ReadonlyArray<T>): T[] {
  return sortBy(sports, sport => {
    const index = sportOrder.indexOf(sport.key)
    return index === -1 ? Infinity : index
  })
}
