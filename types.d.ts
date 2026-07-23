import type {
  AvailablePromotionDto,
  DepositMatchRulesDto,
  FreespinGrantRulesDto,
  LossCashbackRulesDto,
  PlayerProfileDto,
  WalletBalanceDto,
  WalletTransactionDto,
} from '@/types'

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

export type Sport = 'football' | 'basketball' | 'tennis' | 'ice-hockey'
// | 'volleyball' | 'handball' | 'baseball' | 'american-football' | 'rugby-union' | 'rugby-league' | 'cricket' | 'darts' | 'snooker' | 'table-tennis' | 'mma' | 'boxing'

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

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

export type DepositMatchPromotion = ReplaceKeys<
  AvailablePromotionDto,
  { type: 'DEPOSIT_MATCH'; rules: DepositMatchRulesDto }
>

export type FreespinGrantPromotion = ReplaceKeys<
  AvailablePromotionDto,
  { type: 'FREESPIN_GRANT'; rules: FreespinGrantRulesDto }
>

export type LossCashbackPromotion = ReplaceKeys<
  AvailablePromotionDto,
  { type: 'LOSS_CASHBACK'; rules: LossCashbackRulesDto }
>

export type BetItemStatus = 'LOST' | 'PENDING' | 'PUSH' | 'VOID' | 'WON'

export type BetRejectionCode =
  | 'CASHOUT_UNAVAILABLE'
  | 'CUTOFF_PASSED'
  | 'DUPLICATE_EVENT'
  | 'EVENT_NOT_BETTABLE'
  | 'INSUFFICIENT_FUNDS'
  | 'INTERNAL_ERROR'
  | 'LIABILITY_LIMIT'
  | 'ODDS_LIMIT'
  | 'OUTCOME_NOT_AVAILABLE'
  | 'PRICE_CHANGED'
  | 'PROVIDER_CURRENCY'
  | 'STAKE_LIMIT'
  | 'SYSTEM_NOT_SUPPORTED'
  | 'WALLET_UNAVAILABLE'

export type BetslipItemAvailability =
  | 'AVAILABLE'
  | 'CUTOFF_PASSED'
  | 'DUPLICATE_EVENT'
  | 'EVENT_NOT_BETTABLE'
  | 'NOT_FOUND'
  | 'SUSPENDED'

export type EventStatus = 'ABANDONED' | 'CANCELLED' | 'ENDED' | 'LIVE' | 'POSTPONED' | 'SCHEDULED'

export type LiveEventState = 'ENDED' | 'LIVE' | 'SUSPENDED'

export type MarketGroup =
  | 'CARDS'
  | 'CORNERS'
  | 'GOALS'
  | 'MAIN'
  | 'PENALTIES'
  | 'PLAYERS'
  | 'SPECIAL'

export type MarketPeriod =
  | 'FIRST_HALF'
  | 'FIRST_PERIOD'
  | 'FIRST_SET'
  | 'FOURTH_PERIOD'
  | 'FULL_TIME'
  | 'INCLUDING_OVERTIME'
  | 'SECOND_HALF'
  | 'SECOND_PERIOD'
  | 'SECOND_SET'
  | 'THIRD_PERIOD'
  | 'THIRD_SET'

export type MarketStatus = 'CLOSED' | 'OPEN' | 'SUSPENDED'

export type OddsChangePolicy = 'ACCEPT_ANY' | 'ACCEPT_HIGHER' | 'REJECT'

export type OutcomeStatus = 'OPEN' | 'REMOVED' | 'SUSPENDED'

export type TicketStatus =
  | 'ACCEPTED'
  | 'CASHED_OUT'
  | 'LOST'
  | 'PARTIALLY_CASHED_OUT'
  | 'PENDING_ACCEPTANCE'
  | 'REJECTED'
  | 'VOID'
  | 'WON'

export type TicketType = 'MULTIPLE' | 'SINGLE' | 'SYSTEM'

export type TradingStatus = 'CLOSED' | 'OPEN' | 'SUSPENDED'
