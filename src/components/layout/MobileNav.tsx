'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, UserRound, X } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { NAV_ITEMS } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { isActivePath } from './DesktopNav'
import { LocaleSwitcher } from './LocaleSwitcher'

export function MobileNav() {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Menyu açıqkən arxa fon sürüşməsin.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobil-menyu"
        aria-label={open ? t('closeMenu') : t('openMenu')}
        className="flex size-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Menu className="size-5" aria-hidden />
        )}
      </button>

      {open && (
        <div
          id="mobil-menyu"
          // Header 80px hündürlükdədir — panel onun altından başlayır.
          className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-ink-100 bg-white"
        >
          <nav className="container-page flex flex-col py-4">
            {NAV_ITEMS.map(({ href, labelKey }) => {
              const active = isActivePath(pathname, href)

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'border-b border-ink-100 py-4 text-base transition-colors',
                    active ? 'text-brand-600' : 'text-ink-700',
                  )}
                >
                  {t(labelKey)}
                </Link>
              )
            })}

            <div className="mt-6 flex items-center justify-between gap-4">
              <LocaleSwitcher />

              <Link
                href="/giris"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <UserRound className="size-4" aria-hidden />
                {t('signIn')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
