'use client'

import { GlobeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'tr', label: 'Türkçe' },
]

export function LocaleSwitcher({ current }: { current: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleChange(locale: string) {
    // biome-ignore lint/suspicious/noDocumentCookie: is only way to set client side cookie
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`
    startTransition(() => router.refresh())
  }

  const currentLabel = LOCALES.find(l => l.code === current)?.label ?? current

  return (
    <Select value={current} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger
        size='sm'
        className='hover:text-primary data-[state=open]:text-primary h-auto gap-1.5 border-none bg-transparent p-0 text-xs text-gray-500 shadow-none transition-colors'
      >
        <GlobeIcon className='size-3.5' />
        <SelectValue>{currentLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent
        side='top'
        align='end'
        position='popper'
        sideOffset={8}
        className='bg-dark-200 min-w-32 border-white/10 text-xs'
      >
        {LOCALES.map(l => (
          <SelectItem key={l.code} value={l.code} className='text-xs'>
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
