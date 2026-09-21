/** Identity function at runtime — exists only so the extractor can find these
 * strings when they're declared outside a component and translated later. */

export function tKey<T extends string>(key: T): T {
  return key
}

export function tKeys<T extends readonly string[]>(keys: T): T {
  return keys
}

export function tKeysObj<T extends Record<string, string>>(obj: T): T {
  return obj
}
