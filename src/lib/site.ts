/**
 * Əlaqə məlumatları. Telefon hələlik şablon nömrədir — admin panel hazır
 * olanda bazaya köçürüləcək və oradan dəyişdiriləcək. Boş qalan sahə
 * footer-də göstərilmir.
 */
export const CONTACT = {
  /** Göründüyü kimi, məs. "+994 50 123 45 67". */
  phone: '+994 50 000 00 00',
  /** Saytdakı bütün "Əlaqə saxla" / "Müraciət et" düymələri bu nömrəyə yazır. */
  whatsapp: '+994 50 372 60 93',
  instagram: 'https://www.instagram.com/nextstageacademyy',
} as const

/** Profil ünvanından "@ad" forması: footer-də göstərmək üçün. */
export function instagramHandle(url: string): string {
  return `@${new URL(url).pathname.replace(/\//g, '')}`
}

/** `tel:` linki üçün boşluqsuz forma. */
export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/**
 * WhatsApp söhbət linki. `wa.me` nömrəni `+` və boşluqsuz, yalnız rəqəmlə
 * istəyir. `text` verilərsə söhbət həmin mesajla hazır açılır.
 */
export function whatsappHref(phone: string, text?: string): string {
  const url = `https://wa.me/${phone.replace(/\D/g, '')}`
  return text ? `${url}?text=${encodeURIComponent(text)}` : url
}
