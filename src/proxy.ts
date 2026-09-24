import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'
import { ADMIN_COOKIE, verifySessionToken } from './lib/admin/token'

const handle = createMiddleware(routing)

/**
 * Next 16 `config.matcher`-də mənfi lookahead pattern-ini
 * (`'/((?!api|_next).*)'`) artıq tanımır — belə pattern heç bir yolu tutmur
 * və proxy səssizcə işə düşmür. Ona görə filtri matcher-də deyil, burada
 * edirik: matcher ümumiyyətlə elan olunmur, seçim funksiyanın içindədir.
 */
const SKIP_PREFIXES = ['/api', '/_next', '/_vercel']

const ADMIN_LOGIN = '/admin/login'

/**
 * Admin panel çoxdilli deyil, ona görə next-intl-dən keçmir. Buradakı yoxlama
 * yalnız cookie-yə baxan ilkin süzgəcdir; səhifələr `verifyAdmin()` ilə
 * sessiyanı yenidən yoxlayır.
 */
function guardAdmin(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isLoginPage = pathname === ADMIN_LOGIN
  const isAuthed = verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value)

  if (!isAuthed && !isLoginPage) {
    const url = new URL(ADMIN_LOGIN, request.url)
    url.searchParams.set('from', pathname + search)
    return NextResponse.redirect(url)
  }

  if (isAuthed && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return guardAdmin(request)
  }
  // Uzantısı olan sorğular (şəkil, favicon, robots.txt) toxunulmadan keçir.
  if (pathname.includes('.')) return

  return handle(request)
}
