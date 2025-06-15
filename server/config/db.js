// Fetch values from .env
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

// mongoose library
const mongoose = require('mongoose');

// function to connecto MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected in ${process.env.NODE_ENV} environment`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
