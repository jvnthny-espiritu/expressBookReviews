/**
 * Authentication Middleware
 * Handles JWT token verification for protected routes
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

/**
 * Middleware to verify JWT token from session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyToken = (req, res, next) => {
  try {
    // Get token from session
    const sessionAuth = req.session && req.session.authorization;
    const token = sessionAuth && sessionAuth.accessToken;

    if (!token) {
      return res.status(403).json({ 
        message: 'Unauthorized: token missing' 
      });
    }

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ 
          message: 'Unauthorized: token invalid or expired' 
        });
      }
      
      // Attach user information to request
      req.user = decoded;
      req.username = sessionAuth.username;
      return next();
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error during authentication' 
    });
  }
};

module.exports = {
  verifyToken,
};
