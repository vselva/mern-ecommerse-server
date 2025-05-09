// import mongoose and userModel
const mongoose = require('mongoose');
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

module.exports = { register }
