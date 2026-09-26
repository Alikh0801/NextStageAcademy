import { Schema, model, models, type Model, type Types } from 'mongoose'

/**
 * Admin hesabları bazada saxlanır ki, panel üzərindən idarə oluna bilsin.
 * `ADMIN_SESSION_SECRET` env-də qalır — cookie imzası onunla atılır.
 */
export interface IAdmin {
  _id: Types.ObjectId
  email: string
  name?: string
  /** `salt:hash` (hex) — `src/lib/admin/password.ts` formatı. */
  passwordHash: string
  /**
   * Parol dəyişəndə yenilənir. Bundan əvvəl verilmiş sessiyalar etibarsız
   * sayılır — köhnə quruluşda imza açarına hash qatılaraq alınan davranış.
   */
  passwordChangedAt: Date
  createdAt: Date
  updatedAt: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    passwordChangedAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true },
)

export const Admin: Model<IAdmin> =
  (models.Admin as Model<IAdmin>) ?? model<IAdmin>('Admin', AdminSchema)
