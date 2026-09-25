import { Inter, Poppins, Sacramento } from 'next/font/google'

/** Sayt və admin panel ayrı root layout-lardır — fontlar hər ikisində eynidir. */
export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
})

export const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  display: 'swap',
})

/** Footer-dəki "Next Stop Again..." imzası üçün əlyazma şrifti. */
export const sacramento = Sacramento({
  variable: '--font-sacramento',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
})
