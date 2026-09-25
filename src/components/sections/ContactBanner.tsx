import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon'
import { CONTACT, whatsappHref } from '@/lib/site'

/** Bloqun altındakı "Sualın var?" zolağı — düymə WhatsApp söhbətini açır. */
export async function ContactBanner() {
  const t = await getTranslations('Contact')

  return (
    <section className="bg-white py-12 lg:py-16 dark:bg-ink-950">
      <div className="container-page">
        <div className="flex flex-col gap-6 rounded-2xl bg-brand-50 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:px-10 dark:border dark:border-white/10 dark:bg-brand-500/10">
          <div className="flex flex-1 items-center gap-5 sm:gap-6">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-100 sm:size-20 dark:bg-brand-500/20">
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
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-800 px-7 py-3.5 text-[15px] font-medium text-white shadow-md shadow-brand-800/25 transition-opacity hover:opacity-90 dark:from-brand-500 dark:to-brand-600"
          >
            {t('bannerCta')}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
