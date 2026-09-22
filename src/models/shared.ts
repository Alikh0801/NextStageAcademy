import { Schema } from 'mongoose'

export const LOCALES = ['az', 'ru', 'en'] as const
export type Locale = (typeof LOCALES)[number]

/** Çoxdilli mətn. Azərbaycan dili məcburidir, digərləri boş qala bilər. */
export interface Translated {
  az: string
  ru?: string
  en?: string
}

/** Sub-sənəd kimi yerləşir, ona görə öz `_id`-si olmamalıdır. */
export function translatedSchema(required = true) {
  return new Schema<Translated>(
    {
      az: { type: String, required, trim: true },
      ru: { type: String, trim: true },
      en: { type: String, trim: true },
    },
    { _id: false },
  )
}

/** Dil boşdursa Azərbaycan dilinə qayıdır. */
export function t(value: Translated | null | undefined, locale: Locale): string {
  if (!value) return ''
  return value[locale]?.trim() || value.az || ''
}
