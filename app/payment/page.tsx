import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { Activity } from 'react'
import BalanceCard from '@/app/payment/balance-card'
import { transactionsQuery } from '@/app/payment/context'
import DepositWithdrawal from '@/app/payment/deposit-withdrawal'
import Header from '@/app/payment/header'
import QuickStats from '@/app/payment/quick-stats'
import TransactionHistory from '@/app/payment/transaction-history'
import WalletError from '@/app/payment/wallet-error'
import { getUser, getUserWallet, logout } from '@/lib/auth'
import { formatBalance } from '@/lib/utils'

// const mockTransactions: Transaction[] = [
//   {
//     id: '1',
//     date: '2024-03-20',
//     type: 'deposit',
//     method: 'Credit Card',
//     amount: 100,
//     status: 'completed',
//   },
//   {
//     id: '2',
//     date: '2024-03-18',
//     type: 'withdrawal',
//     method: 'Bank Transfer',
//     amount: 250,
//     status: 'completed',
//   },
//   {
//     id: '3',
//     date: '2024-03-15',
//     type: 'deposit',
//     method: 'PayPal',
//     amount: 50,
//     status: 'completed',
//   },
//   {
//     id: '4',
//     date: '2024-03-12',
//     type: 'deposit',
//     method: 'Crypto',
//     amount: 200,
//     status: 'pending',
//   },
//   {
//     id: '5',
//     date: '2024-03-10',
//     type: 'withdrawal',
//     method: 'PayPal',
//     amount: 100,
//     status: 'completed',
//   },
// ]

export default async function Payment() {
  const user = await getUser()
  if (!user) {
    logout()
    redirect('/login?error=You must be logged in&from=/payment', 'replace')
  }

  const wallet = await getUserWallet(user.preferredCurrency)

  const queryClient = new QueryClient()
  queryClient.prefetchInfiniteQuery({
    queryKey: ['transactions'],
    initialPageParam: null,
    queryFn: transactionsQuery,
  })

  // const balance = formatBalance(Number(wallet.balance), user.preferredCurrency)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='z-1 min-h-screen pt-12 pb-24'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
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

          <TransactionHistory />
        </div>
      </main>
      <Activity mode={!wallet ? 'visible' : 'hidden'}>
        <WalletError />
      </Activity>
    </HydrationBoundary>
  )
}
