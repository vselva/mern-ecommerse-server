// get controllers
const profileController = require('../controllers/profileController');

// get router 
const express = require('express');
const router = express.Router();

// get Profile Model 
const Profile = require('../models/Profile');

// get authenticateJwtToken
const authenticateJwtToken = require('../middleware/jwtAuth');

// connect to database
const connectMongoDB = require('../config/db');
const mongoose = require('mongoose');
connectMongoDB();

// Reas Profiles
router.get('/profiles', authenticateJwtToken, profileController.getProfiles);

// Read a Profile
router.get('/profiles/:profileId', authenticateJwtToken, profileController.getProfileById);

// Write a Profile
router.post('/profiles', authenticateJwtToken, profileController.createProfile);

// Update a Profile (Overwrite)
router.put('/profiles/:profileId', authenticateJwtToken, profileController.putProfile);

// Update Profile (Do not Overwrite)
router.patch('/profiles/:profileId', authenticateJwtToken, profileController.patchProfile);

router.delete('/profiles/:profileId', authenticateJwtToken, profileController.deleteProfile);

module.exports = router;
