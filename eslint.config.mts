import { defineConfig } from 'eslint/config'
// @ts-expect-error: missing types
import relay from 'eslint-plugin-relay'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/__generated__/**', 'node_modules/**'],
    plugins: { relay },
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ...relay.configs.recommended,
    rules: {
      ...relay.configs.recommended.rules,
      'relay/graphql-naming': 'off',
      'relay/must-colocate-fragment-spreads': 'off',
    },
  },
])
