'use client'

import { format, formatDistanceToNowStrict } from 'date-fns'
import { useSetAtom } from 'jotai'
import { AlertTriangleIcon, ChevronDownIcon, ChevronsUpIcon, Loader2Icon } from 'lucide-react'
import { Popover } from 'radix-ui'
import { Suspense, useEffect, useState } from 'react'
import {
  graphql,
  type PreloadedQuery,
  useFragment,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useT } from '@/context/providers'
import { unseenResettlementsAtom } from '@/context/tickets'
import { tKey } from '@/i18n/tKey'
import { translateMarketName, translateOutcomeName } from '@/lib/api-names'
import { cn, formatBalance } from '@/lib/utils'
import type {
  TicketCard$data,
  TicketCard$key,
  TicketStatus,
} from '@/relay/__generated__/TicketCard.graphql'
import type { TicketCardAcknowledgeMutation } from '@/relay/__generated__/TicketCardAcknowledgeMutation.graphql'
import type { TicketCardCashoutMutation } from '@/relay/__generated__/TicketCardCashoutMutation.graphql'
import type { TicketCardCashoutQuoteQuery } from '@/relay/__generated__/TicketCardCashoutQuoteQuery.graphql'
import TicketCardCashoutQuoteQueryNode from '@/relay/__generated__/TicketCardCashoutQuoteQuery.graphql'
import type {
  BetItemStatus,
  TicketCardDetails$key,
} from '@/relay/__generated__/TicketCardDetails.graphql'
import type { KnownEnum } from '@/types'

const CASHOUT_ELIGIBLE = new Set<KnownEnum<TicketStatus>>(['ACCEPTED', 'PARTIALLY_CASHED_OUT'])

const STATUS_META: Record<KnownEnum<TicketStatus>, { label: string; className: string }> = {
  PENDING_ACCEPTANCE: {
    label: tKey('Pending'),
    className: 'bg-yellow-500/10 text-yellow-400',
  },
  ACCEPTED: { label: tKey('Open'), className: 'bg-sky-500/10 text-sky-400' },
  PARTIALLY_CASHED_OUT: {
    label: tKey('Partially Cashed Out'),
    className: 'bg-purple-accent/10 text-purple-accent',
  },
  WON: { label: tKey('Won'), className: 'bg-primary/10 text-primary' },
  LOST: { label: tKey('Lost'), className: 'bg-red-500/10 text-red-400' },
  VOID: { label: tKey('Void'), className: 'bg-white/10 text-secondary' },
  REJECTED: {
    label: tKey('Rejected'),
    className: 'bg-red-500/10 text-red-400',
  },
  CASHOUT_PENDING: {
    label: tKey('Cashout pending'),
    className: 'bg-purple-accent/10 text-purple-accent',
  },
  CASHED_OUT: {
    label: tKey('Cashed Out'),
    className: 'bg-purple-accent/10 text-purple-accent',
  },
}

const ITEM_STATUS_META: Record<KnownEnum<BetItemStatus>, { label: string; className: string }> = {
  PENDING: { label: '', className: 'bg-white/20' },
  WON: { label: tKey('W'), className: 'bg-primary text-black' },
  HALF_WON: { label: tKey('½W'), className: 'bg-primary/60 text-black' },
  LOST: { label: tKey('L'), className: 'bg-red-500 text-white' },
  HALF_LOST: { label: tKey('½L'), className: 'bg-red-500/60 text-white' },
  PUSH: { label: tKey('P'), className: 'bg-white/30 text-white' },
  VOID: { label: tKey('V'), className: 'bg-white/20 text-secondary' },
}

const CORRECTION_LABEL: Record<string, string> = {
  PALPABLE_ERROR: tKey('Price error corrected'),
  RESULT_CORRECTION: tKey('Result corrected'),
}

/**
 * Items are frozen at placement and only carry the generic outcome name ("Home", "Away",
 * "Home or Draw", "Home +1.5"), so the team names come from the "Home vs Away" event name.
 */
export function selectionLabel(outcomeName: string, eventName: string) {
  const [home, away] = eventName.split(' vs ')
  return outcomeName.replace(/\b(home|away)\b/gi, (match, side: string) => {
    const team = side.toLowerCase() === 'home' ? home : away
    return team || match
  })
}

export function betTypeLabel(
  t: ReturnType<typeof useT>,
  betType: TicketCard$data['betType'],
  itemCount: number
) {
  if (betType === 'SINGLE') return t('Single')
  if (betType === 'SYSTEM') return t('System')
  return t('{n}-fold Combi', { n: itemCount })
}

/** Takes the raw status verbatim: it is pure formatting, so it has no fragment. */
export function TicketStatusPill(props: { status: string }) {
  const t = useT()
  const meta = STATUS_META[props.status as KnownEnum<TicketStatus>] ?? {
    label: props.status,
    className: 'bg-white/10 text-secondary',
  }

  return (
    <span
      className={cn(
        'truncate rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase',
        meta.className
      )}
    >
      {t(meta.label)}
    </span>
  )
}

/**
 * Marks a ticket's corrections as seen once `active` (the player opened it) and
 * keeps the unseen counter in step. Shared by the betslip card and the tickets page.
 * Both pass the fields from their own fragment.
 */
export function useAcknowledgeCorrections(
  ticket: { id: string; resettled: boolean; resettlementSeen: boolean },
  active: boolean
) {
  const [ack] = useMutation<TicketCardAcknowledgeMutation>(graphql`
    mutation TicketCardAcknowledgeMutation($ticketIds: [ID!]) {
      acknowledgeResettlements(ticketIds: $ticketIds) {
        id
        resettlementSeen
      }
    }
  `)
  const setUnseen = useSetAtom(unseenResettlementsAtom)
  const { id, resettled, resettlementSeen } = ticket

  useEffect(() => {
    if (!active || !resettled || resettlementSeen) return
    ack({
      variables: { ticketIds: [id] },
      onCompleted: () => setUnseen(n => Math.max(0, n - 1)),
    })
  }, [active, id, resettled, resettlementSeen, ack, setUnseen])
}

export default function TicketCard(props: { ticket: TicketCard$key; action?: () => void }) {
  const data = useFragment(
    graphql`
      fragment TicketCard on Ticket {
        id
        betType
        stake
        currency
        status
        createdAt
        resettled
        resettlementSeen
        items {
          # eslint-disable-next-line relay/unused-fields
          id
          eventName
          outcomeName
        }
        ...TicketCardDetails
      }
    `,
    props.ticket
  )

  const [expanded, setExpanded] = useState(false)
  const t = useT()
  useAcknowledgeCorrections(
    {
      id: data.id,
      resettled: data.resettled,
      resettlementSeen: data.resettlementSeen,
    },
    expanded
  )
  const first = data.items[0]

  return (
    <div className='rounded-xl border border-white/5 bg-black/20 p-3'>
      <button
        type='button'
        onClick={() => setExpanded(e => !e)}
        className='flex w-full items-center justify-between gap-3 text-left'
      >
        <div className='flex grow justify-between gap-3'>
          <div className='min-w-0'>
            <div className='flex items-center gap-2'>
              <TicketStatusPill status={data.status} />
              {data.resettled && !data.resettlementSeen && (
                <span className='rounded-full bg-amber-500/10 px-2 py-0.5 text-[0.65rem] font-bold text-amber-400 uppercase'>
                  {t('Corrected')}
                </span>
              )}
              <span className='text-secondary text-xs'>
                {betTypeLabel(t, data.betType, data.items.length)}
              </span>
            </div>
            <p className='text-secondary mt-1 truncate text-xs'>
              {first &&
                `${selectionLabel(first.outcomeName, first.eventName)} · ${first.eventName}`}
              {data.items.length > 1 && ` ${t('+{n} more', { n: data.items.length - 1 })}`}
            </p>
          </div>
          <div className='flex shrink-0 flex-col items-end'>
            <span className='font-mono text-sm font-semibold text-white'>
              {formatBalance(Number(data.stake), data.currency)}
            </span>
            <span className='text-secondary text-[0.65rem]'>
              {format(new Date(data.createdAt), 'dd MMM, HH:mm')}
            </span>
          </div>
        </div>

        <ChevronDownIcon
          className={cn(
            'text-secondary size-4 shrink-0 transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && (
        <div className='mt-3 border-t border-white/5 pt-3'>
          <TicketCardDetails ticket={data} onCashedOutAction={props.action} />
        </div>
      )}
    </div>
  )
}

/** Everything behind the summary line: selections, totals, corrections and cash out. */
export function TicketCardDetails(props: {
  ticket: TicketCardDetails$key
  onCashedOutAction?: () => void
}) {
  const data = useFragment(
    graphql`
      fragment TicketCardDetails on Ticket {
        id
        stake
        effectiveOdds
        potentialPayout
        payout
        currency
        status
        settledAt
        payoutCapped
        rejectReason
        boost {
          boostedOdds
          normalOdds
        }
        resettled
        corrections {
          id
          itemId
          kind
          amount
          previousPrice
          newPrice
          previousStatus
          newStatus
          createdAt
        }
        items {
          id
          eventName
          marketName
          outcomeName
          priceAtAcceptance
          status
          eventStartTime
          inPlay
          scoreAtBet {
            home
            away
          }
          result {
            home
            away
            halfTime {
              home
              away
            }
          }
        }
      }
    `,
    props.ticket
  )
  const t = useT()

  return (
    <div className='space-y-3'>
      {data.status === 'REJECTED' && data.rejectReason && (
        <div className='flex items-start gap-2 rounded-lg bg-red-500/10 p-2 text-xs text-red-400'>
          <AlertTriangleIcon className='mt-0.5 size-3.5 shrink-0' />
          <p>
            <span className='font-semibold'>{t('Rejected')}</span>
            {': '}
            {data.rejectReason}
          </p>
        </div>
      )}

      {data.boost && (
        <div className='border-primary/40 bg-primary/10 flex items-center justify-between rounded-lg border px-3 py-1 text-xs'>
          <span className='text-primary flex items-center gap-1.5 font-bold uppercase'>
            <ChevronsUpIcon className='size-3.5' />
            {t('Bet Boost')}
          </span>
          <span className='font-mono'>
            <span className='text-secondary mr-1 line-through'>
              {Number(data.boost.normalOdds).toFixed(2)}
            </span>
            {Number(data.boost.boostedOdds).toFixed(2)}
          </span>
        </div>
      )}

      <div className='divide-y divide-white/5'>
        {data.items.map(item => {
          const itemMeta = ITEM_STATUS_META[item.status as KnownEnum<BetItemStatus>]
          return (
            <div key={item.id} className='flex items-start justify-between gap-3 py-2.5 text-xs'>
              <div className='flex min-w-0 items-start gap-2'>
                {item.status !== 'PENDING' && (
                  <span
                    className={cn(
                      'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold',
                      itemMeta.className
                    )}
                  >
                    {t(itemMeta.label)}
                  </span>
                )}
                <div className='min-w-0 space-y-0.5'>
                  <p className='truncate text-sm font-medium text-white/90'>
                    {selectionLabel(item.outcomeName, item.eventName)}
                  </p>
                  <p className='text-secondary'>
                    {translateMarketName(t, item.marketName)} · {item.eventName}
                  </p>
                  <p className='text-secondary/80 flex flex-wrap items-center gap-x-2 text-[0.7rem]'>
                    <span>{format(new Date(item.eventStartTime), 'dd MMM, HH:mm')}</span>
                    {item.inPlay && (
                      <span className='rounded bg-red-500/10 px-1 font-semibold text-red-400 uppercase'>
                        {t('Live bet')}
                      </span>
                    )}
                    {item.scoreAtBet && (
                      <span>
                        {t('Score at bet')}{' '}
                        <span className='font-mono text-white/70'>
                          {item.scoreAtBet.home}–{item.scoreAtBet.away}
                        </span>
                      </span>
                    )}
                    {item.result && (
                      <span>
                        {t('Final score')}{' '}
                        <span className='font-mono text-white/70'>
                          {item.result.home}–{item.result.away}
                          {item.result.halfTime &&
                            ` (${item.result.halfTime.home}–${item.result.halfTime.away})`}
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <span className='shrink-0 font-mono text-white/70'>
                {Number(item.priceAtAcceptance).toFixed(2)}
              </span>
            </div>
          )
        })}
      </div>

      <div className='flex items-center justify-between border-t border-white/10 pt-3 text-xs'>
        <span className='text-secondary'>{t('Stake')}</span>
        <span className='font-mono text-white'>
          {formatBalance(Number(data.stake), data.currency)}
        </span>
      </div>
      <div className='flex items-center justify-between text-xs'>
        <span className='text-secondary'>{t('Combined odds')}</span>
        <span className='font-mono text-white'>{Number(data.effectiveOdds).toFixed(2)}</span>
      </div>
      <div className='flex items-center justify-between text-xs'>
        <span className='text-secondary'>{t('Potential payout')}</span>
        <span className='text-primary font-mono font-semibold'>
          {formatBalance(Number(data.potentialPayout), data.currency)}
        </span>
      </div>
      {data.payoutCapped && (
        <p className='flex items-center gap-1.5 text-xs text-amber-400'>
          <AlertTriangleIcon className='size-3.5 shrink-0' />
          {t('Payout limited to the maximum winnings.')}
        </p>
      )}

      {data.settledAt && (
        <div className='flex items-center justify-between text-xs'>
          <span className='text-secondary'>{t('Settled')}</span>
          <span className='text-white/70'>
            {formatDistanceToNowStrict(new Date(data.settledAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      )}

      {data.payout != null && (
        <div className='flex items-center justify-between text-xs'>
          <span className='text-secondary'>{t('Payout')}</span>
          <span className='font-mono font-semibold text-white'>
            {formatBalance(Number(data.payout), data.currency)}
          </span>
        </div>
      )}

      {data.resettled && (
        <div className='space-y-2 rounded-lg bg-amber-500/5 p-2 text-xs'>
          <p className='font-semibold text-amber-400'>{t('Corrections')}</p>
          {data.corrections.map(c => {
            const item = data.items.find(i => i.id === c.itemId)
            const amount = Number(c.amount)
            return (
              <div key={c.id} className='space-y-0.5'>
                <p className='text-white/90'>
                  {t(CORRECTION_LABEL[c.kind] ?? c.kind)} ·{' '}
                  {item && translateOutcomeName(t, item.outcomeName)}
                </p>
                <div className='text-secondary flex justify-between font-mono'>
                  <span>
                    {Number(c.previousPrice).toFixed(2)} → {Number(c.newPrice).toFixed(2)}
                    {c.previousStatus !== c.newStatus && ` · ${c.previousStatus} → ${c.newStatus}`}
                  </span>
                  {amount !== 0 && (
                    <span className={amount > 0 ? 'text-primary' : 'text-red-400'}>
                      {amount > 0 && '+'}
                      {formatBalance(amount, data.currency)}
                    </span>
                  )}
                </div>
                <p className='text-secondary text-[0.65rem]'>
                  {format(new Date(c.createdAt), 'dd MMM, HH:mm')}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {!data.boost && CASHOUT_ELIGIBLE.has(data.status as KnownEnum<TicketStatus>) && (
        <div className='pt-1'>
          <CashoutButton ticketId={data.id} onCashedOut={props.onCashedOutAction} />
        </div>
      )}
    </div>
  )
}

function CashoutButton(props: { ticketId: string; onCashedOut?: () => void }) {
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<TicketCardCashoutQuoteQuery>(
    TicketCardCashoutQuoteQueryNode
  )
  const [open, setOpen] = useState(false)
  const t = useT()

  return (
    <Popover.Root
      open={open}
      onOpenChange={o => {
        setOpen(o)
        if (o) loadQuery({ ticketId: props.ticketId }, { fetchPolicy: 'network-only' })
        else disposeQuery()
      }}
    >
      <Popover.Trigger asChild>
        <Button size='sm' variant='accent' className='w-full'>
          {t('Cash Out')}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side='top'
          align='center'
          sideOffset={8}
          className='bg-dark-200 z-40 w-64 rounded-2xl border border-white/5 p-4 shadow-2xl'
        >
          <Suspense fallback={<CashoutQuoteSkeleton />}>
            {queryRef && (
              <CashoutQuote
                queryRef={queryRef}
                ticketId={props.ticketId}
                onRequote={() =>
                  loadQuery({ ticketId: props.ticketId }, { fetchPolicy: 'network-only' })
                }
                onDone={() => {
                  setOpen(false)
                  props.onCashedOut?.()
                }}
              />
            )}
          </Suspense>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

function CashoutQuote(props: {
  queryRef: PreloadedQuery<TicketCardCashoutQuoteQuery>
  ticketId: string
  /** Fetches a fresh quote, e.g. once the value has moved under the player. */
  onRequote: () => void
  onDone: () => void
}) {
  const { cashoutQuote } = usePreloadedQuery<TicketCardCashoutQuoteQuery>(
    graphql`
      query TicketCardCashoutQuoteQuery($ticketId: ID!) {
        cashoutQuote(ticketId: $ticketId) {
          ticketId
          available
          amount
          currency
          message
          # reason
        }
      }
    `,
    props.queryRef
  )

  const [commitCashout, isCashingOut] = useMutation<TicketCardCashoutMutation>(graphql`
    mutation TicketCardCashoutMutation($ticketId: ID!, $expectedAmount: Decimal) {
      cashout(ticketId: $ticketId, expectedAmount: $expectedAmount) {
        amount
        rejectionCode
        rejectionMessage
        ticket {
          id
          status
          ...TicketCard
        }
      }
    }
  `)

  const [error, setError] = useState<string | null>(null)
  const [priceChanged, setPriceChanged] = useState(false)
  const t = useT()

  if (!cashoutQuote?.available) {
    return (
      <div className='flex items-start gap-2 text-xs text-red-400'>
        <AlertTriangleIcon className='mt-0.5 size-3.5 shrink-0' />
        <p>{cashoutQuote?.message || t('Cash out is not available for this ticket right now.')}</p>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <div className='text-center'>
        <p className='text-secondary text-xs'>{t("You'll receive")}</p>
        <p className='text-primary text-2xl font-bold'>
          {formatBalance(Number(cashoutQuote.amount), cashoutQuote.currency)}
        </p>
      </div>

      {priceChanged && (
        <p className='text-center text-xs text-amber-400'>
          {t('The cash out value changed. Check the new amount and confirm again.')}
        </p>
      )}
      {error && <p className='text-center text-xs text-red-400'>{error}</p>}

      <Button
        className='w-full'
        disabled={isCashingOut}
        onClick={() => {
          setPriceChanged(false)
          commitCashout({
            // pays exactly the quoted amount, or refuses with PRICE_CHANGED
            variables: {
              ticketId: props.ticketId,
              expectedAmount: cashoutQuote.amount,
            },
            onCompleted: response => {
              if (response.cashout.rejectionCode === 'PRICE_CHANGED') {
                setError(null)
                setPriceChanged(true)
                props.onRequote()
                return
              }
              if (response.cashout.rejectionCode) {
                setError(response.cashout.rejectionMessage || t('Cash out failed.'))
                return
              }
              props.onDone()
            },
            onError: err => setError(err.message || t('Cash out failed.')),
          })
        }}
      >
        {isCashingOut ? (
          <>
            <Loader2Icon className='size-4 animate-spin' />
            {t('Cashing out...')}
          </>
        ) : (
          t('Confirm cash out')
        )}
      </Button>
    </div>
  )
}

function CashoutQuoteSkeleton() {
  return (
    <div className='space-y-3'>
      <Skeleton className='mx-auto h-8 w-32' />
      <Skeleton className='h-9 w-full' />
    </div>
  )
}

export function TicketCardSkeleton() {
  return <Skeleton className='h-20 w-full rounded-xl' />
}
