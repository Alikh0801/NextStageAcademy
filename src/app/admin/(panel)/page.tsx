import type { Metadata } from 'next'
import {
  CircleHelp,
  ClipboardList,
  GraduationCap,
  Mail,
  Newspaper,
} from 'lucide-react'
import { verifyAdmin } from '@/lib/admin/session'

export const metadata: Metadata = {
  title: 'İdarə paneli',
}

const SECTIONS = [
  {
    icon: GraduationCap,
    title: 'Təlimlər',
    description: 'Təlim kataloqu və kateqoriyalar.',
  },
  {
    icon: ClipboardList,
    title: 'Müraciətlər',
    description: 'Təlimlərə göndərilən müraciətlər.',
  },
  {
    icon: Newspaper,
    title: 'Bloq',
    description: 'Məqalələr və dərc statusu.',
  },
  {
    icon: Mail,
    title: 'Mesajlar',
    description: 'Əlaqə formu və CV müraciətləri.',
  },
  {
    icon: CircleHelp,
    title: 'FAQ',
    description: 'Tez-tez verilən suallar.',
  },
] as const

export default async function AdminDashboardPage() {
  await verifyAdmin()

  return (
    <main className="container-page flex-1 py-10">
      <h1 className="text-3xl">İdarə paneli</h1>
      <p className="mt-2 text-ink-500">Saytın məzmununu buradan idarə et.</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="rounded-card border border-ink-100 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-500">
                Tezliklə
              </span>
            </div>
            <h2 className="mt-4 text-lg">{title}</h2>
            <p className="mt-1 text-sm text-ink-500">{description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
