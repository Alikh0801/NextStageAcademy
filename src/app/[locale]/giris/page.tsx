import { getTranslations, setRequestLocale } from 'next-intl/server'

// Yer tutucu — məzmun sonrakı mərhələdə əlavə olunacaq.
export default async function SignInPage({
  params,
}: PageProps<'/[locale]/giris'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations()

  return (
    <main className="container-page flex-1 py-24">
      <h1 className="text-4xl">{t('Auth.signInTitle')}</h1>
      <p className="mt-4 text-ink-500">{t('Common.comingSoon')}</p>
    </main>
  )
}
