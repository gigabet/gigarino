'use client'

import { cx } from 'class-variance-authority'
import { useEffect } from 'react'
import { fetchQuery, graphql, useRefetchableFragment, useRelayEnvironment } from 'react-relay'
import type { LiveSportTabs$key } from '@/app/live/__generated__/LiveSportTabs.graphql'
import LiveSportTabsRefetchNode from '@/app/live/__generated__/LiveSportTabsRefetch.graphql'
import { SportIcon } from '@/components/sport-icon'
import { useT } from '@/context/providers'
import { getSportTheme } from '@/lib/sport-theme'

export default function LiveSportTabs(props: {
  query: LiveSportTabs$key
  active: string | null
  onChangeAction: (sportKey: string | null) => void
}) {
  const t = useT()
  const [data] = useRefetchableFragment(
    graphql`
      fragment LiveSportTabs on Query @refetchable(queryName: "LiveSportTabsRefetch") {
        allLive: liveEvents {
          totalCount
        }
        sports {
          key
          name
          liveEventCount
        }
      }
    `,
    props.query
  )

  const total = data.allLive.totalCount

  const env = useRelayEnvironment()
  useEffect(() => {
    const timer = window.setInterval(
      () =>
        fetchQuery(env, LiveSportTabsRefetchNode, {}, { fetchPolicy: 'network-only' }).subscribe({
          error: (err: Error) => console.error('[live-sport-tabs] poll failed', err),
        }),
      30_000
    )
    return () => clearInterval(timer)
  }, [env])

  return (
    <div className='flex scrollbar-none items-center gap-2 overflow-x-auto'>
      <Tab
        active={props.active === null}
        onClick={() => props.onChangeAction(null)}
        icon={<SportIcon sport='highlights' colored className='size-4' />}
        label={t('All')}
        count={total}
      />
      {data.sports
        .filter(s => s.liveEventCount > 0)
        .map(sport => {
          const theme = getSportTheme(sport.key)
          const isActive = props.active === sport.key
          return (
            <Tab
              key={sport.key}
              active={isActive}
              onClick={() => props.onChangeAction(sport.key)}
              icon={<SportIcon sport={sport.key} colored className='size-4' />}
              label={sport.name}
              count={sport.liveEventCount}
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
