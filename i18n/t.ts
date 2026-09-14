// i18n/t.ts
import { cookies, headers } from 'next/headers'
import dict from '@/i18n/translations.json'

export type Locale = 'en' | 'de' | 'tr'
const SUPPORTED: Locale[] = ['en', 'de', 'tr']
const COOKIE_NAME = 'locale'

function parseAcceptLanguage(header: string | null): Locale {
  if (!header) return 'en'
  const preferred = header.split(',')[0].split('-')[0].toLowerCase()
  return SUPPORTED.includes(preferred as Locale) ? (preferred as Locale) : 'en'
}

export async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const fromCookie = cookieStore.get(COOKIE_NAME)?.value as Locale | undefined
  if (fromCookie && SUPPORTED.includes(fromCookie)) return fromCookie

  const headerList = await headers()
  return parseAcceptLanguage(headerList.get('accept-language'))
}

function substitute(str: string, params?: Record<string, string | number>): string {
  if (!params) return str
  return str.replace(/\{(\w+)\}/g, (match, name) =>
    params[name] !== undefined ? String(params[name]) : match
  )
}

export async function getT() {
  const locale = await resolveLocale()
  return function t(key: string, params?: Record<string, string | number>): string {
    if (locale === 'en') return substitute(key, params)
    const entry = (dict as Record<string, Record<string, string>>)[key]
    const translated = entry?.[locale]
    return substitute(translated || key, params)
  }
}
