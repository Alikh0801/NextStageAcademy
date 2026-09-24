import 'server-only'
import { headers } from 'next/headers'
import { connectDB } from '@/lib/db'
import { LOGIN_ATTEMPT_WINDOW_SECONDS, LoginAttempt } from '@/models'

/**
 * Serverless-də yaddaşdakı sayğac instansiyalar arasında paylaşılmır, ona görə
 * uğursuz cəhdlər bazada saxlanır.
 */
const MAX_FAILED_ATTEMPTS = 5

/** Vercel `x-forwarded-for`-u özü yazır, müştəri onu saxtalaşdıra bilmir. */
export async function getClientIp(): Promise<string> {
  const headerList = await headers()
  return (
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    'unknown'
  )
}

export async function isRateLimited(ip: string): Promise<boolean> {
  await connectDB()
  const since = new Date(Date.now() - LOGIN_ATTEMPT_WINDOW_SECONDS * 1000)
  const count = await LoginAttempt.countDocuments({
    ip,
    createdAt: { $gte: since },
  })
  return count >= MAX_FAILED_ATTEMPTS
}

export async function recordFailedAttempt(ip: string): Promise<void> {
  await connectDB()
  await LoginAttempt.create({ ip })
}

export async function clearFailedAttempts(ip: string): Promise<void> {
  await connectDB()
  await LoginAttempt.deleteMany({ ip })
}
