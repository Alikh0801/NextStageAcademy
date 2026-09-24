import { createHmac, timingSafeEqual } from 'node:crypto'
import { getAdminConfig, type AdminConfig } from './config'

/**
 * Sessiya bazada saxlanmır: cookie-də bitmə vaxtı və onun HMAC imzası durur.
 * Proxy də bu faylı işlədir (Next 16-da proxy Node.js runtime-da işləyir),
 * ona görə burada `next/headers` və `server-only` yoxdur.
 */
export const ADMIN_COOKIE = 'ns_admin_session'
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 gün

/**
 * Açara parol hash-i də qatılır: parol dəyişəndə köhnə sessiyalar avtomatik
 * etibarsız olur. `ADMIN_SESSION_SECRET`-i dəyişmək də hamını çıxarır.
 */
function sign(payload: string, config: AdminConfig): string {
  return createHmac('sha256', `${config.sessionSecret}:${config.passwordHash}`)
    .update(payload)
    .digest('base64url')
}

export function createSessionToken(): string {
  const config = getAdminConfig()
  if (!config) throw new Error('Admin env dəyişənləri təyin edilməyib.')

  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const payload = Buffer.from(JSON.stringify({ exp })).toString('base64url')
  return `${payload}.${sign(payload, config)}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false

  const config = getAdminConfig()
  if (!config) return false

  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payload, signature] = parts

  const expected = Buffer.from(sign(payload, config))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return false
  }

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof exp === 'number' && exp * 1000 > Date.now()
  } catch {
    return false
  }
}
