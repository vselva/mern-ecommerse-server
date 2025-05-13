// Routes
const express = require('express');
const router = express.Router();

// import User Controller
const userController = require('../controllers/userController');

router.post('/auth/register', userController.register);

router.post('/auth/login', userController.login);

router.post('/auth/logout', userController.logout);

module.exports = router;