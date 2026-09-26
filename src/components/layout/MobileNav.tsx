'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { NAV_ITEMS } from '@/lib/nav'
import { enter } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { isActivePath } from './DesktopNav'

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
        className="flex size-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-ink-200 dark:hover:bg-white/5 dark:hover:text-brand-300"
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
          className="fixed inset-x-0 bottom-0 top-20 z-40 animate-slide-down overflow-y-auto border-t border-ink-100 bg-white dark:border-white/10 dark:bg-ink-950"
        >
          <nav className="container-page flex flex-col py-4">
            {NAV_ITEMS.map(({ href, labelKey }, index) => {
              const active = isActivePath(pathname, href)

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  style={enter(index, 40)}
                  className={cn(
                    'animate-fade-up border-b border-ink-100 py-4 text-base transition-colors dark:border-white/10',
                    active
                      ? 'text-brand-600 dark:text-brand-300'
                      : 'text-ink-700 dark:text-ink-200',
                  )}
                >
                  {t(labelKey)}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
