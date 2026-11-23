import { describe, expect, it } from 'vitest'
import {
  type ActiveBoost,
  type BetslipInput,
  betCodeCopy,
  isBoostActive,
  systemPoolSize,
  withBanker,
  withBetType,
  withoutItems,
  withPrices,
} from '@/context/betslip'

function slip(ids: string[], overrides: Partial<BetslipInput> = {}): BetslipInput {
  return {
    items: ids.map(outcomeId => ({ outcomeId })),
    stake: '10',
    betType: ids.length > 1 ? 'MULTIPLE' : 'SINGLE',
    systemSize: undefined,
    ...overrides,
  }
}

const ids = (input: BetslipInput) => input.items.map(i => i.outcomeId)

describe('withoutItems', () => {
  it('removes only the given outcomes and keeps order', () => {
    const next = withoutItems(slip(['a', 'b', 'c', 'd']), new Set(['b', 'c']))
    expect(ids(next)).toEqual(['a', 'd'])
  })

  it('ignores ids that are not on the slip', () => {
    const prev = slip(['a', 'b', 'c'])
    const next = withoutItems(prev, new Set(['zzz']))
    expect(next).toEqual(prev)
  })

  it('keeps MULTIPLE while two or more legs remain', () => {
    const next = withoutItems(slip(['a', 'b', 'c']), new Set(['c']))
    expect(next.betType).toBe('MULTIPLE')
  })

  it.each([
    ['MULTIPLE', undefined],
    ['SYSTEM', 2],
  ] as const)(
    'falls back to SINGLE and clears systemSize when one leg is left (%s)',
    (betType, systemSize) => {
      const next = withoutItems(slip(['a', 'b', 'c'], { betType, systemSize }), new Set(['b', 'c']))
      expect(next.betType).toBe('SINGLE')
      expect(next.systemSize).toBeUndefined()
    }
  )

  it('falls back to SINGLE when the slip is emptied', () => {
    const next = withoutItems(
      slip(['a', 'b'], { betType: 'SYSTEM', systemSize: 2 }),
      new Set(['a', 'b'])
    )
    expect(next.items).toEqual([])
    expect(next.betType).toBe('SINGLE')
    expect(next.systemSize).toBeUndefined()
  })

  it('downgrades SYSTEM to MULTIPLE when fewer than 3 legs remain', () => {
    const next = withoutItems(
      slip(['a', 'b', 'c'], { betType: 'SYSTEM', systemSize: 2 }),
      new Set(['c'])
    )
    expect(ids(next)).toEqual(['a', 'b'])
    expect(next.betType).toBe('MULTIPLE')
    expect(next.systemSize).toBeUndefined()
  })

  it('shrinks systemSize so it stays strictly below the leg count', () => {
    // 4 legs, "3 from 4" -> remove one -> 3 legs; "3 from 3" is not a system bet any more
    const next = withoutItems(
      slip(['a', 'b', 'c', 'd'], { betType: 'SYSTEM', systemSize: 3 }),
      new Set(['d'])
    )
    expect(next.betType).toBe('SYSTEM')
    expect(next.systemSize).toBe(2)
  })

  it('also shrinks systemSize if it somehow exceeded the leg count', () => {
    const next = withoutItems(
      slip(['a', 'b', 'c', 'd', 'e'], { betType: 'SYSTEM', systemSize: 5 }),
      new Set(['e'])
    )
    expect(next.systemSize).toBe(3)
  })

  it('leaves a valid systemSize alone', () => {
    const next = withoutItems(
      slip(['a', 'b', 'c', 'd', 'e'], { betType: 'SYSTEM', systemSize: 2 }),
      new Set(['e'])
    )
    expect(next.betType).toBe('SYSTEM')
    expect(next.systemSize).toBe(2)
  })

  it('does not invent a systemSize for a SYSTEM slip that has none', () => {
    const next = withoutItems(slip(['a', 'b', 'c', 'd'], { betType: 'SYSTEM' }), new Set(['d']))
    expect(next.betType).toBe('SYSTEM')
    expect(next.systemSize).toBeUndefined()
  })

  it('preserves the master stake and per-leg overrides, and does not mutate its input', () => {
    const prev: BetslipInput = {
      items: [
        { outcomeId: 'a', stake: '5', expectedPrice: '1.50' },
        { outcomeId: 'b' },
        { outcomeId: 'c', stake: '7' },
      ],
      stake: '20',
      betType: 'MULTIPLE',
      systemSize: undefined,
    }
    const snapshot = structuredClone(prev)
    const next = withoutItems(prev, new Set(['b']))

    expect(next.stake).toBe('20')
    expect(next.items).toEqual([
      { outcomeId: 'a', stake: '5', expectedPrice: '1.50' },
      { outcomeId: 'c', stake: '7' },
    ])
    expect(prev).toEqual(snapshot)
  })
})

/** A SYSTEM slip over `ids`; every id in `bankers` is flagged. */
function systemSlip(ids: string[], bankers: string[], systemSize: number | undefined = 2) {
  return slip(ids, {
    betType: 'SYSTEM',
    systemSize,
    items: ids.map(outcomeId => ({ outcomeId, banker: bankers.includes(outcomeId) })),
  })
}

const bankerIds = (input: BetslipInput) => input.items.filter(i => i.banker).map(i => i.outcomeId)

describe('systemPoolSize', () => {
  it('counts only the selections that are not bankers', () => {
    expect(systemPoolSize(systemSlip(['a', 'b', 'c', 'd', 'e'], ['a']))).toBe(4)
    expect(systemPoolSize(systemSlip(['a', 'b', 'c', 'd', 'e'], ['a', 'b']))).toBe(3)
  })

  it('is the leg count when nothing is flagged or the flag is absent', () => {
    expect(systemPoolSize(slip(['a', 'b', 'c']))).toBe(3)
    expect(systemPoolSize(systemSlip(['a', 'b', 'c'], []))).toBe(3)
  })
})

describe('withBanker', () => {
  it('flags a leg as banker on a SYSTEM slip', () => {
    const next = withBanker(systemSlip(['a', 'b', 'c', 'd'], []), 'a', true)
    expect(bankerIds(next)).toEqual(['a'])
  })

  it('unflags a banker', () => {
    const next = withBanker(systemSlip(['a', 'b', 'c', 'd'], ['a']), 'a', false)
    expect(bankerIds(next)).toEqual([])
  })

  it('refuses a banker that would leave fewer than 3 other selections', () => {
    const prev = systemSlip(['a', 'b', 'c'], [])
    expect(withBanker(prev, 'a', true)).toBe(prev)

    const four = systemSlip(['a', 'b', 'c', 'd'], ['a'])
    expect(withBanker(four, 'b', true)).toBe(four)
  })

  it('shrinks systemSize so it stays below the non-banker count', () => {
    // 5 legs, "4 out of 5"; one banker -> only 4 others, so at most "3 out of 4"
    const next = withBanker(systemSlip(['a', 'b', 'c', 'd', 'e'], [], 4), 'a', true)
    expect(next.systemSize).toBe(3)
  })

  it('leaves a valid systemSize alone', () => {
    const next = withBanker(systemSlip(['a', 'b', 'c', 'd', 'e'], [], 2), 'a', true)
    expect(next.systemSize).toBe(2)
  })

  it('ignores non-SYSTEM slips, unknown legs and no-op changes (same reference)', () => {
    const multiple = slip(['a', 'b', 'c', 'd'])
    expect(withBanker(multiple, 'a', true)).toBe(multiple)

    const system = systemSlip(['a', 'b', 'c', 'd'], ['a'])
    expect(withBanker(system, 'zzz', true)).toBe(system)
    expect(withBanker(system, 'a', true)).toBe(system)
  })

  it('does not mutate its input', () => {
    const prev = systemSlip(['a', 'b', 'c', 'd'], [])
    const snapshot = structuredClone(prev)
    withBanker(prev, 'a', true)
    expect(prev).toEqual(snapshot)
  })
})

describe('withBetType', () => {
  it('defaults systemSize to 2 when entering SYSTEM', () => {
    const next = withBetType(slip(['a', 'b', 'c']), 'SYSTEM')
    expect(next.betType).toBe('SYSTEM')
    expect(next.systemSize).toBe(2)
  })

  it('clamps a stale systemSize when entering SYSTEM', () => {
    const next = withBetType(slip(['a', 'b', 'c'], { systemSize: 4 }), 'SYSTEM')
    expect(next.systemSize).toBe(2)
  })

  it('does not enter SYSTEM with fewer than 3 selections', () => {
    const prev = slip(['a', 'b'])
    expect(withBetType(prev, 'SYSTEM')).toBe(prev)
  })

  it.each(['SINGLE', 'MULTIPLE'] as const)('clears bankers when leaving SYSTEM for %s', betType => {
    const next = withBetType(systemSlip(['a', 'b', 'c', 'd'], ['a']), betType)
    expect(next.betType).toBe(betType)
    expect(bankerIds(next)).toEqual([])
    expect(next.items.every(i => i.banker === undefined)).toBe(true)
  })

  it('keeps the leg objects when there were no bankers to clear', () => {
    const prev = slip(['a', 'b', 'c'])
    expect(withBetType(prev, 'MULTIPLE').items).toBe(prev.items)
  })
})

describe('withoutItems with bankers', () => {
  it('keeps SYSTEM and the remaining bankers when a non-banker is removed', () => {
    const next = withoutItems(systemSlip(['a', 'b', 'c', 'd', 'e'], ['a'], 2), new Set(['e']))
    expect(next.betType).toBe('SYSTEM')
    expect(bankerIds(next)).toEqual(['a'])
    expect(next.systemSize).toBe(2)
  })

  it('shrinks systemSize against the non-banker count, not the leg count', () => {
    // 5 legs, 1 banker, "3 out of 4"; removing a non-banker leaves 3 others -> "2 out of 3"
    const next = withoutItems(systemSlip(['a', 'b', 'c', 'd', 'e'], ['a'], 3), new Set(['e']))
    expect(next.betType).toBe('SYSTEM')
    expect(next.systemSize).toBe(2)
  })

  it('downgrades to MULTIPLE and clears bankers when fewer than 3 non-bankers remain', () => {
    const next = withoutItems(systemSlip(['a', 'b', 'c', 'd'], ['a'], 2), new Set(['d']))
    expect(next.betType).toBe('MULTIPLE')
    expect(next.systemSize).toBeUndefined()
    expect(ids(next)).toEqual(['a', 'b', 'c'])
    expect(bankerIds(next)).toEqual([])
  })

  it('removing a banker leg keeps the other selections and their count', () => {
    const next = withoutItems(systemSlip(['a', 'b', 'c', 'd'], ['a'], 2), new Set(['a']))
    expect(next.betType).toBe('SYSTEM')
    expect(ids(next)).toEqual(['b', 'c', 'd'])
    expect(next.systemSize).toBe(2)
  })
})

describe('withPrices', () => {
  const prices = new Map([
    ['a', '2.00'],
    ['b', '3.00'],
  ])

  it('stamps prices onto legs that have none', () => {
    const next = withPrices(slip(['a', 'b', 'c']), prices, true)
    expect(next.items).toEqual([
      { outcomeId: 'a', expectedPrice: '2.00' },
      { outcomeId: 'b', expectedPrice: '3.00' },
      { outcomeId: 'c' },
    ])
  })

  it('stamping never overwrites a price the user already saw', () => {
    const prev: BetslipInput = {
      ...slip(['a', 'b']),
      items: [{ outcomeId: 'a', expectedPrice: '1.80' }, { outcomeId: 'b' }],
    }
    const next = withPrices(prev, prices, true)
    expect(next.items[0].expectedPrice).toBe('1.80')
    expect(next.items[1].expectedPrice).toBe('3.00')
  })

  it('accepting overwrites changed prices', () => {
    const prev: BetslipInput = {
      ...slip(['a', 'b']),
      items: [
        { outcomeId: 'a', expectedPrice: '1.80' },
        { outcomeId: 'b', expectedPrice: '3.00' },
      ],
    }
    const next = withPrices(prev, prices, false)
    expect(next.items.map(i => i.expectedPrice)).toEqual(['2.00', '3.00'])
  })

  it('returns the same reference when nothing changes (so the subscription does not restart)', () => {
    const prev: BetslipInput = {
      ...slip(['a']),
      items: [{ outcomeId: 'a', expectedPrice: '2.00' }],
    }
    expect(withPrices(prev, prices, false)).toBe(prev)
    expect(withPrices(prev, prices, true)).toBe(prev)
  })

  it('returns the same reference when no leg has a price in the map', () => {
    const prev = slip(['x', 'y'])
    expect(withPrices(prev, prices, false)).toBe(prev)
  })

  it('ignores empty-string prices instead of stamping them', () => {
    const prev = slip(['a'])
    expect(withPrices(prev, new Map([['a', '']]), false)).toBe(prev)
  })

  it('returns a new slip but untouched legs keep their identity when only some change', () => {
    const prev: BetslipInput = {
      ...slip(['a', 'b']),
      items: [{ outcomeId: 'a', expectedPrice: '2.00' }, { outcomeId: 'b' }],
    }
    const next = withPrices(prev, prices, false)
    expect(next).not.toBe(prev)
    expect(next.items[0]).toBe(prev.items[0])
    expect(prev.items[1].expectedPrice).toBeUndefined()
  })
})

describe('isBoostActive', () => {
  const NOW = Date.parse('2026-11-19T12:00:00Z')
  const boost = (outcomeIds: string[], overrides: Partial<ActiveBoost> = {}): ActiveBoost => ({
    id: 'boost-1',
    outcomeIds,
    boostedPrice: '5.00',
    combinedPrice: '4.00',
    maxStake: null,
    validTo: null,
    ...overrides,
  })

  it('is inactive without a boost', () => {
    expect(isBoostActive(slip(['a']), null, NOW)).toBe(false)
  })

  it('is active for a single-outcome boost on a single bet', () => {
    expect(isBoostActive(slip(['a']), boost(['a']), NOW)).toBe(true)
  })

  it('is active for a multi-outcome boost on a MULTIPLE bet regardless of leg order', () => {
    expect(isBoostActive(slip(['c', 'a', 'b']), boost(['a', 'b', 'c']), NOW)).toBe(true)
  })

  it('is inactive for SYSTEM bets even if the legs match', () => {
    const input = slip(['a', 'b', 'c'], { betType: 'SYSTEM', systemSize: 2 })
    expect(isBoostActive(input, boost(['a', 'b', 'c']), NOW)).toBe(false)
  })

  it('is inactive once a leg is added or removed', () => {
    expect(isBoostActive(slip(['a', 'b', 'x']), boost(['a', 'b']), NOW)).toBe(false)
    expect(isBoostActive(slip(['a']), boost(['a', 'b']), NOW)).toBe(false)
  })

  it('is inactive when a leg is swapped for a different outcome', () => {
    expect(isBoostActive(slip(['a', 'x']), boost(['a', 'b']), NOW)).toBe(false)
  })

  it('is inactive on an empty slip', () => {
    expect(isBoostActive(slip([]), boost(['a']), NOW)).toBe(false)
  })

  it('is inactive when a multi-outcome boost sits on a SINGLE betType', () => {
    const input = slip(['a', 'b'], { betType: 'SINGLE' })
    expect(isBoostActive(input, boost(['a', 'b']), NOW)).toBe(false)
  })

  it('does not let duplicate legs masquerade as a two-outcome boost', () => {
    expect(isBoostActive(slip(['a', 'a']), boost(['a', 'b']), NOW)).toBe(false)
  })

  describe('expiry', () => {
    it('is active before validTo', () => {
      const b = boost(['a'], { validTo: '2026-11-19T12:00:01Z' })
      expect(isBoostActive(slip(['a']), b, NOW)).toBe(true)
    })

    it('expires exactly at validTo', () => {
      const b = boost(['a'], { validTo: '2026-11-19T12:00:00Z' })
      expect(isBoostActive(slip(['a']), b, NOW)).toBe(false)
    })

    it('is inactive after validTo', () => {
      const b = boost(['a'], { validTo: '2026-11-19T11:59:59Z' })
      expect(isBoostActive(slip(['a']), b, NOW)).toBe(false)
    })

    it('never expires when validTo is null', () => {
      expect(
        isBoostActive(slip(['a']), boost(['a'], { validTo: null }), Number.MAX_SAFE_INTEGER)
      ).toBe(true)
    })
  })
})

describe('betCodeCopy', () => {
  const t = (key: string) => `t(${key})`

  it('translates the message for a known rejection code', () => {
    expect(betCodeCopy('PRICE_CHANGED', t)).toBe('t(Odds have changed.)')
    expect(betCodeCopy('INSUFFICIENT_FUNDS', t)).toBe('t(Insufficient funds.)')
  })

  it('falls back to a generic message for codes the frontend does not know yet', () => {
    expect(betCodeCopy('SOME_NEW_BACKEND_CODE', t)).toBe('t(Outcome unavailable.)')
    expect(betCodeCopy('', t)).toBe('t(Outcome unavailable.)')
  })
})
