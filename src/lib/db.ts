import dns from 'node:dns'
import mongoose, { type Mongoose } from 'mongoose'

/**
 * Windows-da Node-un DNS resolver-i registry-dəki `NameServer` sahəsini oxuyur.
 * DNS router tərəfindən DHCP ilə verilirsə həmin sahə boş qalır (dəyər yalnız
 * `DhcpNameServer`-də olur) və resolver `127.0.0.1`-ə düşür. Nəticədə
 * `mongodb+srv://` üçün lazım olan SRV sorğusu ECONNREFUSED verir — halbuki
 * əməliyyat sistemi eyni host-u problemsiz həll edir.
 *
 * `dns` və `dns.promises` AYRI server siyahısı saxlayır, ona görə ikisini də
 * təyin etmək lazımdır. MongoDB sürücüsü məhz `dns.promises`-dən istifadə edir.
 *
 * Yalnız lokal işləyəndə və yalnız bu konkret səhv konfiqurasiya aşkarlananda
 * müdaxilə edirik. Vercel-də DNS düzgün qurulub, ona görə istehsalda toxunmuruq.
 */
if (process.env.NODE_ENV !== 'production') {
  const FALLBACK_DNS = ['1.1.1.1', '8.8.8.8']
  const isBroken = (servers: string[]) =>
    servers.length === 1 && servers[0] === '127.0.0.1'

  if (isBroken(dns.getServers())) {
    dns.setServers(FALLBACK_DNS)
  }
  if (isBroken(dns.promises.getServers())) {
    dns.promises.setServers(FALLBACK_DNS)
  }
}

const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error('DATABASE_URL təyin edilməyib. .env faylını yoxla.')
}

/**
 * Vercel-də hər sorğu ayrıca funksiya kimi işə düşür. Bağlantıları qlobal
 * dəyişəndə saxlamasaq, hər sorğu yeni bağlantı açar və Atlas limitini doldurar.
 * Eyni səbəbdən dev rejimində hot reload da bağlantıları yığmır.
 */
const globalForDb = globalThis as typeof globalThis & {
  _mongoose?: { conn: Mongoose | null; promise: Promise<Mongoose> | null }
}

const cached = globalForDb._mongoose ?? { conn: null, promise: null }
globalForDb._mongoose = cached

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
      maxPoolSize: 10,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

