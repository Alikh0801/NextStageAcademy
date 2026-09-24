import { Link } from '@/i18n/navigation'
import { Logo } from '@/components/ui/Logo'
import { DesktopNav } from './DesktopNav'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileNav } from './MobileNav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <DesktopNav />

        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitcher className="hidden lg:block" />

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
