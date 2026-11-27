'use client'

import { AlertCircleIcon, RotateCwIcon } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'
import { useT } from '@/context/providers'

export function SectionErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const t = useT()

  return (
    <div className='border-danger/20 bg-danger/5 flex flex-col items-center justify-center gap-3 rounded-2xl border px-6 py-10 text-center'>
      <AlertCircleIcon className='text-danger size-6' />
      <div>
        <p className='text-foreground text-sm font-semibold'>
          {t('Something went wrong loading this section.')}
        </p>
        <p className='text-secondary mt-1 text-xs'>
          {/* @ts-expect-error */}
          {error?.message ?? t('Please try again.')}
        </p>
      </div>
      <button
        type='button'
        onClick={resetErrorBoundary}
        className='hover:bg-brand/10 hover:border-brand/30 hover:text-brand group border-line-2 bg-glass text-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase transition-all'
      >
        <RotateCwIcon className='size-3.5' />
        {t('Retry')}
      </button>
    </div>
  )
}
