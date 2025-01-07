import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Courses } from '../models/courses.js';
import User from '../utils/userOp.js';
import { sendError } from '../utils/helper.js';

// Create User
export const createUser = async (req, res) => {
  /*
  json
  {
    "name": "Ahmed Hisham",
    "email": "ahmed.aalmakki@example.com",
    "password": "Ahmed5122096@",
    "role": "instructor"
  }
  */
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // Check if the email already exists
    const existingUser = await User.retriveUser({ email });
    if (existingUser) return sendError(res, 'This email already exists!', 404);

    // Validate role (optional, if role is required)
    const validRoles = ['student', 'instructor']; // Example roles
    if (role && !validRoles.includes(role)) {
      return sendError(res, 'Invalid role provided.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role, // Default or specified role
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 'Error creating user.', 500);
  }
};

// Login User
export const loginUser = async (req, res) => {
  /*
  json
  {
    "email": "ahmed.aalmakki@example.com",
    "password": "Ahmed441996@"
  }
  */
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.retriveUser({ email });
    if (!user) return sendError(res, 'Invalid email or password.');

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return sendError(res, 'Invalid email or password.');

    // Generate a token
    const token = jwt.sign(
      { id: user[0]._id, role: user[0].role }, // Ensure role is included in the token
      process.env.JWT_SECRET, // Ensure this is the correct environment variable
      { expiresIn: '1h' },
    );

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token, // Return the token to the user
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 'Error logging in user.', 500);
  }
};

export const RertiveUser = async (req, res) => {
  const user = await User.retriveUserById(req.user.id);
  if (!user) {
    return sendError(res, 'Cannot Retrive user', 404);
  }
  return res.status(200).json({ user });
};

export const showAllCourse = async (req, res) => {
  try {
    const courses = await Courses.find();
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    return sendError(res, 'Cannot retrive course', 404);
  }
};
