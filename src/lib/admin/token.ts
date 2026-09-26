import { createHmac, timingSafeEqual } from 'node:crypto'
import { getSessionSecret } from './config'

/**
 * Sessiya bazada saxlanmır: cookie-də admin id-si, verilmə və bitmə vaxtı,
 * bir də bunların HMAC imzası durur. Proxy də bu faylı işlədir (Next 16-da
 * proxy Node.js runtime-da işləyir), ona görə burada `next/headers` yoxdur.
 */
export const ADMIN_COOKIE = 'ns_admin_session'
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 gün

export interface SessionPayload {
  /** `Admin` sənədinin id-si. */
  sub: string
  /** Verilmə vaxtı (saniyə). Parol dəyişəndə köhnə sessiyaları kəsir. */
  iat: number
  exp: number
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createSessionToken(adminId: string): string {
  const secret = getSessionSecret()
  if (!secret) throw new Error('ADMIN_SESSION_SECRET təyin edilməyib.')

  const now = Math.floor(Date.now() / 1000)
  const payload = Buffer.from(
    JSON.stringify({ sub: adminId, iat: now, exp: now + SESSION_TTL_SECONDS }),
  ).toString('base64url')

  return `${payload}.${sign(payload, secret)}`
}

/** İmzanı və müddəti yoxlayır. Hesabın hələ mövcudluğunu YOXLAMIR. */
export function readSessionToken(
  token: string | undefined,
): SessionPayload | null {
  if (!token) return null

  const secret = getSessionSecret()
  if (!secret) return null

  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payload, signature] = parts

  const expected = Buffer.from(sign(payload, secret))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null
  }

  try {
    const data = JSON.parse(
      Buffer.from(payload, 'base64url').toString(),
    ) as SessionPayload

    if (
      typeof data.sub !== 'string' ||
      typeof data.iat !== 'number' ||
      typeof data.exp !== 'number' ||
      data.exp * 1000 <= Date.now()
    ) {
      return null
    }

    return data
  } catch {
    return null
  }
}

/** Proxy üçün ilkin süzgəc — bazaya getmir. */
export function verifySessionToken(token: string | undefined): boolean {
  return readSessionToken(token) !== null
}
