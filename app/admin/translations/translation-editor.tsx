'use client'

import { useState, useTransition } from 'react'
import { saveTranslations } from '@/app/admin/translations/actions'
import {
  type Change,
  LOCALES,
  type Locale,
  type Translations,
} from '@/app/admin/translations/github-translations'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'missing' | 'edited'
type Edits = Record<string, Partial<Record<Locale, string>>>
type Result = { ok: boolean; message: string; url?: string }

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'missing', label: 'Missing' },
  { value: 'edited', label: 'My edits' },
]

const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join(',')

export default function TranslationEditor(props: { initial: Translations }) {
  const [saved, setSaved] = useState(props.initial)
  const [edits, setEdits] = useState<Edits>({})
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [result, setResult] = useState<Result | null>(null)
  const [saving, startSaving] = useTransition()

  const valOf = (key: string, locale: Locale) => edits[key]?.[locale] ?? saved[key]?.[locale] ?? ''

  const isBad = (key: string, locale: Locale) => {
    const value = valOf(key, locale)
    return value !== '' && placeholders(value) !== placeholders(key)
  }

  const changes: Change[] = Object.entries(edits).flatMap(([key, byLocale]) =>
    LOCALES.flatMap(locale => {
      const value = byLocale[locale]
      return value !== undefined && value !== (saved[key]?.[locale] ?? '')
        ? [{ key, locale, value }]
        : []
    })
  )
  const changedKeys = new Set(changes.map(c => c.key))
  const hasBad = changes.some(c => isBad(c.key, c.locale))

  const q = query.trim().toLowerCase()
  const rows = Object.keys(saved).filter(key => {
    if (filter === 'missing' && LOCALES.every(l => saved[key]?.[l])) return false
    if (filter === 'edited' && !changedKeys.has(key)) return false
    return (
      !q ||
      key.toLowerCase().includes(q) ||
      LOCALES.some(l => valOf(key, l).toLowerCase().includes(q))
    )
  })

  const save = () =>
    startSaving(async () => {
      const res = await saveTranslations(changes)
      if (!res.ok) return setResult({ ok: false, message: res.error })

      setSaved(prev => {
        const next = { ...prev }
        for (const c of changes) next[c.key] = { ...next[c.key], [c.locale]: c.value.trim() }
        return next
      })
      setEdits({})
      setResult({
        ok: true,
        message: `Saved ${res.count} change${res.count === 1 ? '' : 's'}.`,
        url: res.prUrl,
      })
    })

  return (
    <main className='relative z-1 mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 pb-28'>
      <h1 className='font-display text-2xl font-bold'>Translations</h1>

      <div className='flex flex-wrap items-center gap-3'>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search English or translations...'
          aria-label='Search translations'
          className='focus:border-brand/40 bg-glass h-10 min-w-64 flex-1 rounded-full border px-4 text-sm outline-none'
        />
        <div className='bg-surface border-line flex gap-1 rounded-full border p-1'>
          {FILTERS.map(f => (
            <button
              key={f.value}
              type='button'
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                filter === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/60 hover:text-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className='text-secondary text-xs'>{rows.length} shown</span>
      </div>

      <div className='text-secondary hidden grid-cols-3 gap-3 px-1 text-xs uppercase md:grid'>
        <span>English</span>
        <span>Deutsch</span>
        <span>Türkçe</span>
      </div>

      <div className='flex flex-col gap-2'>
        {rows.map(key => (
          <div key={key} className='grid gap-2 border-b pt-4 pb-6 md:grid-cols-3 md:gap-3'>
            <p className='text-foreground/90 self-center pl-3 text-sm font-medium wrap-break-word sm:pl-0'>
              {key}
            </p>
            {LOCALES.map(locale => {
              const edited = changes.some(c => c.key === key && c.locale === locale)
              const empty = valOf(key, locale) === ''
              return (
                <textarea
                  key={locale}
                  rows={1}
                  value={valOf(key, locale)}
                  placeholder={empty ? `${locale.toUpperCase()} missing` : undefined}
                  aria-label={`${key} (${locale})`}
                  onChange={e =>
                    setEdits(prev => ({
                      ...prev,
                      [key]: { ...prev[key], [locale]: e.target.value },
                    }))
                  }
                  className={cn(
                    'bg-glass field-sizing-content min-h-9 w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none',
                    'focus:border-brand/40',
                    empty && 'border-warning/40',
                    edited && 'border-brand/60',
                    isBad(key, locale) && 'border-danger'
                  )}
                />
              )
            })}
            {LOCALES.some(l => isBad(key, l)) && (
              <p className='text-danger text-xs md:col-span-3'>
                Placeholders like {'{n}'} must be kept exactly as in the English text.
              </p>
            )}
          </div>
        ))}
      </div>

      <div className='bg-surface/95 border-line-2 fixed inset-x-0 bottom-0 z-40 border-t px-4 py-3 backdrop-blur-xl'>
        <div className='mx-auto flex max-w-6xl items-center gap-4'>
          <p className={cn('mr-auto text-sm', result?.ok === false && 'text-danger')}>
            {result ? (
              <>
                {result.message}{' '}
                {result.url && (
                  <a
                    href={result.url}
                    target='_blank'
                    rel='noreferrer'
                    className='text-brand underline'
                  >
                    View on GitHub
                  </a>
                )}
              </>
            ) : (
              `${changes.length} unsaved change${changes.length === 1 ? '' : 's'}`
            )}
          </p>
          <Button onClick={save} disabled={saving || changes.length === 0 || hasBad}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </main>
  )
}
