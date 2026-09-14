// components/LocaleSwitcher.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

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

  return (
    <select value={current} onChange={e => handleChange(e.target.value)} disabled={isPending}>
      {LOCALES.map(l => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  )
}
