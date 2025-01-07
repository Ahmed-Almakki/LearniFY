import mongoose, { Schema } from 'mongoose';

const Grade = new mongoose.Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  quizeId: { type: Schema.Types.ObjectId, ref: 'Quize', required: true },
  score: { type: Number, default: 0 },
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('Grade', Grade);
