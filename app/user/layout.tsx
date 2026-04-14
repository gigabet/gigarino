import { redirect } from 'next/navigation'
import UserSidebar from '@/app/user/user-sidebar'
import { getUser, logout } from '@/lib/auth'

export default async function AccountLayout({ children }: React.PropsWithChildren) {
  const user = await getUser()
  if (!user) {
    logout()
    redirect('/login?error=You must be logged in&from=/user/wallet', 'replace')
  }

  return (
    <div className='z-1 mx-auto flex w-full max-w-360 items-start gap-12 px-4 pt-12 pb-24 sm:px-6 lg:px-8'>
      <UserSidebar user={user} />
      {children}
    </div>
  )
}
