'use client'

import { format } from 'date-fns'
import { useEffect } from 'react'
import {
  fetchQuery,
  graphql,
  useFragment,
  useRefetchableFragment,
  useRelayEnvironment,
} from 'react-relay'
import { Skeleton } from '@/components/ui/skeleton'
import * as Tabs from '@/components/ui/tabs'
import { useT } from '@/context/providers'
import { tKey } from '@/i18n/tKey'
import { cn } from '@/lib/utils'
import type { StatisticsWidget$key } from '@/relay/__generated__/StatisticsWidget.graphql'
import type { StatisticsWidgetPastMatch$key } from '@/relay/__generated__/StatisticsWidgetPastMatch.graphql'
import StatisticsWidgetRefetchNode from '@/relay/__generated__/StatisticsWidgetRefetch.graphql'

const POLL_MS = 30_000

// provider stat keys -> labels (unknown keys fall back to a prettified key)
const STAT_LABEL: Record<string, string> = {
  possession_rt: tKey('Possession'),
  attacks: tKey('Attacks'),
  dangerous_attacks: tKey('Dangerous attacks'),
  on_target: tKey('Shots on target'),
  off_target: tKey('Shots off target'),
  shots_blocked: tKey('Shots blocked'),
  corners: tKey('Corners'),
  fouls: tKey('Fouls'),
  offsides: tKey('Offsides'),
  saves: tKey('Saves'),
  yellowcards: tKey('Yellow cards'),
  redcards: tKey('Red cards'),
  penalties: tKey('Penalties'),
  substitutions: tKey('Substitutions'),
  xg: tKey('xG'),
  passing_accuracy: tKey('Passing accuracy'),
  key_passes: tKey('Key passes'),
}
const STAT_ORDER = Object.keys(STAT_LABEL)

const num = (v: string) => Number.parseFloat(v.replace('%', '')) || 0

export default function StatisticsWidget(props: { event: StatisticsWidget$key }) {
  const [data] = useRefetchableFragment(
    graphql`
      fragment StatisticsWidget on Event @refetchable(queryName: "StatisticsWidgetRefetch") {
        id
        status
        homeCompetitor
        awayCompetitor
        insights {
          homePosition
          awayPosition
          venue
          referee
          round
          stats {
            key
            home
            away
          }
          homeRecent {
            ...StatisticsWidgetPastMatch
          }
          awayRecent {
            ...StatisticsWidgetPastMatch
          }
          headToHead {
            ...StatisticsWidgetPastMatch
          }
        }
      }
    `,
    props.event
  )

  // live stats aren't pushed by the subscriptions, so poll while in play
  const env = useRelayEnvironment()
  const live = data.status === 'LIVE'
  useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => {
      fetchQuery(
        env,
        StatisticsWidgetRefetchNode,
        { id: data.id },
        { fetchPolicy: 'network-only' }
      ).subscribe({
        error: (err: Error) => console.error('[statistics-widget] poll failed', err),
      })
    }, POLL_MS)
    return () => clearInterval(id)
  }, [env, live, data.id])

  const t = useT()
  const insights = data.insights
  if (!insights) return null

  const stats = [...insights.stats].sort((a, b) => {
    const ia = STAT_ORDER.indexOf(a.key)
    const ib = STAT_ORDER.indexOf(b.key)
    return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib)
  })
  const hasForm = insights.homeRecent.length > 0 || insights.awayRecent.length > 0
  const hasH2H = insights.headToHead.length > 0

  const tabs = [stats.length > 0 && 'stats', hasForm && 'form', hasH2H && 'h2h'].filter(
    Boolean
  ) as ('stats' | 'form' | 'h2h')[]

  const meta = [
    insights.round,
    insights.venue,
    insights.referee && `${t('Referee')}: ${insights.referee}`,
  ]
    .filter(Boolean)
    .join(' · ')

  if (tabs.length === 0 && !meta) return null

  const TAB_LABEL = {
    stats: t('Stats'),
    form: t('Form'),
    h2h: t('Head to head'),
  }

  return (
    <section className='flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 sm:p-6'>
      {meta && <p className='text-secondary truncate text-xs'>{meta}</p>}

      {tabs.length > 0 && (
        <Tabs.Root defaultValue={tabs[0]} className='w-full gap-4'>
          <Tabs.List className='h-auto w-fit scrollbar-none justify-start gap-2 overflow-x-auto bg-transparent p-0'>
            {tabs.map(tab => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                className='bg-dark-200 data-[state=active]:bg-primary shrink-0 rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap text-gray-300 shadow-none data-[state=active]:text-black'
              >
                {TAB_LABEL[tab]}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value='stats' className='flex flex-col gap-4'>
            <div className='text-foreground grid grid-cols-[1fr_auto_1fr] gap-3 text-xs font-semibold'>
              <span className='truncate'>{data.homeCompetitor}</span>
              <span />
              <span className='truncate text-right'>{data.awayCompetitor}</span>
            </div>
            {stats.map(stat => (
              <StatRow
                key={stat.key}
                stat={stat}
                label={t(STAT_LABEL[stat.key] ?? prettify(stat.key))}
              />
            ))}
          </Tabs.Content>

          <Tabs.Content value='form'>
            <div className='grid gap-6 sm:grid-cols-2'>
              <FormColumn
                name={data.homeCompetitor}
                position={insights.homePosition}
                matches={insights.homeRecent}
              />
              <FormColumn
                name={data.awayCompetitor}
                position={insights.awayPosition}
                matches={insights.awayRecent}
              />
            </div>
          </Tabs.Content>

          <Tabs.Content value='h2h' className='flex flex-col gap-3'>
            <p className='text-secondary text-[0.65rem]'>
              {t('Results from the perspective of {team}', {
                team: data.homeCompetitor,
              })}
            </p>
            {insights.headToHead.map((m, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: past matches have no id
              <PastMatchRow key={i} match={m} />
            ))}
          </Tabs.Content>
        </Tabs.Root>
      )}
    </section>
  )
}

function prettify(key: string) {
  const s = key.replaceAll('_', ' ')
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function StatRow(props: { stat: { home: string; away: string }; label: string }) {
  const h = num(props.stat.home)
  const a = num(props.stat.away)
  const total = h + a
  const homePct = total === 0 ? 0 : (h / total) * 100
  const awayPct = total === 0 ? 0 : 100 - homePct

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs'>
        <span className={cn('font-mono font-semibold', h > a ? 'text-white' : 'text-secondary')}>
          {props.stat.home}
        </span>
        <span className='text-secondary text-center text-[0.65rem] tracking-wide uppercase'>
          {props.label}
        </span>
        <span
          className={cn(
            'text-right font-mono font-semibold',
            a > h ? 'text-white' : 'text-secondary'
          )}
        >
          {props.stat.away}
        </span>
      </div>
      <div className='flex h-1 gap-1'>
        <div className='flex flex-1 justify-end overflow-hidden rounded-full bg-white/5'>
          <div
            className={cn(
              'h-full rounded-full transition-all',
              h >= a ? 'bg-primary' : 'bg-white/30'
            )}
            style={{ width: `${homePct}%` }}
          />
        </div>
        <div className='flex flex-1 overflow-hidden rounded-full bg-white/5'>
          <div
            className={cn(
              'h-full rounded-full transition-all',
              a >= h ? 'bg-primary' : 'bg-white/30'
            )}
            style={{ width: `${awayPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function FormColumn(props: {
  name: string
  position: number | null | undefined
  matches: ReadonlyArray<StatisticsWidgetPastMatch$key>
}) {
  return (
    <div className='flex min-w-0 flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <p className='truncate text-sm font-semibold text-white'>{props.name}</p>
        {props.position != null && (
          <span className='bg-dark-300 rounded-full px-2 py-0.5 font-mono text-[0.65rem]'>
            #{props.position}
          </span>
        )}
      </div>
      {props.matches.map((m, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: past matches have no id
        <PastMatchRow key={i} match={m} />
      ))}
    </div>
  )
}

const OUTCOME_STYLE: Record<string, string> = {
  W: 'bg-primary text-black',
  D: 'bg-white/30 text-white',
  L: 'bg-red-500 text-white',
}

function PastMatchRow(props: { match: StatisticsWidgetPastMatch$key }) {
  const m = useFragment(
    graphql`
      fragment StatisticsWidgetPastMatch on PastMatch {
        homeName
        awayName
        homeScore
        awayScore
        competition
        startTime
        outcome
      }
    `,
    props.match
  )

  return (
    <div className='flex items-center gap-2 text-xs'>
      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold',
          (m.outcome && OUTCOME_STYLE[m.outcome]) || 'bg-white/10'
        )}
      >
        {m.outcome ?? ''}
      </span>
      <div className='min-w-0 flex-1'>
        <p className='truncate text-white/90'>
          {m.homeName}{' '}
          <span className='text-foreground px-2 font-mono font-semibold'>
            {m.homeScore ?? '-'} - {m.awayScore ?? '-'}
          </span>{' '}
          {m.awayName}
        </p>
        <p className='text-secondary truncate text-[0.65rem]' suppressHydrationWarning>
          {m.competition ? `${m.competition} · ` : ''}
          {format(m.startTime, 'dd MMM yyyy')}
        </p>
      </div>
    </div>
  )
}

export function StatisticsWidgetSkeleton() {
  return <Skeleton className='h-48 w-full rounded-2xl sm:h-60' />
}
