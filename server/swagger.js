const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'MERN Server API for a Ecommer learning site',
            version: "1.0.0",
            description: "This is a learning MERN stack developed for min ecomm site"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
        },
        security: [{
            bearerAuth: []
        }],
        servers: [{
            url: "http://localhost:8000/api",
        }],
    },
    apis: ["./routes/*.js", 
           "./controllers/*.js", 
           "./middleware/*.js", 
           "./models/*.js"]
}

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
}
