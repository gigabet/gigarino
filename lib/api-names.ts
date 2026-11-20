import { tKey } from '@/i18n/tKey'
import { MARKET_LABEL, MARKET_NAME, OUTCOME_NAME, splitMarketName } from '@/lib/sport-markets'

/** The `t` from `useT()` / `getT()`. */
type Translate = (key: string, params?: Record<string, string | number>) => string

/*
 * The API sends sport, market and outcome names in English and does not localise them, so they are
 * translated here. Every table value is the English text the API sends, wrapped in `tKey()` so the
 * extractor picks it up. Names that are not in a table (new sports, odd markets, team names,
 * correct scores) pass through as sent. The ESLint rule `local-i18n/no-untranslated-api-string`
 * flags rendering the raw API field instead of going through one of these.
 */

const has = (table: Record<string, string>, key: string) => Object.hasOwn(table, key)

// keyed by `Sport.key`
const SPORT_NAME: Record<string, string> = {
  football: tKey('Football'),
  tennis: tKey('Tennis'),
  'table-tennis': tKey('Table Tennis'),
  basketball: tKey('Basketball'),
  'ice-hockey': tKey('Ice Hockey'),
  'american-football': tKey('American Football'),
  baseball: tKey('Baseball'),
}

export function translateSportName(t: Translate, key: string, name: string) {
  return has(SPORT_NAME, key) ? t(SPORT_NAME[key]) : name
}

// keyed by `Market.kind`
const MARKET_KIND_NAME: Record<string, string> = {
  ...MARKET_LABEL,
  correct_score: tKey('Correct Score'),
}

/** Title for a family of markets. Unknown kinds fall back to the prettified slug. */
export function translateMarketKind(t: Translate, kind: string) {
  return has(MARKET_KIND_NAME, kind) ? t(MARKET_KIND_NAME[kind]) : kind.replaceAll('_', ' ')
}

/** "Over/Under 2.5" -> the translated market name followed by the untouched line. */
export function translateMarketName(t: Translate, name: string) {
  const { base, line } = splitMarketName(name)
  if (!has(MARKET_NAME, base)) return name
  const label = t(MARKET_NAME[base])
  return line ? `${label} ${line}` : label
}

const SIDE_NAME: Record<string, string> = {
  home: tKey('Home'),
  away: tKey('Away'),
}

/** Label for an outcome `key` (`home`, `draw`, `over`...). Other keys (`2-1`) pass through. */
export function translateOutcomeKey(t: Translate, key: string) {
  if (has(OUTCOME_NAME, key)) return t(OUTCOME_NAME[key])
  if (has(SIDE_NAME, key)) return t(SIDE_NAME[key])
  return key
}

// the English words an outcome name is built from; each is also its own translation key
const OUTCOME_WORDS = new Set([...Object.values(OUTCOME_NAME), ...Object.values(SIDE_NAME)])

/**
 * "Over 2.5", "Home or Draw", "Home +1.5" -> translated, keeping the line. Use
 * `translateOutcomeKey` when the outcome `key` is at hand. Names with any other word (team names,
 * scores) pass through.
 */
export function translateOutcomeName(t: Translate, name: string) {
  const { base, line } = splitMarketName(name)
  const words = base.split(' or ')
  if (!words.every(word => OUTCOME_WORDS.has(word))) return name
  const label = words.map(word => t(word)).join(` ${t('or')} `)
  return line ? `${label} ${line}` : label
}

/*
 * Short tags. 1X2 notation is universal, so the tags are not translated. A market switches to them
 * when a translated label would not fit its cell (`fitOutcomeLabels`).
 */
const OUTCOME_TAG: Record<string, string> = { Home: '1', Draw: 'X', Away: '2' }
const OUTCOME_KEY_TAG: Record<string, string> = { home: '1', draw: 'X', away: '2' }

/** `home` -> `1`, `draw` -> `X`, `away` -> `2`. Other keys have no tag. */
export function shortOutcomeKey(key: string) {
  return has(OUTCOME_KEY_TAG, key) ? OUTCOME_KEY_TAG[key] : null
}

/** "Home" -> "1", "Home or Draw" -> "1X", "Home +1.5" -> "1 +1.5". Anything else has no tag. */
export function shortOutcomeName(name: string) {
  const { base, line } = splitMarketName(name)
  const tags = base.split(' or ').map(word => (has(OUTCOME_TAG, word) ? OUTCOME_TAG[word] : null))
  if (tags.some(tag => tag === null)) return null
  const tag = tags.join('')
  return line ? `${tag} ${line}` : tag
}

/**
 * Picks the text for the outcomes of one market. If any full label is longer than `maxChars`, and
 * every outcome has a short tag, all of them switch to the tag (mixing "1" with "Beraberlik" looks
 * broken); the full label moves to `title`. Pure and based on length only, so it renders the same
 * on the server and the client.
 */
export function fitOutcomeLabels(
  items: { label: string; short: string | null }[],
  maxChars: number
): { text: string; title?: string }[] {
  const useShort =
    items.some(item => item.label.length > maxChars) && items.every(item => item.short !== null)
  return items.map(item =>
    useShort && item.short !== null ? { text: item.short, title: item.label } : { text: item.label }
  )
}
