'use client'
import { environmentManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { cx } from 'class-variance-authority'
import { atom, useAtomValue } from 'jotai'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { Toaster } from '@/components/ui/sonner'
import { RelayProvider } from '@/relay/relay-provider'
import type { User, Wallet } from '@/types'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({
  children,
  ...props
}: { children: React.ReactNode } & UserContext) {
  const queryClient = getQueryClient()

  return (
    <RelayProvider>
      <QueryClientProvider client={queryClient}>
        <LoadingOverlay />
        <UserProvider {...props}>{children}</UserProvider>
        <Toaster position='top-center' />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RelayProvider>
  )
}

type UserContext = { user: User | null; wallet: Wallet | null }
type UserContextValue = UserContext & { clearUser: () => void }

const UserContext = createContext<UserContextValue>({
  user: null,
  wallet: null,
  clearUser: () => {},
})

export function useUser() {
  return useContext(UserContext)
}

function UserProvider({
  children,
  ...incoming
}: {
  children: React.ReactNode
} & UserContext) {
  const [state, setState] = useState<UserContext>(incoming)

  // biome-ignore lint/correctness/useExhaustiveDependencies: id keeps this a no-op on unrelated re-renders
  useEffect(() => {
    setState(prev => (prev.user?.id === incoming.user?.id ? prev : incoming))
  }, [incoming.user?.id])

  const clearUser = useCallback(() => {
    setState(prev =>
      prev.user === null && prev.wallet === null ? prev : { user: null, wallet: null }
    )
  }, [])

  return <UserContext.Provider value={{ ...state, clearUser }}>{children}</UserContext.Provider>
}

export const isLoadingOverlayState = atom(false)
function LoadingOverlay() {
  const isLoading = useAtomValue(isLoadingOverlayState)

  return (
    <div
      className={cx(
        isLoading ? 'flex' : 'hidden',
        'fixed top-0 left-0 isolate z-100 h-dvh w-dvw items-center justify-center overflow-hidden bg-black/30 text-white backdrop-blur-xs'
      )}
    >
      <BarLoader color='#ffffff' />
    </div>
  )
}
