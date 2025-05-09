// get controllers
const customerController = require('../controllers/customerController');

// get router 
const express = require('express');
const router = express.Router();

// get Customer Model 
const Customer = require('../models/Customer');

// connect to database
const connectMongoDB = require('../config/db');
const mongoose = require('mongoose');
connectMongoDB();

// Reas Customers
router.get('/customers', customerController.getCustomers);

// Read a Customer
router.get('/customers/:customerId', customerController.getCustomerById);

// Write a Customer
router.post('/customers', customerController.createCustomer);

// Update a Customer (Overwrite)
router.put('/customers/:customerId', customerController.putCustomer);

// Update Customer (Do not Overwrite)
router.patch('/customers/:customerId', customerController.patchCustomer);

router.delete('/customers/:customerId', customerController.deleteCustomer);

module.exports = router;
