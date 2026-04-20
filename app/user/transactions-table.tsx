'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { format } from 'date-fns'
import { map } from 'lodash'
import { CalendarIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { transactionsQuery } from '@/app/user/context'

export default function TransactionsTable(props: { id: string; infinite?: boolean }) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['transactions', props.id],
    initialPageParam: null,
    getNextPageParam: last => last.nextCursor,
    queryFn: transactionsQuery,
  })

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className='md:overflow-x-auto'>
      <table className='w-full table-fixed border-collapse md:min-w-160'>
        <thead className='hidden md:table-header-group'>
          <tr className='border-b border-white/10'>
            {/* Date - shrink */}
            <th className='w-52 px-4 py-3 text-left text-sm font-medium whitespace-nowrap text-gray-400'>
              Date
            </th>

            {/* Type - shrink */}
            <th className='w-32 px-4 py-3 text-left text-sm font-medium whitespace-nowrap text-gray-400'>
              Type
            </th>

            {/* Description - EXPANDS to take all remaining space */}
            <th className='px-4 py-3 text-left text-sm font-medium text-gray-400'>Description</th>

            {/* Amount - shrink + right aligned */}
            <th className='w-32 px-4 py-3 text-right text-sm font-medium whitespace-nowrap text-gray-400'>
              Amount
            </th>
          </tr>
        </thead>
        <tbody className='grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:table-row-group'>
          {map(
            data?.pages,
            (page, pageNo) =>
              (pageNo === 0 || props.infinite) &&
              map(page.data, tx => (
                <tr
                  key={tx.id}
                  className='grid grid-cols-2 gap-2 border-b border-white/5 py-2 transition-colors hover:bg-white/5 md:table-row md:py-0'
                >
                  {/* Date */}
                  <td className='text-xs whitespace-nowrap text-gray-300 md:px-4 md:py-4 md:text-sm'>
                    <div className='flex items-center gap-2'>
                      <CalendarIcon className='text-muted-foreground size-4 shrink-0' />
                      {format(tx.createdAt, 'dd MMM y, HH:mm')}
                    </div>
                  </td>

                  {/* Type */}
                  <td className='hidden whitespace-nowrap md:table-cell md:px-4 md:py-4'>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        tx.type === 'CREDIT' ? 'text-sky-400' : 'text-red-400'
                      }`}
                    >
                      {tx.type === 'CREDIT' ? (
                        <PlusIcon className='size-4 shrink-0' />
                      ) : (
                        <MinusIcon className='size-4 shrink-0' />
                      )}
                      {tx.type.charAt(0) + tx.type.slice(1).toLowerCase()}
                    </div>
                  </td>

                  {/* Description - expanding column */}
                  <td className='col-span-2 row-start-2 text-xs wrap-break-word text-gray-400 md:px-4 md:py-4 md:text-sm md:text-gray-300'>
                    {tx.description}
                  </td>

                  {/* Amount */}
                  <td
                    className={cx(
                      'col-start-2 row-start-1 place-self-end text-right font-mono text-sm font-medium whitespace-nowrap md:px-4 md:py-4 md:text-white',
                      tx.type === 'CREDIT' ? 'text-sky-400' : 'text-red-400'
                    )}
                  >
                    {tx.type === 'CREDIT' ? '+' : '-'}
                    {Number(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      {props.infinite && <div ref={ref} />}
    </div>
  )
}
