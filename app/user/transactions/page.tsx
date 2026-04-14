import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Activity } from 'react'
import Header from '@/app/user/header'
import { transactionsQuery } from '@/app/user/wallet/context'
import TransactionHistory from '@/app/user/wallet/transaction-history'
import WalletError from '@/app/user/wallet-error'
import { getUser, getUserWallet } from '@/lib/auth'

export default async function Transactions() {
  const user = await getUser()
  if (!user) return null
  const wallet = await getUserWallet(user.preferredCurrency)

  const queryClient = new QueryClient()
  queryClient.prefetchInfiniteQuery({
    queryKey: ['transactions', user.id],
    initialPageParam: null,
    queryFn: transactionsQuery,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='z-1 min-h-screen grow'>
        <Header title='Transactions' subtitle='View all your transactions' />
        <TransactionHistory id={user.id} />
      </main>
      <Activity mode={!wallet ? 'visible' : 'hidden'}>
        <WalletError />
      </Activity>
    </HydrationBoundary>
  )
}
