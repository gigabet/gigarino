'use client'

import { atom, useStore } from 'jotai'
import { useCallback } from 'react'
import { betslipOpenAtom } from '@/context/betslip'

export const trackedEventIdAtom = atom<string | null>(null)

export function useToggleTracker() {
  const store = useStore()

  return useCallback(
    (eventId: string) => {
      const closing = store.get(trackedEventIdAtom) === eventId
      store.set(trackedEventIdAtom, closing ? null : eventId)

      // below xl the betslip only exists as a drawer, so open it to reveal the tracker
      if (!closing && !window.matchMedia('(min-width: 1280px)').matches) {
        store.set(betslipOpenAtom, true)
      }
    },
    [store]
  )
}
