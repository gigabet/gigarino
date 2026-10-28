import { tKey } from '@/i18n/tKey'

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
