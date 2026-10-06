/** Əlaqə məlumatları. Boş qalan sahə footer-də göstərilmir. */
export const CONTACT = {
  /** Saytdakı bütün "Əlaqə saxla" / "Müraciət et" düymələri bu nömrəyə yazır. */
  whatsapp: '+994 50 372 60 93',
  instagram: 'https://www.instagram.com/nextstageacademyy',
} as const

/** Profil ünvanından "@ad" forması: footer-də göstərmək üçün. */
export function instagramHandle(url: string): string {
  return `@${new URL(url).pathname.replace(/\//g, '')}`
}

/**
 * WhatsApp söhbət linki. `wa.me` nömrəni `+` və boşluqsuz, yalnız rəqəmlə
 * istəyir. `text` verilərsə söhbət həmin mesajla hazır açılır.
 */
export function whatsappHref(phone: string, text?: string): string {
  const url = `https://wa.me/${phone.replace(/\D/g, '')}`
  return text ? `${url}?text=${encodeURIComponent(text)}` : url
}
