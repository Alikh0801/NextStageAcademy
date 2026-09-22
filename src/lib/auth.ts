import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { nextCookies } from 'better-auth/next-js'
import { mongoClient, mongoDb } from './db'

export const auth = betterAuth({
  appName: 'NextStage Academy',
  database: mongodbAdapter(mongoDb, { client: mongoClient }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // E-poçt servisi hələ qoşulmayıb — təsdiq tələb etmirik.
    requireEmailVerification: false,
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'USER',
        // Qeydiyyat formundan rol göndərilməsinin qarşısını alır.
        input: false,
      },
      phone: {
        type: 'string',
        required: false,
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 gün
    updateAge: 60 * 60 * 24, // gündə bir yenilənir
  },

  // Server Action-lardan çağırılanda cookie-lərin düzgün yazılmasını təmin edir.
  // Siyahıda sonuncu olmalıdır.
  plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session
