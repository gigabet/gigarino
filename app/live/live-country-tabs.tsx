'use client'

import { Command } from 'cmdk'
import { sortBy } from 'lodash'
import { CheckIcon } from 'lucide-react'
import { Popover, VisuallyHidden } from 'radix-ui'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { graphql, useFragment } from 'react-relay'
import { Drawer } from 'vaul'
import { useMediaQuery } from '@/context/hooks'
import { useT } from '@/context/providers'
import { cn } from '@/lib/utils'
import type { LiveCountryTabs$key } from '@/relay/__generated__/LiveCountryTabs.graphql'

/** Matches the `gap-2` of the tab row; the overflow maths needs it as a number. */
const GAP_PX = 8

type Country = { name: string; code: string | null }

export default function LiveCountryTabs(props: {
  query: LiveCountryTabs$key
  active: string | null
  onChangeAction: (country: string | null) => void
}) {
  const t = useT()
  const data = useFragment(
    // HACK: liveEvents has no country argument or country list, so we count countries the
    // hard way. Limit 100. This is just proof of concept. Replace with better query ASAP.
    graphql`
      fragment LiveCountryTabs on Query {
        countryEvents: liveEvents(first: 100, sport: $sport, search: $search) {
          edges {
            node {
              category {
                name
                countryCode
              }
            }
          }
        }
      }
    `,
    props.query
  )

  // most live events first, so the row shows the busiest countries
  const countries = useMemo(() => {
    const byName = new Map<string, Country & { count: number }>()
    for (const { node } of data.countryEvents.edges) {
      const { name, countryCode } = node.category
      const known = byName.get(name)
      if (known) known.count++
      else byName.set(name, { name, code: countryCode ?? null, count: 1 })
    }
    return sortBy([...byName.values()], [c => -c.count, c => c.name]) as Country[]
  }, [data.countryEvents.edges])

  const rowRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState(countries.length)

  // How many country tabs fit next to "All" and the "+N" tab. Widths come from an invisible
  // copy of every tab, so the real row never has to render overflowing tabs to be measured.
  useLayoutEffect(() => {
    const row = rowRef.current
    const measure = measureRef.current
    if (!row || !measure) return

    const compute = () => {
      // children: All, every country in order, then a dummy "+99" tab
      const widths = Array.from(measure.children, c => (c as HTMLElement).offsetWidth)
      const moreWidth = widths[widths.length - 1] ?? 0
      const available = row.clientWidth

      let used = widths[0] ?? 0
      let count = 0
      for (let i = 0; i < countries.length; i++) {
        const next = used + GAP_PX + (widths[i + 1] ?? 0)
        const reserve = i < countries.length - 1 ? GAP_PX + moreWidth : 0
        if (next + reserve > available) break
        used = next
        count++
      }
      setFit(count)
    }

    compute()
    const observer = new ResizeObserver(compute)
    observer.observe(row)
    return () => observer.disconnect()
  }, [countries])

  const visible = useMemo(() => {
    const head = countries.slice(0, fit)
    if (!props.active || head.some(c => c.name === props.active)) return head
    // keep the selection on screen even when it sits past the cut
    const selected = countries.find(c => c.name === props.active) ?? {
      name: props.active,
      code: null,
    }
    return [...head.slice(0, Math.max(fit - 1, 0)), selected]
  }, [countries, fit, props.active])

  const hiddenCount = countries.filter(c => !visible.some(v => v.name === c.name)).length

  if (countries.length === 0 && !props.active) return null

  return (
    <div className='relative overflow-hidden'>
      <div ref={rowRef} className='flex items-center gap-1 px-0.5'>
        <Chip active={props.active === null} onClick={() => props.onChangeAction(null)}>
          {t('All')}
        </Chip>
        {visible.map(c => (
          <Chip
            key={c.name}
            active={props.active === c.name}
            onClick={() => props.onChangeAction(c.name)}
          >
            <Flag code={c.code} />
            {c.name}
          </Chip>
        ))}
        {hiddenCount > 0 && (
          <MoreCountries
            hiddenCount={hiddenCount}
            countries={countries}
            active={props.active}
            onChangeAction={props.onChangeAction}
          />
        )}
      </div>

      {/* invisible copy of the row to determine when the +N button appears */}
      <div
        ref={measureRef}
        aria-hidden
        inert
        className='pointer-events-none invisible absolute top-0 left-0 flex w-max gap-1'
      >
        <Chip>{t('All')}</Chip>
        {countries.map(c => (
          <Chip key={c.name}>
            <Flag code={c.code} />
            {c.name}
          </Chip>
        ))}
        <Chip>+99</Chip>
      </div>
    </div>
  )
}

function Chip({
  active,
  className,
  ...props
}: { active?: boolean } & React.ComponentProps<'button'>) {
  return (
    <button
      type='button'
      aria-pressed={active}
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] whitespace-nowrap transition-colors',
        active ? 'text-foreground bg-dark-400' : 'text-secondary hover:text-foreground',
        className
      )}
      {...props}
    />
  )
}

function Flag(props: { code: string | null }) {
  return (
    <ReactCountryFlag
      svg
      countryCode={props.code ?? 'UN'}
      className='w-3.5 shrink-0 rounded-xs opacity-80'
      style={{ width: undefined, height: undefined }}
    />
  )
}

/**
 * The "+N" tab. Desktop opens a searchable dropdown anchored to the tab, mobile a bottom
 * sheet with the same list, so a long country list scrolls instead of stretching the page.
 */
function MoreCountries(props: {
  hiddenCount: number
  countries: ReadonlyArray<Country>
  active: string | null
  onChangeAction: (country: string | null) => void
}) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const list = (listClassName: string) => (
    <CountryList
      countries={props.countries}
      active={props.active}
      listClassName={listClassName}
      onSelectAction={country => {
        props.onChangeAction(country)
        setOpen(false)
      }}
    />
  )
  const label = `+${props.hiddenCount}`

  if (isDesktop) {
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Chip>{label}</Chip>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align='end'
            sideOffset={8}
            className='bg-dark-200 z-50 w-72 rounded-2xl border border-white/5 p-2 shadow-2xl'
          >
            {list('max-h-80')}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  }

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Chip>{label}</Chip>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 z-50 bg-black/50' />
        <Drawer.Content
          className='bg-dark-200 fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col outline-none'
          aria-describedby={undefined}
        >
          <div className='mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-white/20' />
          <VisuallyHidden.Root>
            <Drawer.Title>{t('Country')}</Drawer.Title>
          </VisuallyHidden.Root>
          <div className='flex min-h-0 flex-col p-3'>{list('max-h-[65dvh]')}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

function CountryList(props: {
  countries: ReadonlyArray<Country>
  active: string | null
  listClassName: string
  onSelectAction: (country: string | null) => void
}) {
  const t = useT()
  const alphabetical = useMemo(() => sortBy(props.countries, c => c.name), [props.countries])

  const item =
    'flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm text-neutral-200 data-[selected=true]:bg-white/8'

  return (
    <Command loop label={t('Country')} className='flex min-h-0 flex-col gap-2'>
      <Command.Input
        placeholder={t('Search countries...')}
        className='bg-dark focus:border-primary border-control-border w-full rounded-full border px-4 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none'
      />
      <Command.List className={cn('overflow-y-auto overscroll-contain', props.listClassName)}>
        <Command.Empty className='text-secondary px-2 py-6 text-center text-xs'>
          {t('No countries found.')}
        </Command.Empty>
        <Command.Item value={t('All')} onSelect={() => props.onSelectAction(null)} className={item}>
          <span className='min-w-0 flex-1 truncate'>{t('All')}</span>
          {props.active === null && <CheckIcon className='text-primary size-4 shrink-0' />}
        </Command.Item>
        {alphabetical.map(c => (
          <Command.Item
            key={c.name}
            value={c.name}
            onSelect={() => props.onSelectAction(c.name)}
            className={item}
          >
            <Flag code={c.code} />
            <span className='min-w-0 flex-1 truncate'>{c.name}</span>
            {props.active === c.name && <CheckIcon className='text-primary size-4 shrink-0' />}
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  )
}
