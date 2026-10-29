import { tKey } from '@/i18n/tKey'

export const MARKET_LABEL = {
  match_winner: tKey('Match Winner'),
  over_under: tKey('Over/Under'),
  both_teams_to_score: tKey('Both to Score'),
  double_chance: tKey('Double Chance'),
  handicap: tKey('Handicap'),
  even_odd: tKey('Even/Odd'),
  draw_no_bet: tKey('Draw No Bet'),
} as const

export type MarketKind = keyof typeof MARKET_LABEL

/** Columns shown in a list row (matches marketVisibility in list-view-markets). */
export const MAX_COLUMNS = 4

/** Scope used by lists that mix sports (favourites, chronological live). */
export const MIXED_SCOPE = 'mixed'

// Order = default column order. Only list what the sport genuinely offers.

// 3-way result, draw is possible, both teams can fail to score
const FOOTBALL: MarketKind[] = [
  'match_winner',
  'over_under',
  'both_teams_to_score',
  'double_chance',
  'draw_no_bet',
  'handicap',
  'even_odd',
]

// No draw -> no double chance / DNB. Total games over/under, games handicap.
// BTTS is meaningless.
const TENNIS: MarketKind[] = ['match_winner', 'handicap', 'over_under', 'even_odd']

// Moneyline (2-way, overtime included), point spread, total points.
const BASKETBALL: MarketKind[] = ['match_winner', 'handicap', 'over_under', 'even_odd']

// 60-min 3-way result keeps draw-based markets valid; BTTS is offered but rare.
const ICE_HOCKEY: MarketKind[] = [
  'match_winner',
  'over_under',
  'handicap',
  'double_chance',
  'draw_no_bet',
  'both_teams_to_score',
  'even_odd',
]

// Generic esports (CS, LoL, Dota...): winner, map handicap, total maps.
const ESPORTS: MarketKind[] = ['match_winner', 'handicap', 'over_under']

const BY_SPORT: Record<string, MarketKind[]> = {
  football: FOOTBALL,
  esoccer: FOOTBALL,
  tennis: TENNIS,
  etennis: TENNIS,
  basketball: BASKETBALL,
  ebasketball: BASKETBALL,
  'ice-hockey': ICE_HOCKEY,
  'e-ice-hockey': ICE_HOCKEY,
  esports: ESPORTS,
}

// Markets every mainstream sport offers, for lists that mix sports.
const MIXED: MarketKind[] = FOOTBALL.filter(k =>
  [TENNIS, BASKETBALL, ICE_HOCKEY].every(list => list.includes(k))
)

export function getAvailableMarkets(scope?: string | null): MarketKind[] {
  if (!scope || scope === MIXED_SCOPE) return MIXED
  return BY_SPORT[scope] ?? MIXED
}

// BETSLIP ONLY
// keyed by the English market name the API sends, without the trailing line
export const MARKET_NAME: Record<string, string> = {
  'Fulltime Result': tKey('Fulltime Result'),
  'Over/Under': tKey('Over/Under'),
  'Both Teams to Score': tKey('Both Teams to Score'),
  'Draw No Bet': tKey('Draw No Bet'),
  'Double Chance': tKey('Double Chance'),
  Handicap: tKey('Handicap'),
  'Even/Odd': tKey('Even/Odd'),
}

export const OUTCOME_NAME: Record<string, string> = {
  over: tKey('Over'),
  under: tKey('Under'),
  yes: tKey('Yes'),
  no: tKey('No'),
  draw: tKey('Draw'),
  odd: tKey('Odd'),
  even: tKey('Even'),
}

/** "Over/Under 4.5" -> "Over/Under" + "4.5" */
export function splitMarketName(name: string | null | undefined) {
  const m = name?.match(/^(.*?)\s*([+-]?\d+(?:\.\d+)?)?$/)
  return { base: m?.[1] ?? name ?? '', line: m?.[2] ?? null }
}
