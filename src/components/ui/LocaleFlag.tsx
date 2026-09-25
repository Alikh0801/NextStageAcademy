import { AZ, GB, RU } from 'country-flag-icons/react/3x2'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

/**
 * Emoji bayraqlar Windows-da göstərilmir (yerinə "AZ" hərfləri çıxır),
 * ona görə SVG işlədirik. İngilis dili üçün Britaniya bayrağı.
 */
const FLAGS = { az: AZ, ru: RU, en: GB } as const

export function LocaleFlag({
  locale,
  className,
}: {
  locale: Locale
  className?: string
}) {
  const Flag = FLAGS[locale]

  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex h-3.5 w-[21px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-ink-900/10',
        className,
      )}
    >
      <Flag className="size-full" />
    </span>
  )
}
