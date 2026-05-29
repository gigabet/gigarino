import type { PlayerProfileDto, WalletBalanceDto, WalletTransactionDto } from '@/types'

export * from '@/api/generated'

export type ReplaceKey<T, K extends keyof T, NewType> = {
  [P in keyof T]: P extends K ? NewType : T[P]
}

export type ReplaceKeys<T, R extends Partial<Record<keyof T, unknown>>> = {
  [P in keyof T]: P extends keyof R ? R[P] : T[P]
}

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}

export interface ErrorResponse {
  statusCode: number
  message: string | string[]
  error: string
}

export type User = PlayerProfileDto

export type Wallet = WalletBalanceDto

export type Transaction = WalletTransactionDto

export interface BalanceUpdate {
  playerId: string
  currency: string
  balance: string
  change: string
  type: 'CREDIT' | 'DEBIT'
  reason: string
  timestamp: string
}

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
