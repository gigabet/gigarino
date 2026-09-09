// app/live/types.ts
export type LiveStage =
  | 'FIRST_HALF'
  | 'SECOND_HALF'
  | 'HALF_TIME'
  | 'FIRST_SET'
  | 'SECOND_SET'
  | 'THIRD_SET'
  | 'FOURTH_SET'
  | 'FIFTH_SET'
  | 'FIRST_QUARTER'
  | 'SECOND_QUARTER'
  | 'THIRD_QUARTER'
  | 'FOURTH_QUARTER'
  | 'FIRST_PERIOD'
  | 'SECOND_PERIOD'
  | 'THIRD_PERIOD'
  | 'OVERTIME'
  | 'PENALTIES'

export interface LiveOutcome {
  id: string
  index: number
  key: string
  name: string
  price: number
  status: 'OPEN' | 'SUSPENDED' | 'REMOVED'
}

export interface LiveMarket {
  id: string
  kind: string
  name: string
  line: number | null
  status: 'OPEN' | 'SUSPENDED' | 'CLOSED'
  outcomes: LiveOutcome[]
}

export interface RedCard {
  team: 'home' | 'away'
  minute: number
  player?: string
}

export interface LiveEvent {
  id: string
  sportKey: string
  tournamentKey: string
  tournamentName: string
  countryCode: string | null
  homeCompetitor: string
  awayCompetitor: string
  homeScore: number
  awayScore: number
  /** per-set/per-period breakdown, e.g. tennis [[6,4],[3,6],[5,5]] */
  periodScores?: [number, number][]
  stage: LiveStage
  redCards: RedCard[]
  tradingStatus: 'OPEN' | 'SUSPENDED' | 'CLOSED'
  /**
   * Same anchor/elapsed pattern as the real `EventStateUpdate` type in the
   * schema: `clockRunning ? clockElapsedSeconds + (now - clockAnchorAt) : clockElapsedSeconds`.
   * Keeping this shape now means swapping the mock feed for the real
   * `eventStateUpdated` subscription later won't touch any display logic.
   */
  clockAnchorAt: string
  clockElapsedSeconds: number | null
  clockRunning: boolean
  markets: LiveMarket[]
}
