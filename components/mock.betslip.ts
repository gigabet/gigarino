import type { BetslipSelection } from '@/components/betslip'

/**
 * Mock selections covering every visual branch of the Betslip component:
 * - a plain available pick (no price change)
 * - a pick whose price moved up since it was added (green, strike-through old price)
 * - a pick whose price moved down since it was added (red, strike-through old price)
 * - a suspended market (blocked, red row, disables the CTA)
 * - a cutoff-passed event (blocked, different copy)
 *
 * Drop this into `betslipSelectionsAtom` to preview, e.g. in a client component:
 *
 *   import { useSetAtom } from 'jotai'
 *   import { betslipSelectionsAtom } from '@/components/betslip'
 *   import { mockBetslipSelections } from '@/betslip-mock-data'
 *
 *   const setSelections = useSetAtom(betslipSelectionsAtom)
 *   useEffect(() => setSelections(mockBetslipSelections), [])
 */
export const mockBetslipSelections: BetslipSelection[] = [
  {
    outcomeId: 'outcome_1',
    eventId: 'event_1',
    eventName: 'Arsenal vs Chelsea',
    marketName: 'Match Winner',
    outcomeName: 'Arsenal',
    addedPrice: 2.1,
    currentPrice: 2.1,
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_2',
    eventId: 'event_2',
    eventName: 'Real Madrid vs Barcelona',
    marketName: 'Over/Under 2.5 Goals',
    outcomeName: 'Over 2.5',
    addedPrice: 1.85,
    currentPrice: 1.95, // odds drifted up — shown in primary green with strike-through
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_3',
    eventId: 'event_3',
    eventName: 'Novak Djokovic vs Carlos Alcaraz',
    marketName: 'Match Winner',
    outcomeName: 'Djokovic',
    addedPrice: 2.5,
    currentPrice: 2.2, // odds shortened — shown in red with strike-through
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_4',
    eventId: 'event_4',
    eventName: 'Lakers vs Celtics',
    marketName: 'Both Teams to Score', // deliberately mismatched market for a basketball demo row
    outcomeName: 'Lakers -4.5',
    addedPrice: 1.91,
    currentPrice: 1.91,
    availability: 'SUSPENDED', // blocked row: red border + "market has been suspended"
  },
  {
    outcomeId: 'outcome_5',
    eventId: 'event_5',
    eventName: 'Bayern Munich vs Dortmund',
    marketName: 'Double Chance',
    outcomeName: 'Bayern or Draw',
    addedPrice: 1.4,
    currentPrice: 1.4,
    availability: 'CUTOFF_PASSED', // blocked row: "event has already started"
  },
  {
    outcomeId: 'outcome_6',
    eventId: 'event_6',
    eventName: 'Arsenal vs Chelsea',
    marketName: 'Match Winner',
    outcomeName: 'Arsenal',
    addedPrice: 2.1,
    currentPrice: 2.1,
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_7',
    eventId: 'event_7',
    eventName: 'Arsenal vs Chelsea',
    marketName: 'Match Winner',
    outcomeName: 'Arsenal',
    addedPrice: 2.1,
    currentPrice: 2.1,
    availability: 'AVAILABLE',
  },
  {
    outcomeId: 'outcome_8',
    eventId: 'event_8',
    eventName: 'Arsenal vs Chelsea',
    marketName: 'Match Winner',
    outcomeName: 'Arsenal',
    addedPrice: 2.1,
    currentPrice: 2.1,
    availability: 'AVAILABLE',
  },
]

/**
 * Smaller set (2 items) if you just want to see the Combo/System tabs unlock
 * without the blocked-row banners in the way.
 */
export const mockBetslipSelectionsClean: BetslipSelection[] = mockBetslipSelections
  .filter(s => s.availability === 'AVAILABLE')
  .slice(0, 2)
