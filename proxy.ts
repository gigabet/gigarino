import { timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/user']

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

function isAdminAuthorized(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD
  const header = req.headers.get('authorization')
  if (!expected || !header?.startsWith('Basic ')) return false

  const decoded = Buffer.from(header.slice('Basic '.length), 'base64').toString('utf8')
  const password = decoded.slice(decoded.indexOf(':') + 1) // username is ignored
  return safeEqual(password, expected)
}

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Basic Auth gate for the translation editor (fails closed if ADMIN_PASSWORD is unset)
  if (path === '/admin' || path.startsWith('/admin/')) {
    if (isAdminAuthorized(req)) return NextResponse.next()
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Translations"' },
    })
  }

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

  const token = (await cookies()).get('token')?.value

  if (isProtectedRoute && !token) {
    console.log('Redirecting to login from proxy for path:', path)
    return NextResponse.redirect(
      new URL(`/login?error=You must be logged in&from=${path}`, req.nextUrl)
    )
  }

  const res = NextResponse.next()
  if (!req.cookies.get('locale')) {
    const lang = req.headers.get('accept-language')?.split(',')[0].split('-')[0] ?? 'en'
    const locale = ['en', 'de', 'tr'].includes(lang) ? lang : 'en'
    res.cookies.set('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  }

  return res
}

// Routes proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpe?g|svg|webp)$).*)'],
}
