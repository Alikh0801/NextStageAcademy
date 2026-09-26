import 'server-only'
import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'

/** `scripts/admin-password-hash.mjs` ilə eyni parametrlər olmalıdır. */
const KEY_LENGTH = 64

function scryptAsync(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, (error, key) =>
      error ? reject(error) : resolve(key),
    )
  })
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':')
  const expected = Buffer.from(hashHex, 'hex')
  const actual = await scryptAsync(password, Buffer.from(saltHex, 'hex'))
  return timingSafeEqual(expected, actual)
}

/** Sətirləri vaxta görə sızdırmadan müqayisə edir. */
export function safeEqual(a: string, b: string): boolean {
  const digest = (value: string) => createHash('sha256').update(value).digest()
  return timingSafeEqual(digest(a), digest(b))
}

/** Yeni admin yaradarkən və parol dəyişəndə işlənir. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const hash = await scryptAsync(password, salt)
  return `${salt.toString('hex')}:${hash.toString('hex')}`
}
