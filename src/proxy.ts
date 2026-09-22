import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // API, statik fayllar və Next-in daxili yolları kənarda qalır.
  matcher: '/((?!api|_next|_vercel|.*\..*).*)',
}
