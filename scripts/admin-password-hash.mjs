// Admin parolunun hash-ini yaradır: npm run admin:hash -- 'parol'
// Nəticəni ADMIN_PASSWORD_HASH env dəyişəninə yaz.
// Parametrlər src/lib/admin/password.ts ilə eyni olmalıdır.
import { randomBytes, scryptSync } from 'node:crypto'

const MIN_LENGTH = 8
const password = process.argv[2]

if (!password || password.length < MIN_LENGTH) {
  console.error(
    `İstifadə: npm run admin:hash -- 'parol'  (ən azı ${MIN_LENGTH} simvol)`,
  )
  process.exit(1)
}

const salt = randomBytes(16)
const hash = scryptSync(password, salt, 64)
console.log(`${salt.toString('hex')}:${hash.toString('hex')}`)
