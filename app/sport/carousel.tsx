import { ChevronsLeftRightEllipsisIcon } from 'lucide-react'

export default function Carousel() {
  return (
    <div className='relative flex flex-col'>
      <div className='text-secondary flex h-36 flex-wrap gap-4 overflow-hidden'>
        <div className='flex h-36 min-w-56 flex-1 items-center justify-center rounded-lg bg-black/20'>
          <h3>combo of the week</h3>
        </div>
        <div className='flex h-36 min-w-56 flex-1 items-center justify-center rounded-lg bg-black/20'>
          <h3>bet boost</h3>
        </div>
        <div className='flex h-36 min-w-56 flex-1 items-center justify-center rounded-lg bg-black/20'>
          <h3>featured game</h3>
        </div>
        <div className='flex h-36 min-w-56 flex-1 items-center justify-center rounded-lg bg-black/20'>
          <h3>featured game</h3>
        </div>
      </div>
      <div className='text-muted-foreground bg-muted absolute bottom-4 self-center rounded-lg px-2 py-1 text-center text-xs'>
        (carousel scroll{' '}
        <ChevronsLeftRightEllipsisIcon strokeWidth={1.2} className='inline size-5' />)
      </div>
    </div>
  )
}
