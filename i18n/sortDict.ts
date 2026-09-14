export function sortDictKeys<T>(dict: Record<string, T>): Record<string, T> {
  const sortedKeys = Object.keys(dict).sort((a, b) =>
    a.localeCompare(b, 'en', { sensitivity: 'base' })
  )
  return sortedKeys.reduce(
    (acc, key) => {
      acc[key] = dict[key]
      return acc
    },
    {} as Record<string, T>
  )
}
