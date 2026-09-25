import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { connectDB } from '@/lib/db'
import { Post, t as pick, type Locale } from '@/models'

type BlogCard = {
  slug: string
  title: string
  date: string | null
  coverImage?: string
}

function formatDate(value: Date | undefined, locale: Locale): string | null {
  if (!value) return null
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(value)
}

/**
 * Baza əlçatmaz olsa bölmə boş göstərilir, səhifə isə sıradan çıxmır.
 * Bu, həm də build zamanı vacibdir: Atlas cavab verməsə deploy dayanmasın.
 */
async function getLatestPosts(locale: Locale): Promise<BlogCard[]> {
  try {
    await connectDB()

    const posts = await Post.find({ isPublished: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(3)
      .select('slug title coverImage publishedAt')
      .lean()

    return posts.map((post) => ({
      slug: post.slug,
      title: pick(post.title, locale),
      date: formatDate(post.publishedAt, locale),
      coverImage: post.coverImage,
    }))
  } catch (error) {
    console.error('[Bloq] yazıları oxumaq alınmadı:', error)
    return []
  }
}

export async function BlogSection() {
  const t = await getTranslations('Blog')
  const locale = (await getLocale()) as Locale
  const posts = await getLatestPosts(locale)

  return (
    // Alt boşluq kiçikdir — altındakı ContactBanner eyni fonda davam edir.
    <section className="bg-ink-50 pb-10 pt-16 lg:pb-12 lg:pt-20 dark:bg-ink-900">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2 className="text-3xl lg:text-4xl">{t('title')}</h2>
            <p className="mt-2 text-ink-500 dark:text-ink-300">{t('subtitle')}</p>
          </div>

          <Link
            href="/bloq"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
          >
            {t('viewAll')}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-12 text-center text-sm text-ink-400 dark:border-white/15 dark:bg-ink-950">
            {t('empty')}
          </p>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={{ pathname: '/bloq/[slug]', params: { slug: post.slug } }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-shadow hover:shadow-lg hover:shadow-ink-900/5 dark:border-white/10 dark:bg-ink-950 dark:hover:shadow-black/40"
                >
                  <div className="relative aspect-[16/10] bg-brand-100 dark:bg-brand-500/15">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                      {post.title}
                    </h3>

                    {post.date && (
                      <p className="mt-2 text-xs text-ink-400">{post.date}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
