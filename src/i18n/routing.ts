import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['az', 'ru', 'en', 'tr'],
  defaultLocale: 'az',

  // Azərbaycan dili prefikssiz açılır (/telimler),
  // digərləri prefiksli olur (/ru/kursy, /en/courses, /tr/egitimler).
  localePrefix: 'as-needed',

  // Sol tərəf — kodda işlətdiyimiz daxili yol.
  // Sağ tərəf — istifadəçinin brauzerdə gördüyü ünvan.
  pathnames: {
    '/': '/',
    '/haqqimizda': {
      az: '/haqqimizda',
      ru: '/o-nas',
      en: '/about',
      tr: '/hakkimizda',
    },
    '/telimler': {
      az: '/telimler',
      ru: '/kursy',
      en: '/courses',
      tr: '/egitimler',
    },
    '/telimler/[slug]': {
      az: '/telimler/[slug]',
      ru: '/kursy/[slug]',
      en: '/courses/[slug]',
      tr: '/egitimler/[slug]',
    },
    '/karyera': {
      az: '/karyera',
      ru: '/karyera',
      en: '/career',
      tr: '/kariyer',
    },
    '/bloq': {
      az: '/bloq',
      ru: '/blog',
      en: '/blog',
      tr: '/blog',
    },
    '/bloq/[slug]': {
      az: '/bloq/[slug]',
      ru: '/blog/[slug]',
      en: '/blog/[slug]',
      tr: '/blog/[slug]',
    },
    '/elaqe': {
      az: '/elaqe',
      ru: '/kontakty',
      en: '/contact',
      tr: '/iletisim',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
