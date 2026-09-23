import type { routing } from '@/i18n/routing'

/** `routing.pathnames`-də elan olunmuş bütün daxili yollar. */
export type AppPathname = keyof typeof routing.pathnames

/**
 * Dinamik seqmenti olmayan yollar. `Link` yalnız bunları `params` olmadan
 * qəbul edir, ona görə menyu elementləri bu tiplə məhdudlaşır.
 */
export type StaticPathname = Exclude<
  AppPathname,
  `${string}[${string}]${string}`
>

/** `messages/*.json` → `Nav` namespace-indəki açarlar. */
type NavLabelKey = 'home' | 'about' | 'courses' | 'career' | 'blog' | 'contact'

export const NAV_ITEMS: ReadonlyArray<{
  href: StaticPathname
  labelKey: NavLabelKey
}> = [
  { href: '/', labelKey: 'home' },
  { href: '/haqqimizda', labelKey: 'about' },
  { href: '/telimler', labelKey: 'courses' },
  { href: '/karyera', labelKey: 'career' },
  { href: '/bloq', labelKey: 'blog' },
  { href: '/elaqe', labelKey: 'contact' },
]

/** Dil adları öz dillərində yazılır — tərcüməyə ehtiyac yoxdur. */
export const LOCALE_NAMES = {
  az: 'Azərbaycan',
  ru: 'Русский',
  en: 'English',
} as const
