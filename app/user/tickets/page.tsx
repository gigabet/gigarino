import { redirect } from 'next/navigation'
import Header from '@/app/user/header'
import TicketHistory from '@/app/user/tickets/ticket-history'
import { getUser } from '@/lib/auth'

export default async function Tickets() {
  const user = await getUser()
  if (!user) redirect('/login?error=You must be logged in&from=/user/tickets', 'replace')

  return (
    <main className='min-w-0 grow'>
      <Header title='My Tickets' subtitle='Track your open bets and betting history' />
      <TicketHistory />
    </main>
  )
}
