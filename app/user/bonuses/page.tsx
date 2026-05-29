import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import BonusList from '@/app/user/bonuses/bonus-list'
import { bonusesQuery } from '@/app/user/context'
import Header from '@/app/user/header'
import { getUser } from '@/lib/auth'

export default async function Bonuses() {
  const user = await getUser()
  if (!user) redirect('/login?error=You must be logged in&from=/user/bonuses', 'replace')

  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['bonuses', user.id],
    queryFn: bonusesQuery,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='grow'>
        <Header title='Bonuses' subtitle='View your claimed and available bonuses' />
        <BonusList user={user} />
      </main>
    </HydrationBoundary>
  )
}
