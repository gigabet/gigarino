import { redirect } from 'next/navigation'
import BonusList from '@/app/user/bonuses/bonus-list'
import Header from '@/app/user/header'
import { getUser } from '@/lib/auth'

export default async function Bonuses() {
  const user = await getUser()
  if (!user) redirect('/login?error=You must be logged in&from=/user/bonuses', 'replace')

  return (
    <main className='grow'>
      <Header title='Bonuses' subtitle='View your active bonuses' />
      <BonusList />
    </main>
  )
}
