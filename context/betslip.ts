'use client'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback, useMemo } from 'react'
import { tKey } from '@/i18n/tKey'
import type {
  BetRejectionCode,
  OddsChangePolicy,
} from '@/relay/__generated__/BetslipPlaceBetMutation.graphql'
import type { BetslipSubscription$variables } from '@/relay/__generated__/BetslipSubscription.graphql'

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
export const oddsPolicyAtom = atom<OddsChangePolicy>('REJECT')
/** Signature of the odds-change prompt the player dismissed; a further price move re-shows it. */
export const dismissedPriceChangesAtom = atom<string | null>(null)

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

// sets the default stake and clears any per-leg overrides, so every tip follows it
// if we'd rather keep overrides, change the hook to only set stake and leave items alone; edited tips would then stay put while the rest follow the master
export function useSetDefaultStake() {
  const setInput = useSetAtom(betslipInputAtom)
  return useCallback(
    (stake: string) =>
      setInput(prev => ({
        ...prev,
        stake,
        items: prev.items.map(({ stake: _override, ...rest }) => rest),
      })),
    [setInput]
  )
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

/**
 * Writes `expectedPrice` onto items from `prices`. With `onlyMissing`, items that already have
 * an expected price are left alone (stamping); otherwise changed prices overwrite (accepting).
 * Returns the same reference when nothing changed, so the subscription does not restart.
 */
export function withPrices(
  prev: BetslipInput,
  prices: ReadonlyMap<string, string>,
  onlyMissing: boolean
): BetslipInput {
  let changed = false
  const items = prev.items.map(i => {
    const p = prices.get(i.outcomeId)
    if (!p || (onlyMissing && i.expectedPrice) || i.expectedPrice === p) return i
    changed = true
    return { ...i, expectedPrice: p }
  })
  return changed ? { ...prev, items } : prev
}

export function useBetslipPrices() {
  const setInput = useSetAtom(betslipInputAtom)

  const apply = useCallback(
    (prices: ReadonlyMap<string, string>, onlyMissing: boolean) =>
      setInput(prev => withPrices(prev, prices, onlyMissing)),
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
  BOOST_LIMIT: tKey('Over boost limit.'),
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
  // eslint-disable-next-line relay/no-future-added-value
  '%future added value': '',
}

export function betCodeCopy(
  code: string,
  t: (key: string, params?: Record<string, string | number>) => string
): string | null {
  const key = COPY[code as BetRejectionCode]
  return key ? t(key) : t('Outcome unavailable.')
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

/** A boost only applies while unexpired and when the slip is exactly the boosted selections. */
export function isBoostActive(
  input: BetslipInput,
  boost: ActiveBoost | null,
  now: number
): boost is ActiveBoost {
  if (!boost || input.betType === 'SYSTEM') return false
  if (boost.validTo && Date.parse(boost.validTo) <= now) return false
  const ids = new Set(input.items.map(i => i.outcomeId))
  const same = ids.size === boost.outcomeIds.length && boost.outcomeIds.every(id => ids.has(id))
  return same && (ids.size === 1 || input.betType === 'MULTIPLE')
}

export function useActiveBoost() {
  const input = useAtomValue(betslipInputAtom)
  const boost = useAtomValue(boostAtom)
  return useMemo(() => (isBoostActive(input, boost, Date.now()) ? boost : null), [input, boost])
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

/** Empties the slip: selections, system size, bet type and any boost. */
export function useClearBetslip() {
  const setInput = useSetAtom(betslipInputAtom)
  const setBoost = useSetAtom(boostAtom)
  return useCallback(() => {
    setInput(prev => ({
      ...prev,
      items: [],
      systemSize: null,
      betType: 'SINGLE',
    }))
    setBoost(null)
  }, [setInput, setBoost])
}

/** Back to asking from scratch: the default odds policy and no dismissed odds-change prompt. */
export function useResetOddsPrompt() {
  const setPolicy = useSetAtom(oddsPolicyAtom)
  const setDismissed = useSetAtom(dismissedPriceChangesAtom)
  return useCallback(() => {
    setPolicy('REJECT')
    setDismissed(null)
  }, [setPolicy, setDismissed])
}

/**
 * SYSTEM only: the selections that are not bankers. A banker sits in every combination, so
 * `systemSize` and the "k out of N" label count only these.
 */
export function systemPoolSize(input: Pick<BetslipInput, 'items'>): number {
  return input.items.filter(i => !i.banker).length
}

/** Bankers only exist on SYSTEM bets; drop the flags when leaving it. Same reference if none set. */
function withoutBankers(items: BetslipInput['items']): BetslipInput['items'] {
  return items.some(i => i.banker !== undefined)
    ? items.map(({ banker: _banker, ...rest }) => rest)
    : items
}

/**
 * Switches the bet type, keeping the SYSTEM invariants: `systemSize` stays in 2..N-1 (N = non-banker
 * selections) and bankers are cleared when leaving SYSTEM. Entering SYSTEM needs N >= 3.
 */
export function withBetType(prev: BetslipInput, betType: BetslipInput['betType']): BetslipInput {
  if (betType !== 'SYSTEM') return { ...prev, betType, items: withoutBankers(prev.items) }

  const pool = systemPoolSize(prev)
  if (pool < 3) return prev
  const systemSize = Math.min(Math.max(prev.systemSize ?? 2, 2), pool - 1)
  return { ...prev, betType, systemSize }
}

/**
 * Flags (or unflags) a SYSTEM selection as a banker. Ignored outside SYSTEM, and refused when it
 * would leave fewer than 3 other selections, since "k out of N" needs 2 <= k < N.
 */
export function withBanker(prev: BetslipInput, outcomeId: string, banker: boolean): BetslipInput {
  const target = prev.items.find(i => i.outcomeId === outcomeId)
  if (prev.betType !== 'SYSTEM' || !target || !!target.banker === banker) return prev

  const items = prev.items.map(i => (i.outcomeId === outcomeId ? { ...i, banker } : i))
  const pool = systemPoolSize({ items })
  if (pool < 3) return prev

  const { systemSize } = prev
  return {
    ...prev,
    items,
    systemSize: systemSize && systemSize >= pool ? pool - 1 : systemSize,
  }
}

export function withoutItems(prev: BetslipInput, ids: ReadonlySet<string>): BetslipInput {
  const items = prev.items.filter(i => !ids.has(i.outcomeId))
  let { betType, systemSize } = prev

  if (items.length <= 1) {
    betType = 'SINGLE'
    systemSize = undefined
  } else if (betType === 'SYSTEM') {
    const pool = systemPoolSize({ items })
    if (pool < 3) {
      betType = 'MULTIPLE'
      systemSize = undefined
    } else if (systemSize && systemSize >= pool) {
      systemSize = pool - 1
    }
  }

  return {
    ...prev,
    items: betType === 'SYSTEM' ? items : withoutBankers(items),
    betType,
    systemSize,
  }
}

/** Which tab the drawer opens on. Only read when the drawer mounts. */
export type BetslipTab = 'betslip' | 'tickets'
export const betslipTabAtom = atom<BetslipTab>('betslip')
