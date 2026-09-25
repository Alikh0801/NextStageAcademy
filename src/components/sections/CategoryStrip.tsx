import type { ComponentType } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  FileUser,
  GraduationCap,
  Lightbulb,
  MessagesSquare,
  Users,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { ExcelIcon } from '@/components/ui/icons/ExcelIcon'
import type { StaticPathname } from '@/lib/nav'

/**
 * Siyahı qarışıqdır: HR/Excel/Soft Skills mövzulardır, qalan üçü isə sayt
 * bölmələridir. Ona görə baza kateqoriyalarından deyil, tərcümə fayllarından
 * gəlir. Mövzular hələlik ümumi təlim səhifəsinə aparır — admin paneldə
 * kateqoriya idarəsi qurulanda süzgəcli ünvanlara keçiriləcək.
 */
const ITEMS: ReadonlyArray<{
  /** Lucide ikonu və ya onun üslubunda çəkilmiş öz ikonumuz (Excel). */
  icon: ComponentType<{ className?: string }>
  titleKey: string
  textKey: string
  href: StaticPathname
}> = [
  { icon: Users, titleKey: 'hrTitle', textKey: 'hrText', href: '/telimler' },
  { icon: ExcelIcon, titleKey: 'excelTitle', textKey: 'excelText', href: '/telimler' },
  { icon: MessagesSquare, titleKey: 'softTitle', textKey: 'softText', href: '/telimler' },
  { icon: GraduationCap, titleKey: 'coursesTitle', textKey: 'coursesText', href: '/telimler' },
  { icon: FileUser, titleKey: 'careerTitle', textKey: 'careerText', href: '/karyera' },
  { icon: Lightbulb, titleKey: 'resourcesTitle', textKey: 'resourcesText', href: '/bloq' },
]

export async function CategoryStrip() {
  const t = await getTranslations('Categories')

  return (
    <section className="bg-white py-12 lg:py-16 dark:bg-ink-950">
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map(({ icon: Icon, titleKey, textKey, href }) => (
            <li key={titleKey}>
              <Link
                href={href}
                className="group flex flex-col items-center text-center"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-brand-100 transition-colors group-hover:bg-brand-200 dark:bg-brand-500/15 dark:group-hover:bg-brand-500/25">
                  <Icon className="size-7 text-brand-600 dark:text-brand-300" aria-hidden />
                </span>

                <span className="mt-4 text-[15px] font-semibold text-ink-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                  {t(titleKey)}
                </span>

                <span className="mt-1 text-xs leading-snug text-ink-400">
                  {t(textKey)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
