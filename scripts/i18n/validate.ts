// scripts/i18n/validate.ts
import fs from 'node:fs'
import path from 'node:path'

const DICT_PATH = path.resolve('i18n/translations.json')

function placeholderNames(str: string): Set<string> {
  return new Set([...str.matchAll(/\{(\w+)\}/g)].map(m => m[1]))
}

export function validate(): boolean {
  const dict: Record<string, Record<string, string>> = JSON.parse(
    fs.readFileSync(DICT_PATH, 'utf8')
  )
  const sourceNames = new Map(Object.keys(dict).map(k => [k, placeholderNames(k)]))
  let ok = true

  for (const [key, locales] of Object.entries(dict)) {
    // biome-ignore lint/style/noNonNullAssertion: .
    const expected = sourceNames.get(key)!
    for (const [locale, value] of Object.entries(locales)) {
      if (!value) continue // untranslated, not our problem here
      const actual = placeholderNames(value)
      const missing = [...expected].filter(n => !actual.has(n))
      const extra = [...actual].filter(n => !expected.has(n))
      if (missing.length || extra.length) {
        ok = false
        console.warn(`Mismatch in "${key}" [${locale}]: missing=${missing}, extra=${extra}`)
      }
    }
  }
  return ok
}

if (require.main === module) {
  const ok = validate()
  if (!ok && process.argv.includes('--strict')) process.exit(1)
}
