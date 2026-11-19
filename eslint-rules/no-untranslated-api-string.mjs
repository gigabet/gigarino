/**
 * Catches *dynamic* display strings that skip translation, the gap left by
 * `i18next/no-literal-string` (which only sees string literals).
 *
 * Sportsbook names (sports, tournaments, markets, outcomes...) arrive from the GraphQL API in
 * English and are localised on the frontend: map a stable `key`/`kind` to a `tKey()`-marked label
 * and render it with `t()`. This rule flags the places that render the raw value instead.
 *
 * Reported (inside JSX children and JSX attribute values):
 *   1. `{x.name}`, `{x.outcomeName}`, `{x.tradingStatus}`, ... : a property from `properties`
 *      rendered as-is. Also through `?.`, `!`, `as`, `??`/`||`, ternaries, `+`, template literals
 *      and string methods such as `.replaceAll()`.
 *   2. `{GROUP_LABEL[group]}`: a `tKey` lookup table (name matches `labelTables`) whose value is
 *      rendered without `t()`.
 *   3. `t(x.name)`: a non-literal key. Only string literals are extracted into translations.json,
 *      so this can never be translated. Use a `tKey` lookup table.
 *
 * Not reported: `{props.name}` (a pass-through prop; the call site is checked instead), plain
 * identifiers (`{name}`), values wrapped in any call (`{t(...)}`, `{format(...)}`), and values
 * that are only stored or compared and never rendered.
 *
 * For proper nouns that should stay as they are (team names, ...) use
 * `// eslint-disable-next-line local-i18n/no-untranslated-api-string`, or give the local prop a
 * name outside `properties` (e.g. `team` instead of `name`).
 */

const DEFAULT_PROPERTIES = [
  'name',
  'outcomeName',
  'marketName',
  'tradingStatus',
  'status',
  'suspensionReason',
  'detail',
  'key',
  'kind',
]

// slugs and enums. Rendering one as child text is a bug, but passing it as an attribute
// (`<Checkbox name={t.key}>`, `<Pill status={data.status} />`) is routine, so attributes skip these.
const DEFAULT_CHILD_ONLY_PROPERTIES = ['key', 'kind', 'status']

const DEFAULT_LABEL_TABLES = '^[A-Z][A-Z0-9_]*_(LABELS?|NAMES?|TITLES?)$'

// attributes that never hold display text
const DEFAULT_IGNORED_ATTRIBUTES = [
  'key',
  'id',
  'htmlFor',
  'href',
  'className',
  'style',
  'type',
  'ref',
  'value',
  'sport',
  'sportKey',
  'countryCode',
  'code',
]

const STRING_METHODS = new Set([
  'replace',
  'replaceAll',
  'toUpperCase',
  'toLowerCase',
  'trim',
  'trimStart',
  'trimEnd',
  'slice',
  'substring',
  'substr',
  'padStart',
  'padEnd',
])

// wrappers that do not change what ends up on screen
const TRANSPARENT = new Set([
  'ChainExpression',
  'TSNonNullExpression',
  'TSAsExpression',
  'TSSatisfiesExpression',
  'TSTypeAssertion',
])

/** @type {import('eslint').Rule.RuleModule} */
export const noUntranslatedApiString = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow rendering API-supplied display strings (sport, market, outcome names...) without translating them',
    },
    schema: [
      {
        type: 'object',
        properties: {
          properties: { type: 'array', items: { type: 'string' } },
          childOnlyProperties: { type: 'array', items: { type: 'string' } },
          labelTables: { type: 'string' },
          ignoredAttributes: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      untranslatedApiString:
        '`{{text}}` is an API-supplied display string rendered without translation. Look it up in a `tKey()`-marked table keyed by a stable `key`/`kind` and render it with `t()`. For proper nouns, disable this rule on the line.',
      untranslatedLookup:
        '`{{text}}` is a `tKey()` label table, but its value is rendered without `t()`. Wrap it: `t({{text}})`.',
      dynamicTKey:
        '`t()` was given the non-literal `{{text}}`. Only string literals are extracted into translations.json, so this can never be translated. Look it up in a `tKey()` table instead.',
    },
  },

  create(context) {
    const options = context.options[0] ?? {}
    const properties = new Set(options.properties ?? DEFAULT_PROPERTIES)
    const childOnly = new Set(options.childOnlyProperties ?? DEFAULT_CHILD_ONLY_PROPERTIES)
    const labelTables = new RegExp(options.labelTables ?? DEFAULT_LABEL_TABLES)
    const ignoredAttributes = new Set(options.ignoredAttributes ?? DEFAULT_IGNORED_ATTRIBUTES)
    const sourceCode = context.sourceCode

    const text = node => sourceCode.getText(node)

    /** A local table whose values are already `t(...)` calls: rendering it as-is is fine. */
    function isTranslatedTable(identifier) {
      let scope = sourceCode.getScope(identifier)
      while (scope) {
        const variable = scope.set.get(identifier.name)
        if (variable) {
          const init = variable.defs[0]?.node?.init
          return (
            init?.type === 'ObjectExpression' &&
            init.properties.length > 0 &&
            init.properties.every(
              p =>
                p.type === 'Property' &&
                p.value.type === 'CallExpression' &&
                p.value.callee.type === 'Identifier' &&
                p.value.callee.name === 't'
            )
          )
        }
        scope = scope.upper
      }
      return false
    }

    /** @param {'child' | 'attribute'} position */
    function check(node, position) {
      if (!node) return

      if (TRANSPARENT.has(node.type)) return check(node.expression, position)

      switch (node.type) {
        case 'MemberExpression': {
          // lookup table: GROUP_LABEL[group]
          if (
            node.computed &&
            node.object.type === 'Identifier' &&
            labelTables.test(node.object.name)
          ) {
            if (isTranslatedTable(node.object)) return
            context.report({
              node,
              messageId: 'untranslatedLookup',
              data: { text: text(node) },
            })
            return
          }
          if (isApiProperty(node, position)) {
            context.report({
              node,
              messageId: 'untranslatedApiString',
              data: { text: text(node) },
            })
          }
          return
        }

        case 'LogicalExpression':
          // `a && b` only outputs b; `a ?? b` / `a || b` can output either
          if (node.operator !== '&&') check(node.left, position)
          check(node.right, position)
          return

        case 'ConditionalExpression':
          check(node.consequent, position)
          check(node.alternate, position)
          return

        case 'BinaryExpression':
          if (node.operator === '+') {
            check(node.left, position)
            check(node.right, position)
          }
          return

        case 'TemplateLiteral':
          for (const expression of node.expressions) check(expression, position)
          return

        case 'CallExpression': {
          // x.name.replaceAll('_', ' ')  /  kind.toUpperCase()
          const callee = node.callee
          if (
            callee.type === 'MemberExpression' &&
            !callee.computed &&
            callee.property.type === 'Identifier' &&
            STRING_METHODS.has(callee.property.name)
          ) {
            const target = callee.object
            if (target.type === 'Identifier' && properties.has(target.name)) {
              context.report({
                node: target,
                messageId: 'untranslatedApiString',
                data: { text: text(target) },
              })
            } else {
              check(target, position)
            }
          }
          return
        }

        default:
      }
    }

    function isApiProperty(node, position) {
      if (node.computed || node.property.type !== 'Identifier') return false
      const name = node.property.name
      if (!properties.has(name)) return false
      if (position === 'attribute' && childOnly.has(name)) return false
      // `props.name` is a pass-through: the component that supplies it is checked instead
      if (node.object.type === 'Identifier' && node.object.name === 'props') return false
      return true
    }

    return {
      JSXExpressionContainer(node) {
        const parent = node.parent
        if (parent.type === 'JSXAttribute') {
          const name = parent.name.type === 'JSXIdentifier' ? parent.name.name : null
          if (name === null || ignoredAttributes.has(name) || name.startsWith('on')) return
          if (name.startsWith('data-')) return
          check(node.expression, 'attribute')
          return
        }
        // JSXElement / JSXFragment child; `{...spread}` attributes are not containers
        check(node.expression, 'child')
      },

      CallExpression(node) {
        if (node.callee.type !== 'Identifier' || node.callee.name !== 't') return
        const [arg] = node.arguments
        if (!arg) return
        let inner = arg
        while (TRANSPARENT.has(inner.type)) inner = inner.expression
        if (inner.type === 'MemberExpression' && isApiProperty(inner, 'child')) {
          context.report({
            node: arg,
            messageId: 'dynamicTKey',
            data: { text: text(arg) },
          })
        }
      },
    }
  },
}
