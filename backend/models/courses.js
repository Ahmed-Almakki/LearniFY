import mongoose, { Schema } from 'mongoose';

const Contents = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  path: { type: String, required: true },
  type: {
    type: String,
    enum: ['text', 'video', 'pdf', 'image'],
    required: true,
  },
});

const Course = new mongoose.Schema({
  title: { type: String, required: true },
  instructorName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true},
  difficulty: {
    type: String,
    enum: ['easy', 'meduim', 'hard'],
    required: true,
  },
  instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [
    {
      lessonTitle: String,
      content: [Contents],
      resources: [String],
    },
  ],
},
{ timestamps: true },
{ versionKey: false });

const Courses = mongoose.model('Course', Course);
const Content = mongoose.model('Content', Contents);

export { Courses, Content };
