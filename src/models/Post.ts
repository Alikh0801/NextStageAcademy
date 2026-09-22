import { Schema, model, models, type Model, type Types } from 'mongoose'
import { translatedSchema, type Translated } from './shared'

export interface IPost {
  _id: Types.ObjectId
  slug: string
  title: Translated
  excerpt?: Translated
  content: Translated
  coverImage?: string
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new Schema<IPost>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: translatedSchema(), required: true },
    excerpt: { type: translatedSchema(false) },
    content: { type: translatedSchema(), required: true },
    coverImage: { type: String, trim: true },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true },
)

PostSchema.index({ isPublished: 1, publishedAt: -1 })

export const Post: Model<IPost> =
  (models.Post as Model<IPost>) ?? model<IPost>('Post', PostSchema)
