import { redirect } from 'next/navigation'

export default async function User() {
  redirect('/user/account', 'replace')
}
