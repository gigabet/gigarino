import { noUntranslatedApiString } from './no-untranslated-api-string.mjs'

/** @type {import('eslint').ESLint.Plugin} */
export default {
  meta: { name: 'local-i18n' },
  rules: {
    'no-untranslated-api-string': noUntranslatedApiString,
  },
}
