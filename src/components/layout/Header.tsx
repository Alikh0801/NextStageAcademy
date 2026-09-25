import { Link } from '@/i18n/navigation'
import { Logo } from '@/components/ui/Logo'
import { DesktopNav } from './DesktopNav'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    // Skrol ediləndə (MotionEffects → html[data-scrolled]) yüngül kölgə alır.
    <header className="sticky top-0 z-50 border-b border-ink-100 transition-shadow duration-300 dark:border-white/10 [html[data-scrolled]_&]:shadow-[0_8px_30px_-18px_rgba(33,30,50,0.35)]">
      {/*
        Yarımşəffaf, bulanıq fon ayrıca qatdadır: `backdrop-filter` header-in
        özündə olsaydı, içindəki `fixed` mobil menyu ekrana yox, header-ə
        bağlanardı.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-white/85 backdrop-blur-md dark:bg-ink-950/85"
      />
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
