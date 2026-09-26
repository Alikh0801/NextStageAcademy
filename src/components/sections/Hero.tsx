import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, ChartColumnIncreasing, Goal, Users } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { enter } from '@/lib/motion'

const BADGES = [
  { icon: Goal, key: 'badgeGrowth' },
  { icon: Users, key: 'badgeCommunity' },
  { icon: ChartColumnIncreasing, key: 'badgeFuture' },
] as const

export async function Hero() {
  const t = await getTranslations('Hero')

  return (
    // `isolate` ayrıca yığın konteksti yaradır — mənfi z-index-lər
    // bölmədən kənara çıxmır və header-in altına düşmür.
    <section className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-white lg:min-h-[660px] dark:bg-ink-950">
      {/*
        Sırf dekorativ fon: abstrakt qradiyentdir, heç bir obyekt daşımır.
        Ona görə `alt` boşdur — ekran oxuyucusu onu ötürsün. Şəkil hər yerində
        açıq tonda olduğuna görə mətnin arxasına pərdə çəkmək lazım deyil.
      */}
      <Image
        src="/hero/fone.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 animate-hero-zoom object-cover object-center dark:hidden"
      />
      {/* Eyni dalğaların tünd variantı. Gizli olsa da yüklənsin ki, tema
          dəyişəndə fon boş qalmasın. */}
      <Image
        src="/hero/fone-dark.jpeg"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="-z-10 hidden animate-hero-zoom object-cover object-center dark:block"
      />

      <div className="container-page">
        <div className="max-w-lg py-16 lg:py-20">
          <p
            style={enter(0)}
            className="animate-fade-up text-xs font-semibold uppercase tracking-[0.22em] text-ink-400 dark:text-brand-300"
          >
            {t('eyebrow')}
          </p>

          <h1
            style={enter(1)}
            className="mt-5 animate-fade-up text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            {t('title')}
          </h1>

          <p
            style={enter(2)}
            className="mt-5 animate-fade-up text-base leading-relaxed text-ink-500 sm:text-lg dark:text-ink-300"
          >
            {t('subtitle')}
          </p>

          <div
            style={enter(3)}
            className="mt-8 flex animate-fade-up flex-wrap items-center gap-4"
          >
            <Link
              href="/telimler"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-[15px] font-medium text-white shadow-md shadow-brand-600/25 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-600/35"
            >
              {t('primaryCta')}
              <ArrowRight
                className="size-4 transition-[translate] duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>

            <Link
              href="/haqqimizda"
              className="inline-flex items-center rounded-full border border-ink-200 bg-white/70 px-7 py-3.5 text-[15px] font-medium text-ink-800 backdrop-blur-sm transition-[color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700 dark:border-white/20 dark:bg-white/5 dark:text-ink-100 dark:hover:border-brand-300 dark:hover:text-brand-200"
            >
              {t('secondaryCta')}
            </Link>
          </div>

          <ul
            style={enter(4)}
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-8 gap-y-4"
          >
            {BADGES.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="flex items-center gap-2.5 text-sm text-ink-600 dark:text-ink-300"
              >
                <Icon className="size-5 shrink-0 text-brand-500 dark:text-brand-300" aria-hidden />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
