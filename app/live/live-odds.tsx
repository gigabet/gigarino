'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { LiveMarket } from '@/app/live/mock-data'

const marketVisibility = [
  '',
  'hidden @min-[22rem]/markets:flex',
  'hidden @min-[33.5rem]/markets:flex',
]

export function LiveMarketColumns(props: { markets: LiveMarket[] }) {
  return (
    <div className='@container/markets flex min-w-0 flex-1 items-center justify-end gap-4 lg:order-4'>
      {props.markets.map((market, i) => (
        <div
          key={market.kind}
          className={cn(
            'flex h-15 max-w-50 min-w-42 flex-1 grow gap-1 xl:max-w-60',
            marketVisibility[i] ?? 'hidden'
          )}
        >
          {market.outcomes.map(odd => (
            <OddButton key={odd.id} name={odd.name} price={odd.price} />
          ))}
        </div>
      ))}
    </div>
  )
}

function OddButton(props: { name: string; price: number }) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      type='button'
      onClick={() => setPressed(p => !p)}
      className={cn(
        'group hover:bg-primary/5 hover:border-primary/20 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition-all',
        pressed && 'border-primary bg-primary-500/10 shadow-primary/60 shadow-[0_0_12px]'
      )}
    >
      <span className={cn('text-secondary text-xs', pressed && 'text-foreground')}>
        {props.name}
      </span>
      <span className={cn('text-foreground text-sm font-semibold', pressed && 'text-primary')}>
        {props.price.toFixed(2)}
      </span>
    </button>
  )
}
