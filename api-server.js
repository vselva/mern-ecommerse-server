// Get environmental variables 
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET_CODE = process.env.JWT_SECRET_CODE;
const NODE_ENV = process.env.NODE_ENV;

// express module
const express = require('express');
const app = express();

// middleware to parase json requests 
app.use(express.json());

// cors
const cors = require('cors');
app.use(cors({
    methods: ['GET', 'POST']
}));

// Get Employee Controller and use
const profileRoutes = require('./routes/profileRoutes');
app.use('/api', profileRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Listen to port 8000 for incoming requests
app.listen(PORT, () => {
    console.log('App running on port ' + PORT);
});
