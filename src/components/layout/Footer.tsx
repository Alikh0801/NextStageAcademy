import { getTranslations } from 'next-intl/server'
import { Heart, MapPin, Phone } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Logo } from '@/components/ui/Logo'
import { NAV_ITEMS } from '@/lib/nav'
import { CONTACT, phoneHref } from '@/lib/site'

export async function Footer() {
  const [t, tNav, tMeta] = await Promise.all([
    getTranslations('Footer'),
    getTranslations('Nav'),
    getTranslations('Meta'),
  ])
  // Səhifələr statik build olunur — il build vaxtı götürülür.
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-900 text-white/70">
      <div className="container-page">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo tone="light" className="h-14" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              {tMeta('tagline')}
            </p>
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h2
              id="footer-quick-links"
              className="font-sans text-[15px] font-semibold tracking-normal text-white"
            >
              {t('quickLinks')}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-white">
                    {tNav(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-[15px] font-semibold tracking-normal text-white">
              {t('contactUs')}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {CONTACT.phone && (
                <li>
                  <a
                    href={phoneHref(CONTACT.phone)}
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Phone className="size-4 shrink-0 text-brand-300" aria-hidden />
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-brand-300" aria-hidden />
                {t('address')}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/15 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm">{t('rights', { year })}</p>
          <p className="flex items-center gap-2 font-script text-3xl leading-none text-white">
            {t('signature')}
            <Heart className="size-4 shrink-0" aria-hidden />
          </p>
        </div>
      </div>
    </footer>
  )
}
