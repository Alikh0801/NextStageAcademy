import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon'
import { reveal } from '@/lib/motion'
import { CONTACT, whatsappHref } from '@/lib/site'

/** Bloqun altındakı "Sualın var?" zolağı — düymə WhatsApp söhbətini açır. */
export async function ContactBanner() {
  const t = await getTranslations('Contact')

  return (
    // Bloq bölməsi ilə eyni fondadır: üst məsafəni bloqun alt boşluğu verir,
    // alt boşluq da ona bərabərdir ki, footer-ə qədər məsafə eyni olsun.
    <section className="bg-ink-50 pb-10 lg:pb-12 dark:bg-ink-900">
      <div className="container-page">
        <div
          {...reveal()}
          className="flex flex-col gap-6 rounded-2xl bg-brand-100/60 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:px-10 dark:border dark:border-white/10 dark:bg-brand-500/10"
        >
          <div className="flex flex-1 items-center gap-5 sm:gap-6">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white sm:size-20 dark:bg-brand-500/20">
              <WhatsAppIcon className="size-8 text-brand-700 sm:size-9 dark:text-brand-300" />
            </span>

            <div>
              <h2 className="text-xl sm:text-2xl">{t('bannerTitle')}</h2>
              <p className="mt-1.5 text-sm text-ink-600 sm:text-[15px] dark:text-ink-300">
                {t('bannerSubtitle')}
              </p>
            </div>
          </div>

          <a
            href={whatsappHref(CONTACT.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-800 px-7 py-3.5 text-[15px] font-medium text-white shadow-md shadow-brand-800/25 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-800/35 dark:from-brand-500 dark:to-brand-600"
          >
            {t('bannerCta')}
            <ArrowRight
              className="size-4 transition-[translate] duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  )
}
