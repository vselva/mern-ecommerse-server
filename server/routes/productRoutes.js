// Get Router
const router = require('express').Router();

// Get jwt middleware
const authenticateJwtToken = require('../middleware/jwtAuth');

// Get Product Controller
const productController = require('../controllers/productController');

router.get('/products', authenticateJwtToken, productController.getProducts);
router.post('/products', authenticateJwtToken, productController.createProduct);
router.get('/products/:id', authenticateJwtToken, productController.getProductById);
router.put('/products/:id', authenticateJwtToken, productController.updateProduct);
router.patch('/products/:id', authenticateJwtToken, productController.patchProduct);
router.delete('/products/:id', authenticateJwtToken, productController.deleteProduct);

module.exports = router;
