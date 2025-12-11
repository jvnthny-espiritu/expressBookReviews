/**
 * Authentication Controller
 * Handles user registration and login
 */

const jwt = require('jsonwebtoken');
const { validateCredentials, registerUser } = require('../models/usersModel');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/constants');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const register = (req, res) => {
  try {
    const { username, password } = req.body || {};

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username and password are required' 
      });
    }

    // Attempt to register user
    const success = registerUser(username, password);
    
    if (!success) {
      return res.status(409).json({ 
        message: 'Username already exists' 
      });
    }

    return res.status(201).json({ 
      message: 'User successfully registered. Now you can login' 
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error during registration' 
    });
  }
};

/**
 * Login user and generate JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = (req, res) => {
  try {
    const { username, password } = req.body || {};

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username and password are required' 
      });
    }

    // Validate credentials
    if (!validateCredentials(username, password)) {
      return res.status(401).json({ 
        message: 'Invalid login credentials' 
      });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { data: username }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRY }
    );

    // Store token in session
    req.session.authorization = { accessToken, username };

    return res.status(200).json({
      message: 'User successfully logged in',
      username,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error during login' 
    });
  }
};

module.exports = {
  register,
  login,
};
