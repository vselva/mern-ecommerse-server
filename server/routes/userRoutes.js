// Routes
const express = require('express');
const router = express.Router();

// get authenticateJwtToken
const authenticateJwtToken = require('../middleware/jwtAuth');

// import User Controller
const userController = require('../controllers/userController');

router.post('/auth/register', userController.register);

router.post('/auth/login', userController.login);

router.post('/auth/logout', userController.logout);

router.get('/auth/me', authenticateJwtToken, userController.getMyProfile);

module.exports = router;