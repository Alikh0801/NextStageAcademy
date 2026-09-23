import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const handle = createMiddleware(routing)

/**
 * Next 16 `config.matcher`-də mənfi lookahead pattern-ini
 * (`'/((?!api|_next).*)'`) artıq tanımır — belə pattern heç bir yolu tutmur
 * və proxy səssizcə işə düşmür. Ona görə filtri matcher-də deyil, burada
 * edirik: matcher ümumiyyətlə elan olunmur, seçim funksiyanın içindədir.
 */
const SKIP_PREFIXES = ['/api', '/_next', '/_vercel']

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return
  // Uzantısı olan sorğular (şəkil, favicon, robots.txt) toxunulmadan keçir.
  if (pathname.includes('.')) return

  return handle(request)
}
