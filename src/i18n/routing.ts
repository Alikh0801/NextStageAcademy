import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['az', 'ru', 'en'],
  defaultLocale: 'az',

  // Azərbaycan dili prefikssiz açılır (/telimler),
  // digərləri prefiksli olur (/ru/kursy, /en/courses).
  localePrefix: 'as-needed',

  // Sol tərəf — kodda işlətdiyimiz daxili yol.
  // Sağ tərəf — istifadəçinin brauzerdə gördüyü ünvan.
  pathnames: {
    '/': '/',
    '/haqqimizda': {
      az: '/haqqimizda',
      ru: '/o-nas',
      en: '/about',
    },
    '/telimler': {
      az: '/telimler',
      ru: '/kursy',
      en: '/courses',
    },
    '/telimler/[slug]': {
      az: '/telimler/[slug]',
      ru: '/kursy/[slug]',
      en: '/courses/[slug]',
    },
    '/karyera': {
      az: '/karyera',
      ru: '/karyera',
      en: '/career',
    },
    '/bloq': {
      az: '/bloq',
      ru: '/blog',
      en: '/blog',
    },
    '/bloq/[slug]': {
      az: '/bloq/[slug]',
      ru: '/blog/[slug]',
      en: '/blog/[slug]',
    },
    '/elaqe': {
      az: '/elaqe',
      ru: '/kontakty',
      en: '/contact',
    },
    '/giris': {
      az: '/giris',
      ru: '/vhod',
      en: '/sign-in',
    },
    '/qeydiyyat': {
      az: '/qeydiyyat',
      ru: '/registraciya',
      en: '/sign-up',
    },
    '/hesabim': {
      az: '/hesabim',
      ru: '/kabinet',
      en: '/account',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
