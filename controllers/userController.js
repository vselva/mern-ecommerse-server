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
        console.log('Error in registering an UserError: ' + err);
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

module.exports = { register, login, logout }
