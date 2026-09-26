import type { Metadata } from 'next'
import { Trash2 } from 'lucide-react'
import { connectDB } from '@/lib/db'
import { Admin } from '@/models'
import { verifyAdmin } from '@/lib/admin/session'
import { deleteAdmin } from '../../actions'
import { AddAdminForm } from './AddAdminForm'

export const metadata: Metadata = {
  title: 'Adminlər',
}

/** Sessiya bazadan yoxlanır — səhifə heç vaxt keşlənməməlidir. */
export const dynamic = 'force-dynamic'

export default async function AdminsPage() {
  const current = await verifyAdmin()

  await connectDB()
  const admins = await Admin.find()
    .select('email name createdAt')
    .sort({ createdAt: 1 })
    .lean()

  return (
    <main className="container-page py-10">
      <h1 className="text-2xl font-semibold text-ink-900">Adminlər</h1>
      <p className="mt-1 text-sm text-ink-500">
        Panelə giriş hüququ olan hesablar.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <ul className="divide-y divide-ink-100">
          {admins.map((admin) => {
            const id = String(admin._id)
            const isSelf = id === current.id
            // Sonuncu hesab silinərsə panelə giriş bağlanar.
            const canDelete = !isSelf && admins.length > 1

            return (
              <li
                key={id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink-900">
                    {admin.name || admin.email}
                    {isSelf && (
                      <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                        sən
                      </span>
                    )}
                  </p>
                  {admin.name && (
                    <p className="truncate text-sm text-ink-500">
                      {admin.email}
                    </p>
                  )}
                </div>

                {canDelete && (
                  <form action={deleteAdmin}>
                    <input type="hidden" name="id" value={id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink-500 transition-colors hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="size-4" aria-hidden />
                      Sil
                    </button>
                  </form>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-8">
        <AddAdminForm />
      </div>
    </main>
  )
}
