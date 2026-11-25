import ReactCountryFlag from 'react-country-flag'
import { TeamBadge } from '@/components/team-badge'
import { cn } from '@/lib/utils'

// players have no crest, so for these sports the country is the badge
const FLAG_SPORTS = new Set(['tennis'])

/** Pure formatting, so plain props: a round country flag for players, else the team badge. */
export function CompetitorBadge(props: {
  sport: string
  name: string
  imageUrl?: string | null
  countryCode?: string | null
  hue?: number
  className?: string
}) {
  if (FLAG_SPORTS.has(props.sport) && props.countryCode)
    return (
      <ReactCountryFlag
        svg
        countryCode={props.countryCode}
        className={cn('size-6 min-w-6 shrink-0 rounded-full object-cover', props.className)}
        style={{ width: undefined, height: undefined }}
      />
    )

  return (
    <TeamBadge
      name={props.name}
      imageUrl={props.imageUrl}
      hue={props.hue}
      className={props.className}
    />
  )
}
