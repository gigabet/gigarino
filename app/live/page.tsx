import { redirect } from 'next/navigation'

export default async function LivePage() {
  redirect('/live/all', 'replace')
}
