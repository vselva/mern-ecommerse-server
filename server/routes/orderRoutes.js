// Get Router 
const express = require('express');
const router = express.Router();

// Get jwt auth
const authenticateJwtToken = require('../middleware/jwtAuth');

// Get Order Controller
const orderController = require('../controllers/orderController');

// Order APIs
router.get('/orders', authenticateJwtToken, orderController.getOrders);
router.get('/orders/:id', authenticateJwtToken, orderController.getOrderById);
router.post('/orders', authenticateJwtToken, orderController.createOrder);

module.exports = router;
