import { format } from 'date-fns'
import { ChartNoAxesColumnIcon, ImageIcon } from 'lucide-react'
import { Toggle } from 'radix-ui'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, getRelativeDayLabel } from '@/lib/utils'

export default function PrematchEvent() {
  const date = new Date(Date.now() + Math.random() * 48 * 3600_000).toISOString()

  return (
    <div className='flex h-27 flex-nowrap items-center gap-4 rounded-2xl border-white/5 bg-black/20 px-5 py-3'>
      <time
        dateTime={date}
        className='text-secondary min-w-16 truncate text-center text-xs leading-relaxed'
      >
        {getRelativeDayLabel(date)}
        <br />
        {format(date, 'HH:mm')}
      </time>
      <Separator orientation='vertical' />
      <div className='ml-1 flex min-w-40 flex-col gap-2 overflow-hidden text-sm'>
        <div className='flex items-center gap-2'>
          <div className='bg-dark-300 text-muted-foreground flex size-6 min-w-6 items-center justify-center rounded-full'>
            <ImageIcon className='size-3' />
          </div>{' '}
          <span className='truncate'>The Homest of Teams</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='bg-dark-300 text-muted-foreground flex size-6 min-w-6 items-center justify-center rounded-full'>
            <ImageIcon className='size-3' />
          </div>{' '}
          <span className='truncate'>Away FC</span>
        </div>
      </div>

      <div className='@container/markets ml-auto flex grow items-center justify-end gap-4'>
        <Market />
        <Market className='hidden @md/markets:flex' />
        <Market className='hidden @2xl/markets:flex' />
        <Market className='hidden @4xl/markets:flex' />
      </div>

      <div className='flex w-24 justify-end'>
        <Button variant='ghost' size='sm'>
          +126
        </Button>
        <Button variant='ghost' size='icon-sm' className='rounded-full'>
          <ChartNoAxesColumnIcon />
        </Button>
      </div>
    </div>
  )
}

function Market({ className = '' }: { className?: string }) {
  return (
    <div className={cn('flex h-15 max-w-60 min-w-50 grow gap-1', className)}>
      <Toggle.Root className='group hover:bg-primary/5 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition transition-all data-[state=on]:shadow-[0_0_12px]'>
        <span className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary text-xs group-data-[state=on]:text-shadow-[0_0_8px]'>
          1
        </span>
        <span className='group-data-[state=on]:text-primary text-shadow-primary/70 text-foreground text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'>
          {(1 + Math.random() * 4).toFixed(2)}
        </span>
      </Toggle.Root>

      <Toggle.Root className='group hover:bg-primary/5 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition transition-all data-[state=on]:shadow-[0_0_12px]'>
        <span className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary text-xs group-data-[state=on]:text-shadow-[0_0_8px]'>
          X
        </span>
        <span className='group-data-[state=on]:text-primary text-shadow-primary/70 text-foreground text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'>
          {(1 + Math.random() * 4).toFixed(2)}
        </span>
      </Toggle.Root>

      <Toggle.Root className='group hover:bg-primary/5 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition transition-all data-[state=on]:shadow-[0_0_12px]'>
        <span className='group-data-[state=on]:text-foreground text-shadow-foreground text-secondary text-xs group-data-[state=on]:text-shadow-[0_0_8px]'>
          2
        </span>
        <span className='group-data-[state=on]:text-primary text-shadow-primary/70 text-foreground text-sm font-semibold group-data-[state=on]:text-shadow-[0_0_12px]'>
          {(1 + Math.random() * 4).toFixed(2)}
        </span>
      </Toggle.Root>
    </div>
  )
}
