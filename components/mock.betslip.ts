import type { BetslipSelection } from '@/components/betslip'

/**
 * All fields here map 1:1 to `BetslipQuoteItem` (see schema.gql) except
 * `liveScore`, which isn't part of that type at all — it's sourced
 * separately per-eventId from the `eventStateUpdated` subscription once an
 * event goes LIVE, and is always optional. `outcomeName` deliberately uses
 * the API's own outcome naming (Home/Draw/Away, Over/Under 2.5, etc.),
 * never team names, per the real convention.
 */
export const mockBetslipSelections: BetslipSelection[] = [
  {
    outcomeId: 'outcome_1',
    eventId: 'event_1',
    eventName: 'Arsenal v Chelsea',
    marketName: 'Match Winner',
    outcomeName: 'Home',
    addedPrice: 2.1,
    currentPrice: 2.1,
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_2',
    eventId: 'event_2',
    eventName: 'Real Madrid v Barcelona',
    marketName: 'Over/Under 2.5 Goals',
    outcomeName: 'Over 2.5',
    addedPrice: 1.85,
    currentPrice: 1.95, // odds drifted up — sky-blue arrow, old price struck through
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_3',
    eventId: 'event_3',
    eventName: 'Djokovic v Alcaraz',
    marketName: 'Match Winner',
    outcomeName: 'Home',
    addedPrice: 2.5,
    currentPrice: 2.2, // odds shortened — red arrow, old price struck through
    availability: 'AVAILABLE',
  },
  {
    // in-play: liveScore is populated, everything else identical to a prematch row
    outcomeId: 'outcome_4',
    eventId: 'event_4',
    eventName: 'Lakers v Celtics',
    marketName: 'Point Spread -4.5',
    outcomeName: 'Home',
    liveScore: { home: 58, away: 61 },
    addedPrice: 1.91,
    currentPrice: 1.91,
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_5',
    eventId: 'event_5',
    eventName: 'Bayern Munich v Dortmund',
    marketName: 'Double Chance',
    outcomeName: 'Home or Draw',
    liveScore: { home: 1, away: 1 },
    addedPrice: 1.91,
    currentPrice: 1.91,
    availability: 'SUSPENDED', // blocked: outcome name greys out + strikes through, card gets the red border
  },
  {
    outcomeId: 'outcome_6',
    eventId: 'event_6',
    eventName: 'Union Berlin v Frankfurt',
    marketName: 'Double Chance',
    outcomeName: 'Home or Draw',
    addedPrice: 1.4,
    currentPrice: 1.4,
    availability: 'CUTOFF_PASSED',
  },
  {
    outcomeId: 'outcome_7',
    eventId: 'event_7',
    eventName: 'PSG v Marseille',
    marketName: 'Match Winner',
    outcomeName: 'Away',
    addedPrice: 3.2,
    currentPrice: 3.2,
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_8',
    eventId: 'event_8',
    eventName: 'Inter Milan v AC Milan',
    marketName: 'Both Teams to Score',
    outcomeName: 'Yes',
    addedPrice: 1.72,
    currentPrice: 1.72,
    availability: 'AVAILABLE',
  },
]

/**
 * Smaller set (2 items) to see the Combi/System tabs unlock without any
 * blocked-row or price-change banners in the way.
 */
export const mockBetslipSelectionsClean: BetslipSelection[] = mockBetslipSelections
  .filter(s => s.availability === 'AVAILABLE' && s.addedPrice === s.currentPrice)
  .slice(0, 2)
