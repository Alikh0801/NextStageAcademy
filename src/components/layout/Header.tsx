import { Link } from '@/i18n/navigation'
import { Logo } from '@/components/ui/Logo'
import { DesktopNav } from './DesktopNav'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white dark:border-white/10 dark:bg-ink-950">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo tone="auto" />
        </Link>

        <DesktopNav />

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          {/* Mobildə də navbarda qalır — hamburger menyunun solunda. */}
          <LocaleSwitcher />

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
