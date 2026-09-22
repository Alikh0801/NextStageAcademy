import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  display: 'swap',
})

/** Üç dilin hamısını build zamanı əvvəlcədən hazırlayır. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: {
      default: t('siteName'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('description'),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Statik render üçün aktiv dili bildirir.
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${poppins.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
