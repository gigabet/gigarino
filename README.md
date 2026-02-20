# API

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [API](#api)
  - [Casino Page API](#casino-page-api)
    - [`games` request](#games-request)
    - [`vendors` request](#vendors-request)
    - [`playgame` request](#playgame-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Casino Page API

For slot and live casino pages.

### `games` request

Returns up to 16 games that match any of the selected filters.

**Params:**

```ts
interface GamesRequest {
  name?: string // partial match (used for searching)
  vendor?: string // partial match (used for searching)
  category?: string // Slotegrator tag, e.g. "jackpot", "christmas"
  isLive?: boolean // live or slot casino
  isNew?: boolean
  isTrending?: boolean
  page?: number = 1 // batch of 16; 1 = row 0-15, 2 = row 16-31, etc.
}
```

**Response:**

```ts
interface GamesResponse {
  success: boolean
  error?: string
  pages: number // how many batches of 16, rounded up
  page: number // the current batch (starts at 1)
  payload: {
    id: number // game ID
    name: string // game name
    thumbnail: string // game thumbnail url
    vendor: string // game provider name
    category: string // Slotegrator tag, e.g. "jackpot", "christmas"
    isLive?: true // if the game is in a live casino
    isNew?: true // if the game appears in the new games section
    isTrending?: true // if the game is a popular game (book of ra, starburst, etc)
  }[] // up to 16 games
}
```

### `vendors` request

Returns a list of available game vendors, e.g. Pragmatic, NetEnt

**Params:**

```ts
interface VendorsRequest {
  isLive?: boolean // live or slot casino; if missing, return both
}
```

**Response:**

```ts
interface VendorsResponse {
  success: boolean
  error?: string
  payload: {
    name: string // vendor name
    logo: string // vendor logo url
    games: number // number of games that the vendor has
  }[]
}
```

### `playgame` request

Plays a casino game. TBD.
