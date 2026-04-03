import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/payment', '/profile', '/transactions']
// const entryRoutes = ['/login', '/register']

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  // const isEntryRoute = entryRoutes.includes(path)

  const token = (await cookies()).get('token')?.value

  if (isProtectedRoute && !token) {
    console.log('Redirecting to login from proxy for path:', path)
    return NextResponse.redirect(
      new URL(`/login?error=You must be logged in&from=${path}`, req.nextUrl)
    )
  }

  // if (isEntryRoute && token) {
  //   console.log('Redirecting to home from proxy for path:', path)
  //   return NextResponse.redirect(new URL('/', req.nextUrl))
  // }

  return NextResponse.next()
}

// Routes proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpe?g|svg|webp)$).*)'],
}
