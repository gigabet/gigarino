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
        // <lg: vertical squircle (on supported browsers)
        'flex min-w-20 flex-col items-center justify-center gap-1.5 rounded-2xl px-3 pt-4 pb-2.5 [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[1.375rem] lg:[corner-shape:round]',
        // lg+: original horizontal pill
        'lg:min-w-0 lg:flex-row lg:gap-2 lg:rounded-2xl lg:px-3.5 lg:py-2',
        props.active
          ? 'text-white'
          : 'lg:hover:bg-dark-300 hover:bg-dark-400 text-white/60 hover:text-white max-lg:text-white/75'
      )}
    >
      <span className='[&>svg]:size-5 lg:[&>svg]:size-4'>{props.icon}</span>
      <span className='max-w-20 truncate'>{props.label}</span>
      {/* plain-radius browsers (iOS Safari) get an inset position so the count stays inside the curve */}
      <span
        className={cn(
          'text-secondary absolute top-1.5 right-2.5 text-[0.65rem] lg:static lg:text-xs',
          'supports-[corner-shape:squircle]:top-1 supports-[corner-shape:squircle]:right-2'
        )}
      >
        {props.count}
      </span>
    </button>
  )
}
