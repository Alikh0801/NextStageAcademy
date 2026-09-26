'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { Admin } from '@/models'
import { hashPassword, verifyPassword } from '@/lib/admin/password'
import {
  clearFailedAttempts,
  getClientIp,
  isRateLimited,
  recordFailedAttempt,
} from '@/lib/admin/rate-limit'
import {
  createSession,
  deleteSession,
  verifyAdmin,
} from '@/lib/admin/session'

const MIN_PASSWORD_LENGTH = 8
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * E-poçt tapılmayanda da parol yoxlanılır ki, cavab müddəti hesabın
 * mövcudluğunu sızdırmasın. Bu dəyər heç bir parola uyğun gəlmir.
 */
const DUMMY_HASH = `${'0'.repeat(32)}:${'0'.repeat(128)}`

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

  const ip = await getClientIp()
  let adminId: string

  try {
    if (await isRateLimited(ip)) {
      return {
        error: 'Çox sayda uğursuz cəhd. 15 dəqiqə sonra yenidən yoxla.',
        email,
      }
    }

    await connectDB()
    const admin = await Admin.findOne({ email }).select('passwordHash').lean()
    const passwordOk = await verifyPassword(
      password,
      admin?.passwordHash ?? DUMMY_HASH,
    )

    if (!admin || !passwordOk) {
      await recordFailedAttempt(ip)
      return { error: 'E-poçt və ya parol yanlışdır.', email }
    }

    await clearFailedAttempts(ip)
    adminId = String(admin._id)
  } catch (error) {
    console.error('Admin girişi alınmadı:', error)
    return { error: 'Server xətası. Bir az sonra yenidən yoxla.', email }
  }

  await createSession(adminId)
  redirect(safeRedirectTarget(from))
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect('/admin/login')
}

// ------------------------------------------------------------ admin idarəsi

export type AdminFormState =
  | { error?: string; success?: string }
  | undefined

export async function createAdmin(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await verifyAdmin()

  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const name = String(formData.get('name') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'E-poçt və parol boş ola bilməz.' }
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { error: 'E-poçt ünvanı düzgün deyil.' }
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Parol ən azı ${MIN_PASSWORD_LENGTH} simvol olmalıdır.` }
  }

  try {
    await connectDB()

    if (await Admin.exists({ email })) {
      return { error: 'Bu e-poçt artıq qeydiyyatdadır.' }
    }

    await Admin.create({
      email,
      name: name || undefined,
      passwordHash: await hashPassword(password),
      passwordChangedAt: new Date(),
    })
  } catch (error) {
    console.error('Admin əlavə edilmədi:', error)
    return { error: 'Admin əlavə edilmədi. Bir az sonra yenidən yoxla.' }
  }

  revalidatePath('/admin/adminler')
  return { success: `${email} əlavə edildi.` }
}

/**
 * Düymə interfeysdə gizlədilir, buradakı yoxlamalar ikinci müdafiə xəttidir:
 * admin özünü silə bilməz və sonuncu hesab silinə bilməz.
 */
export async function deleteAdmin(formData: FormData): Promise<void> {
  const current = await verifyAdmin()
  const id = String(formData.get('id') ?? '')

  if (!id || id === current.id) return

  try {
    await connectDB()
    if ((await Admin.countDocuments()) <= 1) return
    await Admin.deleteOne({ _id: id })
  } catch (error) {
    console.error('Admin silinmədi:', error)
  }

  revalidatePath('/admin/adminler')
}
