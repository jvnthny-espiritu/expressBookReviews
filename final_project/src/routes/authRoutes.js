/**
 * Authentication Routes
 * Routes for user registration and login
 */

const express = require('express');
const { login } = require('../controllers/authController');
const { addOrUpdateReviewHandler, deleteReviewHandler } = require('../controllers/reviewsController');

const router = express.Router();

/**
 * POST /customer/login
 * Login user and receive JWT token
 */
router.post('/login', login);

/**
 * PUT /customer/auth/review/:isbn
 * Add or update a book review (authenticated users only)
 */
router.put('/auth/review/:isbn', addOrUpdateReviewHandler);

/**
 * DELETE /customer/auth/review/:isbn
 * Delete a book review (authenticated users only)
 */
router.delete('/auth/review/:isbn', deleteReviewHandler);

module.exports = router;
