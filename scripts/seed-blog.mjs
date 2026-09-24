/**
 * Bloq bölməsini real məzmunla görmək üçün nümunə yazılar əlavə edir.
 * İşlətmək:  npm run seed:blog
 *
 * Slug-a görə upsert edir — təkrar işlətsən dublikat yaratmır.
 * Silmək üçün: eyni slug-ları `posts` kolleksiyasından sil.
 */
import dns from 'node:dns'
import mongoose from 'mongoose'

// Windows-da DNS resolver-i `127.0.0.1`-ə düşəndə SRV sorğusu sınır (bax: src/lib/db.ts).
const FALLBACK_DNS = ['1.1.1.1', '8.8.8.8']
const isBroken = (s) => s.length === 1 && s[0] === '127.0.0.1'
if (isBroken(dns.getServers())) dns.setServers(FALLBACK_DNS)
if (isBroken(dns.promises.getServers())) dns.promises.setServers(FALLBACK_DNS)

const uri = process.env.DATABASE_URL
if (!uri) {
  console.error('DATABASE_URL təyin edilməyib.')
  process.exit(1)
}

const POSTS = [
  {
    slug: 'cv-de-nelere-diqqet-etmeli',
    coverImage: '/blog/cv.jpg',
    title: {
      az: 'CV-də nələrə diqqət etməli?',
      ru: 'На что обратить внимание в резюме?',
      en: 'What to look out for in your CV',
    },
    excerpt: {
      az: 'Güclü CV-nin quruluşu və ən çox buraxılan səhvlər.',
      ru: 'Структура сильного резюме и самые частые ошибки.',
      en: 'How a strong CV is structured and the most common mistakes.',
    },
    content: {
      az: 'CV işəgötürənlə ilk təmas nöqtəsidir. Aydın quruluş, ölçülə bilən nəticələr və vakansiyaya uyğunlaşdırılmış məzmun onu fərqləndirir.',
      ru: 'Резюме — первая точка контакта с работодателем. Его выделяют чёткая структура, измеримые результаты и адаптация под вакансию.',
      en: 'Your CV is the first point of contact with an employer. A clear structure, measurable results and tailoring to the role set it apart.',
    },
    publishedAt: new Date('2026-09-12T09:00:00Z'),
  },
  {
    slug: 'soft-skills-niye-vacibdir',
    coverImage: '/blog/soft-skills.jpg',
    title: {
      az: 'Soft skills niyə vacibdir?',
      ru: 'Почему важны soft skills?',
      en: 'Why soft skills matter',
    },
    excerpt: {
      az: 'Texniki biliyin çatmadığı yerdə ünsiyyət və komanda işi həll edir.',
      ru: 'Там, где не хватает технических знаний, решают общение и работа в команде.',
      en: 'Where technical knowledge runs out, communication and teamwork take over.',
    },
    content: {
      az: 'İşəgötürənlər getdikcə daha çox ünsiyyət, komanda işi və uyğunlaşma bacarığına baxır. Bu bacarıqlar öyrənilə bilər və praktika ilə güclənir.',
      ru: 'Работодатели всё чаще смотрят на общение, командную работу и адаптивность. Этим навыкам можно научиться, и практика их укрепляет.',
      en: 'Employers increasingly look at communication, teamwork and adaptability. These skills can be learned and grow with practice.',
    },
    publishedAt: new Date('2026-09-05T09:00:00Z'),
  },
  {
    slug: 'ugurlu-karyera-ucun-5-addim',
    coverImage: '/blog/career.jpg',
    title: {
      az: 'Uğurlu karyera üçün 5 addım',
      ru: '5 шагов к успешной карьере',
      en: 'Five steps to a successful career',
    },
    excerpt: {
      az: 'Hədəf qoymaqdan şəbəkə qurmağa qədər praktik yol xəritəsi.',
      ru: 'Практическая карта пути — от постановки целей до нетворкинга.',
      en: 'A practical roadmap, from setting goals to building a network.',
    },
    content: {
      az: 'Karyera təsadüfən qurulmur. Hədəf, öyrənmə vərdişi, şəbəkə, geri bildiriş və səbir — beş addım bunlardır.',
      ru: 'Карьера не строится случайно. Цель, привычка учиться, сеть контактов, обратная связь и терпение — вот пять шагов.',
      en: 'Careers are not built by accident. A goal, a learning habit, a network, feedback and patience are the five steps.',
    },
    publishedAt: new Date('2026-08-28T09:00:00Z'),
  },
]

await mongoose.connect(uri)
const posts = mongoose.connection.db.collection('posts')

for (const post of POSTS) {
  const now = new Date()
  const result = await posts.updateOne(
    { slug: post.slug },
    {
      $set: { ...post, isPublished: true, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  )
  console.log(
    `${post.slug} -> ${result.upsertedCount ? 'əlavə edildi' : 'yeniləndi'}`,
  )
}

console.log(`\ncəmi yazı: ${await posts.countDocuments()}`)
await mongoose.disconnect()
