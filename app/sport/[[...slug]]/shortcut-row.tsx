'use client'

import { uniqBy } from 'lodash'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GiSoccerBall, GiTennisBall } from 'react-icons/gi'
import { PiMonitorPlayFill } from 'react-icons/pi'
import { type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { PrematchQuery } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import PrematchQueryNode from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import type { ShortcutRow$key } from '@/app/sport/[[...slug]]/__generated__/ShortcutRow.graphql'
import { useTournamentKeysFromUrl } from '@/app/sport/[[...slug]]/tournament-list'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'

const sample = [{ label: 'In Play', icon: PiMonitorPlayFill, href: '/live' }]

export default function ShortcutRow(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  const preloaded = usePreloadedQuery<PrematchQuery>(PrematchQueryNode, props.queryRef)
  const data = useFragment(
    graphql`
      fragment ShortcutRow on Query {
        scr_topTournaments: topTournaments(first: 6) @stream(initialCount: 1) {
          sport @required(action: NONE) {
            key @required(action: NONE)
          }
          key @required(action: NONE)
          name
        }
      }
    `,
    preloaded as ShortcutRow$key
  )

  const pathname = usePathname()
  const selected = useTournamentKeysFromUrl()

  if (!preloaded || !data?.scr_topTournaments) return <ShortcutRowSkeleton />

  const shortcuts = [
    ...data.scr_topTournaments
      .filter(t => !!t)
      .map(t => ({
        label: t.name,
        icon: (
          <SportIcon sport={t.sport.key} className='group-data-active:text-accent-foreground' />
        ),
        href: {
          pathname,
          query: { tournaments: `${t.sport.key}:${t.key}` },
        },
        key: `${t.sport.key}:${t.key}`,
      })),
    ...sample.map(s => ({ ...s, icon: <s.icon />, key: null })),
  ]

  return (
    <div className='-m-5 w-full scrollbar-none overflow-x-auto p-5'>
      <div className='flex gap-4'>
        {shortcuts.map(
          e =>
            !!e && (
              <Link
                href={e.href}
                key={e.label}
                data-active={selected.some(s => decodeURIComponent(s) === e?.key) || null}
                className='bg-dark-200 data-active:bg-primary data-active:text-primary-foreground shadow-primary/40 inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 whitespace-nowrap text-white/70 transition hover:bg-white/10 hover:text-white data-active:shadow-[0_0_4px,0_0_12px,0_0_20px]'
              >
                {e.icon}
                <span className='text-xs font-light tracking-wide'>{e.label}</span>
              </Link>
            )
        )}
      </div>
    </div>
  )
}

export function ShortcutRowSkeleton() {
  return (
    <div className='w-full scrollbar-none overflow-x-auto'>
      <div className='flex gap-4'>
        {Array(9)
          .fill(9)
          .map((_, i) => (
            <Skeleton
              // biome-ignore lint/suspicious/noArrayIndexKey: identical
              key={i}
              className='bg-muted h-10 w-40 shrink-0 rounded-full'
            />
          ))}
      </div>
    </div>
  )
}
