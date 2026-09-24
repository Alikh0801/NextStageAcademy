import Link from 'next/link'
import { ExternalLink, LogOut } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { verifyAdmin } from '@/lib/admin/session'
import { logout } from '../actions'

/**
 * Layout naviqasiyada yenidən render olunmur, ona görə buradakı yoxlama
 * kifayət deyil — hər səhifə `verifyAdmin()`-i özü də çağırır.
 */
export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await verifyAdmin()

  return (
    <>
      <header className="border-b border-ink-100 bg-white">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo className="h-8" />
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
              Admin
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink-600 transition-colors hover:text-brand-600 sm:inline-flex"
            >
              <ExternalLink className="size-4" aria-hidden />
              Sayta keç
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                <LogOut className="size-4" aria-hidden />
                Çıxış
              </button>
            </form>
          </div>
        </div>
      </header>

      {children}
    </>
  )
}
