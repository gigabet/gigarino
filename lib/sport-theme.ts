export interface SportTheme {
  primary: string
  glow: string
  soft: string
}

// Colours live in globals.css as --sport-* so they can differ per theme
// (the football icon was #fff, which disappears on a light surface).
const aliases: Record<string, string> = {
  esoccer: 'esports',
  etennis: 'esports',
  ebasketball: 'esports',
  'e-ice-hockey': 'esports',
}
const known = new Set(['highlights', 'football', 'tennis', 'basketball', 'ice-hockey', 'esports'])

export function getSportTheme(key?: string | null): SportTheme {
  const resolved = key ? (aliases[key] ?? key) : undefined
  const name = resolved && known.has(resolved) ? resolved : 'fallback'
  const color = `var(--sport-${name})`
  return {
    primary: color,
    glow: `color-mix(in oklab, ${color} 45%, transparent)`,
    soft: `color-mix(in oklab, ${color} 12%, transparent)`,
  }
}
