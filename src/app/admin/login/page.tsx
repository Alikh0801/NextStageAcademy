import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { isAdmin } from '@/lib/admin/session'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Giriş',
}

export default async function AdminLoginPage({
  searchParams,
}: PageProps<'/admin/login'>) {
  if (await isAdmin()) redirect('/admin')

  const { from } = await searchParams

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          {/* Loqo da sayta qayıdır — panel layout-undakı davranışla eynidir. */}
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="mt-8 rounded-card border border-ink-100 bg-white p-6 shadow-sm shadow-ink-900/5 sm:p-8">
          <h1 className="text-2xl">Admin paneli</h1>
          <p className="mt-1 text-sm text-ink-500">
            Davam etmək üçün hesabına daxil ol.
          </p>

          <LoginForm from={typeof from === 'string' ? from : ''} />
        </div>

        <p className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Ana səhifəyə qayıt
          </Link>
        </p>
      </div>
    </main>
  )
}
