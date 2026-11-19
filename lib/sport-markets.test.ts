import { describe, expect, it } from 'vitest'
import {
  getAvailableMarkets,
  MARKET_LABEL,
  type MarketKind,
  MIXED_SCOPE,
  splitMarketName,
} from '@/lib/sport-markets'

describe('getAvailableMarkets', () => {
  const MIXED: MarketKind[] = ['match_winner', 'over_under', 'handicap', 'even_odd']

  it.each([[undefined], [null], [''], [MIXED_SCOPE], ['curling']])(
    'falls back to the markets every mainstream sport offers for scope %j',
    scope => {
      expect(getAvailableMarkets(scope)).toEqual(MIXED)
    }
  )

  it('only offers draw-based markets where a draw is possible', () => {
    for (const sport of ['football', 'esoccer', 'ice-hockey', 'e-ice-hockey']) {
      const markets = getAvailableMarkets(sport)
      expect(markets).toContain('double_chance')
      expect(markets).toContain('draw_no_bet')
    }
    for (const sport of ['tennis', 'etennis', 'basketball', 'ebasketball', 'esports']) {
      const markets = getAvailableMarkets(sport)
      expect(markets).not.toContain('double_chance')
      expect(markets).not.toContain('draw_no_bet')
      expect(markets).not.toContain('both_teams_to_score')
    }
  })

  it('treats e-sports variants exactly like their real counterparts', () => {
    expect(getAvailableMarkets('esoccer')).toEqual(getAvailableMarkets('football'))
    expect(getAvailableMarkets('etennis')).toEqual(getAvailableMarkets('tennis'))
    expect(getAvailableMarkets('ebasketball')).toEqual(getAvailableMarkets('basketball'))
    expect(getAvailableMarkets('e-ice-hockey')).toEqual(getAvailableMarkets('ice-hockey'))
  })

  it('every list is duplicate-free, uses known markets, and leads with match_winner', () => {
    const scopes = [
      'football',
      'esoccer',
      'tennis',
      'etennis',
      'basketball',
      'ebasketball',
      'ice-hockey',
      'e-ice-hockey',
      'esports',
      MIXED_SCOPE,
    ]
    for (const scope of scopes) {
      const markets = getAvailableMarkets(scope)
      expect(new Set(markets).size).toBe(markets.length)
      expect(markets[0]).toBe('match_winner')
      for (const m of markets) expect(MARKET_LABEL).toHaveProperty(m)
    }
  })
})

describe('splitMarketName', () => {
  it.each([
    ['Over/Under 4.5', 'Over/Under', '4.5'],
    ['Handicap -1.5', 'Handicap', '-1.5'],
    ['Handicap +1', 'Handicap', '+1'],
    ['Over/Under 220', 'Over/Under', '220'],
    ['Fulltime Result', 'Fulltime Result', null],
    ['Both Teams to Score', 'Both Teams to Score', null],
  ])('%j -> base %j, line %j', (name, base, line) => {
    expect(splitMarketName(name)).toEqual({ base, line })
  })

  it.each([[null], [undefined], ['']])('returns an empty base for %j', name => {
    expect(splitMarketName(name)).toEqual({ base: '', line: null })
  })
})
