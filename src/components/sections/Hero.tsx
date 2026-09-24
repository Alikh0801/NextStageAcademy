import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, ChartColumnIncreasing, Goal, Users } from 'lucide-react'
import { Link } from '@/i18n/navigation'

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
    <section className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-white lg:min-h-[660px]">
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
        className="-z-10 object-cover object-center"
      />

      <div className="container-page">
        <div className="max-w-lg py-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-400">
            {t('eyebrow')}
          </p>

          <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/telimler"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-[15px] font-medium text-white shadow-md shadow-brand-600/25 transition-opacity hover:opacity-90"
            >
              {t('primaryCta')}
              <ArrowRight className="size-4" aria-hidden />
            </Link>

            <Link
              href="/haqqimizda"
              className="inline-flex items-center rounded-full border border-ink-200 bg-white/70 px-7 py-3.5 text-[15px] font-medium text-ink-800 backdrop-blur-sm transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              {t('secondaryCta')}
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {BADGES.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="flex items-center gap-2.5 text-sm text-ink-600"
              >
                <Icon className="size-5 shrink-0 text-brand-500" aria-hidden />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
