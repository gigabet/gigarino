# gigarino

Sportsbook + casino frontend. Next.js 16 (App Router, React 19, React Compiler on) with Relay for
sportsbook GraphQL data and a REST casino backend. Package manager: **pnpm**.

## Commands

```sh
pnpm install
pnpm dev            # next dev + i18n watcher + Caddy TLS proxy (3443 -> GraphQL on 3002)
pnpm relay          # relay-compiler --watch. Run after ANY change to a graphql`` tag
pnpm lint           # biome check
pnpm format         # biome format --write
pnpm exec tsc --noEmit   # typecheck (no script exists)
pnpm build          # next build (output: standalone; Dockerfile uses it)
pnpm i18n:extract | i18n:validate | i18n:prune | i18n:translate   # see i18n below
```

- Vitest limited coverage. Verify with `tsc`, `pnpm lint`, and `pnpm relay` (compiler errors).
- Dev env lives in `.env.development` (gitignored). Needs `NEXT_PUBLIC_API_URL` (casino REST, :3001),
  `NEXT_PUBLIC_GRAPHQL_URL` (:3002), `NEXT_PUBLIC_CURRENCY`, `SUPERVISOR_ID`, `BRANCH_ID`.
  Admin editor also uses `ADMIN_PASSWORD`, `GITHUB_REPO`, `GITHUB_BASE_BRANCH`, `DEEPL_API_KEY`.

## Layout

```
app/                 Routes (App Router). Page-specific components sit next to their page.
  (sport)/           Prematch sportsbook: /, /event/[id]
  live/              Live betting + live/event/[id]; live-state, score-state, refetch-context
  casino/            Casino lobby, categories, providers
  user/              Account, wallet, bonuses, tickets, transactions (protected by proxy.ts)
  login|register|forgot-password|reset-password/   Auth pages + server actions
  admin/translations/  Basic-auth translation editor (commits to GitHub)
components/          Components shared across pages. components/ui = shadcn/Radix primitives
context/             Jotai atoms, React contexts/providers (providers.tsx), shared hooks (hooks.ts)
relay/               environment.client.ts / environment.server.ts, relay-provider.tsx,
                     schema.gql (GraphQL schema), __generated__/ (compiler output, committed)
api/generated/       @hey-api/openapi-ts client for the casino REST API (generated, committed)
lib/                 auth.ts (server: token cookie, getUser/getUserWallet), utils.ts, sport-*.ts
i18n/                t.ts (server getT), tKey.ts, translations.json (generated dict)
scripts/i18n/        extract / translate (DeepL) / validate / prune
proxy.ts             Next middleware: /user auth redirect, /admin basic auth, locale cookie
types.d.ts           Hand-written shared types (re-exports api/generated; Sport, EventStatus, ...): NEVER GET RELAY TYPES FROM THERE
```

Path alias: `@/*` -> repo root. Imports are absolute (`@/components/...`), never relative.

## DO NOT read or grep blindly (expensive, no value)

- `relay/__generated__/**` and `api/generated/**` (`index.ts` is huge). Never edit them.
  Need a type? Grep for the exact name, e.g. `grep -n "WalletBalanceDto" api/generated/types.gen.ts`.
- `i18n/translations.json` (~1500 lines, generated), `pnpm-lock.yaml`.
- `relay/schema.gql`: grep for the type/field you need rather than reading it whole.
- `ERROR_CATALOG.md`: describes the NestJS **backend**, not this repo.

## Data fetching: two separate paths

1. **Sportsbook = Relay** (GraphQL over `graphql-sse`, with `@defer`/`@stream` and subscriptions).
   Custom network layer in `relay/environment.client.ts`. Server components use
   `getServerEnvironment()` from `relay/environment.server.ts`; client uses `RelayProvider`.
   Pages typically use `useQueryLoader` + a `graphql` query in `page.tsx`, with children
   receiving `queryRef`/fragment refs.
2. **Casino/wallet/auth = REST**: server actions (`'use server'`, `actions.ts`) that `fetch`
   `${NEXT_PUBLIC_API_URL}/api/v1/...` with `Bearer ${await getToken()}`, plus react-query
   (`@tanstack/react-query`) for client-side/SSE (`createSSEStream` in `lib/utils.ts`).
   Prefer types from `@/api/generated` (re-exported via `@/types`).

Global client state: Jotai (`context/*.ts`). Betslip/tickets/favourites/tracker live there.

## Relay conventions (project rules, follow strictly)

- A component that needs GraphQL data **owns its fragment** (`useFragment`). Fragment name =
  PascalCase of the component, prop is `fooRef: Foo$key` (e.g. `LiveEvent`, `eventRef: LiveEvent$key`).
  The parent spreads `...Foo` and passes the ref down.
- Only exception: the simplest purely-presentational, non-interactive components. Then the parent
  passes **each field as its own prop, verbatim**, never the whole data object.
- Use compiler-generated types: `import type { Foo$key } from '@/relay/__generated__/Foo.graphql'`
  (and `$data`). Never re-declare shapes the Relay types already give you.
- After editing any `graphql` tag, run `pnpm relay` and commit the regenerated `__generated__` files.
- ESLint relay plugin is on (`graphql-naming` and `must-colocate-fragment-spreads` are off).

## React / code conventions

- **Hooks**: if the logic isn't reusable, it's not a hook. Shared hooks go in `context/hooks.ts`.
- **Components**: not reusable -> same file as its parent (no new file), unless large and/or heavily
  interactive. Reusable -> its own file, **as close to its consumers as possible**: used within
  `/app/live` and subpages -> `app/live/`; used by multiple pages -> `components/`.
- **Hook deps**: never violate `useEffect`/`useMemo`/`useCallback` dependency rules and never
  suppress the lint warning. If you feel the need to, the hook is being used wrong, so restructure.
- React Compiler is enabled: don't add `useMemo`/`useCallback`/`memo` by default.
- Add `'use client'` only where needed; default to server components outside Relay-driven pages.
- Styling: Tailwind v4 utility classes + `cn()` from `@/lib/utils`; reuse `components/ui/*`
  (shadcn/Radix) before writing new primitives. Icons: `lucide-react` (also `react-icons`).
- Formatting (enforced by Biome + Prettier tailwind plugin): no semicolons, single quotes
  (`jsxSingleQuote` too), 2 spaces, width 100, trailing commas `es5`, `arrowParens: avoid`.
  Imports are auto-organized by Biome. Unused vars/imports are not lint errors but keep it clean.
- Errors from REST: shape is `ErrorResponse` (`@/types`); server actions return
  `{ success, error, ... }` state objects for `useActionState` forms.

## i18n

- Locales: `en` (the key itself), `de`, `tr`. Source strings are English keys.
- Client: `const t = useT()` (from `@/context/providers`). Server: `const t = await getT()`.
- Strings outside render (module constants, arrays) must be marked with `tKey('...')` /
  `tKeys([...])` / `tKeysObj({...})` and translated at use. Only **string literals** are extracted.
- `translations.json` is generated: `pnpm dev` re-runs `i18n:extract` on file changes. Do not
  hand-edit it; run the scripts. Run `pnpm i18n:validate` before finishing UI-text changes.

## Workflow rules

- Read-only on the repo: never push. Post code in chat for manual review: whole file if heavily
  changed; for multiple files, a `git diff`-style patch (`*.patch` is gitignored) reviewable in VS Code.
- Keep diffs minimal and scoped; don't reformat unrelated code.
- Commit messages are short, lowercase, imperative-ish (e.g. "persisting on/off switch for stats").
