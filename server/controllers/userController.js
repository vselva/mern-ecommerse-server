// import mongoose and userModel
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// get config from .env file
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET_CODE = process.env.JWT_SECRET_CODE;

const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const newUser = await User.create({email, password});
        const newUser = new User({ email, password});
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'user registered', id: savedUser._id });
    } catch (err) {
        console.log('Error in registering an User. Error: ' + err);
        res.status(400).json({error: 'Error in registering an user.'});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const signInUser = await User.findOne({email});

    if (!signInUser)
        return res.status(401).json({error: 'User not found'});

    const passwordMatch = await bcrypt.compare(password, signInUser.password);

    if (!passwordMatch)
        return res.status(401).json({error: 'Invalid Credentials'});

    const token = jwt.sign(
        {
            email, 
            id: signInUser._id
        },
        JWT_SECRET_CODE,
        { expiresIn: '1h' }
    );

    res.json({token});
}

// function to logout a user
const logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_CODE, (err, user, next) => {
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
}

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
                    _id: objectId
                }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "profile",
                    foreignField: '_id',
                    as: "userProfile"
                }
            },
            {
                $unwind: "$userProfile"
            },
            {
                $project: {
                    _id: 0,
                    email: 1, 
                    name: "$userProfile.name",
                    gender: "$userProfile.gender",
                    age: "$userProfile.age",
                    mobile: "$userProfile.mobile",
                    address: "$userProfile.address"
                }
            }
        ]);

        if (!user) {
            return res.status(404).json({message: 'Associated User not found'});
        }

        res.json(user);
    } catch (err) {
        console.log('Error in fetch profile details. Error: ' + err);
        res.status(400).json({error: 'Error in fetching profile details'});
    }
}

module.exports = { register, login, logout, getMyProfile }
