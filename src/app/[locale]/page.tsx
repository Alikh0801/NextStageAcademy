import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="flex-1">
      <Hero />
    </main>
  )
}
