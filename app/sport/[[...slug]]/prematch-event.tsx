import { format } from 'date-fns'
import { ImageIcon } from 'lucide-react'
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
        <Market className='@max-md/markets:hidden' />
        <Market className='@max-2xl/markets:hidden' />
        <Market className='@max-4xl/markets:hidden' />
      </div>

      <div>
        <Button variant='ghost'>+126</Button>
      </div>
    </div>
  )
}

function Market({ className = '' }: { className?: string }) {
  return (
    <div className={cn('flex h-15 max-w-60 min-w-50 grow gap-1', className)}>
      <Toggle.Root className='group hover:bg-primary/10 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition transition-all data-[state=on]:shadow-[0_0_12px]'>
        <span className='group-data-[state=on]:text-foreground text-secondary text-xs'>1</span>
        <span className='group-data-[state=on]:text-primary text-foreground text-sm font-semibold'>
          {(1 + Math.random() * 4).toFixed(2)}
        </span>
      </Toggle.Root>

      <Toggle.Root className='group hover:bg-primary/10 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition transition-all data-[state=on]:shadow-[0_0_12px]'>
        <span className='group-data-[state=on]:text-foreground text-secondary text-xs'>X</span>
        <span className='group-data-[state=on]:text-primary text-foreground text-sm font-semibold'>
          {(1 + Math.random() * 4).toFixed(2)}
        </span>
      </Toggle.Root>

      <Toggle.Root className='group hover:bg-primary/10 hover:border-primary/20 shadow-primary/60 data-[state=on]:border-primary data-[state=on]:bg-primary-500/10 flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/5 bg-black/20 transition transition-all data-[state=on]:shadow-[0_0_12px]'>
        <span className='group-data-[state=on]:text-foreground text-secondary text-xs'>2</span>
        <span className='group-data-[state=on]:text-primary text-foreground text-sm font-semibold'>
          {(1 + Math.random() * 4).toFixed(2)}
        </span>
      </Toggle.Root>
    </div>
  )
}
