'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Check, ChevronDown } from 'lucide-react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { LocaleFlag } from '@/components/ui/LocaleFlag'
import { LOCALE_NAMES } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('Nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Kənara klik və Escape menyunu bağlayır.
  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function switchTo(next: string) {
    setOpen(false)
    if (next === locale) return

    router.replace(
      // Dinamik seqmentli yollar üçün `params` lazımdır, lakin onun tipi
      // bütün marşrutlar üzrə ümumiləşdirilə bilmir.
      // @ts-expect-error -- next-intl sənədlərindəki tövsiyə olunan üsul
      { pathname, params },
      { locale: next },
    )
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('language')}
        className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[13px] font-medium uppercase text-ink-600 transition-colors hover:text-brand-600"
      >
        <LocaleFlag locale={locale as Locale} />
        {locale}
        <ChevronDown
          className={cn('size-3.5 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-lg shadow-ink-900/5"
        >
          {routing.locales.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => switchTo(code)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors',
                  code === locale
                    ? 'text-brand-600'
                    : 'text-ink-700 hover:bg-brand-50',
                )}
              >
                <span className="flex items-center gap-2.5">
                  <LocaleFlag locale={code} />
                  {LOCALE_NAMES[code]}
                </span>
                {code === locale && <Check className="size-4" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
