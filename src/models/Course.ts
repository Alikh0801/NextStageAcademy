import { Schema, model, models, type Model, type Types } from 'mongoose'
import { translatedSchema, type Translated } from './shared'

export const COURSE_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const
export type CourseLevel = (typeof COURSE_LEVELS)[number]

export interface ICourse {
  _id: Types.ObjectId
  slug: string
  title: Translated
  summary?: Translated
  content?: Translated

  coverImage?: string
  price?: number
  durationHours?: number
  level: CourseLevel
  format?: Translated
  startDate?: Date
  capacity?: number

  instructorName?: string
  instructorTitle?: Translated
  instructorPhoto?: string

  isPublished: boolean
  isFeatured: boolean
  order: number

  category: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const CourseSchema = new Schema<ICourse>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: translatedSchema(), required: true },
    summary: { type: translatedSchema(false) },
    content: { type: translatedSchema(false) },

    coverImage: { type: String, trim: true },
    price: { type: Number, min: 0 },
    durationHours: { type: Number, min: 0 },
    level: { type: String, enum: COURSE_LEVELS, default: 'BEGINNER' },
    format: { type: translatedSchema(false) },
    startDate: { type: Date },
    capacity: { type: Number, min: 0 },

    instructorName: { type: String, trim: true },
    instructorTitle: { type: translatedSchema(false) },
    instructorPhoto: { type: String, trim: true },

    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },

    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true },
)

CourseSchema.index({ isPublished: 1, isFeatured: 1, order: 1 })
CourseSchema.index({ category: 1, isPublished: 1 })

export const Course: Model<ICourse> =
  (models.Course as Model<ICourse>) ?? model<ICourse>('Course', CourseSchema)
