'use client'

import { useAtom, useSetAtom } from 'jotai'
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  Loader2Icon,
  LockKeyhole,
  TicketIcon,
  TrendingUpIcon,
  XIcon,
} from 'lucide-react'
import { useState } from 'react'
import { PiTicket } from 'react-icons/pi'
import { graphql, useFragment } from 'react-relay'
import { Drawer } from 'vaul'
import type { Betslip$key } from '@/components/__generated__/Betslip.graphql'
import type { BetslipMobileBar$key } from '@/components/__generated__/BetslipMobileBar.graphql'
import type { Tip$key } from '@/components/__generated__/Tip.graphql'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import * as Tabs from '@/components/ui/tabs'
import { betslipInputAtom, betslipOpenAtom } from '@/context/betslip'
import { useMediaQuery } from '@/context/hooks'
import { cn, formatBalance, nCk } from '@/lib/utils'
import type { TicketType } from '@/types'

export default function Betslip(props: {
  query: Betslip$key | null
  variant?: 'panel' | 'drawer'
}) {
  const data = useFragment(
    graphql`
      fragment Betslip on BetslipQuote {
        stake
        effectiveOdds
        potentialPayout
        placeable
        betType
        items {
          outcomeId
          availability
          ...Tip
        }
      }
    `,
    props.query
  )

  const [input, setInput] = useAtom(betslipInputAtom)
  const [isPlacing, setIsPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)

  const [singleStakes, setSingleStakes] = useState<Record<string, string>>({})
  // --------------------------------------------------------------------

  if (!data || input.items.length === 0)
    return (
      <div
        className={cn(
          'bg-dark-200 flex w-full shrink flex-col overflow-hidden',
          props.variant === 'drawer'
            ? 'h-full min-h-0 flex-1'
            : 'sticky top-26.25 max-h-[calc(100dvh-8rem)] rounded-2xl border border-white/5'
        )}
      >
        <div className='flex items-center justify-between border-b border-white/5 px-5 py-4'>
          <h2 className='flex items-center gap-2 text-sm font-semibold tracking-wide text-white uppercase'>
            <TicketIcon className='text-primary size-4' />
            Betslip
          </h2>
        </div>

        <EmptyState />
      </div>
    )

  const remove = (outcomeId: string) =>
    setInput(prev => {
      let { systemSize, betType } = prev
      if (systemSize && systemSize === prev.items.length - 1) {
        systemSize = prev.items.length - 2
        if (systemSize < 2) {
          systemSize = null
          betType = 'MULTIPLE'
        }
      }

      if (prev.items.length <= 2) betType = 'SINGLE'

      return {
        ...prev,
        items: prev.items.filter(i => i.outcomeId !== outcomeId),
        systemSize,
        betType,
      }
    })

  const clearAll = () =>
    setInput(prev => ({
      ...prev,
      items: [],
      systemSize: null,
      betType: 'SINGLE',
    }))

  const unavailable = new Set(
    data.items.filter(i => i.availability !== 'AVAILABLE').map(i => i.outcomeId)
  )

  const handlePlace = () => {
    setIsPlacing(true)
    // TODO: wire `placeBet` mutation — items: data.items.map(i => ({
    //   outcomeId: i.outcomeId, expectedPrice: <price from BetslipItem> }))
    setTimeout(() => {
      setIsPlacing(false)
      setPlaced(true)
    }, 900)
  }

  const systemOptions = Array.from({ length: data.items.length - 2 }, (_, i) => i + 2) // k = 2..n-1

  if (placed)
    return (
      <PlacedState
        onNewBet={() => {
          setPlaced(false)
          clearAll()
        }}
      />
    )

  return (
    <div
      className={cn(
        'bg-dark-200 scrollbar-hide flex w-full shrink flex-col self-start overflow-auto',
        props.variant === 'drawer'
          ? 'h-full min-h-0 flex-1'
          : 'sticky top-26.25 max-h-[calc(100dvh-8rem)] rounded-2xl border border-white/5'
      )}
    >
      <div className='flex items-center justify-between border-b border-white/5 px-5 py-4'>
        <h2 className='flex items-center gap-2 text-sm font-semibold tracking-wide text-white uppercase'>
          <TicketIcon className='text-primary size-4' />
          Betslip
          {data.items.length > 0 && (
            <span className='bg-primary/15 text-primary rounded-full px-2 py-0.5 text-xs font-bold'>
              {data.items.length}
            </span>
          )}
        </h2>
        {data.items.length > 0 && (
          <button
            type='button'
            onClick={clearAll}
            className='text-secondary hover:text-foreground text-xs font-medium transition-colors'
          >
            Clear all
          </button>
        )}
      </div>

      {data.items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Dummy tabs — visual only, not wired to the input yet */}
          <Tabs.Root
            value={data.betType}
            onValueChange={v =>
              setInput(input => ({
                ...input,
                betType: v as TicketType,
                systemSize: v === 'SYSTEM' && !input.systemSize ? 2 : input.systemSize,
              }))
            }
            className='px-5 pt-4'
          >
            <Tabs.List className='grid w-full grid-cols-3 gap-1 border border-white/5 p-1'>
              <Tabs.Trigger
                value='SINGLE'
                className='data-[state=active]:bg-primary hover:bg-dark-300 transition-colors data-[state=active]:text-black'
              >
                Singles
              </Tabs.Trigger>
              <Tabs.Trigger
                value='MULTIPLE'
                disabled={data.items.length < 2}
                className='data-[state=active]:bg-primary hover:bg-dark-300 transition-colors data-[state=active]:text-black'
              >
                Combi
              </Tabs.Trigger>
              <Tabs.Trigger
                value='SYSTEM'
                disabled={data.items.length < 3}
                className='data-[state=active]:bg-primary hover:bg-dark-300 transition-colors data-[state=active]:text-black'
              >
                System
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>

          {data.betType === 'SYSTEM' && !!input?.systemSize && input.systemSize >= 2 && (
            <div className='px-5 pt-2'>
              <Select
                value={String(input.systemSize)}
                onValueChange={v => setInput({ ...input, systemSize: Number(v) })}
              >
                <SelectTrigger size='sm' className='w-full'>
                  <SelectValue>
                    {input.systemSize} out of {data.items.length} (
                    {nCk(data.items.length, input.systemSize)} bets)
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {systemOptions.map(k => (
                    <SelectItem key={k} value={String(k)}>
                      {k} out of {data.items.length} ({nCk(data.items.length, k)} bets)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className='scrollbar-thumb-dark-300 min-h-30 flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-gutter-stable space-y-3 overflow-y-auto py-4 pr-2.5 pl-5'>
            {data.items.map(item => (
              <Tip
                key={item.outcomeId}
                item={item}
                showStake={data.betType === 'SINGLE'}
                stakeValue={singleStakes[item.outcomeId] ?? '10.00'}
                onStakeChange={value =>
                  setSingleStakes(prev => ({
                    ...prev,
                    [item.outcomeId]: value,
                  }))
                }
                onRemove={() => remove(item.outcomeId)}
              />
            ))}
          </div>

          {unavailable.size === 0 && <Separator />}

          {unavailable.size > 0 && (
            <div className='z-1 flex items-center gap-2 bg-red-500/10 p-3 px-6 text-red-400'>
              <AlertTriangleIcon className='size-4 shrink-0' />
              <p className='mr-auto text-xs'>
                {unavailable.size === 1 ? '1 invalid bet.' : `${unavailable.size} invalid bets.`}
              </p>
              <Button
                variant='ghost'
                size='icon-sm'
                className='-mx-2 size-6 rounded-full text-xs text-red-400 hover:bg-red-400/30 hover:text-white'
                onClick={() =>
                  setInput(prev => {
                    let { systemSize, betType, items } = prev
                    items = prev.items.filter(i => !unavailable.has(i.outcomeId))
                    if (systemSize && systemSize === items.length - 1) {
                      systemSize = items.length - 2
                      if (systemSize < 2) {
                        systemSize = null
                        betType = 'MULTIPLE'
                      }
                    }

                    if (items.length <= 2) betType = 'SINGLE'

                    return {
                      ...prev,
                      items,
                      systemSize,
                      betType,
                    }
                  })
                }
              >
                <XIcon />
              </Button>
            </div>
          )}

          <div className='space-y-4 px-5 py-4'>
            {data.betType !== 'SINGLE' && (
              <>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-secondary'>Combined odds</span>
                  <span className='font-mono font-semibold text-white'>
                    {Number(data.effectiveOdds).toFixed(2)}
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <span className='text-secondary shrink-0 text-sm'>Stake</span>
                  <InputGroup className='bg-dark flex-1 rounded-full'>
                    <InputGroupInput
                      type='number'
                      inputMode='decimal'
                      placeholder='Stake'
                      value={input.stake}
                      onFocus={e => e.target.select()}
                      onChange={e => {
                        const stake = e.target.value
                        if (/^\d*\.?\d{0,2}$/.test(stake)) setInput(prev => ({ ...prev, stake }))
                        // else setInput(prev => ({ ...prev, stake: Number(stake).toFixed(2) }))
                      }}
                      className='appearance-none text-right font-mono text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    />
                    <InputGroupAddon align='inline-end' className='text-xs'>
                      EUR
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* <div className='flex gap-2'>
                  {[5, 10, 25, 50].map(quick => (
                    <button
                      key={quick}
                      type='button'
                      onClick={() =>
                        setInput(prev => ({
                          ...prev,
                          stake: quick.toFixed(2),
                        }))
                      }
                      className='bg-dark hover:border-primary/40 flex-1 rounded-lg border border-white/10 py-1.5 text-xs text-gray-400 transition-colors hover:text-white'
                    >
                      €{quick}
                    </button>
                  ))}
                </div> */}

                <div className='bg-dark flex items-center justify-between rounded-xl border border-white/5 px-4 py-3'>
                  <span className='text-secondary text-sm'>Potential payout</span>
                  <span className='text-primary text-lg font-bold'>
                    {formatBalance(Number(data.potentialPayout) || 0)}
                  </span>
                </div>
              </>
            )}

            {data.betType === 'SINGLE' && (
              <div className='bg-dark flex items-center justify-between rounded-xl border border-white/5 px-4 py-3'>
                <span className='text-secondary text-sm'>Total stake</span>
                <span className='text-primary text-lg font-bold'>
                  {formatBalance(
                    Object.values(singleStakes).reduce((acc, v) => acc + (Number(v) || 0), 0) ||
                      data.items.length * 10
                  )}
                </span>
              </div>
            )}

            <button
              type='button'
              disabled={isPlacing || !data.placeable}
              onClick={handlePlace}
              className='group/button bg-primary hover:shadow-glow-lg text-primary-foreground relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-10 py-4 text-base font-bold tracking-wide uppercase transition-all duration-300 select-none disabled:pointer-events-none disabled:bg-neutral-400 disabled:text-neutral-700'
            >
              <div className='from-primary to-primary absolute inset-0 bg-linear-to-r via-white/30 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100' />
              <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full' />
              {isPlacing ? (
                <span className='relative'>
                  <Loader2Icon className='size-5 animate-spin' />
                  Placing bet...
                </span>
              ) : (
                <span className='relative'>
                  Place bet ·{' '}
                  {formatBalance(
                    data.betType === 'SINGLE'
                      ? Object.values(singleStakes).reduce((acc, v) => acc + (Number(v) || 0), 0) ||
                          data.items.length * 10
                      : Number(input.stake) || 0
                  )}
                </span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const getLabel = (eventName: string | null | undefined, key: string) => {
  const [home, away] = eventName?.split(' vs ') ?? []
  return key
    .replace('home', home ?? 'Home')
    .replace('away', away ?? 'Away')
    .replace('draw', 'Draw')
}

function Tip(props: {
  item: Tip$key
  showStake: boolean
  stakeValue: string
  onStakeChange: (v: string) => void
  onRemove: () => void
}) {
  const data = useFragment(
    graphql`
      fragment Tip on BetslipQuoteItem {
        outcomeId
        # eventId (will be used in the future for the jumping function)
        eventName
        marketName
        key
        price
        availability
      }
    `,
    props.item
  )

  const blocked = data.availability !== 'AVAILABLE'

  return (
    <div
      className={cn(
        'group relative rounded-xl border bg-black/20 p-3 transition-colors',
        blocked ? 'border-neutral-500/30 bg-neutral-500/5 opacity-80' : 'border-white/5'
      )}
    >
      <button
        type='button'
        onClick={props.onRemove}
        aria-label='Remove selection'
        className='text-secondary hover:bg-dark-300 absolute top-2 right-2 flex size-6 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100 hover:text-white'
      >
        <XIcon className='size-3.5' />
      </button>

      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0 pr-1'>
          <p
            className={cn(
              'truncate text-sm font-bold',
              blocked ? 'text-secondary line-through' : 'text-primary'
            )}
          >
            {getLabel(data.eventName, data.key) ?? '—'}
          </p>
          <p className='truncate text-xs font-medium text-white/80'>{data.marketName ?? '—'}</p>
          <p className='text-secondary truncate text-[0.7rem]'>{data.eventName ?? '—'}</p>
        </div>

        <div className='flex shrink-0 flex-col items-end self-center pt-0.5'>
          <span className='flex items-center gap-1 font-mono text-base font-semibold text-white'>
            <TrendingUpIcon className='size-3 opacity-0' />
            {data.price ? (
              Number(data.price).toFixed(2)
            ) : (
              <LockKeyhole className='text-secondary size-4' />
            )}
          </span>
        </div>
      </div>

      {blocked && (
        <p className='mt-2 flex items-center gap-1.5 text-xs text-red-400'>
          <AlertTriangleIcon className='size-3.5' />
          {blockerCopy(data.availability)}
        </p>
      )}

      {/* Per-item stake — dummy for now, mirrors the old mock UI. Will feed
          into a real per-item field once the schema supports it. */}
      {!blocked && props.showStake && (
        <div className='mt-2 flex items-center gap-2 border-t border-white/5 pt-2'>
          <span className='text-secondary text-xs'>Stake</span>
          <InputGroup className='bg-dark flex-1 rounded-full'>
            <InputGroupInput
              type='number'
              placeholder='0'
              value={props.stakeValue}
              onFocus={e => e.target.select()}
              onChange={e => props.onStakeChange(e.target.value)}
              className='appearance-none text-right font-mono text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            />
            <InputGroupAddon align='inline-end' className='text-xs'>
              EUR
            </InputGroupAddon>
          </InputGroup>
          <span className='text-primary w-20 shrink-0 text-right text-xs font-semibold'>
            → {formatBalance((Number(props.stakeValue) || 0) * (Number(data.price) || 0))}
          </span>
        </div>
      )}
    </div>
  )
}

function blockerCopy(availability: string) {
  switch (availability) {
    case 'SUSPENDED':
      return 'Market suspended.'
    case 'CUTOFF_PASSED':
      return 'Event started.'
    case 'DUPLICATE_EVENT':
      return 'One combi bet per event.'
    case 'EVENT_NOT_BETTABLE':
      return 'Event not bettable.'
    case 'NOT_FOUND':
      return 'Bet not found.'
    default:
      return 'Bet unavailable.'
  }
}

function EmptyState() {
  return (
    <div className='text-secondary flex h-96.25 flex-col items-center justify-center gap-3 px-6 text-center'>
      <div className='bg-dark flex size-14 items-center justify-center rounded-full border border-white/5'>
        <PiTicket className='size-6 opacity-40' />
      </div>
      <p className='text-sm'>Your betslip is empty</p>
      <p className='max-w-50 text-xs opacity-60'>
        Tap on any odds to add a selection and start building your bet.
      </p>
    </div>
  )
}

function PlacedState(props: { onNewBet: () => void }) {
  return (
    <div className='bg-dark-200 sticky top-26.25 flex max-h-[calc(100dvh-7rem)] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/5 px-6 py-16 text-center'>
      <div className='bg-primary/15 flex size-14 items-center justify-center rounded-full'>
        <TicketIcon className='text-primary size-6' />
      </div>
      <div>
        <p className='font-semibold text-white'>Bet placed!</p>
        <p className='text-secondary mt-1 text-xs'>Good luck — track it under My Bets.</p>
      </div>
      <Button variant='outline' onClick={props.onNewBet} className='mt-2'>
        Place another bet
      </Button>
    </div>
  )
}

export function BetslipMobileBar(props: { query: BetslipMobileBar$key | null }) {
  const data = useFragment(
    graphql`
      fragment BetslipMobileBar on BetslipQuote {
        effectiveOdds
        items {
          # eslint-disable-next-line relay/unused-fields
          id
        }
      }
    `,
    props.query
  )
  const setOpen = useSetAtom(betslipOpenAtom)

  if (!data || data.items.length === 0) return null

  return (
    <button
      type='button'
      onClick={() => setOpen(true)}
      className='bg-primary text-primary-foreground fixed inset-x-4 bottom-24 z-40 flex items-center justify-between rounded-full px-5 py-3.5 shadow-lg lg:bottom-4 xl:hidden'
    >
      <span className='flex items-center gap-2 text-sm font-bold'>
        <TicketIcon className='size-4' />
        {data.items.length} {data.items.length === 1 ? 'Selection' : 'Selections'}
      </span>
      <span className='flex items-center gap-1 text-sm font-bold'>
        {Number(data.effectiveOdds).toFixed(2)}
        <ChevronDownIcon className='size-4 rotate-180' />
      </span>
    </button>
  )
}

// ---------------------------------------------------------------------------
// Mobile/tablet: drawer housing the full Betslip, opened via the FAB above.
// Anchors to the bottom on narrow screens, to the right from `sm` up.
// ---------------------------------------------------------------------------
export function BetslipDrawer(props: { query: Betslip$key | null }) {
  const [open, setOpen] = useAtom(betslipOpenAtom)
  const isWiderThanMobile = useMediaQuery('(min-width: 640px)')
  const direction = isWiderThanMobile ? 'right' : 'bottom'

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction={direction}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 z-50 bg-black/50' />
        <Drawer.Content
          className={cn(
            'bg-dark-200 fixed z-50 flex flex-col outline-none',
            direction === 'bottom' && 'inset-x-0 bottom-0 max-h-[85dvh]',
            direction === 'right' && 'inset-y-0 right-0 h-full w-full max-w-sm'
          )}
        >
          {/* grabber handle, bottom sheet only */}
          {direction === 'bottom' && (
            <div className='mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-white/20' />
          )}
          <Betslip query={props.query} variant='drawer' />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
