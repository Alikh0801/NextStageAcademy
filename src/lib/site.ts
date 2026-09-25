/**
 * Footer-dəki əlaqə məlumatları. Telefon boş qalanda footer-də göstərilmir —
 * saxta nömrə yayımlamayaq.
 */
export const CONTACT = {
  /** Göründüyü kimi, məs. "+994 50 123 45 67". */
  phone: '',
} as const

/** `tel:` linki üçün boşluqsuz forma. */
export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
