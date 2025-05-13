const productController = require('../controllers/productController');
const authenticateJwtToken = require('../middleware/jwtAuth');

const routes = require('express').Router();

routes.get('/products', authenticateJwtToken, productController.getProducts);
routes.post('/products', authenticateJwtToken, productController.createProduct);
routes.get('/products/:id', authenticateJwtToken, productController.getProductById);

module.exports = routes;
