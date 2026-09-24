import { Schema, model, models, type Model, type Types } from 'mongoose'

export const ENROLLMENT_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const
export type EnrollmentStatus = (typeof ENROLLMENT_STATUSES)[number]

export interface IEnrollment {
  _id: Types.ObjectId
  course: Types.ObjectId
  fullName: string
  email: string
  phone: string
  note?: string
  status: EnrollmentStatus
  createdAt: Date
  updatedAt: Date
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    note: { type: String, trim: true },
    status: { type: String, enum: ENROLLMENT_STATUSES, default: 'PENDING' },
  },
  { timestamps: true },
)

EnrollmentSchema.index({ status: 1, createdAt: -1 })
EnrollmentSchema.index({ course: 1, createdAt: -1 })
/** Eyni adam eyni təlimə iki dəfə müraciət etməsin. */
EnrollmentSchema.index({ course: 1, email: 1 }, { unique: true })

export const Enrollment: Model<IEnrollment> =
  (models.Enrollment as Model<IEnrollment>) ??
  model<IEnrollment>('Enrollment', EnrollmentSchema)
