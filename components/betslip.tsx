'use client'

import { useAtom, useSetAtom } from 'jotai'
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  HistoryIcon,
  Loader2Icon,
  LockKeyhole,
  TicketIcon,
  TrendingUpIcon,
  XIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { VisuallyHidden } from 'radix-ui'
import { useRef, useState } from 'react'
import { PiTicket, PiTrash } from 'react-icons/pi'
import { graphql, useFragment, useMutation } from 'react-relay'
import { Drawer } from 'vaul'
import type { Betslip$key } from '@/components/__generated__/Betslip.graphql'
import type { BetslipMobileBar$key } from '@/components/__generated__/BetslipMobileBar.graphql'
import type { BetslipPlaceBetMutation } from '@/components/__generated__/BetslipPlaceBetMutation.graphql'
import type { Tip$key } from '@/components/__generated__/Tip.graphql'
import MyTickets from '@/components/my-tickets'
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
import { useT } from '@/context/providers'
import { cn, formatBalance, nCk } from '@/lib/utils'
import type { PriceChange, TicketType } from '@/types'

type MainTab = 'betslip' | 'tickets'

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
          price
          ...Tip
        }
      }
    `,
    props.query
  )

  const [input, setInput] = useAtom(betslipInputAtom)
  const t = useT()

  const [mainTab, setMainTab] = useState<MainTab>('betslip')
  const [placed, setPlaced] = useState<{
    id: string
    stake: string
    potentialPayout: string | null
  } | null>(null)
  const [placeError, setPlaceError] = useState<string | null>(null)
  const [priceChanges, setPriceChanges] = useState<PriceChange[] | null>(null)
  const priceChangeMap = new Map((priceChanges ?? []).map(c => [c.outcomeId, c]))
  const [ticketsKey, setTicketsKey] = useState(0)

  const [singleStakes, setSingleStakes] = useState<Record<string, string>>({})

  const clientRequestId = useRef<string>(crypto.randomUUID())

  const [commitPlaceBet, isPlacing] = useMutation<BetslipPlaceBetMutation>(graphql`
    mutation BetslipPlaceBetMutation($input: PlaceBetInput!) {
      placeBet(input: $input) {
        ticket {
          id
          status
          stake
          potentialPayout
        }
        rejection {
          code
          message
          priceChanges {
            outcomeId
            expectedPrice
            currentPrice
          }
        }
      }
    }
  `)

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
    (data?.items ?? []).filter(i => i.availability !== 'AVAILABLE').map(i => i.outcomeId)
  )

  const handlePlace = () => {
    if (!data) return
    setPlaceError(null)
    setPriceChanges(null)

    const items = data.items
      .filter(i => i.availability === 'AVAILABLE')
      .map(i => ({
        outcomeId: i.outcomeId,
        expectedPrice: i.price,
        stake: data.betType === 'SINGLE' ? (singleStakes[i.outcomeId] ?? '10.00') : undefined,
      }))

    commitPlaceBet({
      variables: {
        input: {
          betType: data.betType,
          items,
          stake: input.stake || '0',
          systemSize: input.systemSize ?? null,
          clientRequestId: clientRequestId.current,
          oddsPolicy: 'REJECT',
        },
      },
      onCompleted: response => {
        if (response.placeBet.rejection) {
          const { code, message, priceChanges: changes } = response.placeBet.rejection
          if (code === 'PRICE_CHANGED' && changes?.length) {
            setPriceChanges([...changes])
            setPlaceError(null)
          } else {
            setPlaceError(message)
            setPriceChanges(null)
          }
          return
        }
        if (response.placeBet.ticket) {
          setPlaced({
            id: response.placeBet.ticket.id,
            stake: response.placeBet.ticket.stake,
            potentialPayout: response.placeBet.ticket.potentialPayout,
          })
          setTicketsKey(k => k + 1)
        }
      },
      onError: error => {
        setPlaceError(error.message || t('Failed to place bet. Please try again.'))
        setPriceChanges(null)
      },
    })
  }

  const handleKeepHigher = () => {
    if (!priceChanges) return

    const droppedIds = new Set(
      priceChanges
        .filter(c => Number(c.currentPrice) < Number(c.expectedPrice))
        .map(c => c.outcomeId)
    )

    if (droppedIds.size > 0) {
      setInput(prev => {
        let { systemSize, betType } = prev
        const items = prev.items.filter(i => !droppedIds.has(i.outcomeId))

        if (systemSize && systemSize > items.length - 1) {
          systemSize = items.length - 2
          if (systemSize < 2) {
            systemSize = null
            betType = 'MULTIPLE'
          }
        }
        if (items.length <= 2) betType = 'SINGLE'

        return { ...prev, items, systemSize, betType }
      })
    }

    // Prices that went up are already reflected live via data.items[].price
    // (fed by the betslipUpdated subscription) — nothing to reconcile there,
    // just clear the banner so the user can review and press Place bet again.
    setPriceChanges(null)
  }

  const startNewBet = () => {
    clientRequestId.current = crypto.randomUUID()
    setPlaced(null)
    setPlaceError(null)
    clearAll()
  }

  const systemOptions = data ? Array.from({ length: data.items.length - 2 }, (_, i) => i + 2) : []

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
        <div className='flex items-center gap-1'>
          <MainTabButton
            active={mainTab === 'betslip'}
            onClick={() => setMainTab('betslip')}
            icon={<TicketIcon className='size-4' />}
            label={t('Betslip')}
            // count={data?.items.length}
          />
          <MainTabButton
            active={mainTab === 'tickets'}
            onClick={() => setMainTab('tickets')}
            icon={<HistoryIcon className='size-4' />}
            label={t('My Tickets')}
          />
        </div>
        <AnimatePresence>
          {mainTab === 'betslip' && !!data?.items.length && !placed && (
            <motion.button
              type='button'
              onClick={clearAll}
              className='text-secondary hover:text-foreground mr-2 transition-colors'
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                  mass: 0.5,
                },
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: {
                  duration: 0.1,
                  ease: 'easeIn',
                },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <PiTrash />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {mainTab === 'tickets' ? (
        <MyTickets key={ticketsKey} />
      ) : placed ? (
        <PlacedState
          ticket={placed}
          onNewBet={startNewBet}
          onViewTickets={() => setMainTab('tickets')}
        />
      ) : !data || input.items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='scrollbar-hide flex flex-1 flex-col overflow-auto'>
          <Tabs.Root
            value={data.betType}
            onValueChange={v =>
              setInput(i => ({
                ...i,
                betType: v as TicketType,
                systemSize: v === 'SYSTEM' && !i.systemSize ? 2 : i.systemSize,
              }))
            }
            className='px-5 pt-4'
          >
            <Tabs.List className='grid w-full grid-cols-3 gap-1 border border-white/5 p-1'>
              <Tabs.Trigger
                value='SINGLE'
                className='data-[state=active]:bg-primary hover:bg-dark-300 transition-colors data-[state=active]:text-black'
              >
                {t('Singles')}
              </Tabs.Trigger>
              <Tabs.Trigger
                value='MULTIPLE'
                disabled={data.items.length < 2}
                className='data-[state=active]:bg-primary hover:bg-dark-300 transition-colors data-[state=active]:text-black'
              >
                {t('Combi')}
              </Tabs.Trigger>
              <Tabs.Trigger
                value='SYSTEM'
                disabled={data.items.length < 3}
                className='data-[state=active]:bg-primary hover:bg-dark-300 transition-colors data-[state=active]:text-black'
              >
                {t('System')}
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
                    {t('{k} out of {n} ({b} bets)', {
                      k: input.systemSize,
                      n: data.items.length,
                      b: nCk(data.items.length, input.systemSize),
                    })}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {systemOptions.map(k => (
                    <SelectItem key={k} value={String(k)}>
                      {t('{k} out of {n} ({b} bets)', {
                        k,
                        n: data.items.length,
                        b: nCk(data.items.length, k),
                      })}
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
                priceChange={priceChangeMap.get(item.outcomeId)}
                showStake={data.betType === 'SINGLE'}
                stakeValue={singleStakes[item.outcomeId] ?? '10.00'}
                onStakeChange={value =>
                  setSingleStakes(prev => ({ ...prev, [item.outcomeId]: value }))
                }
                onRemove={() => remove(item.outcomeId)}
              />
            ))}
          </div>

          {unavailable.size === 0 && placeError === null && <Separator />}

          {unavailable.size > 0 && (
            <div className='z-1 flex items-center gap-2 bg-red-500/10 p-3 px-6 text-red-400'>
              <AlertTriangleIcon className='size-4 shrink-0' />
              <p className='mr-auto text-xs'>
                {unavailable.size === 1
                  ? t('1 invalid bet.')
                  : t('{n} invalid bets.', { n: unavailable.size })}
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

          {placeError && (
            <div className='z-1 flex items-start gap-2 bg-red-500/10 p-3 px-6 text-red-400'>
              <AlertTriangleIcon className='mt-0.5 size-4 shrink-0' />
              <p className='text-xs'>{placeError}</p>
            </div>
          )}

          {priceChanges && (
            <div className='z-1 flex items-center gap-2 bg-yellow-500/10 p-3 px-6 text-yellow-400'>
              <TrendingUpIcon className='size-4 shrink-0' />
              <p className='mr-auto truncate text-xs'>
                {priceChanges.length === 1
                  ? t('1 odd change.')
                  : t('{n} odds changes.', { n: priceChanges.length })}
              </p>
              <Button
                variant='outline'
                size='sm'
                className='h-6 shrink-0 px-2 text-[0.7rem]'
                onClick={() => setPriceChanges(null)}
              >
                {t('Reject')}
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='h-6 shrink-0 px-2 text-[0.7rem]'
                onClick={handleKeepHigher}
              >
                {t('Keep higher')}
              </Button>
            </div>
          )}

          <div className='space-y-4 px-5 py-4'>
            {data.betType !== 'SINGLE' && (
              <>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-secondary'>{t('Combined odds')}</span>
                  <span className='font-mono font-semibold text-white'>
                    {Number(data.effectiveOdds).toFixed(2)}
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <span className='text-secondary shrink-0 text-sm'>{t('Stake')}</span>
                  <InputGroup className='bg-dark flex-1 rounded-full'>
                    <InputGroupInput
                      type='number'
                      inputMode='decimal'
                      placeholder={t('Stake')}
                      value={input.stake}
                      onFocus={e => e.target.select()}
                      onChange={e => {
                        const stake = e.target.value
                        if (/^\d*\.?\d{0,2}$/.test(stake)) setInput(prev => ({ ...prev, stake }))
                      }}
                      className='appearance-none text-right font-mono text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    />
                    <InputGroupAddon align='inline-end' className='text-xs'>
                      EUR
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <div className='bg-dark flex items-center justify-between rounded-xl border border-white/5 px-4 py-3'>
                  <span className='text-secondary text-sm'>{t('Potential payout')}</span>
                  <span className='text-primary text-lg font-bold'>
                    {formatBalance(Number(data.potentialPayout) || 0)}
                  </span>
                </div>
              </>
            )}

            {data.betType === 'SINGLE' && (
              <div className='bg-dark flex items-center justify-between rounded-xl border border-white/5 px-4 py-3'>
                <span className='text-secondary text-sm'>{t('Total stake')}</span>
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
              disabled={isPlacing || !data.placeable || unavailable.size > 0}
              onClick={() => handlePlace()}
              className='group/button bg-primary hover:shadow-glow-lg text-primary-foreground relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-10 py-4 text-base font-bold tracking-wide uppercase transition-all duration-300 select-none disabled:pointer-events-none disabled:bg-neutral-400 disabled:text-neutral-700'
            >
              <div className='from-primary to-primary absolute inset-0 bg-linear-to-r via-white/30 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100' />
              <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full' />
              {isPlacing ? (
                <span className='relative flex items-center gap-2'>
                  <Loader2Icon className='size-5 animate-spin' />
                  {t('Placing bet...')}
                </span>
              ) : (
                <span className='relative'>
                  {t('Place bet')} ·{' '}
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
        </div>
      )}
    </div>
  )
}

function MainTabButton(props: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  count?: number
}) {
  return (
    <button
      type='button'
      onClick={props.onClick}
      className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-wide uppercase transition-colors',
        props.active ? 'bg-primary/10 text-primary' : 'text-secondary hover:text-foreground'
      )}
    >
      {props.icon}
      {props.label}
      {!!props.count && (
        <span className='bg-primary/15 text-primary rounded-full px-2 py-0.5 text-xs font-bold normal-case'>
          {props.count}
        </span>
      )}
    </button>
  )
}

function getLabel(
  eventName: string | null | undefined,
  key: string,
  t: (key: string, params?: Record<string, string | number>) => string
) {
  const [home, away] = eventName?.split(' vs ') ?? []
  return key
    .replace('home', home ?? t('Home'))
    .replace('away', away ?? t('Away'))
    .replace('draw', t('Draw'))
}

function Tip(props: {
  item: Tip$key
  priceChange?: { expectedPrice: string; currentPrice: string }
  showStake: boolean
  stakeValue: string
  onStakeChange: (v: string) => void
  onRemove: () => void
}) {
  const data = useFragment(
    graphql`
      fragment Tip on BetslipQuoteItem {
        outcomeId
        eventName
        marketName
        key
        price
        availability
      }
    `,
    props.item
  )
  const t = useT()
  const change = props.priceChange
  const up = change ? Number(change.currentPrice) > Number(change.expectedPrice) : false
  const blocked = data.availability !== 'AVAILABLE'

  const blockerCopy = (availability: string) => {
    switch (availability) {
      case 'SUSPENDED':
        return t('Market suspended.')
      case 'CUTOFF_PASSED':
        return t('Event started.')
      case 'DUPLICATE_EVENT':
        return t('One combi bet per event.')
      case 'EVENT_NOT_BETTABLE':
        return t('Event not bettable.')
      case 'NOT_FOUND':
        return t('Bet not found.')
      default:
        return t('Bet unavailable.')
    }
  }

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
        aria-label={t('Remove selection')}
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
            {getLabel(data.eventName, data.key, t) ?? '—'}
          </p>
          <p className='truncate text-xs font-medium text-white/80'>{data.marketName ?? '—'}</p>
          <p className='text-secondary truncate text-[0.7rem]'>{data.eventName ?? '—'}</p>
        </div>

        <div className='flex shrink-0 flex-col items-end self-center pt-0.5'>
          <span className='flex items-center gap-1 font-mono text-base font-semibold text-white'>
            {change ? (
              <span className='flex items-center gap-1'>
                <span className='text-secondary text-xs line-through'>
                  {Number(change.expectedPrice).toFixed(2)}
                </span>
                <TrendingUpIcon
                  className={cn('size-3', up ? 'text-primary' : 'rotate-90 text-red-400')}
                />
                <span className={up ? 'text-primary' : 'text-red-400'}>
                  {Number(change.currentPrice).toFixed(2)}
                </span>
              </span>
            ) : data.price ? (
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

      {!blocked && props.showStake && (
        <div className='mt-2 flex items-center gap-2 border-t border-white/5 pt-2'>
          <span className='text-secondary text-xs'>{t('Stake')}</span>
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

function EmptyState() {
  const t = useT()
  return (
    <div className='text-secondary flex h-96.25 flex-col items-center justify-center gap-3 px-6 text-center'>
      <div className='bg-dark flex size-14 items-center justify-center rounded-full border border-white/5'>
        <PiTicket className='size-6 opacity-40' />
      </div>
      <p className='text-sm'>{t('Your betslip is empty')}</p>
      <p className='max-w-50 text-xs opacity-60'>
        {t('Tap on any odds to add a selection and start building your bet.')}
      </p>
    </div>
  )
}

function PlacedState(props: {
  ticket: { id: string; stake: string; potentialPayout: string | null }
  onNewBet: () => void
  onViewTickets: () => void
}) {
  const t = useT()
  return (
    <div className='flex max-h-[calc(100dvh-7rem)] w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 py-16 text-center'>
      <div className='bg-primary/15 flex size-14 items-center justify-center rounded-full'>
        <TicketIcon className='text-primary size-6' />
      </div>
      <div>
        <p className='font-semibold text-white'>{t('Bet placed!')}</p>
        <p className='text-secondary mt-1 text-xs'>{t('Good luck — track it under My Tickets.')}</p>
      </div>
      {props.ticket.potentialPayout && (
        <div className='bg-dark flex w-full max-w-60 items-center justify-between rounded-xl border border-white/5 px-4 py-3'>
          <span className='text-secondary text-sm'>{t('Potential payout')}</span>
          <span className='text-primary text-lg font-bold'>
            {formatBalance(Number(props.ticket.potentialPayout))}
          </span>
        </div>
      )}
      <div className='mt-2 flex gap-2'>
        <Button variant='outline' onClick={props.onNewBet}>
          {t('Place another bet')}
        </Button>
        <Button onClick={props.onViewTickets}>{t('My Tickets')}</Button>
      </div>
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
  const t = useT()

  if (!data || data.items.length === 0) return null

  return (
    <button
      type='button'
      onClick={() => setOpen(true)}
      className='bg-primary text-primary-foreground fixed inset-x-4 bottom-24 z-40 flex items-center justify-between rounded-full px-5 py-3.5 shadow-lg lg:bottom-4 xl:hidden'
    >
      <span className='flex items-center gap-2 text-sm font-bold'>
        <TicketIcon className='size-4' />
        {t('{n} {selection}', {
          n: data.items.length,
          selection: data.items.length === 1 ? t('Selection') : t('Selections'),
        })}
      </span>
      <span className='flex items-center gap-1 text-sm font-bold'>
        {Number(data.effectiveOdds).toFixed(2)}
        <ChevronDownIcon className='size-4 rotate-180' />
      </span>
    </button>
  )
}

export function BetslipDrawer(props: { query: Betslip$key | null }) {
  const [open, setOpen] = useAtom(betslipOpenAtom)
  const isWiderThanMobile = useMediaQuery('(min-width: 640px)')
  const direction = isWiderThanMobile ? 'right' : 'bottom'
  const t = useT()

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
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root>
            <Drawer.Title>{t('Betslip')}</Drawer.Title>
          </VisuallyHidden.Root>
          {direction === 'bottom' && (
            <div className='mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-white/20' />
          )}
          <Betslip query={props.query} variant='drawer' />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
