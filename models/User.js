// import mongoose
const mongoose = require('mongoose');

// import bcryptjs
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        trim: true,
        set: v => v.toLowerCase()
    },
    password: {
        type: String,
        required: true, 
        trim: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, { timestamps: true });

// pre middleware
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.log('Error in encrypting password. Error: ' + err);
        next(err);
    }
});

// Post middleware 
UserSchema.post('save', function(docs) {
    console.log(`New User has been created: ${docs.email}`);
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
