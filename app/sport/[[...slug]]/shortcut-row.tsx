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

const sample = [
  { label: 'Football Today', icon: GiSoccerBall, href: '' },
  { label: 'Tennis Today', icon: GiTennisBall, href: '' },
  { label: 'In Play', icon: PiMonitorPlayFill, href: '/live' },
]

export default function ShortcutRow(props: { queryRef: PreloadedQuery<PrematchQuery> }) {
  const preloaded = usePreloadedQuery<PrematchQuery>(PrematchQueryNode, props.queryRef)
  const data = useFragment(
    graphql`
      fragment ShortcutRow on Query {
        scr_topTournaments: topTournaments(first: 4) @stream(initialCount: 1) {
          sport {
            key
          }
          key
          name
        }
      }
    `,
    preloaded as ShortcutRow$key
  )

  const pathname = usePathname()
  const selected = useTournamentKeysFromUrl()

  if (!preloaded) return <ShortcutRowSkeleton />

  const shortcuts = [
    ...uniqBy(data.scr_topTournaments, 'label').map(t => ({
      label: t.name,
      icon: <SportIcon sport={t.sport.key} className='group-data-active:text-accent-foreground' />,
      href: {
        pathname,
        query: { tournaments: t.key },
      },
      key: t.key,
    })),
    ...sample.map(s => ({ ...s, icon: <s.icon />, key: null })),
  ]

  return (
    <div className='w-full scrollbar-none overflow-x-auto'>
      <div className='flex gap-4'>
        {shortcuts.map(e => (
          <Link
            href={e.href}
            key={e.label}
            data-active={(selected.length === 1 && selected[0] === e.key) || null}
            className='group bg-muted/40 hover:bg-muted data-active:bg-accent inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 whitespace-nowrap transition'
          >
            {e.icon}
            <span className='text-foreground/70 group-data-active:text-accent-foreground text-xs font-light tracking-wide'>
              {e.label}
            </span>
          </Link>
        ))}
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
