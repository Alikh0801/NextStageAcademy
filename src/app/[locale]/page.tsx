import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { CategoryStrip } from '@/components/sections/CategoryStrip'
import { BlogSection } from '@/components/sections/BlogSection'

/** Bloq bölməsi bazadan oxuyur — səhifə 5 dəqiqədən bir yenilənir. */
export const revalidate = 300

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="flex-1">
      <Hero />
      <CategoryStrip />
      <BlogSection />
    </main>
  )
}
