import express from 'express';
// import ProgressCalculation from '../controllers/ProgressController.js'
import {
  createUser,
  loginUser,
  RertiveUser,
  showAllCourse,
} from '../controllers/user.js';
import {
  validateUser,
  validate,
  validateUserLogin,
} from '../middlewares/validator.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Route for creating a new user
router.post('/register', validateUser, validate, createUser);

// Route for logging in a user
router.post('/login', validateUserLogin, validate, loginUser);

// get the information about the logged person
router.get('/me', authenticate, RertiveUser);

// show all courses in the website
router.get('/course/all', showAllCourse);

export default router;
