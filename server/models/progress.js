import mongoose, { Schema } from 'mongoose';

const courseProgressSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  totalQuizes: { type: Number, default: 0 },
  completedQuizes: { type: Number, default: 0 },
  progress: { type: Number, default: 0 }, // Percentage of course completion
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('Progress', courseProgressSchema);
