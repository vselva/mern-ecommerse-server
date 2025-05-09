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
router.get('/customers', async (req, res) => {
    const customerList = await Customer.find().limit(5);
    res.json(customerList);
});

// Read a Customer
router.get('/customers/:customerId', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId);
        if (!customer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        res.json(customer);
    } catch (err) {
        console.log('Error in fetch customer details. Error: ' + err);
        res.status(400).json({erorr: 'Error in fetching customer details'});
    }
});

// Write a Customer
router.post('/customers', async (req, res) => {
    try {
        const data = req.body;
        const newCustomer = new Customer(data);
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
        // 201 => status for 'created' 
    } catch (err) {
        console.log('Error in saving customer. Error: ' + err);
        res.status(400).json({error:'Invalid Data'}); 
        // 400 => status for 'bad request'
    }
});

// Update a Customer (Overwrite)
router.put('/customers/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const data = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            data,
            { 
                new: true, // to get updated customer in the updatedCustomer variable
                overwrite: true, // for PUT request this should be true 
                runValidators: true
            }
        );
        
        if (!updatedCustomer) {
            return res.status(404).json({error: 'Customer not found'});
        }

        res.json(updatedCustomer);
    } catch (err) {
        console.log('Error in updating customer. Error: ' + err);
        res.status(400).json({error: 'Unable to store the data'});
    }
});

// Update Customer (Do not Overwrite)
router.patch('/customers/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const data = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId, 
            data, 
            {
                new: true, // return updated customer
                overwrite: false, // For PUT this should be false
                runValidators: true
            }
        );
        if(!updatedCustomer)
            return res.status(400).json({error: 'Customer not found'});
        res.json(updatedCustomer);
    } catch (err) {
        console.log('Error in Updating Customer. Error: ' + err);
        res.status(400).json({error: 'Error in Updating Customer'});
    }
});

router.delete('/customers/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const deleted = await Customer.findByIdAndDelete(customerId);
        if (!deleted) 
            return res.status(400).json({error: 'Invalid Customer Id'});
        res.json(deleted);
    } catch (err) {
        console.log('Error in deleting customer. Error: ' + err);
        res.status(400).json({ error: 'Unable to delete the customer' });
    }
});

module.exports = router;