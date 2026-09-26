import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  ArrowRight,
  Award,
  CircleCheck,
  Compass,
  FileUser,
  Fingerprint,
  IdCard,
  MessageCircleQuestion,
  Route,
  Target,
  UserRoundCheck,
} from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon'
import { CARD_HOVER, reveal } from '@/lib/motion'
import { CONTACT, whatsappHref } from '@/lib/site'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/karyera'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Career' })

  return {
    title: t('title'),
    description: t('heroLead'),
  }
}

type Step = { title: string; text: string }

/** Bölmələrin ardıcıllığı həm səhifədə, həm də yuxarıdakı keçid siyahısında. */
const SERVICES = [
  { id: 'cv', key: 'cv', icon: FileUser },
  { id: 'vakansiya', key: 'tailored', icon: Target },
  { id: 'musahibe', key: 'interview', icon: MessageCircleQuestion },
  { id: 'konsultasiya', key: 'consulting', icon: Compass },
  { id: 'linkedin', key: 'linkedin', icon: IdCard },
] as const

const BENEFIT_ICONS = [Award, Route, UserRoundCheck, Fingerprint]

export default async function CareerPage({
  params,
}: PageProps<'/[locale]/karyera'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const [t, tContact] = await Promise.all([
    getTranslations('Career'),
    getTranslations('Contact'),
  ])

  const list = (key: string) => t.raw(key) as string[]
  const steps = t.raw('interview.steps') as Step[]
  const benefits = t.raw('benefits') as Step[]
  const journey = list('journey')
  const linkedinOutro = t('linkedin.outro')

  return (
    <main className="flex-1">
      <PageHero
        image="/career/hero.jpg"
        eyebrow={t('title')}
        title={t('heroTitle')}
        lead={t('heroLead')}
      />

      <section className="bg-white pb-6 pt-14 lg:pt-20 dark:bg-ink-950">
        <div className="container-page">
          <p
            {...reveal()}
            className="mx-auto max-w-3xl border-l-4 border-brand-500 pl-6 text-lg font-medium leading-relaxed text-ink-800 sm:pl-8 sm:text-xl dark:text-ink-100">
            {t('intro')}
          </p>

          {/* Uzun səhifədə istədiyi xidmətə birbaşa keçmək üçün */}
          <nav
            {...reveal(1, 120)}
            className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5"
          >
            {SERVICES.map(({ id, key, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm text-ink-700 transition-[color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700 dark:border-white/15 dark:text-ink-200 dark:hover:border-brand-300 dark:hover:text-brand-200"
              >
                <Icon className="size-4 text-brand-500 dark:text-brand-300" aria-hidden />
                {t(`${key}.title`)}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <ServiceSection index={0} tone="white" title={t('cv.title')} subtitle={t('cv.subtitle')}>
        <p className="leading-relaxed text-ink-600 dark:text-ink-300">{t('cv.text')}</p>
        <ListTitle>{t('cv.listTitle')}</ListTitle>
        <Checklist items={list('cv.items')} columns />
        <p className="mt-8 rounded-2xl bg-brand-50 p-5 leading-relaxed text-ink-700 sm:p-6 dark:bg-brand-500/10 dark:text-ink-200">
          <span className="font-semibold text-brand-700 dark:text-brand-300">
            {t('cv.resultLabel')}
          </span>{' '}
          {t('cv.result')}
        </p>
      </ServiceSection>

      <ServiceSection
        index={1}
        tone="gray"
        title={t('tailored.title')}
        subtitle={t('tailored.subtitle')}
      >
        <div className="space-y-4 leading-relaxed text-ink-600 dark:text-ink-300">
          <p>{t('tailored.p1')}</p>
          <p>{t('tailored.p2')}</p>
        </div>
        <p className="mt-8 border-l-4 border-brand-500 pl-5 text-lg font-medium leading-relaxed text-ink-800 dark:text-ink-100">
          {t('tailored.p3')}
        </p>
      </ServiceSection>

      <ServiceSection
        index={2}
        tone="white"
        title={t('interview.title')}
        subtitle={t('interview.subtitle')}
      >
        <p className="leading-relaxed text-ink-600 dark:text-ink-300">{t('interview.text')}</p>
        <ListTitle>{t('interview.listTitle')}</ListTitle>
        <ol className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li
              key={step.title}
              {...reveal(i, 90)}
              className={cn('rounded-2xl border border-ink-100 p-5 dark:border-white/10', CARD_HOVER)}
            >
              <span className="font-display text-2xl font-bold text-brand-500 dark:text-brand-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="mt-2 font-semibold text-ink-900 dark:text-white">{step.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </ServiceSection>

      <ServiceSection
        index={3}
        tone="gray"
        title={t('consulting.title')}
        subtitle={t('consulting.subtitle')}
      >
        <p className="leading-relaxed text-ink-600 dark:text-ink-300">{t('consulting.text')}</p>
        <ListTitle>{t('consulting.listTitle')}</ListTitle>
        <Checklist items={list('consulting.items')} />
      </ServiceSection>

      <ServiceSection
        index={4}
        tone="white"
        title={t('linkedin.title')}
        subtitle={t('linkedin.subtitle')}
      >
        <p className="leading-relaxed text-ink-600 dark:text-ink-300">{t('linkedin.text')}</p>
        <ListTitle>{t('linkedin.listTitle')}</ListTitle>
        <ul className="flex flex-wrap gap-2.5">
          {list('linkedin.items').map((item, i) => (
            <li
              key={item}
              {...reveal(i, 60)}
              className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-200"
            >
              {item}
            </li>
          ))}
        </ul>
        {linkedinOutro && (
          <p className="mt-4 leading-relaxed text-ink-600 dark:text-ink-300">{linkedinOutro}</p>
        )}
      </ServiceSection>

      <section className="bg-ink-50 py-16 lg:py-20 dark:bg-ink-900">
        <div className="container-page">
          <h2 {...reveal()} className="text-center text-3xl lg:text-4xl">
            {t('benefitsTitle')}
          </h2>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i]
              return (
                <li
                  key={benefit.title}
                  {...reveal(i)}
                  className={cn(
                    'rounded-2xl border border-ink-100 bg-white p-6 dark:border-white/10 dark:bg-ink-950',
                    CARD_HOVER,
                  )}
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg leading-snug">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                    {benefit.text}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 py-16 text-center lg:py-24">
        <div className="container-page">
          <h2 {...reveal()} className="text-3xl text-white lg:text-4xl">
            {t('closingTitle')}
          </h2>
          <p
            {...reveal(1)}
            className="mx-auto mt-5 max-w-3xl leading-relaxed text-white/80 sm:text-lg"
          >
            {t('closingText')}
          </p>

          <ol className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            {journey.map((step, i) => {
              const last = i === journey.length - 1
              return (
                <li key={step} {...reveal(i + 2, 100)} className="flex items-center gap-3">
                  <span
                    className={
                      last
                        ? 'rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 sm:text-base'
                        : 'rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white sm:text-base'
                    }
                  >
                    {step}
                  </span>
                  {!last && (
                    <ArrowRight
                      className="hidden size-4 shrink-0 text-white/60 sm:block"
                      aria-hidden
                    />
                  )}
                </li>
              )
            })}
          </ol>

          <a
            href={whatsappHref(CONTACT.phone)}
            target="_blank"
            rel="noopener noreferrer"
            {...reveal(journey.length + 2, 100)}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-brand-800 shadow-lg shadow-black/10 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
          >
            <WhatsAppIcon className="size-5" />
            {tContact('bannerCta')}
          </a>
        </div>
      </section>
    </main>
  )
}

/**
 * Hər xidmət bir bölmədir: solda nömrə, ikon, başlıq və qısa şüar (desktopda
 * skrol zamanı yerində qalır), sağda məzmun. Fonlar növbələşir.
 */
function ServiceSection({
  index,
  tone,
  title,
  subtitle,
  children,
}: {
  index: number
  tone: 'white' | 'gray'
  title: string
  subtitle: string
  children: ReactNode
}) {
  const { id, icon: Icon } = SERVICES[index]

  return (
    <section
      id={id}
      // Header 80px-dir — keçid linki başlığı onun altında gizlətməsin.
      className={cn(
        'scroll-mt-20 py-14 lg:py-20',
        tone === 'white' ? 'bg-white dark:bg-ink-950' : 'bg-ink-50 dark:bg-ink-900',
      )}
    >
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div {...reveal()} className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="font-display text-sm font-semibold tracking-widest text-ink-400">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-tight lg:text-4xl">{title}</h2>
            <p className="mt-4 text-lg font-medium leading-relaxed text-brand-700 dark:text-brand-300">
              {subtitle}
            </p>
          </div>
        </div>

        <div {...reveal(1, 120)} className="lg:col-span-7">
          {children}
        </div>
      </div>
    </section>
  )
}

function ListTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 mt-8 font-sans text-base font-semibold tracking-normal text-ink-900 dark:text-white">
      {children}
    </h3>
  )
}

function Checklist({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={cn('grid gap-3', columns && 'sm:grid-cols-2 sm:gap-x-6')}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-700 dark:text-ink-200">
          <CircleCheck
            className="mt-0.5 size-5 shrink-0 text-brand-500 dark:text-brand-300"
            aria-hidden
          />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
