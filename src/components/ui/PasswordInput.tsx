'use client'

import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  name: string
  label: string
  /** Parol menecerlərinin düzgün davranması üçün vacibdir. */
  autoComplete: 'current-password' | 'new-password'
  required?: boolean
  minLength?: number
  hint?: string
}

export function PasswordInput({
  name,
  label,
  autoComplete,
  required,
  minLength,
  hint,
}: PasswordInputProps) {
  const id = useId()
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-700">
        {label}
      </label>

      <div className="relative mt-1.5">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          // Sağ tərəfdəki düymənin altına mətn girməsin deyə `pr-11`.
          className="block w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-3.5 pr-11 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          // Klaviatura ilə çatmaq mümkün qalır — gizlətmək əlçatanlığı pozardı.
          aria-label={visible ? 'Parolu gizlət' : 'Parolu göstər'}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-ink-400 transition-colors hover:text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden />
          ) : (
            <Eye className="size-4" aria-hidden />
          )}
        </button>
      </div>

      {hint && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>}
    </div>
  )
}
