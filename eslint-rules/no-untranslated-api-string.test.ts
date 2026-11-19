import { RuleTester } from 'eslint'
import tseslint from 'typescript-eslint'
import { afterAll, describe, it } from 'vitest'
import { noUntranslatedApiString } from './no-untranslated-api-string.mjs'

RuleTester.describe = describe
RuleTester.it = it
RuleTester.itOnly = it.only
RuleTester.afterAll = afterAll

const tester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

const apiString = (text: string) => ({
  messageId: 'untranslatedApiString' as const,
  data: { text },
})
const lookup = (text: string) => ({ messageId: 'untranslatedLookup' as const, data: { text } })
const dynamicKey = (text: string) => ({ messageId: 'dynamicTKey' as const, data: { text } })

tester.run('no-untranslated-api-string', noUntranslatedApiString, {
  valid: [
    // translated through a lookup table
    '<p>{t(MARKET_LABEL[market.kind])}</p>',
    '<p>{OUTCOME_NAME[odd.key] ? t(OUTCOME_NAME[odd.key]) : t(fallback)}</p>',
    // literals, calls and unrelated fields
    '<p>{format(event.startTime)}</p>',
    '<p>{event.homeCompetitor}</p>',
    '<p>{count}</p>',
    '<p>{name}</p>',
    // pass-through props are checked at the call site
    '<span>{props.name}</span>',
    // only the right side of && is output
    '<div>{market.name && <b>{t("Yes")}</b>}</div>',
    // slugs are fine as attribute values
    '<Checkbox name={t.key} value={t.key} id={t.key} />',
    '<Item key={sport.key} sport={sport.key} />',
    '<Pill status={data.status} />',
    // a local table of already-translated strings
    "const TAB_LABEL = { stats: t('Stats'), form: t('Form') }; <b>{TAB_LABEL[tab]}</b>",
    // event handlers and data attributes never hold display text
    '<button onClick={() => select(sport.name)} data-name={sport.name} />',
    // stored or compared, not rendered
    'const x = sport.name; if (market.kind === "over_under") go(sport.name)',
    // t() with a literal or a tKey table
    't("Match Winner")',
    't(MARKET_LABEL[kind])',
    // custom options
    {
      code: '<p>{x.title}</p>',
      options: [{ properties: ['name'] }],
    },
    {
      code: '<p>{x.name}</p>',
      options: [{ properties: ['title'] }],
    },
  ],

  invalid: [
    { code: '<p>{sport.name}</p>', errors: [apiString('sport.name')] },
    { code: '<p>{props.odd.name}</p>', errors: [apiString('props.odd.name')] },
    { code: '<p>{outcome?.name}</p>', errors: [apiString('outcome?.name')] },
    { code: '<p>{data.tradingStatus}</p>', errors: [apiString('data.tradingStatus')] },
    { code: '<p>{s.outcomeName ?? "-"}</p>', errors: [apiString('s.outcomeName')] },
    { code: '<p>{s.available && s.outcomeName}</p>', errors: [apiString('s.outcomeName')] },
    { code: '<p>{ok ? tournament.name : t("None")}</p>', errors: [apiString('tournament.name')] },
    // biome-ignore lint/suspicious/noTemplateCurlyInString: <expected>
    { code: '<p>{`${market.name} ${line}`}</p>', errors: [apiString('market.name')] },
    { code: '<p>{market.name + line}</p>', errors: [apiString('market.name')] },
    { code: '<p>{market.name!}</p>', errors: [apiString('market.name')] },
    { code: '<p>{(market.name as string)}</p>', errors: [apiString('market.name')] },
    // string helpers do not translate
    {
      code: "<p>{market.kind.replaceAll('_', ' ')}</p>",
      errors: [apiString('market.kind')],
    },
    {
      code: "<p>{kind.replaceAll('_', ' ')}</p>",
      errors: [apiString('kind')],
    },
    { code: '<b>{data.status}</b>', errors: [apiString('data.status')] },
    {
      code: "const TAB_LABEL = { stats: 'Stats' }; <b>{TAB_LABEL[tab]}</b>",
      errors: [lookup('TAB_LABEL[tab]')],
    },
    {
      code: "const TAB_LABEL = { stats: tKey('Stats') }; <b>{TAB_LABEL[tab]}</b>",
      errors: [lookup('TAB_LABEL[tab]')],
    },
    // slugs rendered as text
    { code: '<span>{odd.key}</span>', errors: [apiString('odd.key')] },
    {
      code: '<span className="capitalize">{props.odd.key}</span>',
      errors: [apiString('props.odd.key')],
    },
    // attributes that carry display text
    { code: '<Tab label={sport.name} />', errors: [apiString('sport.name')] },
    { code: '<SportSubmenu sportName={sport.name} />', errors: [apiString('sport.name')] },
    { code: '<div title={tournament.name} />', errors: [apiString('tournament.name')] },
    // lookup table rendered without t()
    {
      code: '<Tabs.Trigger>{GROUP_LABEL[group]}</Tabs.Trigger>',
      errors: [lookup('GROUP_LABEL[group]')],
    },
    { code: '<p>{STAT_LABEL[stat.key]}</p>', errors: [lookup('STAT_LABEL[stat.key]')] },
    // non-literal key can never be extracted
    { code: 't(sport.name)', errors: [dynamicKey('sport.name')] },
    { code: '<p>{t(sport.name)}</p>', errors: [dynamicKey('sport.name')] },
    {
      code: '<p>{market.name}</p>',
      options: [{ properties: ['name'] }],
      errors: [apiString('market.name')],
    },
    // two in one element
    {
      code: '<p>{event.tournament.name} · {event.category.name}</p>',
      errors: [apiString('event.tournament.name'), apiString('event.category.name')],
    },
  ],
})
