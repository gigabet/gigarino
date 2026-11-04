export type Locale = 'de' | 'tr'
export const LOCALES: readonly Locale[] = ['de', 'tr']
export type Translations = Record<string, Partial<Record<Locale, string>>>
export type Change = { key: string; locale: Locale; value: string }

export const FILE_PATH = 'i18n/translations.json'
export const REVIEW_BRANCH = 'translation-review'
export const BASE_BRANCH = process.env.GITHUB_BASE_BRANCH ?? 'main'

export function gh(path: string, init?: RequestInit) {
  const { GITHUB_TOKEN, GITHUB_REPO } = process.env
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    throw new Error('GITHUB_TOKEN and GITHUB_REPO must be set')
  }
  return fetch(`https://api.github.com/repos/${GITHUB_REPO}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
}

export async function branchExists(branch: string) {
  return (await gh(`/git/ref/heads/${branch}`)).ok
}

/** Reads from the review branch if it exists (pending edits), otherwise from the base branch. */
export async function loadTranslations() {
  const ref = (await branchExists(REVIEW_BRANCH)) ? REVIEW_BRANCH : BASE_BRANCH
  const res = await gh(`/contents/${FILE_PATH}?ref=${ref}`)
  if (!res.ok) throw new Error(`Could not read ${FILE_PATH} (${res.status})`)

  const file = (await res.json()) as { content: string; sha: string }
  const dict = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')) as Translations
  return { dict, sha: file.sha }
}
