import Image from 'next/image'
import { enter } from '@/lib/motion'

/**
 * Daxili səhifələrin başlıq bölməsi (Haqqımızda, Karyera). Şəkillər eyni
 * kompozisiyadadır: sol tərəf açıq və boşdur, obyekt sağdadır — desktopda
 * mətn həmin boş sahənin üstünə düşür. Mobildə şəkil ayrıca blokdur, mətn
 * altında gəlir: dar ekranda mətn şəkildəki obyektin üstünə düşərdi.
 */
export function PageHero({
  image,
  eyebrow,
  title,
  lead,
}: {
  image: string
  eyebrow: string
  title: string
  lead: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-white dark:bg-ink-950">
      <div className="relative aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          // lg-də şəkil üfüqi kəsilir — sol kənara bağlayırıq ki, obyekt
          // mətndən uzaqda, sağda qalsın.
          className="animate-hero-zoom object-cover object-[70%_center] lg:object-left xl:object-center"
        />
        {/* Tünd rejimdə mətnin oxunması üçün sol tərəf qaraldılır */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-ink-950/20 dark:block lg:bg-transparent lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/85 lg:to-ink-950/10"
        />
      </div>

      <div className="container-page">
        <div className="py-10 lg:max-w-sm lg:py-28 xl:max-w-md">
          <p
            style={enter(0)}
            className="animate-fade-up text-xs font-semibold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-300"
          >
            {eyebrow}
          </p>
          <h1
            style={enter(1)}
            className="mt-4 animate-fade-up text-3xl leading-[1.12] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
          <p
            style={enter(2)}
            className="mt-5 animate-fade-up text-base leading-relaxed text-ink-600 sm:text-lg dark:text-ink-300"
          >
            {lead}
          </p>
        </div>
      </div>
    </section>
  )
}
