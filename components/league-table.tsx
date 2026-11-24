'use client'

import { ListOrderedIcon } from 'lucide-react'
import { Suspense, useState } from 'react'
import {
  graphql,
  type PreloadedQuery,
  useFragment,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay'
import * as Dialog from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useT } from '@/context/providers'
import { cn, stripCategory } from '@/lib/utils'
import type { LeagueTableButton$key } from '@/relay/__generated__/LeagueTableButton.graphql'
import type { LeagueTableGroup$key } from '@/relay/__generated__/LeagueTableGroup.graphql'
import type { LeagueTableQuery } from '@/relay/__generated__/LeagueTableQuery.graphql'
import LeagueTableQueryNode from '@/relay/__generated__/LeagueTableQuery.graphql'

/** Sports whose competitions are leagues with a W/D/L table. */
const SPORTS_WITH_TABLE = new Set(['football'])

// Zones are free text ("Champions League", "Relegation"), so each distinct one in a table gets the
// next colour in order of first appearance, and the legend underneath says which is which.
const ZONE_COLORS = ['bg-emerald-400', 'bg-sky-400', 'bg-amber-400', 'bg-red-400', 'bg-violet-400']

/** Opens the competition's league table. The table is only fetched once the dialog opens. */
export function LeagueTableButton(props: { tournament: LeagueTableButton$key }) {
  const data = useFragment(
    graphql`
      fragment LeagueTableButton on Tournament {
        id
        name
        sport {
          key
        }
        category {
          name
        }
      }
    `,
    props.tournament
  )
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LeagueTableQuery>(LeagueTableQueryNode)
  const [open, setOpen] = useState(false)
  const t = useT()

  if (!SPORTS_WITH_TABLE.has(data.sport.key)) return null

  return (
    <Dialog.Root
      open={open}
      onOpenChange={o => {
        setOpen(o)
        // positions move as matches finish, so never serve a stale table
        if (o) loadQuery({ ids: [data.id] }, { fetchPolicy: 'network-only' })
        else disposeQuery()
      }}
    >
      <Dialog.Trigger asChild>
        <button
          type='button'
          title={t('League table')}
          aria-label={t('League table')}
          className='text-foreground hover:text-primary shrink-0 rounded p-1 transition-colors'
        >
          <ListOrderedIcon className='size-4' />
        </button>
      </Dialog.Trigger>
      <Dialog.Content
        aria-describedby={undefined}
        className='max-h-[85dvh] overflow-hidden sm:max-w-2xl'
      >
        <Dialog.Header>
          <Dialog.Title>{stripCategory(data.name, data.category.name)}</Dialog.Title>
        </Dialog.Header>
        <div className='-mx-2 min-h-0 overflow-y-auto px-2'>
          <Suspense fallback={<Skeleton className='h-72 w-full' />}>
            {queryRef && <LeagueTableBody queryRef={queryRef} />}
          </Suspense>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

function LeagueTableBody(props: { queryRef: PreloadedQuery<LeagueTableQuery> }) {
  const { tournaments } = usePreloadedQuery<LeagueTableQuery>(
    graphql`
      query LeagueTableQuery($ids: [ID!]!) {
        tournaments(ids: $ids) {
          standings {
            season
            currentRound
            maxRounds
            groups {
              ...LeagueTableGroup
            }
          }
        }
      }
    `,
    props.queryRef
  )
  const t = useT()
  const standings = tournaments[0]?.standings

  if (!standings || standings.groups.length === 0) {
    return (
      <p className='text-secondary py-10 text-center text-sm'>
        {t('No league table is available for this competition.')}
      </p>
    )
  }

  const { season, currentRound, maxRounds } = standings

  return (
    <div className='space-y-5'>
      {(season || currentRound != null) && (
        <p className='text-secondary text-xs'>
          {season && t('Season {season}', { season })}
          {season && currentRound != null && ' · '}
          {currentRound != null &&
            (maxRounds != null
              ? t('Round {current} of {max}', { current: currentRound, max: maxRounds })
              : t('Round {current}', { current: currentRound }))}
        </p>
      )}
      {standings.groups.map((group, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: groups have no id and keep their order
        <LeagueTableGroup key={i} group={group} titled={standings.groups.length > 1} />
      ))}
    </div>
  )
}

function LeagueTableGroup(props: {
  group: LeagueTableGroup$key
  /** Cups have several groups, which need telling apart; a league's single table does not. */
  titled: boolean
}) {
  const data = useFragment(
    graphql`
      fragment LeagueTableGroup on StandingGroup {
        name
        rows {
          position
          teamName
          played
          won
          drawn
          lost
          goalsFor
          goalsAgainst
          points
          zone
        }
      }
    `,
    props.group
  )
  const t = useT()

  const zones = [...new Set(data.rows.flatMap(r => (r.zone ? [r.zone] : [])))]
  const zoneColor = (zone: string) => ZONE_COLORS[zones.indexOf(zone) % ZONE_COLORS.length]

  return (
    <div className='space-y-2'>
      {props.titled && data.name && (
        <h3 className='text-sm font-semibold text-white'>
          {/* eslint-disable-next-line local-i18n/no-untranslated-api-string -- a competition's own group label */}
          {data.name}
        </h3>
      )}
      <Table className='text-xs'>
        <TableHeader>
          <TableRow className='border-white/10 hover:bg-transparent'>
            <TableHead className='text-secondary w-8 px-1 text-center font-normal'>#</TableHead>
            <TableHead className='text-secondary px-1 font-normal'>{t('Team')}</TableHead>
            <TableHead className='text-secondary px-1 text-center font-normal' title={t('Played')}>
              {t('P')}
            </TableHead>
            <TableHead className='text-secondary px-1 text-center font-normal' title={t('Won')}>
              {t('W')}
            </TableHead>
            <TableHead className='text-secondary px-1 text-center font-normal' title={t('Drawn')}>
              {t('D')}
            </TableHead>
            <TableHead className='text-secondary px-1 text-center font-normal' title={t('Lost')}>
              {t('L')}
            </TableHead>
            <TableHead className='text-secondary px-1 text-center font-normal' title={t('Goals')}>
              {t('Goals')}
            </TableHead>
            <TableHead className='text-secondary px-1 text-center font-normal' title={t('Points')}>
              {t('Pts')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map(row => (
            <TableRow key={row.teamName} className='border-white/5'>
              <TableCell className='px-1 py-1.5 text-center font-mono'>
                <span className='inline-flex items-center gap-1'>
                  <span
                    className={cn(
                      'h-4 w-1 rounded-full',
                      row.zone ? zoneColor(row.zone) : 'bg-transparent'
                    )}
                  />
                  {row.position}
                </span>
              </TableCell>
              <TableCell className='max-w-40 truncate px-1 py-1.5 font-medium text-white'>
                {row.teamName}
              </TableCell>
              <TableCell className='px-1 py-1.5 text-center font-mono'>{row.played}</TableCell>
              <TableCell className='px-1 py-1.5 text-center font-mono'>{row.won}</TableCell>
              <TableCell className='px-1 py-1.5 text-center font-mono'>{row.drawn}</TableCell>
              <TableCell className='px-1 py-1.5 text-center font-mono'>{row.lost}</TableCell>
              <TableCell className='px-1 py-1.5 text-center font-mono whitespace-nowrap'>
                {row.goalsFor}:{row.goalsAgainst}
              </TableCell>
              <TableCell className='px-1 py-1.5 text-center font-mono font-bold text-white'>
                {row.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {zones.length > 0 && (
        <ul className='text-secondary flex flex-wrap gap-x-4 gap-y-1 text-[0.65rem]'>
          {zones.map(zone => (
            <li key={zone} className='flex items-center gap-1.5'>
              <span className={cn('size-2 rounded-full', zoneColor(zone))} />
              {zone}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
