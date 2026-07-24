'use client'

import { cx } from 'class-variance-authority'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  Loader2Icon,
  TicketIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  XIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { PiTicket } from 'react-icons/pi'
import { mockBetslipSelections } from '@/components/mock.betslip'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import * as Tabs from '@/components/ui/tabs'
import { cn, formatBalance } from '@/lib/utils'
import type { BetslipItemAvailability, TicketType } from '@/types'

/**
 * ---------------------------------------------------------------------------
 * Local selection model
 * ---------------------------------------------------------------------------
 * This mirrors `BetslipQuoteItem` from the schema (relay/schema.gql) closely
 * enough to swap in the real `betslipQuote` query later — `outcomeId` is the
 * only thing the server strictly needs; everything else is a client-side
 * snapshot for instant paint before the quote round-trips.
 */
export interface BetslipSelection {
  outcomeId: string
  eventId: string
  eventName: string
  marketName: string
  /** Maps 1:1 to `BetslipQuoteItem.outcomeName` — already "Home"/"Draw"/"Away"/"Over 2.5"/etc per the API's own naming, never a team name we'd have to derive */
  outcomeName: string
  /**
   * Not part of `BetslipQuoteItem` — sourced separately per-eventId from the
   * `eventStateUpdated` subscription (homeScore/awayScore) once an event
   * goes LIVE. Always optional: the row renders identically whether this
   * is present or not, so there's no special-casing needed once the real
   * subscription is wired in.
   */
  liveScore?: { home: number; away: number }
  /** Price the player saw when adding — compared against `currentPrice` for the change indicator */
  addedPrice: number
  currentPrice: number
  availability: BetslipItemAvailability
}

// ---------------------------------------------------------------------------
// Shared client state — same pattern as `selectedMarketsState` in list-view-markets.tsx
// ---------------------------------------------------------------------------
export const betslipSelectionsAtom = atom<BetslipSelection[]>(mockBetslipSelections)
export const betslipOpenAtom = atom(false)

export function useAddSelection() {
  const setSelections = useSetAtom(betslipSelectionsAtom)
  const setOpen = useSetAtom(betslipOpenAtom)

  return (selection: BetslipSelection) => {
    setSelections(prev => {
      // one selection per market's event is typical for combo validity,
      // but we keep it permissive here — server-side `betslipQuote` is the
      // real source of truth for DUPLICATE_EVENT / blockers.
      const withoutSame = prev.filter(s => s.outcomeId !== selection.outcomeId)
      return [...withoutSame, selection]
    })
    setOpen(true)
  }
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function Betslip() {
  const [selections, setSelections] = useAtom(betslipSelectionsAtom)
  const [betType, setBetType] = useState<TicketType>('SINGLE')
  const [stake, setStake] = useState('10.00')
  const [singleStakes, setSingleStakes] = useState<Record<string, string>>({})
  const [isPlacing, setIsPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)

  const remove = (outcomeId: string) =>
    setSelections(prev => prev.filter(s => s.outcomeId !== outcomeId))

  const clearAll = () => setSelections([])

  const blockers = useMemo(
    () =>
      selections.filter(s => s.availability !== 'AVAILABLE') as (BetslipSelection & {
        availability: Exclude<BetslipItemAvailability, 'AVAILABLE'>
      })[],
    [selections]
  )

  const priceChanged = selections.filter(
    s => s.availability === 'AVAILABLE' && s.currentPrice !== s.addedPrice
  )

  const combinedOdds = selections
    .filter(s => s.availability === 'AVAILABLE')
    .reduce((acc, s) => acc * s.currentPrice, 1)

  const numericStake = Number(stake) || 0
  const potentialPayout =
    betType === 'MULTIPLE' ? numericStake * combinedOdds : numericStake * combinedOdds // system stubbed same for now

  const placeable = selections.length > 0 && blockers.length === 0 && numericStake > 0

  const handlePlace = () => {
    setIsPlacing(true)
    // TODO: wire to `placeBet` mutation — items: selections.map(s => ({
    //   outcomeId: s.outcomeId, expectedPrice: String(s.currentPrice) }))
    setTimeout(() => {
      setIsPlacing(false)
      setPlaced(true)
    }, 900)
  }

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
    <div className='bg-dark-200 sticky top-26.25 flex max-h-[calc(100dvh-8rem)] w-full shrink flex-col self-start overflow-hidden rounded-2xl border border-white/5'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-white/5 px-5 py-4'>
        <h2 className='flex items-center gap-2 text-sm font-semibold tracking-wide text-white uppercase'>
          <TicketIcon className='text-primary size-4' />
          Betslip
          {selections.length > 0 && (
            <span className='bg-primary/15 text-primary rounded-full px-2 py-0.5 text-xs font-bold'>
              {selections.length}
            </span>
          )}
        </h2>
        {selections.length > 0 && (
          <button
            type='button'
            onClick={clearAll}
            className='text-secondary hover:text-foreground text-xs font-medium transition-colors'
          >
            Clear all
          </button>
        )}
      </div>

      {selections.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Bet type tabs */}
          <Tabs.Root
            value={betType}
            onValueChange={v => setBetType(v as TicketType)}
            className='px-5 pt-4'
          >
            <Tabs.List className='grid w-full grid-cols-3 border border-white/5 p-1'>
              <Tabs.Trigger
                value='SINGLE'
                className='data-[state=active]:bg-primary data-[state=active]:text-black'
              >
                Singles
              </Tabs.Trigger>
              <Tabs.Trigger
                value='MULTIPLE'
                disabled={selections.length < 2}
                className='data-[state=active]:bg-primary data-[state=active]:text-black'
              >
                Combi
              </Tabs.Trigger>
              <Tabs.Trigger
                value='SYSTEM'
                disabled={selections.length < 3}
                className='data-[state=active]:bg-primary data-[state=active]:text-black'
              >
                System
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>

          {/* Selections list */}
          <div className='scrollbar-thumb-dark-300 flex-1 scrollbar-thin scrollbar-track-transparent space-y-3 overflow-y-auto px-5 py-4'>
            {selections.map(selection => (
              <Tip
                key={selection.outcomeId}
                selection={selection}
                stakeValue={singleStakes[selection.outcomeId] ?? '10.00'}
                showStake={betType === 'SINGLE'}
                onStakeChange={value =>
                  setSingleStakes(prev => ({
                    ...prev,
                    [selection.outcomeId]: value,
                  }))
                }
                onRemove={() => remove(selection.outcomeId)}
              />
            ))}
          </div>

          {blockers.length === 0 && priceChanged.length === 0 && <Separator />}

          {/* Blockers / notices */}
          {blockers.length > 0 && (
            <div className='z-1 flex items-center gap-2 bg-red-500/10 p-3 px-6 text-red-400'>
              <AlertTriangleIcon className='size-4 shrink-0' />
              <p className='mr-auto text-xs'>
                {blockers.length === 1 ? '1 invalid bet.' : `${blockers.length} invalid bets.`}
              </p>
              <Button
                variant='ghost'
                size='icon-sm'
                className='-mx-2 size-6 rounded-full text-xs text-red-400 hover:bg-red-400/30 hover:text-white'
                onClick={() => setSelections(a => a.filter(e => e.availability === 'AVAILABLE'))}
              >
                <XIcon />
              </Button>
            </div>
          )}
          {blockers.length === 0 && priceChanged.length > 0 && (
            <div className='z-1 flex items-center gap-2 bg-yellow-500/10 p-3 px-6 text-yellow-400'>
              <TrendingUpIcon className='size-4 shrink-0' />
              <p className='truncate text-xs'>
                {priceChanged.length === 1
                  ? '1 odd change.'
                  : `${priceChanged.length} odds changes.`}
              </p>
              <Button
                variant='outline'
                size='sm'
                className='ml-auto h-6 shrink-0 px-2 text-[0.7rem]'
                onClick={() => setSelections(a => a.filter(e => e.addedPrice === e.currentPrice))}
              >
                Reject
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='h-6 shrink-0 px-2 text-[0.7rem]'
                onClick={() => setSelections(a => a.filter(e => e.addedPrice <= e.currentPrice))}
              >
                Keep higher
              </Button>
            </div>
          )}

          {/* Summary + stake + CTA */}
          <div className='space-y-4 px-5 py-4'>
            {betType !== 'SINGLE' && (
              <>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-secondary'>Combined odds</span>
                  <span className='font-mono font-semibold text-white'>
                    {combinedOdds.toFixed(2)}
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <span className='text-secondary shrink-0 text-sm'>Stake</span>
                  <InputGroup className='bg-dark flex-1 rounded-full'>
                    <InputGroupInput
                      type='number'
                      placeholder='Stake'
                      value={stake}
                      onFocus={e => e.target.select()}
                      onChange={e => setStake(e.target.value)}
                      className='appearance-none text-right font-mono text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    />

                    <InputGroupAddon align='inline-end' className='text-xs'>
                      EUR
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <div className='flex gap-2'>
                  {[5, 10, 25, 50].map(quick => (
                    <button
                      key={quick}
                      type='button'
                      onClick={() => setStake(quick.toFixed(2))}
                      className='bg-dark hover:border-primary/40 flex-1 rounded-lg border border-white/10 py-1.5 text-xs text-gray-400 transition-colors hover:text-white'
                    >
                      €{quick}
                    </button>
                  ))}
                </div>

                <div className='bg-dark flex items-center justify-between rounded-xl border border-white/5 px-4 py-3'>
                  <span className='text-secondary text-sm'>Potential payout</span>
                  <span className='text-primary text-lg font-bold'>
                    {formatBalance(potentialPayout || 0)}
                  </span>
                </div>
              </>
            )}

            {betType === 'SINGLE' && (
              <div className='bg-dark flex items-center justify-between rounded-xl border border-white/5 px-4 py-3'>
                <span className='text-secondary text-sm'>Total stake</span>
                <span className='text-primary text-lg font-bold'>
                  {formatBalance(
                    Object.values(singleStakes).reduce((acc, v) => acc + (Number(v) || 0), 0) ||
                      selections.length * 10
                  )}
                </span>
              </div>
            )}

            <button
              type='button'
              disabled={isPlacing || !placeable}
              onClick={handlePlace}
              className='group/button bg-primary hover:shadow-glow-lg text-primary-foreground relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-10 py-4 text-base font-bold tracking-wide uppercase transition-all duration-300 select-none disabled:pointer-events-none disabled:bg-neutral-400 disabled:text-neutral-700'
            >
              <div className='from-primary to-primary absolute inset-0 bg-linear-to-r via-white/30 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100' />
              <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full' />
              {isPlacing ? (
                <>
                  <Loader2Icon className='size-5 animate-spin' />
                  Placing bet...
                </>
              ) : (
                `Place bet · ${formatBalance(betType === 'SINGLE' ? Object.values(singleStakes).reduce((acc, v) => acc + (Number(v) || 0), 0) || selections.length * 10 : numericStake)}`
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Selection row
// ---------------------------------------------------------------------------
function Tip(props: {
  selection: BetslipSelection
  stakeValue: string
  showStake: boolean
  onStakeChange: (v: string) => void
  onRemove: () => void
}) {
  const { selection: s } = props
  const blocked = s.availability !== 'AVAILABLE'
  const priceUp = s.currentPrice > s.addedPrice
  const priceDown = s.currentPrice < s.addedPrice

  return (
    <div
      className={cn(
        'group relative rounded-xl border bg-black/20 p-3 transition-colors',
        blocked ? 'border-red-500/30 bg-red-500/5' : 'border-white/5'
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
          {/*
            Outcome name carries the highlight — bold + primary-tinted while
            available (same "this is your pick" signal as the selected odds
            toggle, just via color instead of a glowbox on every row), and
            greyed + struck through the moment it's blocked. Market sits
            directly below at clearly-secondary-but-still-legible weight;
            event (+ live score, inline, only when present) is the smallest
            line — matches how every one of the reference sportsbooks
            orders this, and needs nothing beyond outcomeName/marketName/
            eventName, all of which are real BetslipQuoteItem fields.
          */}
          <p
            className={cn(
              'truncate text-sm font-bold',
              blocked ? 'text-secondary line-through' : 'text-primary'
            )}
          >
            {s.outcomeName}
          </p>
          <p className='truncate text-xs font-medium text-white/80'>{s.marketName}</p>
          <p className='text-secondary truncate text-[0.7rem]'>
            {s.liveScore && (
              <span className='mr-1.5 font-bold text-red-400 uppercase'>
                {s.liveScore.home}-{s.liveScore.away}
              </span>
            )}
            {s.eventName}
          </p>
        </div>

        <div className='flex shrink-0 flex-col items-end self-center pt-0.5'>
          <span
            className={cx('flex items-center gap-1 font-mono text-base font-semibold', {
              // sky/red mirror the CREDIT/DEBIT convention already used in
              // transactions-table.tsx — kept distinct from `text-primary`
              // (lime), which the outcome name above is now using, so the
              // two don't collide.
              'text-sky-400': priceUp,
              'text-red-400': priceDown,
              'text-white': !priceUp && !priceDown,
            })}
          >
            {priceUp && <TrendingUpIcon className='size-3' />}
            {priceDown && <TrendingDownIcon className='size-3' />}
            {s.currentPrice.toFixed(2)}
          </span>
          {(priceUp || priceDown) && (
            <span className='text-secondary text-[0.65rem] line-through'>
              {s.addedPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {blocked && (
        <p className='mt-2 flex items-center gap-1.5 text-xs text-red-400'>
          <AlertTriangleIcon className='size-3.5' />
          {blockerCopy(s.availability)}
        </p>
      )}

      {!blocked && props.showStake && (
        <div className='mt-2 flex items-center gap-2 border-t border-white/5 pt-2'>
          <InputGroup className='bg-dark flex-1 rounded-full'>
            <InputGroupInput
              type='number'
              placeholder='Stake'
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
            → {formatBalance((Number(props.stakeValue) || 0) * s.currentPrice)}
          </span>
        </div>
      )}
    </div>
  )
}

function blockerCopy(availability: BetslipItemAvailability) {
  switch (availability) {
    case 'AVAILABLE':
      return null
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

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function EmptyState() {
  return (
    <div className='text-secondary flex flex-col items-center justify-center gap-3 px-6 py-16 text-center'>
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

// ---------------------------------------------------------------------------
// Placed state
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Mobile: collapsed bar + drawer trigger (for the mobile bottom sheet variant)
// ---------------------------------------------------------------------------
export function BetslipMobileBar() {
  const selections = useAtomValue(betslipSelectionsAtom)
  const setOpen = useSetAtom(betslipOpenAtom)

  if (selections.length === 0) return null

  const combinedOdds = selections.reduce((acc, s) => acc * s.currentPrice, 1)

  return (
    <button
      type='button'
      onClick={() => setOpen(true)}
      className='bg-primary text-primary-foreground fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full px-5 py-3.5 shadow-lg xl:hidden'
    >
      <span className='flex items-center gap-2 text-sm font-bold'>
        <TicketIcon className='size-4' />
        {selections.length} {selections.length === 1 ? 'Selection' : 'Selections'}
      </span>
      <span className='flex items-center gap-1 text-sm font-bold'>
        {combinedOdds.toFixed(2)}
        <ChevronDownIcon className='size-4 rotate-180' />
      </span>
    </button>
  )
}
