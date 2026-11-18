import { atomWithStorage } from 'jotai/utils'

/**
 * Statistics widget on the single-view pages. Off by default and on the server;
 * the stored choice is applied after mount (`getOnInit: false`), so hydration matches.
 */
export const statisticsEnabledAtom = atomWithStorage('statistics-widget', false, undefined, {
  getOnInit: false,
})
