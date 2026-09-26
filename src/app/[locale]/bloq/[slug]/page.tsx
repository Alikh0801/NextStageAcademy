import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { connectDB } from '@/lib/db'
import { Post, t as pick, type Locale } from '@/models'

export const revalidate = 300

async function getPost(slug: string) {
  try {
    await connectDB()
    return await Post.findOne({ slug, isPublished: true }).lean()
  } catch (error) {
    console.error('[Bloq] yazı oxunmadı:', error)
    return null
  }
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/bloq/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  return {
    title: pick(post.title, locale as Locale),
    description: post.excerpt ? pick(post.excerpt, locale as Locale) : undefined,
  }
}

// Sadə oxu səhifəsi — məzmun hələ düz mətndir, zəngin formatlama sonra.
export default async function BlogPostPage({
  params,
}: PageProps<'/[locale]/bloq/[slug]'>) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getPost(slug)
  if (!post) notFound()

  const date = post.publishedAt
    ? new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(post.publishedAt)
    : null

  return (
    <main className="flex-1 bg-white py-12 lg:py-16 dark:bg-ink-950">
      <article className="container-page max-w-3xl">
        <h1 className="text-3xl lg:text-4xl">{pick(post.title, locale as Locale)}</h1>

        {date && <p className="mt-3 text-sm text-ink-400">{date}</p>}

        {post.coverImage && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-brand-100 dark:bg-brand-500/15">
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-8 whitespace-pre-line leading-relaxed text-ink-700 dark:text-ink-200">
          {pick(post.content, locale as Locale)}
        </div>
      </article>
    </main>
  )
}
