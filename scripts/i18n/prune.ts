// scripts/i18n/prune.ts

import fs from 'node:fs'
import path from 'node:path'
import { Project, SyntaxKind } from 'ts-morph'

const DICT_PATH = path.resolve('i18n/translations.json')

function collectUsedKeys(): Set<string> {
  const project = new Project({ tsConfigFilePath: 'tsconfig.json' })
  const used = new Set<string>()

  for (const sourceFile of project.getSourceFiles([
    'app/**/*.tsx',
    'app/**/*.ts',
    'components/**/*.tsx',
  ])) {
    for (const call of sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)) {
      if (call.getExpression().getText() !== 't') continue
      const [arg] = call.getArguments()
      if (!arg) continue
      if (
        arg.getKind() === SyntaxKind.StringLiteral ||
        arg.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral
      ) {
        used.add(arg.getText().slice(1, -1))
      }
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
  const sorted = Object.keys(dict)
    .sort()
    // biome-ignore lint/performance/noAccumulatingSpread: idc
    .reduce((acc, k) => ({ ...acc, [k]: dict[k] }), {})
  fs.writeFileSync(DICT_PATH, `${JSON.stringify(sorted, null, 2)}\n`)
  console.log(`\nRemoved ${stale.length} key(s).`)
}

if (require.main === module) {
  prune({ dryRun: process.argv.includes('--dry-run') })
}
