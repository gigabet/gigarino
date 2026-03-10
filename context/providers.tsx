'use client'
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { cx } from 'class-variance-authority'
import { atom, useAtomValue } from 'jotai'
import { BarLoader } from 'react-spinners'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Loading />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export const isLoadingOverlayState = atom(false)
function Loading() {
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
