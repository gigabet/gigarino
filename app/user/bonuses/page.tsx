import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'

export default async function Bonuses() {
  const user = await getUser()
  if (!user) redirect(`/login?error=You must be logged in&from=/user/wallet`, 'replace')

  return <h1>Bonuses</h1>
}
