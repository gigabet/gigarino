// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig } from 'eslint/config'
import i18next from 'eslint-plugin-i18next'
// @ts-expect-error: missing types
import relay from 'eslint-plugin-relay'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import localI18n from './eslint-rules/index.mjs'

export default defineConfig([{
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
}, {
  ...relay.configs.recommended,
  rules: {
    ...relay.configs.recommended.rules,
    'relay/graphql-naming': 'off',
    'relay/must-colocate-fragment-spreads': 'off',
  },
}, {
  ...i18next.configs['flat/recommended'],
  files: ['app/**/*.tsx', 'components/**/*.tsx'],
  rules: {
    'i18next/no-literal-string': [
      'error',
      {
        mode: 'jsx-only', // JSX text + user-facing attributes
        callees: { exclude: ['t', 'format', 'tKeys', 'tKey', 'tObj'] },
        'jsx-attributes': { include: ['alt', 'title'] }, // only these are treated as user-facing
      },
    ],
  },
}, {
  // dynamic API strings (sport, market, outcome names...) that bypass the literal-string rule
  files: ['app/(sport)/**/*.tsx', 'app/live/**/*.tsx', 'components/**/*.tsx'],
  ignores: ['components/ui/**'],
  plugins: { 'local-i18n': localI18n },
  rules: { 'local-i18n/no-untranslated-api-string': 'error' },
}, ...storybook.configs["flat/recommended"]])
