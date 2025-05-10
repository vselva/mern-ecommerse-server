// get controllers
const customerController = require('../controllers/customerController');

// get router 
const express = require('express');
const router = express.Router();

// get Customer Model 
const Customer = require('../models/Customer');

// get authenticateJwtToken
const authenticateJwtToken = require('../middleware/jwtAuth');

// connect to database
const connectMongoDB = require('../config/db');
const mongoose = require('mongoose');
connectMongoDB();

// Reas Customers
router.get('/customers', authenticateJwtToken, customerController.getCustomers);

// Read a Customer
router.get('/customers/:customerId', authenticateJwtToken, customerController.getCustomerById);

// Write a Customer
router.post('/customers', authenticateJwtToken, customerController.createCustomer);

// Update a Customer (Overwrite)
router.put('/customers/:customerId', authenticateJwtToken, customerController.putCustomer);

// Update Customer (Do not Overwrite)
router.patch('/customers/:customerId', authenticateJwtToken, customerController.patchCustomer);

router.delete('/customers/:customerId', authenticateJwtToken, customerController.deleteCustomer);

module.exports = router;
