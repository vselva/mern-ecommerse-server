const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'TG']
    },
    age: {
        type: Number,
        min: [ 18, "age must greater than 18" ]
    },
    mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length > 9
            },
            message: props => `${props.value} is not valid mobile number.` 
        },
        get: v => v? `+91 ${v}` : v
    },
    address: {
        city: {
            type: String
        },
        pincode: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
         default: Date.now
    }
});

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;
