// app/live/store.ts
'use client'
import { atom } from 'jotai'

export type LiveSortMode = 'tournament' | 'time'
export type LiveViewMode = 'list' | 'single'

export const liveSportState = atom<string | null>(null)
export const liveSortState = atom<LiveSortMode>('tournament')
export const liveViewState = atom<LiveViewMode>('list')
export const liveSelectedEventState = atom<string | null>(null)
