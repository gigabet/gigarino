export interface SportTheme {
  primary: string
  glow: string
  soft: string
}

const themes: Record<string, SportTheme> = {
  highlights: {
    primary: '#facc15',
    glow: 'rgba(250, 204, 21, 0.45)',
    soft: 'rgba(250, 204, 21, 0.12)',
  },
  football: {
    primary: '#fff',
    glow: 'rgba(255, 255, 255, 0.45)',
    soft: 'rgba(255, 255, 255, 0.12)',
  },
  tennis: {
    primary: '#d1f366',
    glow: 'rgba(209, 243, 102, 0.45)',
    soft: 'rgba(209, 243, 102, 0.12)',
  },
  basketball: {
    primary: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.45)',
    soft: 'rgba(251, 146, 60, 0.12)',
  },
  'ice-hockey': {
    primary: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.45)',
    soft: 'rgba(56, 189, 248, 0.12)',
  },
  esoccer: {
    primary: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.45)',
    soft: 'rgba(192, 132, 252, 0.12)',
  },
  etennis: {
    primary: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.45)',
    soft: 'rgba(192, 132, 252, 0.12)',
  },
  ebasketball: {
    primary: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.45)',
    soft: 'rgba(192, 132, 252, 0.12)',
  },
  'e-ice-hockey': {
    primary: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.45)',
    soft: 'rgba(192, 132, 252, 0.12)',
  },
  esports: {
    primary: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.45)',
    soft: 'rgba(192, 132, 252, 0.12)',
  },
}

const fallback: SportTheme = {
  primary: '#9ca3af',
  glow: 'rgba(156, 163, 175, 0.3)',
  soft: 'rgba(156, 163, 175, 0.1)',
}

export function getSportTheme(key?: string | null): SportTheme {
  return (key && themes[key]) || fallback
}
