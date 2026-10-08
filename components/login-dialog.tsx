'use client'

import { atom, useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from '@/app/login/login-form'
import * as Dialog from '@/components/ui/dialog'
import { useT } from '@/context/providers'

export const loginDialogOpenAtom = atom(false)

export default function LoginDialog() {
  const [open, setOpen] = useAtom(loginDialogOpenAtom)
  const pathname = usePathname()
  const t = useT()

  // the dialog lives in the navbar, so it survives navigation (e.g. "Register now" link)
  // biome-ignore lint/correctness/useExhaustiveDependencies: close on route change only
  useEffect(() => setOpen(false), [pathname, setOpen])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className='w-full max-w-md border-0 bg-transparent p-0 shadow-none'>
          <Dialog.Title className='sr-only'>{t('Log In')}</Dialog.Title>
          {/* content only mounts while open, so window is safe here */}
          <LoginForm
            from={
              typeof window === 'undefined'
                ? '/'
                : window.location.pathname + window.location.search
            }
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
