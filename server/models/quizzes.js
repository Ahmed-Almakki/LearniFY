import mongoose, { Schema } from 'mongoose';

const Quize = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  questions: [
    {
      _id: false,
      questionId: { type: String, required: true },
      questionText: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('Quize', Quize);
