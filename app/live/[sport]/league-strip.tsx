import { ToggleGroup } from 'radix-ui'

const leagues = [
  ['en', 'Premier League'],
  ['es', 'La Liga'],
  ['it', 'Serie A'],
  ['de', 'Bundesliga'],
  ['fr', 'Ligue 1'],
]

export default function LeagueStrip() {
  return (
    <ToggleGroup.Root type='single' className='flex flex-nowrap gap-2 py-2' defaultValue='al:All'>
      <League country='al' division='All' />
      {leagues.map(l => (
        <League key={l.join(':')} country={l[0]} division={l[1]} />
      ))}
    </ToggleGroup.Root>
  )
}

function League(props: { country: string; division: string }) {
  return (
    <ToggleGroup.Item
      value={[props.country, props.division].join(':')}
      className='bg-muted/40 flex h-10 items-center gap-2 rounded-full px-3.5'
    >
      <span className='bg-muted flex size-6 items-center justify-center rounded-full text-[0.5rem] uppercase'>
        {props.country}
      </span>
      <span className='text-foreground/70 text-xs font-light tracking-wide'>{props.division}</span>
    </ToggleGroup.Item>
  )
}
