'use client'

import { useActionState } from 'react'
import { LoaderCircle, UserPlus } from 'lucide-react'
import { createAdmin } from '../../actions'

const INPUT_CLASS =
  'mt-1.5 block w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'

export function AddAdminForm() {
  const [state, action, pending] = useActionState(createAdmin, undefined)

  return (
    <form
      action={action}
      // Uğurlu əlavədən sonra sahələr təmizlənsin deyə açar dəyişir.
      key={state?.success ?? 'form'}
      className="rounded-2xl border border-ink-100 bg-white p-6"
    >
      <h2 className="text-lg font-semibold text-ink-900">Yeni admin</h2>
      <p className="mt-1 text-sm text-ink-500">
        Hesab yaradıldıqdan sonra parolu yalnız bu səhifədən yenidən təyin
        etmək mümkündür.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink-700">
            E-poçt
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            required
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink-700">
            Ad <span className="text-ink-400">(istəyə bağlı)</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            className={INPUT_CLASS}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-ink-700"
          >
            Parol
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className={INPUT_CLASS}
          />
          <p className="mt-1.5 text-xs text-ink-400">Ən azı 8 simvol.</p>
        </div>
      </div>

      {state?.error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}

      {state?.success && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-green-50 px-3.5 py-2.5 text-sm text-green-700"
        >
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-brand-600/20 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden />
        ) : (
          <UserPlus className="size-4" aria-hidden />
        )}
        {pending ? 'Əlavə edilir...' : 'Admin əlavə et'}
      </button>
    </form>
  )
}
