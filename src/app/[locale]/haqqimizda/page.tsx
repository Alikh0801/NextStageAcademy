import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  ArrowRight,
  Compass,
  FileUser,
  GraduationCap,
  MessageCircleQuestion,
  Sprout,
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon'
import { CONTACT, whatsappHref } from '@/lib/site'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/haqqimizda'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('Nav.about'),
    description: t('About.lead'),
  }
}

const SERVICES = [
  { icon: FileUser, key: 'cv' },
  { icon: MessageCircleQuestion, key: 'interview' },
  { icon: Compass, key: 'consulting' },
  { icon: GraduationCap, key: 'training' },
  { icon: Sprout, key: 'growth' },
] as const

const MOTTO = ['motto1', 'motto2', 'motto3', 'motto4'] as const

export default async function AboutPage({
  params,
}: PageProps<'/[locale]/haqqimizda'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const [t, tNav, tContact] = await Promise.all([
    getTranslations('About'),
    getTranslations('Nav'),
    getTranslations('Contact'),
  ])

  return (
    <main className="flex-1">
      {/*
        Şəklin sol tərəfi açıq və boşdur — desktopda mətn onun üstünə düşür.
        Mobildə şəkil ayrıca blokdur, mətn altında gəlir: dar ekranda mətn
        şəkildəki insanların üstünə düşərdi.
      */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-ink-950">
        <div className="relative aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
          <Image
            src="/about/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            // lg-də şəkil üfüqi kəsilir — sol kənara bağlayırıq ki, insanlar
            // mətndən uzaqda, sağda qalsın.
            className="object-cover object-[70%_center] lg:object-left xl:object-center"
          />
          {/* Tünd rejimdə mətnin oxunması üçün sol tərəf qaraldılır */}
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-ink-950/20 dark:block lg:bg-transparent lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/85 lg:to-ink-950/10"
          />
        </div>

        <div className="container-page">
          <div className="py-10 lg:max-w-md lg:py-28 xl:max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-300">
              {tNav('about')}
            </p>
            <h1 className="mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg dark:text-ink-300">
              {t('lead')}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20 dark:bg-ink-950">
        <div className="container-page">
          <div className="mx-auto max-w-3xl border-l-4 border-brand-500 pl-6 sm:pl-8">
            <p className="text-lg font-medium leading-relaxed text-ink-800 sm:text-xl dark:text-ink-100">
              {t('introP1')}
            </p>
            <p className="mt-5 leading-relaxed text-ink-600 dark:text-ink-300">
              {t('introP2')}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-16 lg:py-20 dark:bg-ink-900">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl lg:text-4xl">{t('servicesTitle')}</h2>
            <p className="mt-3 text-ink-500 dark:text-ink-300">{t('servicesLead')}</p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="rounded-2xl border border-ink-100 bg-white p-6 lg:p-7 dark:border-white/10 dark:bg-ink-950"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg leading-snug">{t(`${key}Title`)}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                  {t(`${key}Text`)}
                </p>
              </li>
            ))}

            {/* Şəbəkənin altıncı xanası — əlaqəyə çağırış */}
            <li className="flex flex-col rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white lg:p-7">
              <span className="flex size-12 items-center justify-center rounded-xl bg-white/15">
                <WhatsAppIcon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg leading-snug text-white">
                {tContact('bannerTitle')}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/80">
                {tContact('bannerSubtitle')}
              </p>
              <a
                href={whatsappHref(CONTACT.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-medium text-brand-700 transition-opacity hover:opacity-90 lg:mt-auto"
              >
                {tContact('bannerCta')}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24 dark:bg-ink-950">
        <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 className="text-3xl lg:col-span-4 lg:text-4xl">{t('beliefsTitle')}</h2>

          <div className="space-y-5 lg:col-span-8">
            <p className="text-lg font-medium leading-relaxed text-ink-800 sm:text-xl dark:text-ink-100">
              {t('beliefsP1')}
            </p>
            <p className="leading-relaxed text-ink-600 dark:text-ink-300">{t('beliefsP2')}</p>
            <p className="leading-relaxed text-ink-600 dark:text-ink-300">{t('beliefsP3')}</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 py-16 text-center lg:py-24">
        <div className="container-page">
          <p className="mx-auto max-w-3xl leading-relaxed text-white/80 sm:text-lg">
            {t('closingText')}
          </p>
          <h2 className="mt-8 text-3xl text-white lg:text-4xl">
            {t('closingLead')}
          </h2>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {MOTTO.map((key, index) => {
              const last = index === MOTTO.length - 1
              return (
                <li
                  key={key}
                  className={
                    last
                      ? 'rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 sm:text-base'
                      : 'rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white sm:text-base'
                  }
                >
                  {t(key)}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}
