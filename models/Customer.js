const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String, 
    email: String,
    isActive: Boolean, 
    age: Number,
});

const customerModel = mongoose.model('Customer', customerSchema);

module.exports = customerModel;
