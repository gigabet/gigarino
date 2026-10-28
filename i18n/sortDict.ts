type Entry = Record<string, string | undefined>

const byKey = (a: string, b: string) => a.localeCompare(b, 'en', { sensitivity: 'base' })

/**
 * Sorts alphabetically, but entries that still lack a translation in any
 * locale go to the bottom (also alphabetical), so they're easy to spot.
 * `en` is skipped: the source string is the English text.
 */
export function sortDictKeys<T extends Entry>(
  dict: Record<string, T>,
  locales?: string[]
): Record<string, T> {
  const isUntranslated = (entry: T) =>
    (locales ?? Object.keys(entry)).some(l => l !== 'en' && !entry[l]?.trim())

  const keys = Object.keys(dict)
  const translated = keys.filter(k => !isUntranslated(dict[k])).sort(byKey)
  const untranslated = keys.filter(k => isUntranslated(dict[k])).sort(byKey)

  const sorted: Record<string, T> = {}
  for (const key of [...translated, ...untranslated]) sorted[key] = dict[key]
  return sorted
}
