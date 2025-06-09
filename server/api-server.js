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

// swagger
const { swaggerUi, swaggerSpec } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware to parase json requests 
app.use(express.json());

// cors
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));

// Get Profile Routes
const profileRoutes = require('./routes/profileRoutes');
app.use('/api', profileRoutes);

// Get User Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Get Product Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

// Order Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);

// Listen to port 8000 for incoming requests
app.listen(PORT, () => {
    console.log('App running on port ' + PORT);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
