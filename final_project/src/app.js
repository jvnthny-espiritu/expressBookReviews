/**
 * Express Book Reviews Application
 * Main application file
 */

const express = require('express');
const session = require('express-session');
const { SESSION_SECRET, SESSION_RESAVE, SESSION_SAVE_UNINITIALIZED } = require('./config/constants');
const { verifyToken } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');

const app = express();

// Middleware
app.use(express.json());

// Session middleware for customer routes
app.use('/customer', session({
  secret: SESSION_SECRET,
  resave: SESSION_RESAVE,
  saveUninitialized: SESSION_SAVE_UNINITIALIZED,
}));

// Authentication middleware for protected routes
app.use('/customer/auth/*', verifyToken);

// Routes
app.use('/customer', authRoutes);
app.use('/', publicRoutes);

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
