import mongoose, { Schema } from 'mongoose';

const Contents = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  pathToLecture: { type: String, required: true },
  type: {
    type: String,
    enum: ['Article', 'video'],
    required: true,
  },
});

const Course = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['easy', 'meduim', 'hard'],
    required: true,
  },
  instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true },
{ versionKey: false });

const Courses = mongoose.model('Course', Course);
const Content = mongoose.model('Content', Contents);

export { Courses, Content };
