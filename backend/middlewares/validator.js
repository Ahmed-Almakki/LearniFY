const { check, validationResult } = require('express-validator');

// Validates user input for creating a user
exports.validateUser = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name must be between 3 and 20 characters long!'),

  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Email is invalid'),

  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is missing!')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 6 and 20 characters long!')
    .matches(/[\W_]/) // Ensure password contains at least one special character
    .withMessage('Password must contain at least one special character!'),
];

// Validates the user input for logging in a user
exports.validateUserLogin = [
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Email is invalid'),

  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is missing!')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 6 and 20 characters long!'),
];

// Function to handle the validation result
exports.validate = (req, res, next) => {
  const errors = validationResult(req).array();
  if (!errors.length) return next();
  res.status(400).json({ success: false, error: errors[0].msg });
};
