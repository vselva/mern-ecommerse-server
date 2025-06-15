// Get Product
const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
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
};

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
      price,
    });

    // Save the product to the database
    await newProduct.save();

    // Return the created product as a JSON response
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the product ID
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Fetch the product by ID from the database
    const product = await Product.findById(id);

    // Testing Schema Method
    product.log();

    // Testing Schema Statics
    const productByName = await Product.findByName(product.name);
    console.log('Product from findByName (for testing):', productByName);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the product as a JSON response
    // res.status(200).json(product); // virtual will not be included ex inRupees
    res.status(200).json(product.toObject({ virtuals: true }));
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Error fetching product by ID' });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // Validate the request body
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
      },
      { new: true }
    );

    // Check if the product exists
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the updated product as a JSON response
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

const patchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // Validate the request body
    if (!name && !description && !price) {
      return res
        .status(400)
        .json({ message: 'At least one field is required' });
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(name && { name }),
          ...(description && { description }),
          ...(price && { price }),
        },
      },
      {
        new: true,
        overwrite: false,
        runValidators: true,
      }
    );

    // Check if the product exists
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the updated product as a JSON response
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error patching product:', error);
    res.status(500).json({ message: 'Error patching product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the product ID
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Delete the product from the database
    const deletedProduct = await Product.findByIdAndDelete(id);

    // Check if the product exists
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return a success message as a JSON response
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// Export the controller functions
module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  patchProduct,
  deleteProduct,
};
