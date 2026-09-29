import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { Checklist } from '@/components/ui/Checklist'
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon'
import { enter, reveal } from '@/lib/motion'
import { CONTACT, whatsappHref } from '@/lib/site'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/telimler'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Courses' })

  return {
    title: t('allTitle'),
    description: `${t('office.label')} · ${t('mose.label')} — ${t('featuredSubtitle')}`,
  }
}

/**
 * Hələlik iki təlim var və daxili səhifələri hazır deyil — məzmun tərcümə
 * fayllarındadır, "Müraciət et" WhatsApp-a hazır mesajla aparır. Təlimlərin
 * sahələri fərqlidir (MOSE-nin alt başlığı və mətni, Office-in siyahı
 * başlığı var), ona görə hər sahə `t.has` ilə yoxlanır. Admin panel
 * qurulanda bu siyahı bazadakı Course modelinə keçəcək.
 */
const TRAININGS = [
  { id: 'ofis-proqramlari', key: 'office', image: '/courses/office.jpg', columns: false },
  { id: 'mose', key: 'mose', image: '/courses/mose.jpg', columns: true },
] as const

export default async function CoursesPage({
  params,
}: PageProps<'/[locale]/telimler'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Courses')

  return (
    <main className="relative isolate flex-1">
      {/*
        Səhifənin ümumi fonu. Şəkli bütün səhifəyə dartsaq, uzun səhifədə
        bir neçə dəfə böyüyüb bulanıqlaşardı. Ona görə o, ekran boyda
        qalır və `sticky` ilə yerində durur — məzmun üstündən sürüşür.
        Konteyner `main`-in ölçüsündədir, ona görə fon footer-ə düşmür.
      */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="sticky top-0 h-lvh overflow-hidden">
          <Image
            src="/courses/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-hero-zoom object-cover dark:hidden"
          />
          <Image
            src="/courses/hero-dark.jpg"
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="hidden animate-hero-zoom object-cover dark:block"
          />
        </div>
      </div>

      <section className="py-20 text-center lg:py-28">
        <div className="container-page">
          <h1 style={enter(0)} className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl">
            {t('allTitle')}
          </h1>
          <p
            style={enter(1)}
            className="mx-auto mt-4 max-w-xl animate-fade-up text-base text-ink-600 sm:text-lg dark:text-ink-300"
          >
            {t('featuredSubtitle')}
          </p>

          {/* Səhifədəki təlimlərə birbaşa keçid */}
          <nav style={enter(2)} className="mt-8 flex animate-fade-up flex-wrap justify-center gap-3">
            {TRAININGS.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-ink-200 bg-white/70 px-5 py-2.5 text-sm font-medium text-ink-800 backdrop-blur-sm transition-[color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700 dark:border-white/20 dark:bg-white/5 dark:text-ink-100 dark:hover:border-brand-300 dark:hover:text-brand-200"
              >
                {t(`${key}.label`)}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-page space-y-20 lg:space-y-28">
          {TRAININGS.map(({ id, key, image, columns }, index) => (
            <article
              key={id}
              id={id}
              // Header 80px-dir — keçid linki bloku onun altında gizlətməsin.
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div
                {...reveal()}
                className={cn(
                  'group relative aspect-[3/2] overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/10 ring-1 ring-ink-900/5 dark:shadow-black/40 dark:ring-white/10',
                  // Şəkillər növbə ilə sola və sağa düşür.
                  index % 2 === 1 && 'lg:order-last',
                )}
              >
                <Image
                  src={image}
                  alt={t(`${key}.label`)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover transition-[scale] duration-700 ease-(--ease-smooth) group-hover:scale-[1.03]"
                />
              </div>

              <div {...reveal(1, 120)}>
                <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 dark:bg-brand-500/15 dark:text-brand-200">
                  {t(`${key}.eyebrow`)}
                </span>

                <h2 className="mt-4 text-3xl leading-tight lg:text-4xl">{t(`${key}.title`)}</h2>

                {t.has(`${key}.subtitle`) && (
                  <p className="mt-3 text-lg font-medium text-brand-700 dark:text-brand-300">
                    {t(`${key}.subtitle`)}
                  </p>
                )}
                {t.has(`${key}.text`) && (
                  <p className="mt-4 leading-relaxed text-ink-600 dark:text-ink-300">
                    {t(`${key}.text`)}
                  </p>
                )}
                {t.has(`${key}.listTitle`) && (
                  <h3 className="mt-6 font-sans text-base font-semibold tracking-normal text-ink-900 dark:text-white">
                    {t(`${key}.listTitle`)}
                  </h3>
                )}

                <div className="mt-5">
                  <Checklist items={t.raw(`${key}.items`) as string[]} columns={columns} />
                </div>

                <p className="mt-6 font-medium leading-relaxed text-ink-800 dark:text-ink-100">
                  {t(`${key}.closing`)}
                </p>

                <a
                  href={whatsappHref(CONTACT.phone, t(`${key}.whatsapp`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-[15px] font-medium text-white shadow-md shadow-brand-600/25 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-600/35"
                >
                  <WhatsAppIcon className="size-5" />
                  {t('enroll')}
                  <ArrowRight
                    className="size-4 transition-[translate] duration-300 group-hover/cta:translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
