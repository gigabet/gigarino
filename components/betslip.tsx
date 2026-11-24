'use client'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  ChevronsUpIcon,
  HistoryIcon,
  Loader2Icon,
  LockKeyhole,
  TicketIcon,
  TrendingUpIcon,
  XIcon,
} from 'lucide-react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Link from 'next/link'
import { VisuallyHidden } from 'radix-ui'
import { useEffect, useRef, useState } from 'react'
import { PiTicket, PiTrash } from 'react-icons/pi'
import { graphql, useFragment, useMutation } from 'react-relay'
import { Drawer } from 'vaul'
import { CountBadge } from '@/components/count-badge'
import { loginDialogOpenAtom } from '@/components/login-dialog'
import { BetslipTracker } from '@/components/match-tracker'
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
import { Skeleton } from '@/components/ui/skeleton'
import * as Tabs from '@/components/ui/tabs'
import {
  type ActiveBoost,
  betCodeCopy,
  betslipInputAtom,
  betslipOpenAtom,
  betslipTabAtom,
  boostAtom,
  dismissedPriceChangesAtom,
  oddsPolicyAtom,
  systemPoolSize,
  useActiveBoost,
  useBetslipPrices,
  useClearBetslip,
  useResetOddsPrompt,
  useSetDefaultStake,
  useSetLegStake,
  withBanker,
  withBetType,
  withoutItems,
} from '@/context/betslip'
import { useMediaQuery } from '@/context/hooks'
import { useBetslipQuote, useCurrency, useT, useUser } from '@/context/providers'
import { unseenResettlementsAtom } from '@/context/tickets'
import {
  translateOutcomeKey,
  translateOutcomeName,
  translateSuspensionReason,
} from '@/lib/api-names'
import { MARKET_NAME, splitMarketName } from '@/lib/sport-markets'
import { cn, formatBalance, nCk } from '@/lib/utils'
import type { Betslip$key } from '@/relay/__generated__/Betslip.graphql'
import type { BetslipBody$key } from '@/relay/__generated__/BetslipBody.graphql'
import type { BetslipFooter$key } from '@/relay/__generated__/BetslipFooter.graphql'
import type { BetslipMobileBar$key } from '@/relay/__generated__/BetslipMobileBar.graphql'
import type { BetslipPlaceBetMutation } from '@/relay/__generated__/BetslipPlaceBetMutation.graphql'
import type { BetTypeTabs$key, TicketType } from '@/relay/__generated__/BetTypeTabs.graphql'
import type { BlockersBanner$key } from '@/relay/__generated__/BlockersBanner.graphql'
import type { InvalidBetsBanner$key } from '@/relay/__generated__/InvalidBetsBanner.graphql'
import type { PriceChangesBanner$key } from '@/relay/__generated__/PriceChangesBanner.graphql'
import type { SelectionList$key } from '@/relay/__generated__/SelectionList.graphql'
import type { SystemSizeSelect$key } from '@/relay/__generated__/SystemSizeSelect.graphql'
import type { Tip$key } from '@/relay/__generated__/Tip.graphql'
import type { usePriceChanges$key } from '@/relay/__generated__/usePriceChanges.graphql'

type MainTab = 'betslip' | 'tickets'
type Placed = NonNullable<BetslipPlaceBetMutation['response']['placeBet']['ticket']>

/* -------------------------------------------------------------------------- */
/*  Root                                                                      */
/* -------------------------------------------------------------------------- */

export default function Betslip(props: {
  query: Betslip$key | null
  variant?: 'panel' | 'drawer'
  initialTab?: MainTab
}) {
  const data =
    useFragment(
      graphql`
        fragment Betslip on BetslipQuote {
          ...BetslipBody
          ...BetslipFooter
        }
      `,
      props.query
    ) ?? null

  const input = useAtomValue(betslipInputAtom)
  const resetOddsPrompt = useResetOddsPrompt()

  const [mainTab, setMainTab] = useState<MainTab>(props.initialTab ?? 'betslip')
  const [ticketsKey, setTicketsKey] = useState(0)
  const [placed, setPlaced] = useState<Placed | null>(null)

  const isEmpty = input.items.length === 0

  // an emptied slip starts over with the default odds policy
  useEffect(() => {
    if (isEmpty) resetOddsPrompt()
  }, [isEmpty, resetOddsPrompt])

  // `mainTab` and `placed` are this component's state, so the children report back through these
  const onPlaced = (ticket: Placed) => {
    setPlaced(ticket)
    setTicketsKey(k => k + 1) // remount My Tickets so the new ticket shows up
  }

  return (
    <div className='bg-dark-200 scrollbar-hide flex h-full min-h-0 w-full flex-col overflow-y-auto'>
      <BetslipTracker variant={props.variant === 'drawer' ? 'drawer' : 'panel'} />
      <BetslipHeader
        tab={mainTab}
        onTabChange={setMainTab}
        showClear={mainTab === 'betslip' && !isEmpty && !placed}
      />

      {mainTab === 'tickets' ? (
        <MyTickets key={ticketsKey} />
      ) : placed ? (
        <PlacedState
          ticket={placed}
          onNewBet={() => setPlaced(null)}
          onViewTickets={() => setMainTab('tickets')}
        />
      ) : isEmpty ? (
        <EmptyState />
      ) : !data ? (
        <BetslipBodySkeleton count={input.items.length} />
      ) : (
        <>
          <BetslipBody quoteRef={data} />
          <BetslipFooter quoteRef={data} onPlaced={onPlaced} />
        </>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */

function BetslipHeader(props: {
  tab: MainTab
  onTabChange: (tab: MainTab) => void
  showClear: boolean
}) {
  const t = useT()
  const unseen = useAtomValue(unseenResettlementsAtom)
  const clearBetslip = useClearBetslip()

  return (
    <div className='flex items-center justify-between border-b border-white/5 px-5 py-4'>
      <div className='flex items-center gap-1'>
        <MainTabButton
          active={props.tab === 'betslip'}
          onClick={() => props.onTabChange('betslip')}
          icon={<TicketIcon className='size-4' />}
          label={t('Betslip')}
        />
        <MainTabButton
          active={props.tab === 'tickets'}
          onClick={() => props.onTabChange('tickets')}
          icon={<HistoryIcon className='size-4' />}
          label={t('My Tickets')}
          count={unseen}
        />
      </div>
      <AnimatePresence initial={false}>
        {props.showClear && (
          <motion.button
            type='button'
            onClick={clearBetslip}
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
              transition: { duration: 0.1, ease: 'easeIn' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <PiTrash />
          </motion.button>
        )}
      </AnimatePresence>
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
      <CountBadge count={props.count ?? 0} />
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Body (active betslip with selections)                                     */
/* -------------------------------------------------------------------------- */

function BetslipBody(props: { quoteRef: BetslipBody$key }) {
  const data = useFragment(
    graphql`
      fragment BetslipBody on BetslipQuote {
        ...BetTypeTabs
        ...SystemSizeSelect
        ...InvalidBetsBanner
        ...PriceChangesBanner
        ...SelectionList
      }
    `,
    props.quoteRef
  )

  // tabs, actionable banners and tips; scrolls with the rail
  return (
    <div className='flex-1'>
      <BetTypeTabs quoteRef={data} />
      <SystemSizeSelect quoteRef={data} />

      {/* pinned while scrolling: these block placing, so they must stay visible */}
      <div className='bg-dark-200 sticky top-0 z-10 mt-2 empty:hidden'>
        <InvalidBetsBanner quoteRef={data} />
        <PriceChangesBanner quoteRef={data} />
      </div>

      <SelectionList quoteRef={data} />
    </div>
  )
}

export function BetslipRailSkeleton() {
  return (
    <div className='sticky top-20 flex h-[calc(100dvh-5rem)] flex-col overflow-hidden'>
      <div className='flex items-center gap-1 border-b border-white/5 px-5 py-4'>
        <Skeleton className='h-9 w-28 rounded-lg' />
        <Skeleton className='h-9 w-32 rounded-lg' />
      </div>
      <BetslipBodySkeleton count={2} />
    </div>
  )
}

function BetslipBodySkeleton(props: { count: number }) {
  return (
    <div className='flex flex-1 flex-col gap-3 px-5 py-4'>
      <Skeleton className='h-10 w-full rounded-lg' />
      {Array.from({ length: Math.min(props.count, 4) }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: identical
        <Skeleton key={i} className='h-14 w-full rounded-xl' />
      ))}
      <Skeleton className='mt-auto h-16 w-full rounded-xl' />
      <Skeleton className='h-11 w-full rounded-full' />
    </div>
  )
}

function BetTypeTabs(props: { quoteRef: BetTypeTabs$key }) {
  const data = useFragment(
    graphql`
      fragment BetTypeTabs on BetslipQuote {
        betType
        items {
          outcomeId
        }
      }
    `,
    props.quoteRef
  )
  const setInput = useSetAtom(betslipInputAtom)
  const t = useT()

  const triggerClass =
    'data-[state=active]:bg-primary hover:bg-dark-300 transition-colors data-[state=active]:text-black'

  return (
    <Tabs.Root
      value={data.betType}
      onValueChange={v => setInput(i => withBetType(i, v as TicketType))}
      className='px-5 pt-4'
    >
      <Tabs.List className='grid w-full grid-cols-3 gap-1 border border-white/5 p-1'>
        <Tabs.Trigger value='SINGLE' className={triggerClass}>
          {t('Singles')}
        </Tabs.Trigger>
        <Tabs.Trigger value='MULTIPLE' disabled={data.items.length < 2} className={triggerClass}>
          {t('Combi')}
        </Tabs.Trigger>
        <Tabs.Trigger value='SYSTEM' disabled={data.items.length < 3} className={triggerClass}>
          {t('System')}
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

function SystemSizeSelect(props: { quoteRef: SystemSizeSelect$key }) {
  const data = useFragment(
    graphql`
      fragment SystemSizeSelect on BetslipQuote {
        betType
      }
    `,
    props.quoteRef
  )
  const [input, setInput] = useAtom(betslipInputAtom)
  const t = useT()

  if (data.betType !== 'SYSTEM' || !input.systemSize || input.systemSize < 2) return null

  // bankers sit in every combination, so only the other selections are chosen "k out of n"
  const n = systemPoolSize(input)
  const label = (k: number) => t('{k} out of {n} ({b} bets)', { k, n, b: nCk(n, k) })
  const options = Array.from({ length: n - 2 }, (_, i) => i + 2)

  return (
    <div className='px-5 pt-2'>
      <Select
        value={String(input.systemSize)}
        onValueChange={v => setInput({ ...input, systemSize: Number(v) })}
      >
        <SelectTrigger size='sm' className='w-full'>
          <SelectValue>{label(input.systemSize)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map(k => (
            <SelectItem key={k} value={String(k)}>
              {label(k)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function SelectionList(props: { quoteRef: SelectionList$key }) {
  const data = useFragment(
    graphql`
      fragment SelectionList on BetslipQuote {
        items {
          outcomeId
          ...Tip
        }
      }
    `,
    props.quoteRef
  )

  return (
    <MotionConfig reducedMotion='user'>
      <div className='px-5 pt-2 pb-2.5'>
        <AnimatePresence>
          {data.items.map((item, i) => (
            <SlipPresence key={item.outcomeId} index={i}>
              <Tip item={item} />
            </SlipPresence>
          ))}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

/* -------------------------------------------------------------------------- */
/*  Banners (slim, one line where possible)                                   */
/* -------------------------------------------------------------------------- */

function InvalidBetsBanner(props: { quoteRef: InvalidBetsBanner$key }) {
  const { items } = useFragment(
    graphql`
      fragment InvalidBetsBanner on BetslipQuote {
        items {
          outcomeId
          availability
        }
      }
    `,
    props.quoteRef
  )
  const setInput = useSetAtom(betslipInputAtom)
  const t = useT()

  const unavailable = new Set(
    items.filter(i => i.availability !== 'AVAILABLE').map(i => i.outcomeId)
  )

  return (
    <AnimatePresence initial={false}>
      {unavailable.size > 0 && (
        <Collapse key='invalid'>
          <div className='flex items-center gap-2 bg-red-500/10 px-5 py-1.5 text-red-400'>
            <AlertTriangleIcon className='size-3.5 shrink-0' />
            <p className='mr-auto text-xs'>
              {unavailable.size === 1
                ? t('1 invalid bet.')
                : t('{n} invalid bets.', { n: unavailable.size })}
            </p>
            <Button
              variant='ghost'
              size='icon-sm'
              className='-mr-1 size-6 rounded-full text-xs text-red-400 hover:bg-red-400/30 hover:text-white'
              onClick={() => setInput(prev => withoutItems(prev, unavailable))}
            >
              <XIcon />
            </Button>
          </div>
        </Collapse>
      )}
    </AnimatePresence>
  )
}

function PlaceErrorBanner(props: { message: string | null }) {
  if (!props.message) return null

  return (
    <div className='flex items-start gap-2 bg-red-500/10 px-5 py-1.5 text-red-400'>
      <AlertTriangleIcon className='mt-0.5 size-3.5 shrink-0' />
      <p className='text-xs'>{props.message}</p>
    </div>
  )
}

function BlockersBanner(props: { quoteRef: BlockersBanner$key }) {
  const { blockers } = useFragment(
    graphql`
      fragment BlockersBanner on BetslipQuote {
        blockers
      }
    `,
    props.quoteRef
  )
  const t = useT()
  if (blockers.length === 0) return null

  return (
    <div className='flex items-center gap-2 bg-red-500/10 px-5 py-1.5 text-red-400'>
      <AlertTriangleIcon className='size-3.5 shrink-0' />
      <div className='mr-auto space-y-0.5 text-xs'>
        {[...new Set(blockers)].map(b => (
          <p key={b}>{betCodeCopy(b, t) ?? t('Bet unavailable.')}</p>
        ))}
      </div>
      {blockers.includes('INSUFFICIENT_FUNDS') && (
        <Link href='/user/wallet' className='shrink-0 text-xs underline'>
          {t('Deposit')}
        </Link>
      )}
    </div>
  )
}

/**
 * Odds changes: detection, the dismiss state and the price accept actions.
 *
 * Accepting also switches the odds policy sent with placeBet (ACCEPT_HIGHER / ACCEPT_ANY) so the
 * server does not reject the slip for a move the player already accepted. The policy lives until
 * the slip is empty or submitted. Used by the banner and by the footer (which blocks placing).
 */
function usePriceChanges(quoteRef: usePriceChanges$key) {
  const { items } = useFragment(
    graphql`
      fragment usePriceChanges on BetslipQuote {
        items {
          outcomeId
          price
          expectedPrice
          priceChanged
        }
      }
    `,
    quoteRef
  )
  const policy = useAtomValue(oddsPolicyAtom)
  const dismissedSig = useAtomValue(dismissedPriceChangesAtom)

  const changed = items.filter(i => i.priceChanged && i.price && i.expectedPrice)
  const higher = changed.filter(i => Number(i.price) > Number(i.expectedPrice))
  const lower = changed.filter(i => Number(i.price) < Number(i.expectedPrice))

  // moves the active policy already covers will be accepted by the server: no prompt
  const pending = policy === 'ACCEPT_ANY' ? [] : policy === 'ACCEPT_HIGHER' ? lower : changed
  const signature = pending.map(i => `${i.outcomeId}:${i.price}`).join('|')
  // a further move changes the signature, which re-shows a dismissed prompt
  const hasPriceChanges = pending.length > 0 && signature !== dismissedSig

  return { items, changed, higher, lower, pending, signature, hasPriceChanges }
}

function PriceChangesBanner(props: { quoteRef: PriceChangesBanner$key }) {
  const data = useFragment(
    graphql`
      fragment PriceChangesBanner on BetslipQuote {
        ...usePriceChanges
      }
    `,
    props.quoteRef
  )
  const { items, changed, higher, lower, pending, signature, hasPriceChanges } =
    usePriceChanges(data)
  const setInput = useSetAtom(betslipInputAtom)
  const [policy, setPolicy] = useAtom(oddsPolicyAtom)
  const setDismissedSig = useSetAtom(dismissedPriceChangesAtom)
  const { stamp, accept } = useBetslipPrices()
  const t = useT()

  // remember the first price we saw for each leg so we can detect moves later
  useEffect(() => {
    const unseen = new Map(
      items.filter(i => i.price && !i.expectedPrice).map(i => [i.outcomeId, i.price as string])
    )
    if (unseen.size) stamp(unseen)
  }, [items, stamp])

  const toMap = (list: typeof changed) => new Map(list.map(i => [i.outcomeId, i.price as string]))
  const dropLower = () => {
    if (lower.length === 0) return // nothing to drop; avoids a needless input change/resubscribe
    const lowerIds = new Set(lower.map(i => i.outcomeId))
    setInput(prev => withoutItems(prev, lowerIds))
  }

  // the X: reject the worse odds by dropping those legs (same idea as the invalid-bets X).
  // With nothing lower to drop, there is nothing to reject, so just hide the prompt.
  const reject = () => (lower.length > 0 ? dropLower() : setDismissedSig(signature))
  const acceptAll = () => {
    accept(toMap(changed))
    setPolicy('ACCEPT_ANY')
  }
  const acceptHigher = () => {
    accept(toMap(higher)) // rebase the legs that went up (no-op if none)
    dropLower() // drop the legs that went down (no-op if none)
    setPolicy('ACCEPT_HIGHER')
  }

  const count = pending.length
  const btn = 'h-6 shrink-0 rounded-full px-2.5 text-[0.65rem] whitespace-nowrap'

  return (
    <AnimatePresence initial={false}>
      {hasPriceChanges && (
        <Collapse key='changes'>
          <div className='flex items-center gap-1.5 bg-amber-500/10 px-5 py-1.5 text-amber-400'>
            <TrendingUpIcon className='size-3.5 shrink-0' />
            <p className='min-w-0 flex-1 truncate text-xs'>
              {count === 1 ? t('1 odd change.') : t('{n} odds changes.', { n: count })}
            </p>
            {/* always offer the narrower option while the policy is still REJECT,
                whatever mix of higher/lower moves we got */}
            {policy === 'REJECT' && (
              <Button
                variant='outline'
                size='sm'
                className={cn(btn, 'border-amber-400/50')}
                onClick={acceptHigher}
              >
                {t('Accept higher')}
              </Button>
            )}
            <Button
              size='sm'
              className={cn(btn, 'border-transparent bg-amber-400 text-black hover:bg-amber-300')}
              onClick={acceptAll}
            >
              {t('Accept all')}
            </Button>
            <Button
              variant='ghost'
              size='icon-sm'
              aria-label={t('Remove lower odds')}
              className='-mr-1 size-6 shrink-0 rounded-full text-xs text-amber-400 hover:bg-amber-400/30 hover:text-white'
              onClick={reject}
            >
              <XIcon />
            </Button>
          </div>
        </Collapse>
      )}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------------- */
/*  Footer: summary + place button                                           */
/* -------------------------------------------------------------------------- */

/** Pinned to the bottom of the rail/drawer: the figures, and placing the bet. */
function BetslipFooter(props: { quoteRef: BetslipFooter$key; onPlaced: (ticket: Placed) => void }) {
  const data = useFragment(
    graphql`
      fragment BetslipFooter on BetslipQuote {
        betType
        effectiveOdds
        potentialPayout
        payoutCapped
        boostApplied
        placeable
        items {
          outcomeId
          availability
          price
        }
        ...BlockersBanner
        ...usePriceChanges
      }
    `,
    props.quoteRef
  )
  const t = useT()
  const { user } = useUser()
  const input = useAtomValue(betslipInputAtom)
  const setBoost = useSetAtom(boostAtom)
  const setBetslipOpen = useSetAtom(betslipOpenAtom)
  const setLoginOpen = useSetAtom(loginDialogOpenAtom)
  const policy = useAtomValue(oddsPolicyAtom)
  const resetOddsPrompt = useResetOddsPrompt()
  const { hasPriceChanges } = usePriceChanges(data)
  const boost = useActiveBoost()

  const [placeError, setPlaceError] = useState<string | null>(null)
  const clientRequestId = useRef<string>(crypto.randomUUID())

  const [commit, isPlacing] = useMutation<BetslipPlaceBetMutation>(graphql`
    mutation BetslipPlaceBetMutation($input: PlaceBetInput!) {
      placeBet(input: $input) {
        ticket {
          id
          status
          stake
          potentialPayout
          payoutCapped
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

  // --- the figures shown in the summary and on the place button ---

  const isSingle = data.betType === 'SINGLE'
  const legStake = (id: string) =>
    Number(input.items.find(i => i.outcomeId === id)?.stake ?? input.stake) || 0

  const stake = isSingle
    ? data.items
        .filter(i => i.availability === 'AVAILABLE')
        .reduce((sum, i) => sum + legStake(i.outcomeId), 0)
    : Number(input.stake) || 0
  const overBoostMax = !!boost?.maxStake && stake > Number(boost.maxStake)
  // the quote is already at the boosted price when a boost applies, and its payout respects the cap
  const odds = Number(data.effectiveOdds)
  const payout = Number(data.potentialPayout) || 0

  // --- placing the bet ---

  const hasInvalidLegs = data.items.some(i => i.availability !== 'AVAILABLE')
  const canPlace =
    !isPlacing && data.placeable && !hasInvalidLegs && !hasPriceChanges && !overBoostMax

  const place = () => {
    // guests can't place bets: ask them to log in instead of hitting the API
    if (!user) {
      setBetslipOpen(false) // close the mobile drawer so it doesn't fight the dialog for focus
      setLoginOpen(true)
      return
    }

    const byId = new Map(input.items.map(i => [i.outcomeId, i]))
    const items = data.items
      .filter(i => i.availability === 'AVAILABLE')
      .map(i => ({
        outcomeId: i.outcomeId,
        expectedPrice: byId.get(i.outcomeId)?.expectedPrice ?? i.price,
        banker: data.betType === 'SYSTEM' && !!byId.get(i.outcomeId)?.banker,
        stake: isSingle ? String(byId.get(i.outcomeId)?.stake ?? input.stake) : undefined,
      }))

    commit({
      variables: {
        input: {
          betType: data.betType,
          items,
          stake: input.stake || '0',
          systemSize: input.systemSize ?? null,
          clientRequestId: clientRequestId.current,
          oddsPolicy: policy,
          boostId: boost?.id,
        },
      },
      onCompleted: response => {
        const rej = response.placeBet.rejection
        if (rej) {
          if (rej.code === 'PRICE_CHANGED') {
            // unexpected odds rejection: ask again from scratch
            resetOddsPrompt()
            setPlaceError(null)
          } else {
            if (rej.code === 'BOOST_UNAVAILABLE') setBoost(null)
            setPlaceError(betCodeCopy(rej.code, t) ?? rej.message)
          }
          return
        }

        const ticket = response.placeBet.ticket
        if (ticket) {
          setBoost(null)
          resetOddsPrompt() // accepted odds changes only apply to the slip just submitted
          props.onPlaced(ticket)
        }
      },
      onError: error => {
        setPlaceError(error.message || t('Failed to place bet. Please try again.'))
      },
    })
  }

  return (
    <div className='bg-dark-200 sticky bottom-0 z-20 shrink-0 border-t border-white/5'>
      <PlaceErrorBanner message={placeError} />
      {!data.placeable && !hasInvalidLegs && !hasPriceChanges && (
        <BlockersBanner quoteRef={data} />
      )}
      <BetslipSummary
        boost={boost}
        boostApplied={data.boostApplied}
        isSingle={isSingle}
        stake={stake}
        overBoostMax={overBoostMax}
        odds={odds}
        payout={payout}
        payoutCapped={data.payoutCapped}
      >
        <PlaceBetButton disabled={!canPlace} isPlacing={isPlacing} stake={stake} onClick={place} />
      </BetslipSummary>
    </div>
  )
}

/** Boost banner, stake input and the stake/odds + payout tile. */
function BetslipSummary(props: {
  boost: ActiveBoost | null
  boostApplied: boolean // the server quoted at the boost's price
  isSingle: boolean
  stake: number // total stake: per-leg stakes added up for singles
  overBoostMax: boolean
  odds: number
  payout: number
  payoutCapped: boolean // payout was cut to the maximum winnings
  children: React.ReactNode // the place button
}) {
  const [input, setInput] = useAtom(betslipInputAtom)
  const setDefaultStake = useSetDefaultStake()
  const currency = useCurrency()
  const t = useT()
  const fmt = (n: number) => formatBalance(n, currency)
  const { boost, isSingle } = props

  return (
    <div className='space-y-2.5 px-5 py-3'>
      {boost && props.boostApplied && (
        <div className='border-primary/40 bg-primary/10 flex items-center justify-between rounded-lg border px-3 py-1 text-xs'>
          <span className='text-primary flex items-center gap-1.5 font-bold uppercase'>
            <ChevronsUpIcon className='size-3.5' />
            {t('Bet Boost')}
          </span>
          <span className='font-mono'>
            <span className='text-secondary mr-1 line-through'>
              {Number(boost.combinedPrice).toFixed(2)}
            </span>
            {props.odds.toFixed(2)}
          </span>
        </div>
      )}

      <div className='flex items-center gap-3'>
        <span className='text-secondary shrink-0 text-sm'>
          {isSingle ? t('Stake per bet') : t('Stake')}
        </span>
        <StakeInput
          value={input.stake}
          placeholder={isSingle ? t('Stake per bet') : t('Stake')}
          onCommit={isSingle ? setDefaultStake : stake => setInput(prev => ({ ...prev, stake }))}
        />
      </div>

      {props.overBoostMax && boost?.maxStake && (
        <p className='text-xs text-amber-400'>
          {t('Boost applies up to {max}. Lower your stake to use it.', {
            max: fmt(Number(boost.maxStake)),
          })}
        </p>
      )}

      {/* one tile: total stake (or combined odds) on the left, payout on the right */}
      <div className='bg-dark grid grid-cols-2 items-center gap-3 rounded-xl border border-white/5 px-4 py-2'>
        <div className='flex flex-col'>
          <span className='text-secondary text-[0.65rem] uppercase'>
            {isSingle ? t('Total stake') : t('Combined odds')}
          </span>
          <span className={cn('text-sm font-semibold text-white', !isSingle && 'font-mono')}>
            {isSingle ? fmt(props.stake) : props.odds.toFixed(2)}
          </span>
        </div>
        <div className='flex flex-col items-end'>
          <span className='text-secondary text-[0.65rem] uppercase'>{t('Potential payout')}</span>
          <span className='text-primary text-lg leading-tight font-bold'>{fmt(props.payout)}</span>
        </div>
      </div>

      {props.payoutCapped && <PayoutCappedNote />}

      {props.children}
    </div>
  )
}

/** Shown when the payout was cut to the maximum winnings; the bet is still placeable. */
function PayoutCappedNote() {
  const t = useT()
  return (
    <p className='flex items-center gap-1.5 text-xs text-amber-400'>
      <AlertTriangleIcon className='size-3.5 shrink-0' />
      {t('Payout limited to the maximum winnings.')}
    </p>
  )
}

function PlaceBetButton(props: {
  disabled: boolean
  isPlacing: boolean
  stake: number
  onClick: () => void
}) {
  const currency = useCurrency()
  const t = useT()

  return (
    <button
      type='button'
      disabled={props.disabled}
      onClick={props.onClick}
      className='group/button bg-primary hover:shadow-glow-lg text-primary-foreground relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-4 py-3 text-sm font-bold tracking-wide whitespace-nowrap uppercase transition-all duration-300 select-none disabled:pointer-events-none disabled:bg-neutral-400 disabled:text-neutral-700 sm:text-base'
    >
      <div className='from-primary to-primary absolute inset-0 bg-linear-to-r via-white/30 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100' />
      <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full' />
      {props.isPlacing ? (
        <span className='relative flex items-center gap-2'>
          <Loader2Icon className='size-5 animate-spin' />
          {t('Placing bet...')}
        </span>
      ) : (
        <>
          <span className='relative min-w-0 truncate'>{t('Place bet')}</span>
          <span className='relative shrink-0'>· {formatBalance(props.stake, currency)}</span>
        </>
      )}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Selection row                                                             */
/* -------------------------------------------------------------------------- */

function getLabel(
  eventName: string | null | undefined,
  key: string,
  name: string | null | undefined,
  marketName: string | null | undefined,
  t: (key: string, params?: Record<string, string | number>) => string
) {
  const [home, away] = eventName?.split(' vs ') ?? []
  if (key === 'home') return home ?? t('Home')
  if (key === 'away') return away ?? t('Away')

  const label = name ? translateOutcomeName(t, name) : translateOutcomeKey(t, key)
  const { line } = splitMarketName(marketName)
  return line && !label.includes(line) ? `${label} ${line}` : label
}

function Tip(props: { item: Tip$key }) {
  const data = useFragment(
    graphql`
      fragment Tip on BetslipQuoteItem {
        outcomeId
        eventName
        marketName
        name
        key
        price
        expectedPrice
        priceChanged
        availability
        suspensionReason
        isLive
        eventId
      }
    `,
    props.item
  )
  const [input, setInput] = useAtom(betslipInputAtom)
  const setLegStake = useSetLegStake()
  const t = useT()
  const currency = useCurrency()

  const leg = input.items.find(x => x.outcomeId === data.outcomeId)
  const stake = String(leg?.stake ?? input.stake)
  const banker = !!leg?.banker
  // "k out of n" needs 3+ non-banker selections left, so the last ones can't become bankers
  const bankerDisabled = !banker && systemPoolSize(input) <= 3

  const changed = data.priceChanged && !!data.expectedPrice && !!data.price
  const up = changed && Number(data.price) > Number(data.expectedPrice)
  const blocked = data.availability !== 'AVAILABLE'

  const { base, line } = splitMarketName(data.marketName)
  const marketLabel = MARKET_NAME[base] ? t(MARKET_NAME[base]) : base
  const subline =
    [marketLabel && `${marketLabel}${line ? ` ${line}` : ''}`, data.eventName]
      .filter(Boolean)
      .join(' · ') || '—'

  return (
    <div
      className={cn(
        'mb-2 rounded-xl border bg-black/20 px-3 py-2 transition-colors',
        blocked ? 'border-neutral-500/30 bg-neutral-500/5 opacity-80' : 'border-white/5'
      )}
    >
      <Link
        prefetch={false}
        href={`${data.isLive ? '/live' : ''}/event/${data.eventId}`}
        className='flex items-start gap-2'
      >
        {!blocked && input.betType === 'SYSTEM' && (
          <button
            type='button'
            aria-label={t('Banker')}
            aria-pressed={banker}
            title={t('Banker')}
            disabled={bankerDisabled}
            onClick={e => {
              e.preventDefault() // the row is a link to the event
              setInput(prev => withBanker(prev, data.outcomeId, !banker))
            }}
            className={cn(
              'flex size-5 shrink-0 items-center justify-center self-center rounded-full border text-[0.65rem] leading-none font-bold transition-colors disabled:pointer-events-none disabled:opacity-40',
              banker
                ? 'border-primary bg-primary text-black'
                : 'text-secondary border-white/20 hover:text-white'
            )}
          >
            B
          </button>
        )}
        <div className='min-w-0 flex-1'>
          <p
            className={cn(
              'truncate text-sm leading-tight font-bold',
              blocked ? 'text-secondary line-through' : 'text-primary'
            )}
          >
            {getLabel(data.eventName, data.key, data.name, data.marketName, t) ?? '—'}
          </p>
          <p className='text-secondary truncate text-[0.7rem] leading-tight'>{subline}</p>
        </div>

        <span className='flex shrink-0 items-center gap-1 font-mono text-sm font-semibold text-white'>
          {changed ? (
            <>
              <span className='text-secondary text-[0.65rem] line-through'>
                {Number(data.expectedPrice).toFixed(2)}
              </span>
              <TrendingUpIcon
                className={cn('size-3', up ? 'text-primary' : 'rotate-90 text-red-400')}
              />
              <span className={up ? 'text-primary' : 'text-red-400'}>
                {Number(data.price).toFixed(2)}
              </span>
            </>
          ) : data.price ? (
            Number(data.price).toFixed(2)
          ) : (
            <LockKeyhole className='text-secondary size-4' />
          )}
        </span>

        {/* always visible: there is no hover on touch devices */}
        <button
          type='button'
          onClick={() => setInput(prev => withoutItems(prev, new Set([data.outcomeId])))}
          aria-label={t('Remove selection')}
          className='text-secondary hover:bg-dark-300 -mr-1 flex size-5 shrink-0 items-center justify-center rounded-full transition-colors hover:text-white'
        >
          <XIcon className='size-3.5' />
        </button>
      </Link>

      {blocked && (
        <p className='mt-1 flex items-center gap-1.5 text-xs text-red-400'>
          <AlertTriangleIcon className='size-3.5' />
          {data.suspensionReason
            ? translateSuspensionReason(t, data.suspensionReason)
            : betCodeCopy(data.availability, t)}
        </p>
      )}

      {!blocked && input.betType === 'SINGLE' && (
        <div className='mt-1.5 flex items-center gap-2'>
          <StakeInput compact value={stake} onCommit={v => setLegStake(data.outcomeId, v)} />
          <span className='text-primary ml-auto text-xs font-semibold'>
            → {formatBalance((Number(stake) || 0) * (Number(data.price) || 0), currency)}
          </span>
        </div>
      )}
    </div>
  )
}

// const SLIP_SPRING = { type: 'spring', stiffness: 420, damping: 34 } as const

/** A paper slip: slides in from the edge, swiped away on removal, then the gap closes. */
function SlipPresence(props: { index?: number; children: React.ReactNode }) {
  // cap the stagger so long slips don't take forever to settle
  // const delay = Math.min(props.index ?? 0, 5) * 0.04

  return (
    <motion.div
      className='overflow-hidden'
      // initial={{ opacity: 0, x: 32, height: 0, paddingBottom: 0 }}
      // animate={{
      //   opacity: 1,
      //   x: 0,
      //   height: 'auto',
      //   paddingBottom: 6, // replaces space-y-1.5
      //   transition: {
      //     x: { ...SLIP_SPRING, delay },
      //     opacity: { duration: 0.2, delay },
      //     height: { duration: 0.25, ease: 'easeOut', delay },
      //     paddingBottom: { duration: 0.25, ease: 'easeOut', delay },
      //   },
      // }}
      exit={{
        opacity: 0,
        x: 48, // swipe away
        height: 0, // then close the gap
        paddingBottom: 0,
        transition: {
          x: { duration: 0.18, ease: 'easeIn' },
          opacity: { duration: 0.18 },
          height: { duration: 0.2, ease: 'easeInOut', delay: 0.1 },
          paddingBottom: { duration: 0.2, ease: 'easeInOut', delay: 0.1 },
        },
      }}
    >
      {props.children}
    </motion.div>
  )
}

/** A drawer: unfolds / folds vertically. Used for the banners. */
function Collapse(props: { children: React.ReactNode }) {
  return (
    <motion.div
      className='overflow-hidden'
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {props.children}
    </motion.div>
  )
}

function StakeInput(props: {
  value: string
  onCommit: (v: string) => void
  placeholder?: string
  compact?: boolean
}) {
  const currency = useCurrency()
  const [text, setText] = useState(props.value)
  const timer = useRef<number>(undefined)

  useEffect(() => setText(props.value), [props.value])
  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <InputGroup
      className={cn('bg-dark flex-1 rounded-full', props.compact && 'h-7 w-28 flex-none')}
    >
      <InputGroupInput
        type='number'
        inputMode='decimal'
        placeholder={props.placeholder ?? '0'}
        value={text}
        onFocus={e => e.target.select()}
        onChange={e => {
          const v = e.target.value
          if (!/^\d*\.?\d{0,2}$/.test(v)) return
          setText(v)
          clearTimeout(timer.current)
          if (v !== '') timer.current = window.setTimeout(() => props.onCommit(v), 400)
        }}
        onBlur={() => {
          clearTimeout(timer.current)
          if (text === '') setText(props.value)
          else if (text !== props.value) props.onCommit(text)
        }}
        className={cn(
          'appearance-none text-right font-mono text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          props.compact && 'text-xs'
        )}
      />
      <InputGroupAddon align='inline-end' className='text-xs'>
        {currency}
      </InputGroupAddon>
    </InputGroup>
  )
}

/* -------------------------------------------------------------------------- */
/*  Empty / placed states                                                     */
/* -------------------------------------------------------------------------- */

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

function PlacedState(props: { ticket: Placed; onNewBet: () => void; onViewTickets: () => void }) {
  const t = useT()
  const clearBetslip = useClearBetslip()
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
      {props.ticket.payoutCapped && <PayoutCappedNote />}
      <div className='mt-2 flex gap-2'>
        <Button
          variant='outline'
          onClick={() => {
            clearBetslip()
            props.onNewBet()
          }}
        >
          {t('Place another bet')}
        </Button>
        <Button onClick={props.onViewTickets}>{t('My Tickets')}</Button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Mobile bar + drawer                                                       */
/* -------------------------------------------------------------------------- */

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
  const setTab = useSetAtom(betslipTabAtom)
  const t = useT()

  if (!data || data.items.length === 0) return null

  return (
    <button
      type='button'
      onClick={() => {
        setTab('betslip')
        setOpen(true)
      }}
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

export function BetslipDrawerHost() {
  const betslip = useBetslipQuote()
  return <BetslipDrawer query={betslip} />
}

export function BetslipDrawer(props: { query: Betslip$key | null }) {
  const [open, setOpen] = useAtom(betslipOpenAtom)
  const [tab, setTab] = useAtom(betslipTabAtom)
  const isWiderThanMobile = useMediaQuery('(min-width: 640px)')
  const direction = isWiderThanMobile ? 'right' : 'bottom'
  const t = useT()

  return (
    <Drawer.Root
      open={open}
      onOpenChange={o => {
        setOpen(o)
        if (!o) setTab('betslip') // next open (e.g. from the selections bar) starts on the slip
      }}
      direction={direction}
    >
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
          <Betslip query={props.query} variant='drawer' initialTab={tab} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
