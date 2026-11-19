import { NextRequest } from 'next/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// proxy() reads the auth token through next/headers, which only exists inside a request scope
let tokenCookie: string | undefined
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) =>
      name === 'token' && tokenCookie ? { name, value: tokenCookie } : undefined,
  }),
}))

import proxy from '@/proxy'

const basic = (user: string, password: string) =>
  `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`

function req(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(`https://site.test${path}`, { headers })
}

const isPassThrough = (res: Response) => res.headers.get('x-middleware-next') === '1'
const localeSet = (res: Response) =>
  (res as import('next/server').NextResponse).cookies.get('locale')

beforeEach(() => {
  tokenCookie = undefined
  vi.stubEnv('ADMIN_PASSWORD', 's3cret')
  vi.spyOn(console, 'log').mockImplementation(() => {})
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('proxy: /admin basic auth', () => {
  it('lets a correct password through, whatever the username', async () => {
    expect(
      isPassThrough(
        await proxy(
          req('/admin/translations', {
            authorization: basic('anyone', 's3cret'),
          })
        )
      )
    ).toBe(true)
    expect(isPassThrough(await proxy(req('/admin', { authorization: basic('', 's3cret') })))).toBe(
      true
    )
  })

  it('accepts passwords that contain a colon', async () => {
    vi.stubEnv('ADMIN_PASSWORD', 'pa:ss:word')
    const res = await proxy(req('/admin', { authorization: basic('u', 'pa:ss:word') }))
    expect(isPassThrough(res)).toBe(true)
  })

  it.each([
    ['no header', undefined],
    ['wrong password', basic('u', 'nope')],
    ['password that is a prefix of the real one', basic('u', 's3cre')],
    ['password that extends the real one', basic('u', 's3cret!')],
    ['empty password', basic('u', '')],
    ['non-basic scheme', 'Bearer s3cret'],
    ['lowercase scheme', `basic ${Buffer.from('u:s3cret').toString('base64')}`],
    ['garbage base64', 'Basic %%%'],
  ])('rejects %s with a 401 and a Basic challenge', async (_label, authorization) => {
    const res = await proxy(req('/admin/translations', authorization ? { authorization } : {}))
    expect(res.status).toBe(401)
    expect(res.headers.get('www-authenticate')).toMatch(/^Basic realm=/)
  })

  it.each([[undefined], ['']])('fails closed when ADMIN_PASSWORD is %j', async value => {
    if (value === undefined) vi.stubEnv('ADMIN_PASSWORD', undefined as unknown as string)
    else vi.stubEnv('ADMIN_PASSWORD', value)
    // an empty password against an unset/empty secret must NOT match
    const res = await proxy(req('/admin', { authorization: basic('u', '') }))
    expect(res.status).toBe(401)
  })

  it('does not gate look-alike paths', async () => {
    const res = await proxy(req('/administrator'))
    expect(res.status).toBe(200)
  })

  it('checks admin auth before the user-token rule and before locale handling', async () => {
    const res = await proxy(req('/admin', { 'accept-language': 'de' }))
    expect(res.status).toBe(401)
    expect(res.headers.get('set-cookie')).toBeNull()
  })
})

describe('proxy: /user protection', () => {
  it.each(['/user', '/user/wallet', '/user/tickets/123'])(
    'redirects %s to login with a return path when there is no token',
    async path => {
      const res = await proxy(req(path))
      expect(res.status).toBe(307)
      const location = new URL(res.headers.get('location') as string)
      expect(location.pathname).toBe('/login')
      expect(location.searchParams.get('from')).toBe(path)
      expect(location.searchParams.get('error')).toBe('You must be logged in')
    }
  )

  it('lets logged-in users through', async () => {
    tokenCookie = 'jwt'
    expect(isPassThrough(await proxy(req('/user/wallet')))).toBe(true)
  })

  it.each(['/', '/live', '/casino', '/login'])('does not require a token for %s', async path => {
    expect(isPassThrough(await proxy(req(path)))).toBe(true)
  })
})

describe('proxy: locale cookie', () => {
  it.each([
    ['de-DE,de;q=0.9,en;q=0.8', 'de'],
    ['tr', 'tr'],
    ['en-US,en;q=0.9', 'en'],
    ['de', 'de'],
  ])('picks the first language of %j -> %s', async (acceptLanguage, expected) => {
    const res = await proxy(req('/', { 'accept-language': acceptLanguage }))
    expect(localeSet(res)?.value).toBe(expected)
  })

  it.each([['fr-FR,fr;q=0.9'], ['*'], ['']])(
    'falls back to en for unsupported %j',
    async acceptLanguage => {
      const res = await proxy(req('/', { 'accept-language': acceptLanguage }))
      expect(localeSet(res)?.value).toBe('en')
    }
  )

  it('falls back to en without an Accept-Language header', async () => {
    expect(localeSet(await proxy(req('/')))?.value).toBe('en')
  })

  it('does not look past the first listed language', async () => {
    // user prefers French first; German being listed later must not win
    const res = await proxy(req('/', { 'accept-language': 'fr,de;q=0.8' }))
    expect(localeSet(res)?.value).toBe('en')
  })

  it('never overwrites a locale the user already has', async () => {
    const res = await proxy(req('/', { cookie: 'locale=tr', 'accept-language': 'de' }))
    expect(isPassThrough(res)).toBe(true)
    expect(localeSet(res)).toBeUndefined()
  })

  it('sets a path-wide cookie that lasts a year', async () => {
    const cookie = localeSet(await proxy(req('/', { 'accept-language': 'de' })))
    expect(cookie?.path).toBe('/')
    expect(cookie?.maxAge).toBe(60 * 60 * 24 * 365)
  })

  it('also sets the locale on authenticated /user pages', async () => {
    tokenCookie = 'jwt'
    const res = await proxy(req('/user/account', { 'accept-language': 'tr' }))
    expect(localeSet(res)?.value).toBe('tr')
  })
})
