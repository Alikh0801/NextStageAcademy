import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  ADMIN_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  verifySessionToken,
} from './token'

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
}

export const isAdmin = cache(async (): Promise<boolean> => {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE)?.value)
})

/**
 * Qorunan hər səhifə və Server Action əvvəlcə bunu çağırmalıdır. Proxy-dəki
 * yoxlama yalnız ilkin süzgəcdir — əsas müdafiə buradadır.
 */
export async function verifyAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect('/admin/login')
}
