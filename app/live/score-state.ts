'use client'

import { graphql, useFragment } from 'react-relay'
import type { LiveScoreState$key } from '@/relay/__generated__/LiveScoreState.graphql'

export type Pair = readonly [home: string, away: string]

/**
 * The in-play score details that change while a match runs. Spread
 * `...LiveScoreState` in the eventStateUpdated subscription, so every
 * consumer of this hook stays fresh.
 *
 * Returns a view-model indexed by side (0 = home, 1 = away), so consumers
 * never index by field name.
 */
export function useLiveScoreState(event: LiveScoreState$key) {
  const data = useFragment(
    graphql`
      fragment LiveScoreState on Event {
        status
        serving
        pointScore {
          home
          away
        }
        periodScores {
          period
          home
          away
        }
      }
    `,
    event
  )

  return {
    live: data.status === 'LIVE',
    serving: data.serving === 'HOME' ? 0 : data.serving === 'AWAY' ? 1 : null,
    points: data.pointScore
      ? ([data.pointScore.home, data.pointScore.away] as const satisfies Pair)
      : null,
    periods: [...data.periodScores]
      .sort((a, b) => a.period - b.period)
      .map(p => ({ number: p.period, score: [p.home, p.away] as const satisfies Pair })),
  }
}
