const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET_CODE = process.env.JWT_SECRET_CODE;

function authenticateJwtToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({error: 'Token not found'});

    jwt.verify(token, JWT_SECRET_CODE, (err, user) => {
        if (err) {
            console.log('Error in JWT Token verification. Error: ' + err);
            return res.status(403).json({error: 'Invlid Token'});
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateJwtToken;
