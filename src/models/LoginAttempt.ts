import { Schema, model, models, type Model, type Types } from 'mongoose'

/** Uğursuz admin girişləri. Kolleksiya TTL indeksi ilə özü təmizlənir. */
export const LOGIN_ATTEMPT_WINDOW_SECONDS = 15 * 60

export interface ILoginAttempt {
  _id: Types.ObjectId
  ip: string
  createdAt: Date
}

const LoginAttemptSchema = new Schema<ILoginAttempt>({
  ip: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: LOGIN_ATTEMPT_WINDOW_SECONDS,
  },
})

LoginAttemptSchema.index({ ip: 1, createdAt: -1 })

export const LoginAttempt: Model<ILoginAttempt> =
  (models.LoginAttempt as Model<ILoginAttempt>) ??
  model<ILoginAttempt>('LoginAttempt', LoginAttemptSchema)
