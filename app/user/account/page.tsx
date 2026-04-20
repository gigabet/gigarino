import { redirect } from 'next/navigation'
import AccountForm from '@/app/user/account/account-form'
import Header from '@/app/user/header'
import { getUser } from '@/lib/auth'

export default async function Account() {
  const user = await getUser()
  if (!user) redirect('/login?error=You must be logged in&from=/user/account', 'replace')

  return (
    <main className='grow'>
      <Header title='Account' subtitle='Change your account details' />
      <AccountForm {...user} />
    </main>
  )
}
