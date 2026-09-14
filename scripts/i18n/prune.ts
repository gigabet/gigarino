import fs from 'node:fs'
import path from 'node:path'
import { Project } from 'ts-morph'
import { collectMarkedStrings } from '@/i18n/extractMarkers'
import { sortDictKeys } from '@/i18n/sortDict'

const DICT_PATH = path.resolve('i18n/translations.json')
const SOURCE_GLOBS = ['app/**/*.tsx', 'app/**/*.ts', 'components/**/*.tsx', 'constants/**/*.ts']

function collectUsedKeys(): Set<string> {
  const project = new Project({ tsConfigFilePath: 'tsconfig.json' })
  const used = new Set<string>()

  for (const sourceFile of project.getSourceFiles(SOURCE_GLOBS)) {
    for (const key of collectMarkedStrings(sourceFile)) {
      used.add(key)
    }
  }

  return used
}

export function prune(opts: { dryRun?: boolean } = {}) {
  const dict: Record<string, Record<string, string>> = JSON.parse(
    fs.readFileSync(DICT_PATH, 'utf8')
  )
  const used = collectUsedKeys()
  const stale = Object.keys(dict).filter(k => !used.has(k))

  if (stale.length === 0) {
    console.log('No stale keys.')
    return
  }

  console.log(`${stale.length} stale key(s):`)
  stale.forEach(k => {
    console.log(`  - "${k}"`)
  })

  if (opts.dryRun) {
    console.log('\nDry run — nothing removed.')
    return
  }

  for (const key of stale) delete dict[key]
  fs.writeFileSync(DICT_PATH, `${JSON.stringify(sortDictKeys(dict), null, 2)}\n`)
  console.log(`\nRemoved ${stale.length} key(s).`)
}

if (require.main === module) {
  prune({ dryRun: process.argv.includes('--dry-run') })
}
