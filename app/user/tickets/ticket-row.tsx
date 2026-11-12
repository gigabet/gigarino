'use client'

import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { graphql, useFragment } from 'react-relay'
import {
  TicketCardDetails,
  TicketStatusPill,
  useAcknowledgeCorrections,
} from '@/components/ticket-card'
import { useT } from '@/context/providers'
import { cn, formatBalance } from '@/lib/utils'
import type { TicketRow$key } from '@/relay/__generated__/TicketRow.graphql'

/**
 * Shared with the column header in ticket-history. From md up the cells line up as
 * columns: status, placed, bet, stake, odds, return, chevron. Below md they wrap into a
 * three-column card.
 */
export const TICKET_GRID =
  'grid grid-cols-3 gap-x-3 gap-y-2 md:grid-cols-[10rem_7.5rem_minmax(0,1fr)_6.5rem_4.5rem_8.5rem_1rem] md:items-center md:gap-x-4'

export default function TicketRow(props: { ticket: TicketRow$key; onCashedOut: () => void }) {
  const data = useFragment(
    graphql`
      fragment TicketRow on Ticket {
        id
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
        ...TicketCardDetails
      }
    `,
    props.ticket
  )

  const [expanded, setExpanded] = useState(false)
  const t = useT()
  useAcknowledgeCorrections(data, expanded)

  const first = data.items[0]
  const more = data.items.length - 1
  const betLabel =
    data.betType === 'SINGLE'
      ? t('Single')
      : data.betType === 'SYSTEM'
        ? t('System')
        : t('{n}-fold Combi', { n: data.items.length })

  // payout stays null while the ticket is open
  const returned = data.payout == null ? null : Number(data.payout)
  const stake = Number(data.stake)

  return (
    <div>
      <button
        type='button'
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        className={cn(
          TICKET_GRID,
          'relative w-full px-4 py-3 text-left text-xs transition-colors hover:bg-white/3',
          expanded && 'bg-white/3'
        )}
      >
        <span className='col-span-2 flex min-w-0 items-center gap-2 md:col-span-1'>
          <TicketStatusPill status={data.status} />
          {data.resettled && !data.resettlementSeen && (
            <>
              <span aria-hidden className='size-2 shrink-0 rounded-full bg-amber-400' />
              <span className='sr-only'>{t('Corrected')}</span>
            </>
          )}
        </span>

        <span className='text-secondary pr-6 text-right md:pr-0 md:text-left'>
          {format(new Date(data.createdAt), 'dd MMM, HH:mm')}
        </span>

        <span className='col-span-3 min-w-0 md:col-span-1'>
          <span className='block truncate text-sm font-medium text-white'>
            {first?.outcomeName}
            {more > 0 && <span className='text-secondary ml-1.5 text-xs'>+{more}</span>}
          </span>
          <span className='text-secondary block truncate'>
            {data.items.length === 1 && first
              ? `${first.marketName} · ${first.eventName}`
              : betLabel}
          </span>
        </span>

        <span className='flex flex-col md:items-end'>
          <span className='text-secondary text-[0.65rem] uppercase md:hidden'>{t('Stake')}</span>
          <span className='font-mono text-white'>{formatBalance(stake, data.currency)}</span>
        </span>

        <span className='flex flex-col md:items-end'>
          <span className='text-secondary text-[0.65rem] uppercase md:hidden'>{t('Odds')}</span>
          <span className='font-mono text-white'>{Number(data.effectiveOdds).toFixed(2)}</span>
        </span>

        <span className='flex flex-col md:items-end'>
          <span className='text-secondary text-[0.65rem] uppercase md:hidden'>
            {returned === null ? t('Potential') : t('Return')}
          </span>
          <span
            className={cn(
              'font-mono font-semibold',
              returned === null && 'text-secondary',
              returned !== null && (returned > stake ? 'text-primary' : 'text-white'),
              returned === 0 && 'text-secondary'
            )}
          >
            {formatBalance(returned ?? Number(data.potentialPayout), data.currency)}
          </span>
          {returned === null && (
            <span className='text-secondary text-[0.6rem] max-md:hidden'>{t('Potential')}</span>
          )}
        </span>

        <ChevronDownIcon
          aria-hidden
          className={cn(
            'text-secondary absolute top-3.5 right-4 size-4 transition-transform md:static',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && (
        <div className='border-t border-white/5 bg-white/3 px-4 py-4'>
          <div className='max-w-2xl'>
            <TicketCardDetails ticket={data} onCashedOut={props.onCashedOut} />
          </div>
        </div>
      )}
    </div>
  )
}
