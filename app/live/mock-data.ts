// app/live/mock-data.ts
import type { LiveEvent, LiveMarket, LiveStage } from '@/app/live/types'

let uid = 0
const uniqueId = (prefix: string) => `${prefix}_${++uid}`

function outcomes(rows: [string, string, number][]): LiveMarket['outcomes'] {
  return rows.map(([key, name, price], index) => ({
    id: uniqueId('outcome'),
    index,
    key,
    name,
    price,
    status: 'OPEN',
  }))
}

function matchWinner(home: number, draw: number | null, away: number): LiveMarket {
  const rows: [string, string, number][] = draw
    ? [
        ['home', 'Home', home],
        ['draw', 'Draw', draw],
        ['away', 'Away', away],
      ]
    : [
        ['home', 'Home', home],
        ['away', 'Away', away],
      ]
  return {
    id: uniqueId('market'),
    kind: 'match_winner',
    name: 'Match Winner',
    line: null,
    status: 'OPEN',
    outcomes: outcomes(rows),
  }
}

function overUnder(line: number, over: number, under: number): LiveMarket {
  return {
    id: uniqueId('market'),
    kind: 'over_under',
    name: 'Over/Under',
    line,
    status: 'OPEN',
    outcomes: outcomes([
      ['over', 'Over', over],
      ['under', 'Under', under],
    ]),
  }
}

function bothToScore(yes: number, no: number): LiveMarket {
  return {
    id: uniqueId('market'),
    kind: 'both_teams_to_score',
    name: 'Both Teams to Score',
    line: null,
    status: 'OPEN',
    outcomes: outcomes([
      ['yes', 'Yes', yes],
      ['no', 'No', no],
    ]),
  }
}

interface Seed {
  sportKey: string
  tournamentKey: string
  tournamentName: string
  countryCode: string | null
  home: string
  away: string
  homeScore: number
  awayScore: number
  periodScores?: [number, number][]
  stage: LiveStage
  /** minutes of play already elapsed at the moment the feed is "loaded" */
  startedMinutesAgo: number
  clockRunning: boolean
  redCards?: { team: 'home' | 'away'; minute: number }[]
  markets: LiveMarket[]
}

const seeds: Seed[] = [
  {
    sportKey: 'football',
    tournamentKey: 'premier-league',
    tournamentName: 'Premier League',
    countryCode: 'GB',
    home: 'Arsenal',
    away: 'Chelsea',
    homeScore: 2,
    awayScore: 1,
    stage: 'SECOND_HALF',
    startedMinutesAgo: 71,
    clockRunning: true,
    redCards: [{ team: 'away', minute: 63 }],
    markets: [matchWinner(1.65, 4.2, 5.1), overUnder(2.5, 1.9, 1.85), bothToScore(1.6, 2.2)],
  },
  {
    sportKey: 'football',
    tournamentKey: 'la-liga',
    tournamentName: 'La Liga',
    countryCode: 'ES',
    home: 'Real Madrid',
    away: 'Sevilla',
    homeScore: 0,
    awayScore: 0,
    stage: 'FIRST_HALF',
    startedMinutesAgo: 12,
    clockRunning: true,
    markets: [matchWinner(1.4, 4.8, 7.5), overUnder(2.5, 1.75, 2.0)],
  },
  {
    sportKey: 'football',
    tournamentKey: 'serie-a',
    tournamentName: 'Serie A',
    countryCode: 'IT',
    home: 'Inter',
    away: 'Roma',
    homeScore: 1,
    awayScore: 1,
    stage: 'HALF_TIME',
    startedMinutesAgo: 45,
    clockRunning: false,
    markets: [matchWinner(1.9, 3.5, 4.1), overUnder(2.5, 1.95, 1.8)],
  },
  {
    sportKey: 'tennis',
    tournamentKey: 'atp-paris',
    tournamentName: 'ATP Paris',
    countryCode: 'FR',
    home: 'C. Alcaraz',
    away: 'J. Sinner',
    homeScore: 1,
    awayScore: 1,
    periodScores: [
      [6, 4],
      [3, 6],
      [5, 5],
    ],
    stage: 'THIRD_SET',
    startedMinutesAgo: 118,
    clockRunning: true,
    markets: [matchWinner(1.8, null, 2.0), overUnder(22.5, 1.9, 1.9)],
  },
  {
    sportKey: 'tennis',
    tournamentKey: 'wta-finals',
    tournamentName: 'WTA Finals',
    countryCode: 'US',
    home: 'I. Swiatek',
    away: 'A. Sabalenka',
    homeScore: 0,
    awayScore: 1,
    periodScores: [[4, 6]],
    stage: 'SECOND_SET',
    startedMinutesAgo: 41,
    clockRunning: true,
    markets: [matchWinner(1.55, null, 2.4)],
  },
  {
    sportKey: 'basketball',
    tournamentKey: 'nba',
    tournamentName: 'NBA',
    countryCode: 'US',
    home: 'Lakers',
    away: 'Celtics',
    homeScore: 88,
    awayScore: 92,
    stage: 'FOURTH_QUARTER',
    startedMinutesAgo: 141,
    clockRunning: true,
    markets: [matchWinner(2.1, null, 1.72), overUnder(214.5, 1.9, 1.9)],
  },
  {
    sportKey: 'basketball',
    tournamentKey: 'euroleague',
    tournamentName: 'EuroLeague',
    countryCode: null,
    home: 'Real Madrid',
    away: 'Olympiacos',
    homeScore: 44,
    awayScore: 39,
    stage: 'SECOND_QUARTER',
    startedMinutesAgo: 26,
    clockRunning: true,
    markets: [matchWinner(1.5, null, 2.6)],
  },
  {
    sportKey: 'ice-hockey',
    tournamentKey: 'nhl',
    tournamentName: 'NHL',
    countryCode: 'US',
    home: 'Bruins',
    away: 'Rangers',
    homeScore: 2,
    awayScore: 2,
    stage: 'THIRD_PERIOD',
    startedMinutesAgo: 52,
    clockRunning: true,
    markets: [matchWinner(2.4, null, 1.55), overUnder(5.5, 1.85, 1.95)],
  },
  {
    sportKey: 'ice-hockey',
    tournamentKey: 'khl',
    tournamentName: 'KHL',
    countryCode: 'RU',
    home: 'CSKA Moscow',
    away: 'SKA St. Petersburg',
    homeScore: 1,
    awayScore: 0,
    stage: 'FIRST_PERIOD',
    startedMinutesAgo: 8,
    clockRunning: true,
    markets: [matchWinner(1.9, null, 1.85)],
  },
]

/** Call once (client-only, e.g. in a mount effect) — anchors every clock to
 * "now" so elapsed time then ticks forward naturally via `getElapsedSeconds`. */
export function generateMockLiveEvents(): LiveEvent[] {
  const anchor = new Date().toISOString()

  return seeds.map(seed => ({
    id: uniqueId('event'),
    sportKey: seed.sportKey,
    tournamentKey: seed.tournamentKey,
    tournamentName: seed.tournamentName,
    countryCode: seed.countryCode,
    homeCompetitor: seed.home,
    awayCompetitor: seed.away,
    homeScore: seed.homeScore,
    awayScore: seed.awayScore,
    periodScores: seed.periodScores,
    stage: seed.stage,
    redCards: seed.redCards ?? [],
    tradingStatus: 'OPEN',
    clockAnchorAt: anchor,
    clockElapsedSeconds: seed.startedMinutesAgo * 60,
    clockRunning: seed.clockRunning,
    markets: seed.markets,
  }))
}

export function getElapsedSeconds(
  e: Pick<LiveEvent, 'clockAnchorAt' | 'clockElapsedSeconds' | 'clockRunning'>,
  now: number
): number | null {
  if (e.clockElapsedSeconds == null) return null
  if (!e.clockRunning) return e.clockElapsedSeconds
  return e.clockElapsedSeconds + Math.max(0, (now - Date.parse(e.clockAnchorAt)) / 1000)
}

export const STAGE_LABEL: Record<LiveStage, string> = {
  FIRST_HALF: '1st Half',
  SECOND_HALF: '2nd Half',
  HALF_TIME: 'Half Time',
  FIRST_SET: '1st Set',
  SECOND_SET: '2nd Set',
  THIRD_SET: '3rd Set',
  FOURTH_SET: '4th Set',
  FIFTH_SET: '5th Set',
  FIRST_QUARTER: '1st Quarter',
  SECOND_QUARTER: '2nd Quarter',
  THIRD_QUARTER: '3rd Quarter',
  FOURTH_QUARTER: '4th Quarter',
  FIRST_PERIOD: '1st Period',
  SECOND_PERIOD: '2nd Period',
  THIRD_PERIOD: '3rd Period',
  OVERTIME: 'Overtime',
  PENALTIES: 'Penalties',
}

export function formatPlaytime(sportKey: string, seconds: number | null, stage: LiveStage) {
  if (stage === 'HALF_TIME') return 'HT'
  if (sportKey === 'football' && seconds != null) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  return STAGE_LABEL[stage]
}

export function nudgeOdds(event: LiveEvent): LiveEvent {
  return {
    ...event,
    markets: event.markets.map(m => ({
      ...m,
      outcomes: m.outcomes.map(o => ({
        ...o,
        price: Math.max(1.01, Number((o.price + (Math.random() - 0.5) * 0.08).toFixed(2))),
      })),
    })),
  }
}
