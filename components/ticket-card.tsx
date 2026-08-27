'use client'

import { format, formatDistanceToNowStrict } from 'date-fns'
import { AlertTriangleIcon, ChevronDownIcon, Loader2Icon } from 'lucide-react'
import { Popover } from 'radix-ui'
import { Suspense, useState } from 'react'
import {
  graphql,
  type PreloadedQuery,
  useFragment,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay'
import type { TicketCard$key } from '@/components/__generated__/TicketCard.graphql'
import type { TicketCardCashoutMutation } from '@/components/__generated__/TicketCardCashoutMutation.graphql'
import type { TicketCardCashoutQuoteQuery } from '@/components/__generated__/TicketCardCashoutQuoteQuery.graphql'
import TicketCardCashoutQuoteQueryNode from '@/components/__generated__/TicketCardCashoutQuoteQuery.graphql'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, formatBalance } from '@/lib/utils'
import type { BetItemStatus, TicketStatus } from '@/types'

const CASHOUT_ELIGIBLE = new Set<TicketStatus>(['ACCEPTED', 'PARTIALLY_CASHED_OUT'])

const STATUS_META: Record<TicketStatus, { label: string; className: string }> = {
  PENDING_ACCEPTANCE: {
    label: 'Pending',
    className: 'bg-yellow-500/10 text-yellow-400',
  },
  ACCEPTED: { label: 'Open', className: 'bg-sky-500/10 text-sky-400' },
  PARTIALLY_CASHED_OUT: {
    label: 'Partially Cashed Out',
    className: 'bg-purple-accent/10 text-purple-accent',
  },
  WON: { label: 'Won', className: 'bg-primary/10 text-primary' },
  LOST: { label: 'Lost', className: 'bg-red-500/10 text-red-400' },
  VOID: { label: 'Void', className: 'bg-white/10 text-secondary' },
  REJECTED: { label: 'Rejected', className: 'bg-red-500/10 text-red-400' },
  CASHED_OUT: {
    label: 'Cashed Out',
    className: 'bg-purple-accent/10 text-purple-accent',
  },
}

const ITEM_STATUS_META: Record<BetItemStatus, { label: string; className: string }> = {
  PENDING: { label: '', className: 'bg-white/20' },
  WON: { label: 'W', className: 'bg-primary text-black' },
  HALF_WON: { label: '½W', className: 'bg-primary/60 text-black' },
  LOST: { label: 'L', className: 'bg-red-500 text-white' },
  HALF_LOST: { label: '½L', className: 'bg-red-500/60 text-white' },
  PUSH: { label: 'P', className: 'bg-white/30 text-white' },
  VOID: { label: 'V', className: 'bg-white/20 text-secondary' },
}

export default function TicketCard(props: { ticket: TicketCard$key; action?: () => void }) {
  const data = useFragment(
    graphql`
      fragment TicketCard on Ticket {
        id
        betType
        stake
        effectiveOdds
        potentialPayout
        currency
        status
        createdAt
        settledAt
        items {
          id
          eventName
          marketName
          outcomeName
          priceAtAcceptance
          status
        }
      }
    `,
    props.ticket
  )

  const [expanded, setExpanded] = useState(false)
  const meta = STATUS_META[data.status as TicketStatus]

  return (
    <div className='rounded-xl border border-white/5 bg-black/20 p-3'>
      <button
        type='button'
        onClick={() => setExpanded(e => !e)}
        className='flex w-full items-center justify-between gap-3 text-left'
      >
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase',
                meta.className
              )}
            >
              {meta.label}
            </span>
            <span className='text-secondary text-xs'>
              {data.betType === 'SINGLE'
                ? 'Single'
                : data.betType === 'SYSTEM'
                  ? 'System'
                  : `${data.items.length}-fold Combi`}
            </span>
          </div>
          <p className='text-secondary mt-1 truncate text-xs'>
            {data.items.length === 1
              ? data.items[0].outcomeName
              : `${data.items.length} selections`}
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

        <ChevronDownIcon
          className={cn(
            'text-secondary size-4 shrink-0 transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && (
        <div className='mt-3 space-y-2 border-t border-white/5 pt-3'>
          {data.items.map(item => {
            const itemMeta = ITEM_STATUS_META[item.status as BetItemStatus]
            return (
              <div key={item.id} className='flex items-center justify-between gap-2 text-xs'>
                <div className='flex min-w-0 items-center gap-2'>
                  {item.status !== 'PENDING' && (
                    <span
                      className={cn(
                        'flex size-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold',
                        itemMeta.className
                      )}
                    >
                      {itemMeta.label}
                    </span>
                  )}
                  <div className='min-w-0'>
                    <p className='truncate text-white/90'>{item.outcomeName}</p>
                    <p className='text-secondary truncate'>
                      {item.marketName} · {item.eventName}
                    </p>
                  </div>
                </div>
                <span className='shrink-0 font-mono text-white/70'>
                  {Number(item.priceAtAcceptance).toFixed(2)}
                </span>
              </div>
            )
          })}

          <div className='flex items-center justify-between border-t border-white/5 pt-2 text-xs'>
            <span className='text-secondary'>Combined odds</span>
            <span className='font-mono text-white'>{Number(data.effectiveOdds).toFixed(2)}</span>
          </div>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-secondary'>Potential payout</span>
            <span className='text-primary font-mono font-semibold'>
              {formatBalance(Number(data.potentialPayout), data.currency)}
            </span>
          </div>
          {data.settledAt && (
            <div className='flex items-center justify-between text-xs'>
              <span className='text-secondary'>Settled</span>
              <span className='text-white/70'>
                {formatDistanceToNowStrict(new Date(data.settledAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          )}

          {CASHOUT_ELIGIBLE.has(data.status as TicketStatus) && (
            <div className='pt-1'>
              <CashoutButton ticketId={data.id} onCashedOut={props.action} />
            </div>
          )}
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
          Cash Out
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
    mutation TicketCardCashoutMutation($ticketId: ID!) {
      cashout(ticketId: $ticketId) {
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

  if (!cashoutQuote.available) {
    return (
      <div className='flex items-start gap-2 text-xs text-red-400'>
        <AlertTriangleIcon className='mt-0.5 size-3.5 shrink-0' />
        <p>{cashoutQuote.message || 'Cash out is not available for this ticket right now.'}</p>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <div className='text-center'>
        <p className='text-secondary text-xs'>You'll receive</p>
        <p className='text-primary text-2xl font-bold'>
          {formatBalance(Number(cashoutQuote.amount), cashoutQuote.currency)}
        </p>
      </div>

      {error && <p className='text-center text-xs text-red-400'>{error}</p>}

      <Button
        className='w-full'
        disabled={isCashingOut}
        onClick={() =>
          commitCashout({
            variables: { ticketId: props.ticketId },
            onCompleted: response => {
              if (response.cashout.rejectionCode) {
                setError(response.cashout.rejectionMessage || 'Cash out failed.')
                return
              }
              props.onDone()
            },
            onError: err => setError(err.message || 'Cash out failed.'),
          })
        }
      >
        {isCashingOut ? (
          <>
            <Loader2Icon className='size-4 animate-spin' />
            Cashing out...
          </>
        ) : (
          'Confirm cash out'
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
