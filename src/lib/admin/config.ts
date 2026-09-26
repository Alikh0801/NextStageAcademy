/**
 * Admin hesabları artıq bazadadır (`Admin` modeli) — burada yalnız sessiya
 * imzasının açarı qalır. Bu fayl proxy-də də işlədiyi üçün `server-only`
 * deyil və heç bir baza sorğusu etmir.
 */
const MIN_SECRET_LENGTH = 32

/** Təyin edilməyibsə və ya qısadırsa `null` qaytarır — giriş bağlanır. */
export function getSessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < MIN_SECRET_LENGTH) return null
  return secret
}
