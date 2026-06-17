import { cx } from 'class-variance-authority'
import UserSidebar from '@/app/user/user-sidebar'
import { getUser } from '@/lib/auth'

const PT = 'pt-12'

export default async function AccountLayout({ children }: React.PropsWithChildren) {
  const user = await getUser()

  // TODO: Error handling

  return (
    <div
      className={cx(
        'relative z-1 mx-auto flex w-full max-w-360 items-start gap-12 px-4 pb-24 sm:px-6 lg:px-8',
        PT
      )}
    >
      <UserSidebar user={user} pt={PT} />
      {children}
    </div>
  )
}
