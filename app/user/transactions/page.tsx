import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { Activity } from 'react'
import { transactionsQuery } from '@/app/user/context'
import Header from '@/app/user/header'
import TransactionHistory from '@/app/user/transactions/transaction-history'
import WalletError from '@/app/user/wallet-error'
import { getUser, getUserWallet } from '@/lib/auth'

export default async function Transactions() {
  const user = await getUser()
  if (!user) redirect(`/login?error=You must be logged in&from=/user/wallet`, 'replace')

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
