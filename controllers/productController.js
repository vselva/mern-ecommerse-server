// Get Product
const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        // Simulate fetching products from a database
        // const products = [
        // { id: 1, name: 'Product 1', price: 100 },
        // { id: 2, name: 'Product 2', price: 200 },
        // ];
        
        const products = await Product.find().limit(10);
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Return the products as a JSON response
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Validate the request body
        if (!name || !description || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            price
        });

        // Save the product to the database
        await newProduct.save();

        // Return the created product as a JSON response
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the product ID
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Fetch the product by ID from the database
        const product = await Product.findById(id);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return the product as a JSON response
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Error fetching product by ID' });
    }
}

// Export the controller functions
module.exports = { getProducts, createProduct, getProductById };
