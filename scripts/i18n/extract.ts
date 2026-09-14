// scripts/i18n/extract.ts

import fs from 'node:fs'
import path from 'node:path'
import { Project, SyntaxKind } from 'ts-morph'

const DICT_PATH = path.resolve('i18n/translations.json')
const TARGET_LOCALES = ['de', 'tr']

function loadDict(): Record<string, Record<string, string>> {
  if (!fs.existsSync(DICT_PATH)) return {}
  return JSON.parse(fs.readFileSync(DICT_PATH, 'utf8'))
}

function saveDict(dict: Record<string, Record<string, string>>) {
  const sorted = Object.keys(dict)
    .sort()
    // biome-ignore lint/performance/noAccumulatingSpread: idc
    .reduce((acc, k) => ({ ...acc, [k]: dict[k] }), {})
  fs.writeFileSync(DICT_PATH, `${JSON.stringify(sorted, null, 2)}\n`)
}

export function extract() {
  const project = new Project({ tsConfigFilePath: 'tsconfig.json' })
  const dict = loadDict()
  let added = 0

  for (const sourceFile of project.getSourceFiles([
    'app/**/*.tsx',
    'app/**/*.ts',
    'components/**/*.tsx',
  ])) {
    const calls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)
    const MARKER_CALLEES = new Set(['t', 'tKey'])

    for (const call of calls) {
      const expr = call.getExpression()
      if (!MARKER_CALLEES.has(expr.getText())) continue

      const [arg] = call.getArguments()
      if (
        !arg ||
        (arg.getKind() !== SyntaxKind.StringLiteral &&
          arg.getKind() !== SyntaxKind.NoSubstitutionTemplateLiteral)
      ) {
        continue
      }

      const key = arg.getText().slice(1, -1)
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
