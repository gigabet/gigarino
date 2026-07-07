// mock-data.ts
//
// Deterministic, in-memory mock dataset standing in for the real backend.
// Swap this module out wholesale once the NestJS service exists — nothing
// else (resolvers, batching, subscriptions) should need to change shape.

export interface MockOddsData {
  id: string
  home: number
  draw: number
  away: number
  updatedAt: string
}

export interface MockEventData {
  id: string
  name: string
  league: string
  startTime: string
  odds: MockOddsData
}

const LEAGUES = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1']
const TEAMS = [
  'Arsenal',
  'Chelsea',
  'Liverpool',
  'Man City',
  'Real Madrid',
  'Barcelona',
  'Atletico',
  'Juventus',
  'Inter',
  'AC Milan',
  'Bayern',
  'Dortmund',
  'PSG',
  'Lyon',
]

// Deterministic pseudo-random in [0, 1), seeded by index — same module
// instance or not, same eventId always produces the same initial odds.
// Prevents server/client hydration mismatches caused by Math.random().
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function oddsIdForEvent(eventId: string): string {
  return `Odds:${eventId}`
}

function randomOdds(seed: number, eventId: string): MockOddsData {
  return {
    id: oddsIdForEvent(eventId),
    home: Number((1.5 + seededRandom(seed) * 3).toFixed(2)),
    draw: Number((2.5 + seededRandom(seed + 1) * 2).toFixed(2)),
    away: Number((1.5 + seededRandom(seed + 2) * 3).toFixed(2)),
    // Fixed epoch, not Date.now() — keeps initial render deterministic too.
    updatedAt: new Date(0).toISOString(),
  }
}

const EVENT_COUNT = 140 // "a hundred-ish on weekends"
const BASE_START_TIME = Date.UTC(2026, 0, 1, 12, 0, 0) // fixed anchor, not Date.now()

export const mockEvents: MockEventData[] = Array.from({ length: EVENT_COUNT }, (_, i) => {
  const home = TEAMS[i % TEAMS.length]
  const away = TEAMS[(i + 5) % TEAMS.length]
  const id = `event-${i}`
  return {
    id,
    name: `${home} vs ${away}`,
    league: LEAGUES[i % LEAGUES.length],
    startTime: new Date(BASE_START_TIME + i * 30 * 60_000).toISOString(),
    odds: randomOdds(i, id),
  }
})

export const eventsById = new Map(mockEvents.map(e => [e.id, e]))
