import express from 'express';
// import ProgressCalculation from '../controllers/ProgressController.js'
import { createUser, loginUser, RertiveUser, showAllCourse } from '../controllers/user.js';
import { validateUser, validate, validateUserLogin } from '../middlewares/validator.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// router.get('/course-progress/:studentId/:courseId', ProgressCalculation.GetProg);

// router.post('/sumbit-quize', ProgressCalculation.PostProg);

// Route for creating a new user
router.post('/create', validateUser, validate, createUser);

// Route for logging in a user
router.post('/login', validateUserLogin, validate, loginUser);

router.get('/me', authenticate, RertiveUser);

router.get('/course/all', showAllCourse);

export default router;