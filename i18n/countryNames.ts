// lib/i18n/countryNames.ts
import type { Locale } from './t'

export function getCountryName(
  countryCode: string | null | undefined,
  locale: Locale,
  t: (key: string) => string
): string {
  if (!countryCode) {
    return t('International')
  }
  const dn = new Intl.DisplayNames([locale === 'en' ? 'en' : locale], { type: 'region' })
  return dn.of(countryCode.toUpperCase()) ?? countryCode
}
