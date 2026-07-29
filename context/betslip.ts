'use client'

import { atom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { BetslipSubscription$variables } from '@/app/sport/__generated__/BetslipSubscription.graphql'

export type BetslipInput = BetslipSubscription$variables['input']

const defaultInput: BetslipInput = { items: [], stake: '10', betType: 'SINGLE' }

/** Persisted across reloads — this is exactly what we send as subscription variables */
export const betslipInputAtom = atomWithStorage<BetslipInput>('betslip', defaultInput)
export const betslipOpenAtom = atom(false)

export function useAddSelection() {
  const setInput = useSetAtom(betslipInputAtom)
  const setOpen = useSetAtom(betslipOpenAtom)

  return (outcomeId: string) => {
    setInput(prev => ({
      ...prev,
      items: [...prev.items.filter(i => i.outcomeId !== outcomeId), { outcomeId }],
    }))
    setOpen(true)
  }
}
