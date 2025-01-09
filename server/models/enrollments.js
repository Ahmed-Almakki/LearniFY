import mongoose, { Schema } from 'mongoose';

const Enrollments = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('Enrollments', Enrollments);
