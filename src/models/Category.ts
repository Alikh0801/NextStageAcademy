import { Schema, model, models, type Model, type Types } from 'mongoose'
import { translatedSchema, type Translated } from './shared'

export interface ICategory {
  _id: Types.ObjectId
  slug: string
  name: Translated
  description?: Translated
  icon?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: translatedSchema(), required: true },
    description: { type: translatedSchema(false) },
    icon: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

CategorySchema.index({ order: 1 })

export const Category: Model<ICategory> =
  (models.Category as Model<ICategory>) ?? model<ICategory>('Category', CategorySchema)
