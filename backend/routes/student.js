import express from 'express';
import StudentController from '../controllers/studentcontrollers.js';
import ProgressController from '../controllers/ProgressController.js';
import { authenticate } from '../middlewares/auth.js'; // Authentication middleware
import { requireRole } from '../middlewares/roleMiddleware.js'; // Role middleware

const router = express.Router();

// Ensure user is authenticated and has the 'student' role
router.use(authenticate);
router.use(requireRole('student'));

// Enroll in a course
router.post('/enroll', StudentController.enrollCourse);

// Get all enrolled courses
router.get('/courses', StudentController.getEnrolledCourses);

// Update course progress
router.post('/sumbit-quize', ProgressController.PostProg);

// search for course
router.get('/search/:query', StudentController.searchCourse);

// view all courses "for dashboard"
router.get('/:userId/dashboard', StudentController.viewAllCourse);

// show your progress
router.get('/course/:studentId/:courseId/progress', ProgressController.GetProg);

export default router;
