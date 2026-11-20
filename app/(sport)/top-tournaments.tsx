'use client'

import { RadioGroup } from 'radix-ui'
import ReactCountryFlag from 'react-country-flag'
import { graphql, useFragment } from 'react-relay'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useScrollFade, useSelectedTournaments, useSidebarSearch } from '@/context/hooks'
import { useT } from '@/context/providers'
import { cn, stripCategory } from '@/lib/utils'
import type { TopTournaments$key } from '@/relay/__generated__/TopTournaments.graphql'

/** Radio value of the "All" option (no tournament selected, not searching). */
const ALL = 'all'

/**
 * The top tournaments as a single-choice group: picking one replaces the selection.
 * `list` is the vertical sidebar block; `bar` is the horizontally scrolling mobile strip,
 * which also carries the pinned "All" option (the sidebar has its own button for that).
 */
export default function TopTournaments(props: {
  query: TopTournaments$key
  layout: 'list' | 'bar'
}) {
  const t = useT()
  const data = useFragment(
    graphql`
      fragment TopTournaments on Query {
        tt_topTournaments: topTournaments(first: 6) @stream(initialCount: 1) {
          sport @required(action: NONE) {
            key @required(action: NONE)
          }
          key @required(action: NONE)
          name
          category {
            name
            countryCode
          }
          eventCount
        }
      }
    `,
    props.query
  )

  const { selected, select } = useSelectedTournaments()
  const { term } = useSidebarSearch()
  const fade = useScrollFade()

  if (!data.tt_topTournaments) return <TopTournamentsSkeleton layout={props.layout} />

  const tournaments = data.tt_topTournaments.filter(tournament => !!tournament)

  // more than one selected (sidebar checkboxes) matches none of the radios
  const checked = selected.length === 1 ? selected[0] : ''
  const highlightsActive = selected.length === 0 && !term
  const value = props.layout === 'bar' && highlightsActive ? ALL : checked

  const items = tournaments.map(tournament => {
    const id = `${tournament.sport.key}:${tournament.key}`
    return (
      <Option key={id} value={id} checked={value === id} layout={props.layout}>
        {/* no country (NBA, ...): the sport icon stands in for the flag */}
        {tournament.category.countryCode ? (
          <ReactCountryFlag
            svg
            countryCode={tournament.category.countryCode}
            className='w-5 shrink-0 rounded-xs opacity-80'
            style={{ width: undefined, height: undefined }}
          />
        ) : (
          <SportIcon sport={tournament.sport.key} colored className='size-4 shrink-0' />
        )}
        <span className={cn(props.layout === 'list' && 'mr-auto truncate')}>
          {stripCategory(tournament.name, tournament.category.name)}
        </span>
        {props.layout === 'list' && <span className='text-secondary'>{tournament.eventCount}</span>}
      </Option>
    )
  })

  return (
    <RadioGroup.Root
      aria-label={t('Top tournaments')}
      value={value}
      onValueChange={next => select(next === ALL ? null : next)}
      orientation={props.layout === 'list' ? 'vertical' : 'horizontal'}
      className={props.layout === 'list' ? 'flex flex-col gap-1' : 'flex items-center gap-1'}
    >
      {props.layout === 'list' ? (
        items
      ) : (
        <>
          {/* outside the scroller, so it stays put while the tournaments scroll */}
          <Option value={ALL} checked={value === ALL} layout='bar'>
            {t('All')}
          </Option>
          <span aria-hidden className='h-4 w-px shrink-0 bg-white/10' />
          <div
            ref={fade.ref}
            style={fade.style}
            className='flex min-w-0 flex-1 scrollbar-none items-center gap-1 overflow-x-auto'
          >
            {items}
          </div>
        </>
      )}
    </RadioGroup.Root>
  )
}

/** Same muted chip as the live country tabs: no border, just a lifted background when selected. */
function Option({
  checked,
  layout,
  className,
  ...props
}: {
  checked: boolean
  layout: 'list' | 'bar'
} & React.ComponentProps<typeof RadioGroup.Item>) {
  return (
    <RadioGroup.Item
      className={cn(
        'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] leading-4 transition-colors',
        checked ? 'text-foreground bg-dark-400' : 'text-secondary hover:text-foreground',
        layout === 'list'
          ? cn(
              'w-full gap-2.5 px-3 py-2 text-left hover:bg-white/8',
              checked && 'bg-dark-300 hover:bg-dark-300'
            )
          : 'shrink-0 whitespace-nowrap',
        className
      )}
      {...props}
    />
  )
}

export function TopTournamentsSkeleton(props: { layout: 'list' | 'bar' }) {
  if (props.layout === 'list') {
    return (
      <div className='flex flex-col gap-1'>
        {Array(6)
          .fill(6)
          .map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: identical
            <Skeleton key={i} className='h-8 w-full rounded-full' />
          ))}
      </div>
    )
  }
  return (
    <div className='flex w-full scrollbar-none gap-2 overflow-x-auto'>
      {Array(9)
        .fill(9)
        .map((_, i) => (
          <Skeleton
            // biome-ignore lint/suspicious/noArrayIndexKey: identical
            key={i}
            className='bg-muted h-6 w-28 shrink-0 rounded-full'
          />
        ))}
    </div>
  )
}
