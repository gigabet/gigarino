import { describe, expect, it } from 'vitest'
import {
  fitOutcomeLabels,
  shortOutcomeKey,
  shortOutcomeName,
  translateMarketKind,
  translateMarketName,
  translateOutcomeKey,
  translateOutcomeName,
  translateSportName,
} from '@/lib/api-names'

// stands in for t() in another language: tags whatever it is asked to translate
const t = (key: string) => `<${key}>`

describe('translateSportName', () => {
  it('translates known sports by key', () => {
    expect(translateSportName(t, 'ice-hockey', 'Ice Hockey')).toBe('<Ice Hockey>')
  })

  it('passes unknown sports through as sent', () => {
    expect(translateSportName(t, 'curling', 'Curling')).toBe('Curling')
    expect(translateSportName(t, 'constructor', 'Constructor')).toBe('Constructor')
  })
})

describe('translateMarketKind', () => {
  it('translates known kinds', () => {
    expect(translateMarketKind(t, 'match_winner')).toBe('<Match Winner>')
    expect(translateMarketKind(t, 'correct_score')).toBe('<Correct Score>')
  })

  it('prettifies unknown kinds', () => {
    expect(translateMarketKind(t, 'first_goal_scorer')).toBe('first goal scorer')
  })
})

describe('translateMarketName', () => {
  it.each([
    ['Fulltime Result', '<Fulltime Result>'],
    ['Over/Under 2.5', '<Over/Under> 2.5'],
    ['Handicap -1.5', '<Handicap> -1.5'],
    ['Next Goal', 'Next Goal'],
    ['', ''],
  ])('%j -> %j', (name, expected) => {
    expect(translateMarketName(t, name)).toBe(expected)
  })
})

describe('translateOutcomeKey', () => {
  it.each([
    ['over', '<Over>'],
    ['draw', '<Draw>'],
    ['home', '<Home>'],
    ['away', '<Away>'],
    ['2-1', '2-1'],
  ])('%j -> %j', (key, expected) => {
    expect(translateOutcomeKey(t, key)).toBe(expected)
  })
})

describe('translateOutcomeName', () => {
  it.each([
    ['Over', '<Over>'],
    ['Under 2.5', '<Under> 2.5'],
    ['Home', '<Home>'],
    ['Home +1.5', '<Home> +1.5'],
    ['Home or Draw', '<Home> <or> <Draw>'],
    ['Draw or Away', '<Draw> <or> <Away>'],
    ['Yes', '<Yes>'],
    // team names, scores and anything else with a foreign word pass through
    ['Arsenal', 'Arsenal'],
    ['Over Rhine FC', 'Over Rhine FC'],
    ['2-1', '2-1'],
    ['Home or Arsenal', 'Home or Arsenal'],
  ])('%j -> %j', (name, expected) => {
    expect(translateOutcomeName(t, name)).toBe(expected)
  })
})

describe('shortOutcomeKey / shortOutcomeName', () => {
  it.each([
    ['home', '1'],
    ['draw', 'X'],
    ['away', '2'],
    ['over', null],
    ['2-1', null],
  ])('key %j -> %j', (key, expected) => {
    expect(shortOutcomeKey(key)).toBe(expected)
  })

  it.each([
    ['Home', '1'],
    ['Draw', 'X'],
    ['Away', '2'],
    ['Home or Draw', '1X'],
    ['Draw or Away', 'X2'],
    ['Home or Away', '12'],
    ['Home +1.5', '1 +1.5'],
    ['Over 2.5', null],
    ['Arsenal', null],
    ['Home or Arsenal', null],
  ])('name %j -> %j', (name, expected) => {
    expect(shortOutcomeName(name)).toBe(expected)
  })
})

describe('fitOutcomeLabels', () => {
  const items = [
    { label: 'Ev Sahibi', short: '1' },
    { label: 'Beraberlik', short: 'X' },
    { label: 'Deplasman', short: '2' },
  ]

  it('keeps the labels when they fit', () => {
    expect(fitOutcomeLabels(items, 10)).toEqual([
      { text: 'Ev Sahibi' },
      { text: 'Beraberlik' },
      { text: 'Deplasman' },
    ])
  })

  it('switches every outcome to its tag when one label is too long', () => {
    expect(fitOutcomeLabels(items, 8)).toEqual([
      { text: '1', title: 'Ev Sahibi' },
      { text: 'X', title: 'Beraberlik' },
      { text: '2', title: 'Deplasman' },
    ])
  })

  it('does not switch when an outcome has no tag', () => {
    const mixed = [
      { label: 'Üst 2.5', short: null },
      { label: 'Alt 2.5 ve fazlası', short: null },
    ]
    expect(fitOutcomeLabels(mixed, 8)).toEqual([
      { text: 'Üst 2.5' },
      { text: 'Alt 2.5 ve fazlası' },
    ])
  })
})
