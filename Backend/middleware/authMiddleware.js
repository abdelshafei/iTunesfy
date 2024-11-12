const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Attach the user info to the request object
        req.user = decoded; // `decoded` contains the user info from the token payload
        next();
    });
}

module.exports = authMiddleware;