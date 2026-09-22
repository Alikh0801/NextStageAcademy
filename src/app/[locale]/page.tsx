import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Hero')

  return (
    <main className="container-page flex flex-1 flex-col justify-center py-24">
      <p className="text-sm font-semibold tracking-[0.2em] text-brand-600">
        {t('eyebrow')}
      </p>
      <h1 className="mt-4 max-w-2xl text-5xl leading-tight">{t('title')}</h1>
      <p className="mt-5 max-w-xl text-lg text-ink-500">{t('subtitle')}</p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/telimler"
          className="rounded-full bg-brand-600 px-7 py-3 font-medium text-white transition hover:bg-brand-700"
        >
          {t('primaryCta')}
        </Link>
        <Link
          href="/haqqimizda"
          className="rounded-full border border-ink-200 px-7 py-3 font-medium text-ink-800 transition hover:border-brand-400 hover:text-brand-700"
        >
          {t('secondaryCta')}
        </Link>
      </div>
    </main>
  )
}
