/**
 * Admin paneli üçün yeganə hesab env dəyişənlərindən oxunur — bazada istifadəçi
 * cədvəli yoxdur. Bu fayl proxy-də də işlədiyi üçün `server-only` deyil.
 */
export interface AdminConfig {
  email: string
  /** `salt:hash` (hex) — `npm run admin:hash` ilə yaradılır. */
  passwordHash: string
  sessionSecret: string
}

const PASSWORD_HASH_PATTERN = /^[0-9a-f]{32}:[0-9a-f]{128}$/

/** Dəyərlərdən biri yoxdursa və ya formatı səhvdirsə `null` qaytarır. */
export function getAdminConfig(): AdminConfig | null {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim()
  const sessionSecret = process.env.ADMIN_SESSION_SECRET

  if (!email || !passwordHash || !sessionSecret) return null
  if (!PASSWORD_HASH_PATTERN.test(passwordHash)) return null
  if (sessionSecret.length < 32) return null

  return { email, passwordHash, sessionSecret }
}
