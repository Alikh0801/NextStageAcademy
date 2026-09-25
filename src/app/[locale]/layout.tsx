import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { routing } from '@/i18n/routing'
import { THEME_INIT_SCRIPT } from '@/lib/theme'
import { inter, poppins } from '../fonts'
import '../globals.css'

/** Bütün dilləri build zamanı əvvəlcədən hazırlayır. */
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
      // Tema skripti `dark` klassını hidratasiyadan əvvəl qoyur.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
