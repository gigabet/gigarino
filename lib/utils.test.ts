import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addToDate,
  createSSEStream,
  getRelativeDayLabel,
  initials,
  isAuthError,
  nCk,
  pairToHues,
  safeRelativePath,
  stringToHue,
  stripCategory,
} from '@/lib/utils'

describe('safeRelativePath', () => {
  it.each([['/'], ['/event/1'], ['/live?tab=football'], ['/user/wallet#deposit']])(
    'allows same-origin path %j',
    path => {
      expect(safeRelativePath(path)).toBe(path)
    }
  )

  it.each([
    [null],
    [undefined],
    [''],
    ['event/1'],
    ['https://evil.com'],
    ['http://evil.com/x'],
    ['javascript:alert(1)'],
    ['//evil.com'],
    ['///evil.com'],
    ['/\\evil.com'],
  ])('rejects %j', path => {
    expect(safeRelativePath(path)).toBe('/')
  })

  it('uses the supplied fallback', () => {
    expect(safeRelativePath('//evil.com', '/live')).toBe('/live')
    expect(safeRelativePath(null, '/live')).toBe('/live')
  })

  // Browsers strip ASCII tab/CR/LF anywhere in a URL before parsing, so "/\t/evil.com" is
  // resolved as "//evil.com" (protocol-relative) -> open redirect.
  it.each([
    ['/\t/evil.com'],
    ['/\n/evil.com'],
    ['/\r/evil.com'],
    ['/\t\\evil.com'],
    ['/\r\n/evil.com'],
  ])('rejects %j, which browsers resolve to another origin', sneaky => {
    expect(new URL(sneaky, 'https://site.test').origin).not.toBe('https://site.test') // premise
    expect(safeRelativePath(sneaky)).toBe('/')
  })

  it('still allows a path that merely contains a tab or newline after the first segment', () => {
    expect(safeRelativePath('/search?q=a\tb')).toBe('/search?q=a\tb')
  })
})

describe('stripCategory', () => {
  it.each([
    ['England Premier League', 'England', 'Premier League'],
    ['england premier league', 'ENGLAND', 'premier league'],
    ['Premier League England', 'England', 'Premier League'],
    ['England - Premier League', 'England', 'Premier League'],
    ['England: Premier League', 'England', 'Premier League'],
    ['Premier England League', 'England', 'Premier League'],
    ['Türkiye Süper Lig', 'Türkiye', 'Süper Lig'],
    ['U.S. Open', 'U.S.', 'Open'],
  ])('%j minus %j -> %j', (name, category, expected) => {
    expect(stripCategory(name, category)).toBe(expected)
  })

  it('does not cut into the end of longer words', () => {
    expect(stripCategory('Australian Championship', 'Australia')).toBe('Australian Championship')
    expect(stripCategory('Ägyptische Liga', 'Ägypt')).toBe('Ägyptische Liga')
  })

  it('does not cut into the start of longer words', () => {
    expect(stripCategory('Switzerland Super League', 'land')).toBe('Switzerland Super League')
    // "É" is not an ASCII word char, so a plain \b boundary would wrongly strip "ire" here
    expect(stripCategory('Éire Cup', 'ire')).toBe('Éire Cup')
  })

  it('treats regex metacharacters in the category literally', () => {
    expect(stripCategory('Anything Cup', '.*')).toBe('Anything Cup')
    expect(stripCategory('Cup (Women)', '(Women)')).toBe('Cup')
  })

  it('falls back to the full name when nothing meaningful remains', () => {
    expect(stripCategory('England', 'England')).toBe('England')
    expect(stripCategory('England - ', 'England')).toBe('England - ')
  })

  it('returns the name untouched for an empty category', () => {
    expect(stripCategory('Premier League', '')).toBe('Premier League')
  })
})

describe('nCk', () => {
  it.each([
    [5, 2, 10],
    [4, 1, 4],
    [6, 3, 20],
    [10, 5, 252],
    [52, 5, 2598960],
    [30, 15, 155117520],
  ])('C(%i, %i) = %i', (n, k, expected) => {
    expect(nCk(n, k)).toBe(expected)
  })

  it('handles the edges', () => {
    expect(nCk(0, 0)).toBe(1)
    expect(nCk(7, 0)).toBe(1)
    expect(nCk(7, 7)).toBe(1)
    expect(nCk(3, 4)).toBe(0)
    expect(nCk(3, -1)).toBe(0)
  })

  it('is symmetric', () => {
    for (let n = 0; n <= 20; n++) {
      for (let k = 0; k <= n; k++) expect(nCk(n, k)).toBe(nCk(n, n - k))
    }
  })
})

describe('initials', () => {
  it.each([
    ['Real Madrid', 'RM'],
    ['  real   madrid  ', 'RM'],
    ['Arsenal', 'AR'],
    ['A', 'A'],
    ['Manchester United FC', 'MU'],
    ['Team (U21)', 'TU'],
    ['Inter 2', 'IN'],
    ['élan sportif', 'ÉS'],
  ])('%j -> %j', (name, expected) => {
    expect(initials(name)).toBe(expected)
  })

  it.each([[''], ['   '], ['(1)'], ['12'], ['()']])('falls back to "?" for %j', name => {
    expect(initials(name)).toBe('?')
  })
})

describe('addToDate', () => {
  it('adds hours and days in absolute time', () => {
    expect(addToDate('2026-11-19T10:00:00Z', 5, 'HOURS').toISOString()).toBe(
      '2026-11-19T15:00:00.000Z'
    )
    expect(addToDate('2026-11-19T10:00:00Z', 2, 'DAYS').toISOString()).toBe(
      '2026-11-21T10:00:00.000Z'
    )
  })

  it('supports negative amounts and crosses month/year boundaries', () => {
    expect(addToDate('2026-12-31T23:00:00Z', 2, 'HOURS').toISOString()).toBe(
      '2027-01-01T01:00:00.000Z'
    )
    expect(addToDate('2026-03-01T00:00:00Z', -1, 'DAYS').toISOString()).toBe(
      '2026-02-28T00:00:00.000Z'
    )
  })

  it('throws on an invalid date instead of returning Invalid Date', () => {
    expect(() => addToDate('not a date', 1, 'DAYS')).toThrow('Invalid ISO date: not a date')
  })
})

describe('isAuthError', () => {
  it.each([
    [new Error('You must be logged in')],
    [new Error('401 Unauthorized')],
    [new Error('jwt expired')],
    [new Error('Invalid token')],
    ['Authentication failed'],
  ])('detects %j', error => {
    expect(isAuthError(error)).toBe(true)
  })

  it.each([
    [new Error('Failed to fetch')],
    [new Error('Internal server error')],
    [null],
    [undefined],
  ])('ignores %j', error => {
    expect(isAuthError(error)).toBe(false)
  })
})

describe('getRelativeDayLabel', () => {
  // Wednesday 18 Nov 2026, local time (date-fns works in local time)
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 18, 12, 0))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    [new Date(2026, 10, 18, 0, 0), 'Today'],
    [new Date(2026, 10, 18, 23, 59), 'Today'],
    [new Date(2026, 10, 19, 0, 0), 'Tomorrow'],
    [new Date(2026, 10, 17, 23, 59), 'Yesterday'],
    // the week runs Monday..Sunday
    [new Date(2026, 10, 16, 9, 0), 'Mon'],
    [new Date(2026, 10, 21, 9, 0), 'Sat'],
    [new Date(2026, 10, 22, 23, 59), 'Sun'],
    // outside this week: date instead of weekday
    [new Date(2026, 10, 23, 0, 0), '23 Nov'],
    [new Date(2026, 10, 15, 23, 59), '15 Nov'],
    [new Date(2027, 0, 5, 12, 0), '5 Jan'],
  ])('%s -> %s', (date, expected) => {
    expect(getRelativeDayLabel(date)).toBe(expected)
  })
})

describe('stringToHue / pairToHues', () => {
  const names = ['Arsenal', 'Real Madrid', 'Barcelona', 'FC Ü', '', 'a', 'aa', 'ab', 'ba']

  it('stringToHue is deterministic and within [0, 360)', () => {
    for (const n of names) {
      const hue = stringToHue(n)
      expect(hue).toBe(stringToHue(n))
      expect(hue).toBeGreaterThanOrEqual(0)
      expect(hue).toBeLessThan(360)
      expect(Number.isInteger(hue)).toBe(true)
    }
  })

  it('pairToHues is order-independent and always keeps the two hues >= 90 degrees apart', () => {
    // hues are used in CSS hsl(), where they wrap, so compare modulo 360
    const wrap = (h: number) => ((h % 360) + 360) % 360
    for (const a of names) {
      for (const b of names) {
        const [h1, h2] = pairToHues(a, b)
        expect(pairToHues(b, a)).toEqual([h1, h2])
        const diff = Math.abs(wrap(h1) - wrap(h2))
        expect(Math.min(diff, 360 - diff)).toBeGreaterThanOrEqual(90)
      }
    }
  })
})

describe('createSSEStream', () => {
  class MockEventSource {
    static instances: MockEventSource[] = []
    onmessage: ((e: { data: string }) => void) | null = null
    onerror: (() => void) | null = null
    close = vi.fn()
    constructor(readonly url: string) {
      MockEventSource.instances.push(this)
    }
    emit(data: unknown) {
      this.onmessage?.({
        data: typeof data === 'string' ? data : JSON.stringify(data),
      })
    }
  }
  const msg = (id: string) => ({ id, timestamp: 1, data: id })
  const HANG = Symbol('hang')
  const settleWithin = <T>(p: Promise<T>, ms = 25) =>
    Promise.race([p, new Promise<typeof HANG>(r => setTimeout(() => r(HANG), ms))])

  let es: MockEventSource
  const open = (signal: AbortSignal) => {
    const iterator = createSSEStream<string>('/stream', signal)[Symbol.asyncIterator]()
    es = MockEventSource.instances.at(-1) as MockEventSource
    return iterator
  }

  beforeEach(() => {
    MockEventSource.instances = []
    vi.stubGlobal('EventSource', MockEventSource)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('opens the given url', () => {
    open(new AbortController().signal)
    expect(es.url).toBe('/stream')
  })

  it('delivers messages that arrive before and after next() is called, in order', async () => {
    const it = open(new AbortController().signal)
    es.emit(msg('1'))
    es.emit(msg('2'))
    expect((await it.next()).value?.id).toBe('1')
    expect((await it.next()).value?.id).toBe('2')

    const pending = it.next()
    es.emit(msg('3'))
    expect((await pending).value?.id).toBe('3')
  })

  it('skips malformed messages without ending the stream', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const it = open(new AbortController().signal)
    es.emit('{not json')
    es.emit(msg('ok'))
    expect((await it.next()).value?.id).toBe('ok')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('aborting while waiting completes the pending next() and closes the source', async () => {
    const ctrl = new AbortController()
    const it = open(ctrl.signal)
    const pending = it.next()
    ctrl.abort()
    expect((await pending).done).toBe(true)
    expect(es.close).toHaveBeenCalled()
  })

  it('an error drains already-queued messages first, then completes', async () => {
    const it = open(new AbortController().signal)
    es.emit(msg('1'))
    es.onerror?.()
    expect((await it.next()).value?.id).toBe('1')
    expect((await it.next()).done).toBe(true)
    expect(es.close).toHaveBeenCalled()
  })

  it('an error while waiting completes the pending next()', async () => {
    const it = open(new AbortController().signal)
    const pending = it.next()
    es.onerror?.()
    expect((await pending).done).toBe(true)
  })

  it('completes immediately and closes the source if the signal is already aborted', async () => {
    const ctrl = new AbortController()
    ctrl.abort()
    const it = open(ctrl.signal)
    const result = await settleWithin(it.next())
    expect(result).not.toBe(HANG)
    expect(result).toEqual({ done: true, value: undefined })
    expect(es.close).toHaveBeenCalled()
  })
})
