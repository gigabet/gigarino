'use client'

import { format } from 'date-fns'
import { ChevronRightIcon } from 'lucide-react'
import { graphql, useFragment } from 'react-relay'
import { betTypeLabel, selectionLabel, TicketStatusPill } from '@/components/ticket-card'
import { useT } from '@/context/providers'
import { cn, formatBalance } from '@/lib/utils'
import type { TicketRow$key } from '@/relay/__generated__/TicketRow.graphql'

/**
 * Shared with the column header in ticket-history. Layout follows the width of the list
 * (container query), not the viewport: the side rail and the account sidebar eat into it.
 * From @4xl the cells line up as columns: status, placed, bet, stake, odds, return, chevron.
 * Below that each ticket is a card: status and date, the pick, then a stake/odds/return strip.
 */
export const TICKET_GRID =
  'grid grid-cols-3 gap-x-3 gap-y-3 @4xl:grid-cols-[7rem_6.25rem_minmax(0,1fr)_5.5rem_3.5rem_6.5rem_1rem] @4xl:items-center @4xl:gap-x-4 @4xl:gap-y-0'

/** One ticket as its own card. Selecting it opens the details beside (or over) the list. */
export default function TicketRow(props: {
  ticket: TicketRow$key
  selected: boolean
  onSelectAction: () => void
}) {
  const data = useFragment(
    graphql`
      fragment TicketRow on Ticket {
        betType
        stake
        effectiveOdds
        potentialPayout
        payout
        currency
        status
        createdAt
        resettled
        resettlementSeen
        items {
          eventName
          marketName
          outcomeName
        }
      }
    `,
    props.ticket
  )

  const t = useT()

  const first = data.items[0]
  const more = data.items.length - 1
  const isSingle = data.items.length === 1
  const betLabel = betTypeLabel(t, data.betType, data.items.length)

  // payout stays null while the ticket is open
  const returned = data.payout == null ? null : Number(data.payout)
  const stake = Number(data.stake)

  return (
    <button
      type='button'
      onClick={props.onSelectAction}
      aria-pressed={props.selected}
      className={cn(
        TICKET_GRID,
        'relative w-full rounded-xl border px-4 py-4 text-left text-xs transition-colors @4xl:py-3.5',
        props.selected
          ? 'border-primary/40 bg-foreground/6'
          : 'border-foreground/5 bg-inset hover:border-foreground/10 hover:bg-foreground/3'
      )}
    >
      {/* card: status left, date right (clear of the chevron). Column layout: two cells. */}
      <span className='col-span-3 flex items-center justify-between gap-3 pr-7 @4xl:contents'>
        <span className='flex min-w-0 items-center gap-2'>
          <TicketStatusPill status={data.status} />
          {data.resettled && !data.resettlementSeen && (
            <>
              <span aria-hidden className='size-2 shrink-0 rounded-full bg-amber-400' />
              <span className='sr-only'>{t('Corrected')}</span>
            </>
          )}
        </span>
        <span className='text-secondary whitespace-nowrap'>
          {format(new Date(data.createdAt), 'dd MMM, HH:mm')}
        </span>
      </span>

      {/* same shape for every ticket: the pick (+ how many more), then the market or ticket type
          and the match of that pick */}
      <span className='col-span-3 min-w-0 @4xl:col-span-1'>
        {first && (
          <>
            <span className='block truncate text-base font-semibold text-foreground @4xl:text-sm @4xl:font-medium'>
              {selectionLabel(first.outcomeName, first.eventName)}
              {more > 0 && (
                <span className='text-secondary ml-1.5 text-xs font-normal'>
                  {t('+{n} more', { n: more })}
                </span>
              )}
            </span>
            <span className='text-secondary mt-0.5 block truncate @4xl:mt-0'>
              {isSingle ? first.marketName : betLabel} · {first.eventName}
            </span>
          </>
        )}
      </span>

      {/* card: a separate strip under the pick. Column layout: three cells. */}
      <span className='col-span-3 grid grid-cols-3 border-t border-foreground/5 pt-3 @4xl:contents'>
        <span className='flex flex-col items-start @4xl:items-end'>
          <span className='text-secondary text-[0.65rem] tracking-wide uppercase @4xl:hidden'>
            {t('Stake')}
          </span>
          <span className='font-mono text-sm text-foreground @4xl:text-xs'>
            {formatBalance(stake, data.currency)}
          </span>
        </span>

        <span className='flex flex-col items-center @4xl:items-end'>
          <span className='text-secondary text-[0.65rem] tracking-wide uppercase @4xl:hidden'>
            {t('Odds')}
          </span>
          <span className='font-mono text-sm text-foreground @4xl:text-xs'>
            {Number(data.effectiveOdds).toFixed(2)}
          </span>
        </span>

        <span className='flex flex-col items-end'>
          <span className='text-secondary text-[0.65rem] tracking-wide uppercase @4xl:hidden'>
            {returned === null ? t('Potential') : t('Return')}
          </span>
          <span
            className={cn(
              'font-mono text-sm font-semibold @4xl:text-xs',
              returned === null && 'text-secondary',
              returned !== null && (returned > stake ? 'text-brand' : 'text-foreground'),
              returned === 0 && 'text-secondary'
            )}
          >
            {formatBalance(returned ?? Number(data.potentialPayout), data.currency)}
          </span>
          {returned === null && (
            <span className='text-secondary hidden text-[0.6rem] @4xl:block'>{t('Potential')}</span>
          )}
        </span>
      </span>

      <ChevronRightIcon
        aria-hidden
        className={cn(
          'absolute top-4 right-4 size-4 transition-colors @4xl:static',
          props.selected ? 'text-brand' : 'text-secondary'
        )}
      />
    </button>
  )
}
