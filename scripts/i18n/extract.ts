import fs from 'node:fs'
import path from 'node:path'
import { Project } from 'ts-morph'
import { collectMarkedStrings } from '@/i18n/extractMarkers'
import { sortDictKeys } from '@/i18n/sortDict'

const DICT_PATH = path.resolve('i18n/translations.json')
const TARGET_LOCALES = ['de', 'tr']
const SOURCE_GLOBS = ['app/**/*.tsx', 'app/**/*.ts', 'components/**/*.tsx']

function loadDict(): Record<string, Record<string, string>> {
  if (!fs.existsSync(DICT_PATH)) return {}
  return JSON.parse(fs.readFileSync(DICT_PATH, 'utf8'))
}

function saveDict(dict: Record<string, Record<string, string>>) {
  fs.writeFileSync(DICT_PATH, `${JSON.stringify(sortDictKeys(dict), null, 2)}\n`)
}

export function extract() {
  const project = new Project({ tsConfigFilePath: 'tsconfig.json' })
  const dict = loadDict()
  let added = 0

  for (const sourceFile of project.getSourceFiles(SOURCE_GLOBS)) {
    for (const key of collectMarkedStrings(sourceFile)) {
      if (!dict[key]) {
        dict[key] = Object.fromEntries(TARGET_LOCALES.map(l => [l, '']))
        added++
      }
    }
  }

  saveDict(dict)
  console.log(`Extraction complete. ${added} new key(s).`)
  return added
}

if (require.main === module) extract()
