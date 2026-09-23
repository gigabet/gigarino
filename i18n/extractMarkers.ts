/** biome-ignore-all lint/style/noNonNullAssertion: <idc> */
import { type SourceFile, SyntaxKind } from 'ts-morph'

// expressions that mark a string for extraction. */
const MARKER_CALLEES = new Set(['t', 'tKey'])
const BULK_MARKER_CALLEES = new Set(['tKeys', 'tKeysObj'])

export function collectMarkedStrings(sourceFile: SourceFile): Set<string> {
  const found = new Set<string>()
  const calls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)

  for (const call of calls) {
    const callee = call.getExpression().getText()

    if (MARKER_CALLEES.has(callee)) {
      const [arg] = call.getArguments()
      if (!arg) continue
      if (
        arg.getKind() === SyntaxKind.StringLiteral ||
        arg.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral
      ) {
        found.add(arg.getText().slice(1, -1))
      }
      continue
    }

    if (BULK_MARKER_CALLEES.has(callee)) {
      const [arg] = call.getArguments()
      if (!arg) continue

      if (arg.getKind() === SyntaxKind.ArrayLiteralExpression) {
        arg
          .asKindOrThrow(SyntaxKind.ArrayLiteralExpression)
          .getElements()
          .filter(el => el.getKind() === SyntaxKind.StringLiteral)
          .forEach(el => {
            found.add(el.getText().slice(1, -1))
          })
      } else if (arg.getKind() === SyntaxKind.ObjectLiteralExpression) {
        arg
          .asKindOrThrow(SyntaxKind.ObjectLiteralExpression)
          .getProperties()
          .filter(p => p.getKind() === SyntaxKind.PropertyAssignment)
          .map(p => p.asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializer())
          .filter(init => init?.getKind() === SyntaxKind.StringLiteral)
          .forEach(init => {
            found.add(init!.getText().slice(1, -1))
          })
      }
    }
  }

  return found
}
