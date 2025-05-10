const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    phone: Number,
    city: String,
    isActive: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requied: true
    }
});

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;
