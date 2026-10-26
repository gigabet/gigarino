'use client'

import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
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
  goalattempts: tKey('Goal attempts'),
  yellowred_cards: tKey('Yellow/red cards'),
  corner_f: tKey('Corners full time'),
  corner_h: tKey('Corners 1st half'),
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
            outcome
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
    insights.round && `${t('Round')} ${insights.round}`,
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

  // outcomes are relative to the event's home team
  const h2hTally = {
    home: insights.headToHead.filter(m => m.outcome === 'W').length,
    draw: insights.headToHead.filter(m => m.outcome === 'D').length,
    away: insights.headToHead.filter(m => m.outcome === 'L').length,
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
                className='data-[state=active]:bg-primary shrink-0 rounded-full bg-white/8 px-4 py-2 text-xs font-medium whitespace-nowrap text-gray-300 shadow-none data-[state=active]:text-black'
              >
                {TAB_LABEL[tab]}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value='stats'>
            <StatsTab home={data.homeCompetitor} away={data.awayCompetitor} stats={stats} />
          </Tabs.Content>

          <Tabs.Content value='form'>
            <FormTab
              home={{
                name: data.homeCompetitor,
                position: insights.homePosition,
                matches: insights.homeRecent,
              }}
              away={{
                name: data.awayCompetitor,
                position: insights.awayPosition,
                matches: insights.awayRecent,
              }}
            />
          </Tabs.Content>

          <Tabs.Content value='h2h'>
            <Panel
              header={
                <H2HHeader
                  home={data.homeCompetitor}
                  away={data.awayCompetitor}
                  tally={h2hTally}
                  total={insights.headToHead.length}
                />
              }
            >
              <div className='text-secondary hidden grid-cols-[9rem_1fr_auto_1fr_8.5rem] items-center gap-x-5 py-2 text-xs sm:grid'>
                <span>{t('Winner')}</span>
                <span className='col-span-3 text-center'>{t('Match')}</span>
                <span className='text-right'>{t('Date')}</span>
              </div>
              {insights.headToHead.map((m, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: past matches have no id
                <H2HRow key={i} match={m} />
              ))}
            </Panel>
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

type Side = 'home' | 'away'

const TEAM = {
  home: {
    dot: 'bg-primary',
    text: 'text-primary',
    bar: 'bg-primary',
    barDim: 'bg-primary/30',
    pill: 'bg-primary/10 text-primary',
  },
  away: {
    dot: 'bg-purple-accent',
    text: 'text-purple-accent',
    bar: 'bg-purple-accent',
    barDim: 'bg-purple-accent/30',
    pill: 'bg-purple-accent/15 text-purple-accent',
  },
  draw: {
    dot: 'bg-white/40',
    text: 'text-white',
    bar: 'bg-white/30',
    barDim: 'bg-white/15',
    pill: 'bg-white/10 text-white/70',
  },
} as const

const RESULT_STYLE: Record<string, string> = {
  W: 'bg-primary text-black',
  D: 'bg-white/20 text-white',
  L: 'bg-red-500 text-white',
}

function Panel(props: {
  header?: React.ReactNode
  headerClassName?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={props.className}>
      {props.header && (
        <div className={cn('border-b border-white/5 pb-3', props.headerClassName)}>
          {props.header}
        </div>
      )}
      <div className='divide-y divide-white/4'>{props.children}</div>
    </div>
  )
}

function TeamLabel(props: {
  name: string
  side: Side
  reverse?: boolean
  position?: number | null
  value?: number
}) {
  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-2.5',
        props.reverse && 'flex-row-reverse text-right'
      )}
    >
      <span className={cn('size-2.5 shrink-0 rounded-full', TEAM[props.side].dot)} />
      <span className='truncate text-sm font-semibold text-white'>{props.name}</span>
      {props.position != null && (
        <span className='bg-dark-300 rounded-full px-2 py-0.5 font-mono text-[0.65rem]'>
          #{props.position}
        </span>
      )}
      {props.value != null && (
        <span className={cn('font-mono text-2xl leading-none font-bold', TEAM[props.side].text)}>
          {props.value}
        </span>
      )}
    </div>
  )
}

function Chip(props: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[0.65rem] font-bold',
        props.className
      )}
    >
      {props.children}
    </span>
  )
}

function ScoreBox(props: { home?: string | null; away?: string | null }) {
  return (
    <span className='flex min-w-12 shrink-0 items-center justify-center gap-1.5 font-mono text-sm font-bold text-white tabular-nums'>
      <span>{props.home ?? '-'}</span>
      <span className='text-white/30'>:</span>
      <span>{props.away ?? '-'}</span>
    </span>
  )
}

/** Three grid cells: home name, score, away name. The parent supplies the grid. */
function MatchCells(props: {
  homeName: string
  awayName: string
  homeScore?: string | null
  awayScore?: string | null
}) {
  return (
    <>
      <span className='min-w-0 truncate text-right text-sm text-white/90'>{props.homeName}</span>
      <ScoreBox home={props.homeScore} away={props.awayScore} />
      <span className='min-w-0 truncate text-left text-sm text-white/90'>{props.awayName}</span>
    </>
  )
}

// shared by the Form rows and the H2H rows (a fragment can only be declared once)
const pastMatchFragment = graphql`
  fragment StatisticsWidgetPastMatch on PastMatch {
    homeName
    awayName
    homeScore
    awayScore
    competition
    startTime
    outcome
  }
`

/* -------------------------------- Stats ----------------------------------- */

// Rows shown before "Show all". Stats where both sides are 0 sink to the end,
// so the collapsed list is the 8 most informative ones.
const COLLAPSED_STATS = 8

function StatsTab(props: {
  home: string
  away: string
  stats: ReadonlyArray<{ key: string; home: string; away: string }>
}) {
  const t = useT()
  const [expanded, setExpanded] = useState(false)

  const empty = (s: { home: string; away: string }) => num(s.home) + num(s.away) === 0
  const ranked = [...props.stats.filter(s => !empty(s)), ...props.stats.filter(empty)]
  const visible = expanded ? ranked : ranked.slice(0, COLLAPSED_STATS)

  return (
    <Panel
      header={
        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
          <TeamLabel name={props.home} side='home' />
          <span />
          <TeamLabel name={props.away} side='away' reverse />
        </div>
      }
    >
      {/* two columns from sm up: half the height */}
      <div className='grid gap-y-1 pt-2 sm:grid-cols-2 sm:gap-x-10'>
        {visible.map(stat => (
          <StatRow
            key={stat.key}
            stat={stat}
            label={t(STAT_LABEL[stat.key] ?? prettify(stat.key))}
          />
        ))}
      </div>
      {ranked.length > COLLAPSED_STATS && (
        <button
          type='button'
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          className='text-secondary hover:text-foreground flex w-full items-center justify-center gap-1.5 py-2.5 text-xs transition-colors'
        >
          {expanded ? t('Show fewer stats') : t('Show all {n} stats', { n: ranked.length })}
          <ChevronDownIcon
            className={cn('size-3.5 transition-transform', expanded && 'rotate-180')}
          />
        </button>
      )}
    </Panel>
  )
}

function StatRow(props: { stat: { home: string; away: string }; label: string }) {
  const h = num(props.stat.home)
  const a = num(props.stat.away)
  const total = h + a
  const homePct = total === 0 ? 0 : (h / total) * 100
  const awayPct = total === 0 ? 0 : 100 - homePct

  return (
    <div className='flex flex-col gap-1 py-1.5'>
      <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs'>
        <span className={cn('font-mono font-semibold', h >= a ? TEAM.home.text : 'text-white/60')}>
          {props.stat.home}
        </span>
        <span className='text-secondary text-center'>{props.label}</span>
        <span
          className={cn(
            'text-right font-mono font-semibold',
            a >= h ? TEAM.away.text : 'text-white/60'
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
              h >= a ? TEAM.home.bar : TEAM.home.barDim
            )}
            style={{ width: `${homePct}%` }}
          />
        </div>
        <div className='flex flex-1 overflow-hidden rounded-full bg-white/5'>
          <div
            className={cn(
              'h-full rounded-full transition-all',
              a >= h ? TEAM.away.bar : TEAM.away.barDim
            )}
            style={{ width: `${awayPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

/* --------------------------------- Form ----------------------------------- */

type FormTeam = {
  name: string
  position: number | null | undefined
  matches: ReadonlyArray<StatisticsWidgetPastMatch$key>
}

/**
 * sm and up: both teams side by side.
 * Below sm: one team at a time behind a switcher, which halves the height.
 */
function FormTab(props: { home: FormTeam; away: FormTeam }) {
  const [active, setActive] = useState<Side>('home')

  return (
    <div className='flex flex-col gap-3'>
      <div className='bg-dark-200 flex gap-1 rounded-full p-1 sm:hidden'>
        {(['home', 'away'] as const).map(side => (
          <button
            key={side}
            type='button'
            onClick={() => setActive(side)}
            aria-pressed={active === side}
            className={cn(
              'flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              active === side ? 'bg-white/10 text-white' : 'text-white/50'
            )}
          >
            <span className={cn('size-2 shrink-0 rounded-full', TEAM[side].dot)} />
            <span className='truncate'>{props[side].name}</span>
          </button>
        ))}
      </div>

      <div className='grid gap-8 sm:grid-cols-2 sm:gap-x-10'>
        {(['home', 'away'] as const).map(side => (
          <FormColumn
            key={side}
            side={side}
            team={props[side]}
            className={active !== side ? 'max-sm:hidden' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

function FormColumn(props: { team: FormTeam; side: Side; className?: string }) {
  return (
    <Panel
      className={props.className}
      headerClassName='max-sm:hidden' // the switcher is the header on mobile
      header={<TeamLabel name={props.team.name} side={props.side} position={props.team.position} />}
    >
      {props.team.matches.map((m, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: past matches have no id
        <PastMatchRow key={i} match={m} />
      ))}
    </Panel>
  )
}

function PastMatchRow(props: { match: StatisticsWidgetPastMatch$key }) {
  const m = useFragment(pastMatchFragment, props.match)

  return (
    <div className='grid grid-cols-[auto_1fr_auto_1fr] items-center gap-x-3 gap-y-1 py-2.5'>
      <Chip className={cn('row-span-2', (m.outcome && RESULT_STYLE[m.outcome]) || 'bg-white/10')}>
        {m.outcome ?? ''}
      </Chip>
      <MatchCells
        homeName={m.homeName}
        awayName={m.awayName}
        homeScore={m.homeScore}
        awayScore={m.awayScore}
      />
      <span
        className='text-secondary col-span-3 col-start-2 truncate text-center text-[0.7rem]'
        suppressHydrationWarning
      >
        {m.competition ? `${m.competition} · ` : ''}
        {format(m.startTime, 'dd MMM yyyy')}
      </span>
    </div>
  )
}

/* ---------------------------- Head to head -------------------------------- */

function H2HHeader(props: {
  home: string
  away: string
  tally: { home: number; draw: number; away: number }
  total: number
}) {
  const t = useT()
  const { tally } = props

  return (
    <div className='flex flex-col gap-3'>
      <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
        <TeamLabel name={props.home} side='home' value={tally.home} />
        <div className='text-secondary text-center text-xs'>
          {tally.draw > 0
            ? t('{n} draws', { n: tally.draw })
            : t('Last {n} meetings', { n: props.total })}
        </div>
        <TeamLabel name={props.away} side='away' value={tally.away} reverse />
      </div>

      <div
        className='flex h-1.5 gap-1'
        role='img'
        aria-label={`${tally.home} - ${tally.draw} - ${tally.away}`}
      >
        {tally.home > 0 && (
          <div className={cn('rounded-full', TEAM.home.bar)} style={{ flexGrow: tally.home }} />
        )}
        {tally.draw > 0 && (
          <div className={cn('rounded-full', TEAM.draw.bar)} style={{ flexGrow: tally.draw }} />
        )}
        {tally.away > 0 && (
          <div className={cn('rounded-full', TEAM.away.bar)} style={{ flexGrow: tally.away }} />
        )}
      </div>
    </div>
  )
}

function H2HRow(props: { match: StatisticsWidgetPastMatch$key }) {
  const m = useFragment(pastMatchFragment, props.match)
  const t = useT()

  const homeScore = m.homeScore == null ? null : Number(m.homeScore)
  const awayScore = m.awayScore == null ? null : Number(m.awayScore)
  const played =
    homeScore !== null && awayScore !== null && !Number.isNaN(homeScore) && !Number.isNaN(awayScore)

  // winner's name comes from the scores; colour from the outcome, which is
  // relative to the upcoming fixture's home team
  const winnerName = !played
    ? null
    : homeScore > awayScore
      ? m.homeName
      : awayScore > homeScore
        ? m.awayName
        : null
  const tone = m.outcome === 'W' ? TEAM.home : m.outcome === 'L' ? TEAM.away : TEAM.draw

  return (
    <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-2 py-2.5 sm:grid-cols-[9rem_1fr_auto_1fr_8.5rem] sm:gap-x-5'>
      {/* mobile: result + date share the top line; desktop: they become grid cells */}
      <div className='col-span-3 flex items-center justify-between gap-3 sm:contents'>
        <Chip
          className={cn('h-7 max-w-full justify-self-start px-3 text-xs font-semibold', tone.pill)}
        >
          <span className='truncate'>{winnerName ?? t('Draw')}</span>
        </Chip>

        <div
          className='text-secondary flex shrink-0 flex-col items-end text-[0.7rem] leading-snug sm:order-last sm:justify-self-end'
          suppressHydrationWarning
        >
          <span className='text-white/70'>{format(m.startTime, 'dd MMM yyyy')}</span>
          {m.competition && (
            <span className='hidden max-w-full truncate sm:block'>{m.competition}</span>
          )}
        </div>
      </div>

      <MatchCells
        homeName={m.homeName}
        awayName={m.awayName}
        homeScore={m.homeScore}
        awayScore={m.awayScore}
      />
    </div>
  )
}

export function StatisticsWidgetSkeleton() {
  return <Skeleton className='h-48 w-full rounded-2xl sm:h-60' />
}
