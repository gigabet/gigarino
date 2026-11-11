'use client'

import { useEffect } from 'react'
import { fetchQuery, graphql, useRefetchableFragment, useRelayEnvironment } from 'react-relay'
import { SportIcon } from '@/components/sport-icon'
import { useScrollFade } from '@/context/hooks'
import { useT } from '@/context/providers'
import { sortBySportOrder } from '@/lib/sport-order'
import { getSportTheme } from '@/lib/sport-theme'
import { cn } from '@/lib/utils'
import type { LiveSportTabs$key } from '@/relay/__generated__/LiveSportTabs.graphql'
import LiveSportTabsRefetchNode from '@/relay/__generated__/LiveSportTabsRefetch.graphql'

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
  const fade = useScrollFade()

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
    <div
      ref={fade.ref}
      style={fade.style}
      className='flex scrollbar-none items-stretch gap-2 overflow-x-auto py-1 lg:items-center lg:py-0'
    >
      <Tab
        active={props.active === null}
        onClick={() => props.onChangeAction(null)}
        icon={<SportIcon sport='highlights' colored className='size-5 lg:size-4' />}
        label={t('All')}
        count={total}
      />
      {sortBySportOrder(data.sports)
        .filter(s => s.liveEventCount > 0)
        .map(sport => {
          const theme = getSportTheme(sport.key)
          const isActive = props.active === sport.key
          return (
            <Tab
              key={sport.key}
              active={isActive}
              onClick={() => props.onChangeAction(sport.key)}
              icon={<SportIcon sport={sport.key} colored className='size-5 lg:size-4' />}
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
      className={cn(
        'sport-texture bg-control border-control-border relative shrink-0 border text-xs whitespace-nowrap transition-colors',
        // <lg: vertical squircle
        'flex min-w-18 flex-col items-center justify-center gap-1.5 rounded-[1.375rem] px-3 py-3 [corner-shape:squircle] lg:[corner-shape:round]',
        // lg+: original horizontal pill
        'lg:min-w-0 lg:flex-row lg:gap-2 lg:rounded-2xl lg:px-3.5 lg:py-2',
        props.active
          ? 'text-white'
          : 'lg:hover:bg-dark-300 hover:bg-dark-400 text-white/60 hover:text-white'
      )}
    >
      <span className='[&>svg]:size-5 lg:[&>svg]:size-4'>{props.icon}</span>
      <span className='max-w-20 truncate'>{props.label}</span>
      <span className='text-secondary absolute top-1 right-2 text-[0.65rem] lg:static lg:text-xs'>
        {props.count}
      </span>
    </button>
  )
}
