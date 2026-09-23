export function tKey<T extends string>(key: T): T {
  return key
}

export function tKeys<T extends readonly string[]>(keys: T): T {
  return keys
}

export function tKeysObj<T extends Record<string, string>>(obj: T): T {
  return obj
}
