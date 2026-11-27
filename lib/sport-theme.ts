export interface SportTheme {
  primary: string
  glow: string
  soft: string
}

// The actual colours live in globals.css as --sport-<name>, one value per theme (the light-mode
// ones are darkened so they stay readable on a white page). Everything here is a CSS expression,
// so consumers can keep dropping it into `style` and it follows the active theme.
const cssVarFor: Record<string, string> = {
  highlights: 'highlights',
  football: 'football',
  tennis: 'tennis',
  basketball: 'basketball',
  'ice-hockey': 'ice-hockey',
  volleyball: 'volleyball',
  'table-tennis': 'table-tennis',
  esoccer: 'esports',
  etennis: 'esports',
  ebasketball: 'esports',
  'e-ice-hockey': 'esports',
  esports: 'esports',
}

function makeTheme(name: string, glowPercent: number, softPercent: number): SportTheme {
  const primary = `var(--sport-${name})`
  return {
    primary,
    glow: `color-mix(in oklab, ${primary} ${glowPercent}%, transparent)`,
    soft: `color-mix(in oklab, ${primary} ${softPercent}%, transparent)`,
  }
}

const themes: Record<string, SportTheme> = Object.fromEntries(
  Object.entries(cssVarFor).map(([key, name]) => [key, makeTheme(name, 45, 12)])
)

const fallback = makeTheme('default', 30, 10)

export function getSportTheme(key?: string | null): SportTheme {
  return (key && themes[key]) || fallback
}
