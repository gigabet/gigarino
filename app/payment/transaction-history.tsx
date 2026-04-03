'use client'
import { format } from 'date-fns'
import { sortBy } from 'lodash'
import { ChevronRightIcon, HistoryIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import type { Transaction } from '@/types'

export default function TransactionHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='mt-8'
    >
      <div className='rounded-2xl border border-white/10 bg-[#141414] p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='flex items-center gap-2 text-lg font-bold text-white'>
            <HistoryIcon className='text-primary h-5 w-5' />
            Recent Transactions
          </h3>
          <Button variant='ghost' className='text-primary hover:bg-primary/10 hover:text-[#a8d94a]'>
            View All
            <ChevronRightIcon className='ml-1 h-4 w-4' />
          </Button>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full overflow-x-auto'>
            <thead>
              <tr className='border-b border-white/10'>
                <th className='min-w-30 px-4 py-3 text-left text-sm font-medium text-gray-400'>
                  Date
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-400'>Type</th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-400'>
                  Description
                </th>
                <th className='px-4 py-3 text-right text-sm font-medium text-gray-400'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map(tx => (
                <tr
                  key={tx.id}
                  className='border-b border-white/5 transition-colors hover:bg-white/5'
                >
                  <td className='px-4 py-4 font-mono text-sm text-gray-300'>
                    {format(tx.createdAt, 'dd MMM Y')}
                  </td>
                  <td className='px-4 py-4'>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        tx.type === 'CREDIT' ? 'text-sky-400' : 'text-red-400'
                      }`}
                    >
                      {tx.type === 'CREDIT' ? (
                        <PlusIcon className='h-4 w-4' />
                      ) : (
                        <MinusIcon className='h-4 w-4' />
                      )}
                      {tx.type.charAt(0) + tx.type.slice(1).toLowerCase()}
                    </div>
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-300'>{tx.description}</td>
                  <td className='px-4 py-4 text-right font-mono text-sm font-medium text-white'>
                    {tx.type === 'CREDIT' ? '+' : '-'}
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

const MOCK_TRANSACTIONS: Transaction[] = sortBy(
  [
    {
      id: 'tx_001',
      walletId: 'wallet_001',
      type: 'CREDIT' as Transaction['type'],
      amount: '100.00',
      balanceBefore: '250.00',
      balanceAfter: '350.00',
      description: 'Deposit',
      createdAt: '2026-04-03T09:15:23Z',
    },
    {
      id: 'tx_002',
      walletId: 'wallet_001',
      type: 'DEBIT' as Transaction['type'],
      amount: '25.00',
      balanceBefore: '350.00',
      balanceAfter: '325.00',
      description: 'Betslip 24501',
      createdAt: '2026-04-03T10:22:45Z',
    },
    {
      id: 'tx_003',
      walletId: 'wallet_001',
      type: 'DEBIT' as Transaction['type'],
      amount: '50.00',
      balanceBefore: '325.00',
      balanceAfter: '275.00',
      description: 'Slot casino',
      createdAt: '2026-04-02T22:15:10Z',
    },
    {
      id: 'tx_004',
      walletId: 'wallet_001',
      type: 'CREDIT' as Transaction['type'],
      amount: '87.50',
      balanceBefore: '275.00',
      balanceAfter: '362.50',
      description: 'Payout 89234',
      createdAt: '2026-04-02T23:45:30Z',
    },
    {
      id: 'tx_005',
      walletId: 'wallet_001',
      type: 'DEBIT' as Transaction['type'],
      amount: '30.00',
      balanceBefore: '362.50',
      balanceAfter: '332.50',
      description: 'Betslip 24502',
      createdAt: '2026-04-02T19:30:15Z',
    },
    {
      id: 'tx_006',
      walletId: 'wallet_001',
      type: 'CREDIT' as Transaction['type'],
      amount: '200.00',
      balanceBefore: '332.50',
      balanceAfter: '532.50',
      description: 'Deposit',
      createdAt: '2026-04-02T14:20:00Z',
    },
    {
      id: 'tx_007',
      walletId: 'wallet_001',
      type: 'DEBIT' as Transaction['type'],
      amount: '15.00',
      balanceBefore: '532.50',
      balanceAfter: '517.50',
      description: 'Slot casino',
      createdAt: '2026-04-02T13:45:22Z',
    },
    {
      id: 'tx_008',
      walletId: 'wallet_001',
      type: 'DEBIT' as Transaction['type'],
      amount: '100.00',
      balanceBefore: '517.50',
      balanceAfter: '417.50',
      description: 'Betslip 24503',
      createdAt: '2026-04-01T20:15:00Z',
    },
    {
      id: 'tx_009',
      walletId: 'wallet_001',
      type: 'CREDIT' as Transaction['type'],
      amount: '250.00',
      balanceBefore: '417.50',
      balanceAfter: '667.50',
      description: 'Payout 89235',
      createdAt: '2026-04-01T21:30:45Z',
    },
    {
      id: 'tx_010',
      walletId: 'wallet_001',
      type: 'DEBIT' as Transaction['type'],
      amount: '40.00',
      balanceBefore: '667.50',
      balanceAfter: '627.50',
      description: 'Slot casino',
      createdAt: '2026-04-01T18:10:33Z',
    },
    {
      id: 'tx_011',
      walletId: 'wallet_002',
      type: 'CREDIT' as Transaction['type'],
      amount: '500.00',
      balanceBefore: '0.00',
      balanceAfter: '500.00',
      description: 'Deposit',
      createdAt: '2026-04-03T08:00:00Z',
    },
    {
      id: 'tx_012',
      walletId: 'wallet_002',
      type: 'DEBIT' as Transaction['type'],
      amount: '75.00',
      balanceBefore: '500.00',
      balanceAfter: '425.00',
      description: 'Betslip 24504',
      createdAt: '2026-04-03T11:45:12Z',
    },
    {
      id: 'tx_013',
      walletId: 'wallet_002',
      type: 'CREDIT' as Transaction['type'],
      amount: '150.00',
      balanceBefore: '425.00',
      balanceAfter: '575.00',
      description: 'Refund',
      createdAt: '2026-04-02T16:20:00Z',
    },
    {
      id: 'tx_014',
      walletId: 'wallet_001',
      type: 'DEBIT' as Transaction['type'],
      amount: '20.00',
      balanceBefore: '627.50',
      balanceAfter: '607.50',
      description: 'Slot casino',
      createdAt: '2026-03-31T23:55:18Z',
    },
    {
      id: 'tx_015',
      walletId: 'wallet_001',
      type: 'CREDIT' as Transaction['type'],
      amount: '45.00',
      balanceBefore: '607.50',
      balanceAfter: '652.50',
      description: 'Bonus',
      createdAt: '2026-03-31T10:00:00Z',
    },
    {
      id: 'tx_016',
      walletId: 'wallet_002',
      type: 'DEBIT' as Transaction['type'],
      amount: '200.00',
      balanceBefore: '575.00',
      balanceAfter: '375.00',
      description: 'Betslip 24505',
      createdAt: '2026-04-01T22:30:00Z',
    },
    {
      id: 'tx_017',
      walletId: 'wallet_001',
      type: 'CREDIT' as Transaction['type'],
      amount: '60.00',
      balanceBefore: '652.50',
      balanceAfter: '712.50',
      description: 'Payout 89236',
      createdAt: '2026-03-31T02:15:42Z',
    },
    {
      id: 'tx_018',
      walletId: 'wallet_002',
      type: 'DEBIT' as Transaction['type'],
      amount: '10.00',
      balanceBefore: '375.00',
      balanceAfter: '365.00',
      description: 'Slot casino',
      createdAt: '2026-04-02T20:40:55Z',
    },
    {
      id: 'tx_019',
      walletId: 'wallet_001',
      type: 'DEBIT' as Transaction['type'],
      amount: '500.00',
      balanceBefore: '712.50',
      balanceAfter: '212.50',
      description: 'Withdrawal',
      createdAt: '2026-03-30T15:25:00Z',
    },
    {
      id: 'tx_020',
      walletId: 'wallet_002',
      type: 'CREDIT' as Transaction['type'],
      amount: '35.00',
      balanceBefore: '365.00',
      balanceAfter: '400.00',
      description: 'Bonus',
      createdAt: '2026-04-03T07:30:15Z',
    },
  ],
  'createdAt'
).reverse()
