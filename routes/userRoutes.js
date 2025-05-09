// Routes
const express = require('express');
const router = express.Router();

// import User Controller
const userController = require('../controllers/userController');

router.post('/register', userController.register);

module.exports = router;