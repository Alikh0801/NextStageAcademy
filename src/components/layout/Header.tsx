import { getTranslations } from 'next-intl/server'
import { UserRound } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Logo } from '@/components/ui/Logo'
import { DesktopNav } from './DesktopNav'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileNav } from './MobileNav'

export async function Header() {
  const t = await getTranslations('Nav')

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <DesktopNav />

        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitcher className="hidden lg:block" />

          <Link
            href="/giris"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-brand-600/20 transition-opacity hover:opacity-90 lg:inline-flex"
          >
            <UserRound className="size-4" aria-hidden />
            {t('signIn')}
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
