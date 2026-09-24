'use server'

import { redirect } from 'next/navigation'
import { getAdminConfig } from '@/lib/admin/config'
import { safeEqual, verifyPassword } from '@/lib/admin/password'
import {
  clearFailedAttempts,
  getClientIp,
  isRateLimited,
  recordFailedAttempt,
} from '@/lib/admin/rate-limit'
import { createSession, deleteSession } from '@/lib/admin/session'

export type LoginState = { error: string; email: string } | undefined

/** Yalnız panel daxilindəki yollara qaytarır — açıq redirect-in qarşısını alır. */
function safeRedirectTarget(from: string): string {
  if (!/^\/admin(\/|$)/.test(from) || from.startsWith('/admin/login')) {
    return '/admin'
  }
  return from
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const from = String(formData.get('from') ?? '')

  if (!email || !password) {
    return { error: 'E-poçt və parolu daxil et.', email }
  }

  const config = getAdminConfig()
  if (!config) {
    console.error(
      'Admin girişi: ADMIN_EMAIL, ADMIN_PASSWORD_HASH və ya ADMIN_SESSION_SECRET düzgün təyin edilməyib.',
    )
    return { error: 'Admin girişi hələ qurulmayıb.', email }
  }

  const ip = await getClientIp()

  try {
    if (await isRateLimited(ip)) {
      return {
        error: 'Çox sayda uğursuz cəhd. 15 dəqiqə sonra yenidən yoxla.',
        email,
      }
    }

    // Parol e-poçt səhv olanda da yoxlanır ki, cavab müddəti fərq verməsin.
    const emailOk = safeEqual(email, config.email)
    const passwordOk = await verifyPassword(password, config.passwordHash)

    if (!emailOk || !passwordOk) {
      await recordFailedAttempt(ip)
      return { error: 'E-poçt və ya parol yanlışdır.', email }
    }

    await clearFailedAttempts(ip)
  } catch (error) {
    console.error('Admin girişi alınmadı:', error)
    return { error: 'Server xətası. Bir az sonra yenidən yoxla.', email }
  }

  await createSession()
  redirect(safeRedirectTarget(from))
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect('/admin/login')
}
