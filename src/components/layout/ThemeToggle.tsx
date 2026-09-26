'use client'

import { useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { Moon, Sun } from 'lucide-react'
import { THEME_STORAGE_KEY } from '@/lib/theme'

/** `<html>`-in `class` atributunu izləyir — tema başqa yerdən dəyişsə də. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

const getSnapshot = () => document.documentElement.classList.contains('dark')
const getServerSnapshot = () => false

/**
 * Düymənin görünüşü (dəyirmiçin yeri, ikonlar) React state-dən yox, `dark:`
 * klasslarından asılıdır. Ona görə tünd rejimdə səhifə açılanda dəyirmiçik
 * soldan sağa "qaçmır" — yalnız klikdə animasiya olur.
 */
export function ThemeToggle() {
  const t = useTranslations('Nav')
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function toggle() {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      // Gizli rejimdə yaddaş bağlı ola bilər — tema bu səhifədə yenə işləyir.
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t('darkMode')}
      onClick={toggle}
      className="relative inline-flex h-8 w-15 shrink-0 items-center rounded-full bg-ink-100 p-1 transition-colors duration-300 hover:bg-ink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-ink-800 dark:hover:bg-ink-700 dark:focus-visible:ring-offset-ink-950"
    >
      {/* Yolun özündəki ikonlar — dəyirmiçik hansının üstündədirsə o gizlənir */}
      <Sun className="absolute left-2 size-3.5 text-ink-400" aria-hidden />
      <Moon className="absolute right-2 size-3.5 text-ink-400" aria-hidden />

      <span className="relative z-10 flex size-6 items-center justify-center rounded-full bg-white shadow-sm shadow-ink-900/15 transition-[translate,background-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:translate-x-7 dark:bg-brand-500">
        <Sun
          className="size-3.5 text-amber-500 transition-all duration-300 dark:rotate-90 dark:scale-0 dark:opacity-0"
          aria-hidden
        />
        <Moon
          className="absolute size-3.5 -rotate-90 scale-0 text-white opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
          aria-hidden
        />
      </span>
    </button>
  )
}
