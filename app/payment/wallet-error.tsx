'use client'
import Link from 'next/link'
import * as Dialog from '@/components/ui/dialog'

export default function WalletError() {
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className='w-full max-w-dvw sm:max-w-2xl!'>
          <Dialog.Title className='mb-3 px-4'>Error</Dialog.Title>
          {/* Search Content */}
          <p className='px-4'>We couldn't find your wallet information. Please try again.</p>
          <p className='mb-3 px-4'>If the problem persists, contact support.</p>
          <Dialog.Footer>
            <Link
              href='/'
              className='rounded-full border border-white/20 px-4 py-2 text-center text-sm font-medium text-white uppercase transition-all hover:bg-white/5'
            >
              Cancel
            </Link>
            <button
              type='button'
              onClick={() => location.reload()}
              className='bg-primary shadow-primary hover:shadow-glow text-primary-foreground cursor-default gap-2 rounded-full px-4 py-2 text-center text-sm font-medium uppercase transition-all'
            >
              Retry
            </button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
