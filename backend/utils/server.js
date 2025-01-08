import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import Router from '../routes/index.js';
import studentRouter from '../routes/student.js';
import instructorRouter from '../routes/instructor.js';

dotenv.config();

function CreateServer() {
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

  return app;
}

export default CreateServer;
