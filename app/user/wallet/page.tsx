import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { Activity } from 'react'
import BalanceCard from '@/app/user/wallet/balance-card'
import { transactionsQuery } from '@/app/user/wallet/context'
import DepositWithdrawal from '@/app/user/wallet/deposit-withdrawal'
import Header from '@/app/user/wallet/header'
import QuickStats from '@/app/user/wallet/quick-stats'
import TransactionHistory from '@/app/user/wallet/transaction-history'
import WalletError from '@/app/user/wallet/wallet-error'
import { getUser, getUserWallet, logout } from '@/lib/auth'
import { formatBalance } from '@/lib/utils'

export default async function Wallet() {
  const user = await getUser()
  if (!user) {
    logout()
    redirect('/login?error=You must be logged in&from=/user/wallet', 'replace')
  }

  const wallet = await getUserWallet(user.preferredCurrency)

  const queryClient = new QueryClient()
  queryClient.prefetchInfiniteQuery({
    queryKey: ['transactions', user.id],
    initialPageParam: null,
    queryFn: transactionsQuery,
  })

  // const balance = formatBalance(Number(wallet.balance), user.preferredCurrency)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='z-1 min-h-screen grow'>
        <Header />

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='flex flex-col gap-6 md:flex-row lg:block lg:space-y-6'>
            <BalanceCard
              balance={formatBalance(Number(wallet?.balance) || 0, user.preferredCurrency)}
            />
            <QuickStats />
          </div>

          <DepositWithdrawal />
        </div>

        <TransactionHistory id={user.id} />
      </main>
      <Activity mode={!wallet ? 'visible' : 'hidden'}>
        <WalletError />
      </Activity>
    </HydrationBoundary>
  )
}
