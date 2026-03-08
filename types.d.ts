export interface Game {
  id: string
  uuid: string
  name: string
  type: string
  providerName: string
  providerSlug: string
  image: string
  technology: string
  isMobile: boolean
  hasFreespins: boolean
  hasLobby: boolean
  playCount: number
  createdAt: string
  isNew: boolean
}

export interface GamesResponse {
  items: Game[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface GameProvider {
  id: string
  name: string
  providerSlug: string
  gamesCount: number
}

export type ProvidersResponse = GameProvider[]

export interface Tag {
  code: string
  label: string
  gamesCount: number
}
export type TagsResponse = Tag[]
