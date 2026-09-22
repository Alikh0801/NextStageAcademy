import { Schema, model, models, type Model, type Types } from 'mongoose'
import { translatedSchema, type Translated } from './shared'

export interface IFaq {
  _id: Types.ObjectId
  question: Translated
  answer: Translated
  order: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: translatedSchema(), required: true },
    answer: { type: translatedSchema(), required: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
)

FaqSchema.index({ isPublished: 1, order: 1 })

export const Faq: Model<IFaq> =
  (models.Faq as Model<IFaq>) ?? model<IFaq>('Faq', FaqSchema)
