'use client'

import { cx } from 'class-variance-authority'
import { countBy } from 'lodash'
import { useMemo } from 'react'
import { graphql, type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import type { LiveEventsQuery } from '@/app/live/__generated__/LiveEventsQuery.graphql'
import LiveEventsQueryNode from '@/app/live/__generated__/LiveEventsQuery.graphql'
import type { LiveSportTabs$key } from '@/app/live/__generated__/LiveSportTabs.graphql'
import { SportIcon } from '@/components/sport-icon'
import { useT } from '@/context/providers'
import { getSportTheme } from '@/lib/sport-theme'

export default function LiveSportTabs(props: {
  query: LiveSportTabs$key
  active: string | null
  onChangeAction: (sportKey: string | null) => void
}) {
  const t = useT()
  const data = useFragment(
    graphql`
      fragment LiveSportTabs on Query {
        liveEvents(first: 100) {
          edges {
            node {
              status
              sport {
                key
                name
              }
            }
          }
        }
      }
    `,
    props.query
  )

  const nodes = data.liveEvents.edges
    .map(e => e.node)
    .filter(n => !['ENDED', 'CANCELLED', 'ABANDONED', 'POSTPONED'].includes(n.status))

  const bySport = useMemo(() => {
    const counts = countBy(nodes, e => e.sport.key)
    const names = new Map(nodes.map(e => [e.sport.key, e.sport.name]))
    return Object.entries(counts).map(([key, count]) => ({
      key,
      name: names.get(key) ?? key,
      count,
    }))
  }, [nodes])

  const total = nodes.length

  return (
    <div className='flex scrollbar-none items-center gap-2 overflow-x-auto'>
      <Tab
        active={props.active === null}
        onClick={() => props.onChangeAction(null)}
        icon={<SportIcon sport='highlights' colored className='size-4' />}
        label={t('All')}
        count={total}
      />
      {bySport.map(sport => {
        const theme = getSportTheme(sport.key)
        const isActive = props.active === sport.key
        return (
          <Tab
            key={sport.key}
            active={isActive}
            onClick={() => props.onChangeAction(sport.key)}
            icon={<SportIcon sport={sport.key} colored className='size-4' />}
            label={sport.name}
            count={sport.count}
            style={
              isActive
                ? ({
                    borderColor: theme.primary,
                    boxShadow: `inset 0 0 10px -2px ${theme.primary}`,
                  } as React.CSSProperties)
                : undefined
            }
          />
        )
      })}
    </div>
  )
}

function Tab(props: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  count: number
  style?: React.CSSProperties
}) {
  return (
    <button
      type='button'
      onClick={props.onClick}
      style={props.style}
      className={cx(
        'bg-dark-200 sport-texture flex shrink-0 items-center gap-2 rounded-2xl border border-white/5 px-3.5 py-2 text-xs whitespace-nowrap transition-colors',
        props.active ? 'text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
      )}
    >
      {props.icon}
      {props.label}
      <span className='text-secondary'>{props.count}</span>
    </button>
  )
}
