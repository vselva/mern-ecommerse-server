// import mongoose and userModel
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// get config from .env file
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET_CODE = process.env.JWT_SECRET_CODE;

const User = require('../models/User');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('Validation errors: ', errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    // const newUser = await User.create({email, password});
    const newUser = new User({ email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered', id: savedUser._id });
  } catch (err) {
    console.log('Error in registering an User. Error: ' + err);
    res.status(400).json({ error: 'Error in registering an user.' });
  }
};

/**
 * @swagger
 * /auth/login/:
 *   post:
 *     summary: User login
 *     description: Login a user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  const signInUser = await User.findOne({ email });

  if (!signInUser) return res.status(401).json({ error: 'User not found' });

  const passwordMatch = await bcrypt.compare(password, signInUser.password);

  if (!passwordMatch)
    return res.status(401).json({ error: 'Invalid Credentials' });

  const token = jwt.sign(
    {
      email,
      id: signInUser._id,
    },
    JWT_SECRET_CODE,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
};

// function to logout a user
const logout = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    jwt.verify(token, JWT_SECRET_CODE, (err) => {
      if (err) {
        console.log('Error in JWT Token verification. Error: ' + err);
        return res.status(403).json({ error: 'Invalid Token' });
      }
    });
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.log('Error in JWT Token verification. Error: ' + err);
    return res.status(403).json({ error: 'Invalid Token' + err });
  }
};

// get a profile details
const getMyProfile = async (req, res) => {
  try {
    // Check userId
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }

    // convert the userId to ObjectId
    const objectId = mongoose.Types.ObjectId.createFromHexString(userId);

    // populate profile
    // const user = await User.findById(userId).populate('profile');
    const user = await User.aggregate([
      {
        $match: {
          _id: objectId,
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'profile',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      {
        $unwind: '$userProfile',
      },
      {
        $project: {
          _id: 0,
          email: 1,
          name: '$userProfile.name',
          gender: '$userProfile.gender',
          age: '$userProfile.age',
          mobile: '$userProfile.mobile',
          address: '$userProfile.address',
        },
      },
    ]);

    if (!user) {
      return res.status(404).json({ message: 'Associated User not found' });
    }

    res.json(user);
  } catch (err) {
    console.log('Error in fetch profile details. Error: ' + err);
    res.status(400).json({ error: 'Error in fetching profile details' });
  }
};

module.exports = { register, login, logout, getMyProfile };
