import { getTranslations, setRequestLocale } from 'next-intl/server'

// Yer tutucu — məzmun sonrakı mərhələdə əlavə olunacaq.
export default async function AboutPage({
  params,
}: PageProps<'/[locale]/haqqimizda'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations()

  return (
    <main className="container-page flex-1 py-24">
      <h1 className="text-4xl">{t('Nav.about')}</h1>
      <p className="mt-4 text-ink-500 dark:text-ink-300">{t('Common.comingSoon')}</p>
    </main>
  )
}
