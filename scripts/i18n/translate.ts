import fs from 'node:fs'
import path from 'node:path'

const DICT_PATH = path.resolve('i18n/translations.json')
const TARGET_LOCALES = ['de', 'tr'] as const

type Dict = Record<string, Record<string, string>>

const PLACEHOLDER_RE = /\{(\w+)\}/g

function protect(str: string): { text: string; tokens: string[] } {
  const tokens: string[] = []
  const text = str.replace(PLACEHOLDER_RE, match => {
    tokens.push(match)
    return `⟦${tokens.length - 1}⟧` // HACK: unlikely to be messed by machine translations
  })
  return { text, tokens }
}

function restore(str: string, tokens: string[]): string {
  return str.replace(/⟦(\d+)⟧/g, (_, i) => tokens[Number(i)] ?? '')
}

async function translateBatch(strings: string[], target: string): Promise<string[]> {
  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: strings,
      target_lang: target.toUpperCase(),
    }),
  })
  if (!res.ok) throw new Error(`Translation API failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.translations.map((t: { text: string }) => t.text)
}

export async function fillMissing() {
  const dict: Dict = JSON.parse(fs.readFileSync(DICT_PATH, 'utf8'))

  for (const locale of TARGET_LOCALES) {
    const pending = Object.entries(dict).filter(([, v]) => v[locale] === '')
    if (pending.length === 0) continue

    const CHUNK = 50
    for (let i = 0; i < pending.length; i += CHUNK) {
      const chunk = pending.slice(i, i + CHUNK)
      const protectedInputs = chunk.map(([key]) => protect(key))
      const translated = await translateBatch(
        protectedInputs.map(p => p.text),
        locale
      )

      chunk.forEach(([key], i) => {
        dict[key][locale] = restore(translated[i], protectedInputs[i].tokens)
      })
    }
  }

  fs.writeFileSync(DICT_PATH, `${JSON.stringify(dict, null, 2)}\n`)
}

if (require.main === module)
  fillMissing().catch(e => {
    console.error(e)
    process.exit(1)
  })
