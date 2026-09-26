/**
 * Admin hesabı yaradır və ya parolunu yeniləyir.
 *
 *   npm run admin:add -- --from-env          # .env-dəki admini bazaya köçürür
 *   npm run admin:add -- ali@numune.az 'parol'
 *
 * Panel qurulandan sonra gündəlik iş üçün /admin/adminler səhifəsi var;
 * bu skript ilk hesabı yaratmaq və giriş bağlananda açmaq üçündür.
 */
import dns from 'node:dns'
import { randomBytes, scryptSync } from 'node:crypto'
import mongoose from 'mongoose'

// Windows-da DNS resolver-i `127.0.0.1`-ə düşəndə SRV sorğusu sınır (bax: src/lib/db.ts).
const FALLBACK_DNS = ['1.1.1.1', '8.8.8.8']
const isBroken = (s) => s.length === 1 && s[0] === '127.0.0.1'
if (isBroken(dns.getServers())) dns.setServers(FALLBACK_DNS)
if (isBroken(dns.promises.getServers())) dns.promises.setServers(FALLBACK_DNS)

const MIN_PASSWORD_LENGTH = 8
const HASH_PATTERN = /^[0-9a-f]{32}:[0-9a-f]{128}$/

const uri = process.env.DATABASE_URL
if (!uri) {
  console.error('DATABASE_URL təyin edilməyib.')
  process.exit(1)
}

/** `src/lib/admin/password.ts` ilə eyni parametrlər. */
function hashPassword(password) {
  const salt = randomBytes(16)
  return `${salt.toString('hex')}:${scryptSync(password, salt, 64).toString('hex')}`
}

const args = process.argv.slice(2)
let email
let passwordHash

if (args[0] === '--from-env') {
  email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim()

  if (!email || !passwordHash) {
    console.error('.env-də ADMIN_EMAIL və ya ADMIN_PASSWORD_HASH yoxdur.')
    process.exit(1)
  }
  if (!HASH_PATTERN.test(passwordHash)) {
    console.error('ADMIN_PASSWORD_HASH formatı gözlənilənə uyğun deyil.')
    process.exit(1)
  }
} else {
  const [inputEmail, password] = args
  if (!inputEmail || !password) {
    console.error("İstifadə: npm run admin:add -- e-poct@numune.az 'parol'")
    console.error('     və ya: npm run admin:add -- --from-env')
    process.exit(1)
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    console.error(`Parol ən azı ${MIN_PASSWORD_LENGTH} simvol olmalıdır.`)
    process.exit(1)
  }
  email = inputEmail.trim().toLowerCase()
  passwordHash = hashPassword(password)
}

await mongoose.connect(uri)
const admins = mongoose.connection.db.collection('admins')

// E-poçt unikal olmalıdır — tətbiq işə düşməsə də indeks burada qurulur.
await admins.createIndex({ email: 1 }, { unique: true })

const now = new Date()
const result = await admins.updateOne(
  { email },
  {
    $set: { email, passwordHash, passwordChangedAt: now, updatedAt: now },
    $setOnInsert: { createdAt: now },
  },
  { upsert: true },
)

console.log(
  result.upsertedCount
    ? `${email} -> əlavə edildi`
    : `${email} -> parolu yeniləndi (köhnə sessiyaları düşür)`,
)
console.log(`bazadakı admin sayı: ${await admins.countDocuments()}`)

await mongoose.disconnect()
