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

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  preferredCurrency: string
  language: string
  status: string
  kycStatus: string
  lastLoginAt: string
  registeredAt: string
}

export interface Wallet {
  id: string
  currency: string
  balance: string
  isActive: boolean
}

export interface Transaction {
  id: string
  walletId: string
  type: 'CREDIT' | 'DEBIT'
  amount: string
  balanceBefore: string
  balanceAfter: string
  description: string | null
  createdAt: string
}

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
