// Routes
const express = require('express');
const router = express.Router();

// get authenticateJwtToken
const authenticateJwtToken = require('../middleware/jwtAuth');

// import User Controller
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.post(
  '/auth/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  userController.register
);

router.post('/auth/login', userController.login);

router.post('/auth/logout', userController.logout);

router.get('/auth/me', authenticateJwtToken, userController.getMyProfile);

module.exports = router;
