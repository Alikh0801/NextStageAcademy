import { Schema, model, models, type Model, type Types } from 'mongoose'

export const MESSAGE_TYPES = ['CONTACT', 'CV_REQUEST'] as const
export type MessageType = (typeof MESSAGE_TYPES)[number]

/** Həm "Əlaqə" formu, həm "CV və Karyera dəstəyi" müraciətləri burada toplanır. */
export interface IMessage {
  _id: Types.ObjectId
  type: MessageType
  fullName: string
  email: string
  phone?: string
  subject?: string
  body?: string
  /** CV faylının Vercel Blob ünvanı. */
  fileUrl?: string
  isRead: boolean
  createdAt: Date
}

const MessageSchema = new Schema<IMessage>(
  {
    type: { type: String, enum: MESSAGE_TYPES, default: 'CONTACT' },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    body: { type: String, trim: true },
    fileUrl: { type: String, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

MessageSchema.index({ type: 1, isRead: 1, createdAt: -1 })

export const Message: Model<IMessage> =
  (models.Message as Model<IMessage>) ?? model<IMessage>('Message', MessageSchema)
