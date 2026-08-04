import { AlertCircleIcon, RotateCwIcon } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'

export function SectionErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center'>
      <AlertCircleIcon className='size-6 text-red-400' />
      <div>
        <p className='text-sm font-semibold text-white'>
          Something went wrong loading this section.
        </p>
        <p className='text-secondary mt-1 text-xs'>
          {/* @ts-expect-error */}
          {error?.message ?? 'Please try again.'}
        </p>
      </div>
      <button
        type='button'
        onClick={resetErrorBoundary}
        className='hover:bg-primary/10 hover:border-primary/30 hover:text-primary group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-medium text-white uppercase transition-all'
      >
        <RotateCwIcon className='size-3.5' />
        Retry
      </button>
    </div>
  )
}
