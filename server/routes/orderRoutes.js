// Get Router
const express = require('express');
const router = express.Router();

// Get jwt auth
const authenticateJwtToken = require('../middleware/jwtAuth');

// Get Order Controller
const orderController = require('../controllers/orderController');

// Order APIs

/**
 * @swagger
 * /orders:
 *      get:
 *          summary: Retrive list of orders
 *          responses:
 *              200:
 *                  description: List of orders
 */
router.get('/orders', authenticateJwtToken, orderController.getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retrieve a specific order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the order
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         description: The ID of the product
 *                       quantity:
 *                         type: integer
 *                         description: The quantity of the product ordered
 *                 totalAmount:
 *                   type: number
 *                   description: The total amount for the order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/orders/:id', authenticateJwtToken, orderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user placing the order
 *                 example: "64fbd7f9f6b8f1289476e1a4"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: ID of the product
 *                       example: "productId1"
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product
 *                       example: 2
 *               totalAmount:
 *                 type: number
 *                 description: Total cost of the order
 *                 example: 150.00
 *               amountPaid:
 *                 type: number
 *                 description: Amount paid for the order
 *                 example: 100.00
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date the order was placed
 *                 example: "2025-05-13T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/orders', authenticateJwtToken, orderController.createOrder);

module.exports = router;
