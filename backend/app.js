import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Router from './routes/index.js';
import studentRouter from './routes/student.js';
import instructorRouter from './routes/instructor.js';

dotenv.config();
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_URL;
const app = express();

app.use(express.json());
app.use(cors());

app.use(process.env.USER_API_PREFIX || '/api/user', Router);
app.use(process.env.STUDENT_API_PREFIX || '/api/student', studentRouter);
app.use(process.env.INSTRUCTOR_API_PREFIX || '/api/instructor', instructorRouter);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connecting to MongodB server\n');
  } catch (err) {
    console.log('Error in connecting to MongoDB because of:', err);
    console.error(err);
  }
})();

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
