import type { Metadata } from 'next'
import { inter, poppins } from '../fonts'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Admin paneli',
    template: '%s | Admin — NextStage Academy',
  },
  robots: { index: false, follow: false },
}

/** Admin panelin öz root layout-u: saytın header-i və dil sistemi burada yoxdur. */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az" className={`${inter.variable} ${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-ink-50">{children}</body>
    </html>
  )
}
