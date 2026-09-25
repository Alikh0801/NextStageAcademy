'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { NAV_ITEMS, type StaticPathname } from '@/lib/nav'
import { cn } from '@/lib/utils'

/** `usePathname` dil prefiksi olmadan daxili yolu qaytarır, ona görə
 *  müqayisə bütün dillərdə eyni işləyir. */
export function isActivePath(pathname: string, href: StaticPathname): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function DesktopNav() {
  const t = useTranslations('Nav')
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-7 lg:flex">
      {NAV_ITEMS.map(({ href, labelKey }) => {
        const active = isActivePath(pathname, href)

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group relative py-1 text-[15px] transition-colors',
              active
                ? 'text-brand-600 dark:text-brand-300'
                : 'text-ink-600 hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-300',
            )}
          >
            {t(labelKey)}
            <span
              aria-hidden
              className={cn(
                // Hover-də xətt soldan sağa uzanır; aktiv səhifədə tam qalır.
                'absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-brand-600 transition-[scale] duration-300 ease-(--ease-smooth) dark:bg-brand-400',
                active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
              )}
            />
          </Link>
        )
      })}
    </nav>
  )
}
