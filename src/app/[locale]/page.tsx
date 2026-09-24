import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { CategoryStrip } from '@/components/sections/CategoryStrip'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="flex-1">
      <Hero />
      <CategoryStrip />
    </main>
  )
}
