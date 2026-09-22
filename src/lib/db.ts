import mongoose, { type Mongoose } from 'mongoose'
import { MongoClient, type Db } from 'mongodb'

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
  _mongoClient?: MongoClient
}

// --------------------------------------------------------------- Mongoose
// Domen modelləri (Course, Post, Enrollment, ...) bu bağlantıdan istifadə edir.

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

// ------------------------------------------------------------ Native driver
// better-auth sinxron `Db` obyekti tələb edir, ona görə ayrıca client saxlayırıq.
// Driver ilk əməliyyatda özü qoşulur — burada `connect()` çağırmaq lazım deyil.

function getMongoClient(): MongoClient {
  if (!globalForDb._mongoClient) {
    globalForDb._mongoClient = new MongoClient(MONGODB_URI!, { maxPoolSize: 5 })
  }
  return globalForDb._mongoClient
}

export const mongoClient: MongoClient = getMongoClient()

/** Baza adı bağlantı sətrindən götürülür. */
export const mongoDb: Db = mongoClient.db()
