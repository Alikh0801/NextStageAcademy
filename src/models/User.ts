import { Schema, model, models, type Model, type Types } from 'mongoose'

export const ROLES = ['USER', 'ADMIN'] as const
export type Role = (typeof ROLES)[number]

/**
 * İstifadəçi qeydlərini better-auth özü yazır (`user` kolleksiyası).
 * Bu model yalnız oxumaq üçündür — admin panelində siyahı göstərmək kimi.
 * Yazma əməliyyatlarını better-auth API-si üzərindən et.
 */
export interface IUser {
  _id: Types.ObjectId
  name: string
  email: string
  emailVerified: boolean
  image?: string
  role: Role
  phone?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String, trim: true },
    role: { type: String, enum: ROLES, default: 'USER' },
    phone: { type: String, trim: true },
  },
  {
    // better-auth kolleksiyanı tək halda adlandırır — Mongoose-un
    // avtomatik cəmləməsini ("users") söndürürük.
    collection: 'user',
    timestamps: true,
    // better-auth öz sahələrini əlavə edir, onları kəsməyək.
    strict: false,
  },
)

export const User: Model<IUser> =
  (models.User as Model<IUser>) ?? model<IUser>('User', UserSchema)
