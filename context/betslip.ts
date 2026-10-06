'use client'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback, useMemo } from 'react'
import type { BetslipSubscription$variables } from '@/app/sport/__generated__/BetslipSubscription.graphql'
import { tKey } from '@/i18n/tKey'
import type { BetRejectionCode } from '@/types'

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
      setInput(prev =>
        prev.items.some(i => i.outcomeId === outcomeId)
          ? withoutItems(prev, new Set([outcomeId]))
          : { ...prev, items: [...prev.items, { outcomeId }] }
      ),
    [setInput]
  )
}

export function useHasOdd() {
  const input = useAtomValue(betslipInputAtom)
  return useCallback((oddId: string) => input.items.some(i => i.outcomeId === oddId), [input.items])
}

export function useCombo() {
  const setInput = useSetAtom(betslipInputAtom)

  return useCallback(
    (odds: string[]) =>
      setInput({
        items: odds.map(id => ({ outcomeId: id })),
        stake: '10',
        betType: odds.length > 1 ? 'MULTIPLE' : 'SINGLE',
        systemSize: undefined,
      }),
    [setInput]
  )
}

export function useBetslipPrices() {
  const setInput = useSetAtom(betslipInputAtom)

  const apply = useCallback(
    (prices: ReadonlyMap<string, string>, onlyMissing: boolean) =>
      setInput(prev => {
        let changed = false
        const items = prev.items.map(i => {
          const p = prices.get(i.outcomeId)
          if (!p || (onlyMissing && i.expectedPrice) || i.expectedPrice === p) return i
          changed = true
          return { ...i, expectedPrice: p }
        })
        return changed ? { ...prev, items } : prev // same ref => no resubscribe
      }),
    [setInput]
  )

  return useMemo(
    () => ({
      stamp: (p: ReadonlyMap<string, string>) => apply(p, true),
      accept: (p: ReadonlyMap<string, string>) => apply(p, false),
    }),
    [apply]
  )
}

const COPY: Record<BetRejectionCode, string> = {
  BOOST_UNAVAILABLE: tKey('Boost expired.'),
  CASHOUT_UNAVAILABLE: tKey('Cash out unavailable.'),
  CUTOFF_PASSED: tKey('Event started.'),
  DUPLICATE_EVENT: tKey('One combi bet per event.'),
  EVENT_NOT_BETTABLE: tKey('Event not bettable.'),
  INSUFFICIENT_FUNDS: tKey('Insufficient funds.'),
  INTERNAL_ERROR: tKey('Internal error.'),
  LIABILITY_LIMIT: tKey('Max payout exceeded.'),
  LIVE_STATE_CHANGED: tKey('Match state changed.'),
  MULTI_SINGLE_NOT_SUPPORTED: tKey('Too many singles.'),
  ODDS_LIMIT: tKey('Odds too high.'),
  ODDS_UNAVAILABLE: tKey('Odds unavailable.'),
  OUTCOME_NOT_AVAILABLE: tKey('Outcome unavailable.'),
  PRICE_CHANGED: tKey('Odds have changed.'),
  PROVIDER_CURRENCY: tKey('Currency not supported.'),
  RESPONSIBLE_GAMING: tKey('Betting restricted.'),
  STAKE_LIMIT: tKey('Stake outside limits.'),
  SYSTEM_NOT_SUPPORTED: tKey('System bet not supported.'),
  WALLET_UNAVAILABLE: tKey('Wallet unavailable.'),
}

export function betCodeCopy(
  code: string,
  t: (key: string, params?: Record<string, string | number>) => string
): string | null {
  const key = COPY[code as BetRejectionCode]
  return key ? t(key) : null
}

export type ActiveBoost = {
  id: string
  outcomeIds: string[]
  boostedPrice: string
  combinedPrice: string
  maxStake: string | null
  validTo: string | null
}
export const boostAtom = atomWithStorage<ActiveBoost | null>('betslip-boost', null)

export function useApplyBoost() {
  const setInput = useSetAtom(betslipInputAtom)
  const setBoost = useSetAtom(boostAtom)
  return useCallback(
    (boost: ActiveBoost) => {
      setBoost(boost)
      setInput({
        items: boost.outcomeIds.map(outcomeId => ({ outcomeId })),
        stake: '10',
        betType: boost.outcomeIds.length > 1 ? 'MULTIPLE' : 'SINGLE',
        systemSize: undefined,
      })
    },
    [setInput, setBoost]
  )
}

export function useActiveBoost() {
  const input = useAtomValue(betslipInputAtom)
  const boost = useAtomValue(boostAtom)
  return useMemo(() => {
    if (!boost || input.betType === 'SYSTEM') return null
    if (boost.validTo && Date.parse(boost.validTo) <= Date.now()) return null
    const ids = new Set(input.items.map(i => i.outcomeId))
    const same = ids.size === boost.outcomeIds.length && boost.outcomeIds.every(id => ids.has(id))
    return same && (ids.size === 1 || input.betType === 'MULTIPLE') ? boost : null
  }, [input, boost])
}

export function useSetLegStake() {
  const setInput = useSetAtom(betslipInputAtom)
  return useCallback(
    (outcomeId: string, stake: string) =>
      setInput(prev => ({
        ...prev,
        items: prev.items.map(i => (i.outcomeId === outcomeId ? { ...i, stake } : i)),
      })),
    [setInput]
  )
}

export function withoutItems(prev: BetslipInput, ids: ReadonlySet<string>): BetslipInput {
  const items = prev.items.filter(i => !ids.has(i.outcomeId))
  let { betType, systemSize } = prev

  if (items.length <= 1) {
    betType = 'SINGLE'
    systemSize = undefined
  } else if (betType === 'SYSTEM') {
    if (items.length < 3) {
      betType = 'MULTIPLE'
      systemSize = undefined
    } else if (systemSize && systemSize >= items.length) {
      systemSize = items.length - 1
    }
  }

  return { ...prev, items, betType, systemSize }
}
