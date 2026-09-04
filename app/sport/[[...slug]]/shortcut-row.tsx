'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PiMonitorPlayFill } from 'react-icons/pi'
import ScrollContainer from 'react-indiana-drag-scroll'
import { type PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { PrematchQuery } from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import PrematchQueryNode from '@/app/sport/[[...slug]]/__generated__/PrematchQuery.graphql'
import type { ShortcutRow$key } from '@/app/sport/[[...slug]]/__generated__/ShortcutRow.graphql'
import { useTournamentKeysFromUrl } from '@/app/sport/[[...slug]]/tournament-list'
import { SportIcon } from '@/components/sport-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { getSportTheme } from '@/lib/sport-theme'

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
        icon: <SportIcon sport={t.sport.key} colored className='size-4' />,
        href: {
          pathname,
          query: { tournaments: `${t.sport.key}:${t.key}` },
        },
        key: `${t.sport.key}:${t.key}`,
        sportKey: t.sport.key,
      })),
    ...sample.map(s => ({ ...s, icon: <s.icon className='size-4' />, key: null, sportKey: null })),
  ]

  return (
    <ScrollContainer className='w-full cursor-grab scrollbar-none overflow-x-auto' vertical={false}>
      <div className='flex gap-2'>
        {shortcuts.map(e => {
          // Create a style object with the sport theme
          const theme = e.sportKey ? getSportTheme(e.sportKey) : null
          const isActive = selected.some(s => decodeURIComponent(s) === e?.key)

          return (
            !!e && (
              <Link
                href={e.href}
                key={e.label}
                scroll={false}
                data-active={isActive || null}
                className='group/link bg-dark inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/5 px-3.5 whitespace-nowrap text-white/60 transition-colors text-shadow-current hover:text-white data-active:text-white data-active:text-shadow-[0_0_8px]'
                style={
                  isActive && theme
                    ? ({
                        '--active-border': theme.primary,
                        '--active-shadow': theme.glow,
                        borderColor: theme.primary,
                        boxShadow: `inset 0 0 10px -2px ${theme.primary}`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                {e.icon}
                <span className='text-xs font-light tracking-wide'>{e.label}</span>
              </Link>
            )
          )
        })}
      </div>
    </ScrollContainer>
  )
}

export function ShortcutRowSkeleton() {
  return (
    <div className='w-full scrollbar-none overflow-x-auto'>
      <div className='flex gap-2'>
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
