import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { Admin } from '@/models'
import {
  ADMIN_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  readSessionToken,
} from './token'

export interface CurrentAdmin {
  id: string
  email: string
  name?: string
}

export async function createSession(adminId: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, createSessionToken(adminId), {
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

/**
 * İmzadan əlavə hesabın hələ mövcudluğunu da yoxlayır: silinmiş admin qalıb
 * işləməsin. `cache` sayəsində bir sorğuda baza yalnız bir dəfə döyülür.
 */
export const getCurrentAdmin = cache(async (): Promise<CurrentAdmin | null> => {
  const cookieStore = await cookies()
  const payload = readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value)
  if (!payload) return null

  try {
    await connectDB()
    const admin = await Admin.findById(payload.sub)
      .select('email name passwordChangedAt')
      .lean()

    if (!admin) return null

    // Parol dəyişibsə ondan əvvəl verilmiş sessiyalar etibarsızdır.
    // `iat` saniyə dəqiqliyindədir, ona görə müqayisə də saniyə ilə aparılır.
    const changedAt = Math.floor(admin.passwordChangedAt.getTime() / 1000)
    if (payload.iat < changedAt) return null

    return { id: String(admin._id), email: admin.email, name: admin.name }
  } catch (error) {
    // Baza əlçatmazdırsa girişi bağlayırıq — açıq buraxmaqdan təhlükəsizdir.
    console.error('Admin sessiyası yoxlanmadı:', error)
    return null
  }
})

export async function isAdmin(): Promise<boolean> {
  return (await getCurrentAdmin()) !== null
}

/**
 * Qorunan hər səhifə və Server Action əvvəlcə bunu çağırmalıdır. Proxy-dəki
 * yoxlama yalnız ilkin süzgəcdir — əsas müdafiə buradadır.
 */
export async function verifyAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  return admin
}
