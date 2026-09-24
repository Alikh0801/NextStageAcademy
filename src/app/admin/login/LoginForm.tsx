'use client'

import { useActionState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { login } from '../actions'

const INPUT_CLASS =
  'mt-1.5 block w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'

export function LoginForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="from" value={from} />

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink-700">
          E-poçt
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          // Səhv cəhddən sonra form sıfırlanır — e-poçtu yenidən yazdırmırıq.
          defaultValue={state?.email}
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink-700">
          Parol
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={INPUT_CLASS}
        />
      </div>

      {state?.error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-brand-600/20 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
        {pending ? 'Yoxlanılır...' : 'Daxil ol'}
      </button>
    </form>
  )
}
