import express from 'express';
import InstructorController from '../controllers/instructorController.js';
import { authenticate } from '../middlewares/auth.js'; // Authentication middleware
import { requireRole } from '../middlewares/roleMiddleware.js'; // Role middleware
import QuizeController from '../controllers/quizController.js';

const router = express.Router();

// Ensure user is authenticated and has the 'instructor' role
router.use(authenticate);
router.use(requireRole('instructor'));

// Define instructor routes
router.post('/course', InstructorController.createCourse); // Create a course
router.put('/course', InstructorController.updateCourse); // Update a course
router.delete('/course/:courseId?', InstructorController.deleteCourse); // Delete a course
router.get('/:instructorId/course', InstructorController.retriveCourses); // retrive courses

router.post('/content', InstructorController.PostContent); // Create a content
router.put('/:courseId/content', InstructorController.updateContent); // update a content
router.get('/:courseId?/content', InstructorController.GetContent); // retrive content
router.delete('/content/:courseId/:contentId', InstructorController.DelContent); // delete a content

router.post('/quize/:courseId?', QuizeController.PostQuiz); // Create a quize
router.put('/quize/:courseId/:quizeId?', QuizeController.UpdQuiz); // update a quize
router.delete('/quize/:quizeId', QuizeController.DelQuiz); // delete quize

router.get('/dashboard/:instructorId', InstructorController.viewAllCourse); // instructore dashboard

export default router;
