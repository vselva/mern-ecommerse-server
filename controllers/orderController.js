const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $unwind: "$userInfo"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            // {
            //     $unwind: "$productDetails"
            // },
            {
                $project: {
                    _id: 1,
                    orderDate: "$createdAt",
                    totalAmount: 1,
                    user: 1,
                    "userInfo._id": 1,
                    "userInfo.email": 1,
                    productDetails: "$productDetails"
                }
            },
            {
                $limit: 2
            }
        ]);
        res.status(200).json(orders);
    } catch (err) {
        console.log('Error in getting order list. Error: ', err);
    }

}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        
        // const orderDetails = await Order.findById({_id: orderId});
        const orderDetails = await Order.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId.createFromHexString(orderId)
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    user: 1, 
                    orderDate: "$createdAt",
                    productDetails: 1
                }
            }
        ]);

        if (!orderDetails) {
            return res.status(401).json({ error: 'Order not found' });
        }

        res.status(200).json(orderDetails);
    } catch (err) {
        console.log('Error in Fetching Order Details: Error:', err);
        res.status(500).json({error: "Eror in fetching order details"});
    }
}

const createOrder = async (req, res) => {
    try {
        console.log('req.body:', req.body);

        const { user, products, totalAmount } = req.body;

        if(!user || !products || !totalAmount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log('products:', products);
        const productIds = products.map(p => p.product);
        console.log('productIds:', productIds);
        const productExists = await Product.find({ _id: { $in: productIds } });
        console.log('productExists:', productExists);

        if (productExists.length !== productIds.length) {
            return res.status(400).json({ message: 'One or more products do not exist' });
        }

        const newOrder = new Order({
            user,
            products,
            totalAmount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.log('Error in Updating Products. Error: ', error.message, 'stack:', error.stack, 'type:', error.type);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder
}
