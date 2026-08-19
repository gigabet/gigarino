'use client'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'
import type { BetslipSubscription$variables } from '@/app/sport/__generated__/BetslipSubscription.graphql'

export type BetslipInput = BetslipSubscription$variables['input']

const defaultInput: BetslipInput = {
  items: [],
  stake: '10',
  betType: 'SINGLE',
  systemSize: undefined,
}

/** Persisted across reloads — this is exactly what we send as subscription variables */
export const betslipInputAtom = atomWithStorage<BetslipInput>('betslip', defaultInput)
export const betslipOpenAtom = atom(false)

export function useToggleOdd() {
  const setInput = useSetAtom(betslipInputAtom)

  return useCallback(
    (outcomeId: string) =>
      setInput(prev => {
        if (prev.items.some(i => i.outcomeId === outcomeId)) {
          let { systemSize, betType } = prev
          if (systemSize && systemSize === prev.items.length - 1) {
            systemSize = prev.items.length - 2
            if (systemSize < 2) {
              systemSize = null
              betType = 'MULTIPLE'
            }
          }

          if (prev.items.length <= 2) betType = 'SINGLE'

          return {
            ...prev,
            items: prev.items.filter(i => i.outcomeId !== outcomeId),
            systemSize,
            betType,
          }
        }
        return { ...prev, items: [...prev.items, { outcomeId }] }
      }),
    [setInput]
  )
}

export function useHasOdd() {
  const input = useAtomValue(betslipInputAtom)
  return useCallback((oddId: string) => input.items.some(i => i.outcomeId === oddId), [input])
}
