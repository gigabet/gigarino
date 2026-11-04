'use server'

import {
  BASE_BRANCH,
  branchExists,
  type Change,
  FILE_PATH,
  gh,
  LOCALES,
  loadTranslations,
  REVIEW_BRANCH,
} from '@/app/admin/translations/github-translations'

type SaveResult = { ok: true; count: number; prUrl: string } | { ok: false; error: string }

export async function saveTranslations(changes: Change[]): Promise<SaveResult> {
  try {
    // 1. make sure the review branch exists
    if (!(await branchExists(REVIEW_BRANCH))) {
      const base = await gh(`/git/ref/heads/${BASE_BRANCH}`)
      if (!base.ok) throw new Error(`Base branch lookup failed (${base.status})`)
      const { object } = (await base.json()) as { object: { sha: string } }

      const created = await gh('/git/refs', {
        method: 'POST',
        body: JSON.stringify({ ref: `refs/heads/${REVIEW_BRANCH}`, sha: object.sha }),
      })
      if (!created.ok) throw new Error(`Could not create branch (${created.status})`)
    }

    // 2. re-read the latest file and apply only the changed cells
    const { dict, sha } = await loadTranslations()
    let count = 0
    for (const c of changes) {
      if (!LOCALES.includes(c.locale) || typeof c.value !== 'string' || !dict[c.key]) continue
      const value = c.value.trim()
      if ((dict[c.key][c.locale] ?? '') === value) continue
      dict[c.key][c.locale] = value
      count++
    }
    if (count === 0) return { ok: false, error: 'Nothing to save.' }

    // 3. commit
    const put = await gh(`/contents/${FILE_PATH}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `i18n: update ${count} translation${count === 1 ? '' : 's'}`,
        content: Buffer.from(`${JSON.stringify(dict, null, 2)}\n`).toString('base64'),
        sha,
        branch: REVIEW_BRANCH,
      }),
    })
    if (!put.ok) throw new Error(`Commit failed (${put.status}). Reload the page and try again.`)

    // 4. make sure a PR is open
    const owner = process.env.GITHUB_REPO?.split('/')[0]
    const open = await gh(`/pulls?head=${owner}:${REVIEW_BRANCH}&state=open`)
    const prs = (await open.json()) as { html_url: string }[]
    let prUrl = prs[0]?.html_url

    if (!prUrl) {
      const pr = await gh('/pulls', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Translation review',
          head: REVIEW_BRANCH,
          base: BASE_BRANCH,
          body: 'Edits made through the translation editor.',
        }),
      })
      if (!pr.ok) throw new Error(`Could not open pull request (${pr.status})`)
      prUrl = ((await pr.json()) as { html_url: string }).html_url
    }

    return { ok: true, count, prUrl }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' }
  }
}
